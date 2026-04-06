"use client";

import { useEffect, useRef, useState } from "react";
import { LIP_INNER, LIP_OUTER } from "./constants";
import {
  buildSmoothedDisplayLandmarks,
  computeCoverTransform,
  drawLipstick,
  getPointsForIndices,
  toPoints,
} from "./arUtils";

type FacePrediction = {
  scaledMesh?: [number, number, number?][];
  keypoints?: { x: number; y: number; z?: number }[];
};

type UseArLipstickTryOnArgs = {
  isMobile: boolean;
  lipstickColorRef: React.MutableRefObject<string>;
  lipstickOpacityRef: React.MutableRefObject<number>;
};

export default function useArLipstickTryOn({
  isMobile,
  lipstickColorRef,
  lipstickOpacityRef,
}: UseArLipstickTryOnArgs) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<{
    estimateFaces: (
      input: HTMLVideoElement,
      config?: { flipHorizontal: boolean },
    ) => Promise<FacePrediction[]>;
  } | null>(null);
  const previousDisplayLandmarksRef = useRef<Record<number, [number, number]> | null>(
    null,
  );
  const displaySizeRef = useRef({ width: 640, height: 300 });
  const displayOffsetRef = useRef({ left: 0, top: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  const [cameraReady, setCameraReady] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelRuntime, setModelRuntime] = useState("loading...");

  const isLoading = !cameraReady || !isModelLoaded;

  useEffect(() => {
    const updateDisplaySize = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const style = window.getComputedStyle(wrapper);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;
      const paddingTop = parseFloat(style.paddingTop) || 0;
      const paddingBottom = parseFloat(style.paddingBottom) || 0;

      displaySizeRef.current = {
        width: Math.max(0, Math.round(rect.width - paddingLeft - paddingRight)),
        height: Math.max(
          0,
          Math.round(rect.height - paddingTop - paddingBottom),
        ),
      };
      displayOffsetRef.current = { left: paddingLeft, top: paddingTop };
    };

    updateDisplaySize();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateDisplaySize)
        : null;

    if (observer && wrapperRef.current) observer.observe(wrapperRef.current);
    window.addEventListener("resize", updateDisplaySize);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateDisplaySize);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    let stopLoop = () => {};
    const activeVideo = videoRef.current;

    const setupCamera = async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: isMobile ? 480 : 640 },
            height: { ideal: isMobile ? 360 : 480 },
          },
          audio: false,
        });

        video.srcObject = stream;
        await new Promise<void>((resolve) => {
          video.onloadedmetadata = () => {
            void video.play();
            resolve();
          };
        });

        if (isMounted) setCameraReady(true);
      } catch {
        if (isMounted) {
          setError(
            "Unable to access the camera. Please allow camera permission to use try-on.",
          );
        }
      }
    };

    const loadModel = async () => {
      try {
        const tf = await import("@tensorflow/tfjs");
        await import("@tensorflow/tfjs-backend-webgl");
        await import("@tensorflow/tfjs-converter");
        const faceLandmarksDetection = await import(
          "@tensorflow-models/face-landmarks-detection/dist/index.js"
        );

        try {
          await tf.setBackend("webgl");
          await tf.ready();
        } catch {
          await tf.setBackend("cpu");
          await tf.ready();
        }

        let detector: {
          estimateFaces: (
            input: HTMLVideoElement,
            config?: { flipHorizontal: boolean },
          ) => Promise<FacePrediction[]>;
        };
        let runtimeUsed = "tfjs";

        try {
          detector = await faceLandmarksDetection.createDetector(
            faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
            {
              runtime: "mediapipe",
              solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
              refineLandmarks: true,
              maxFaces: 1,
            },
          );
          runtimeUsed = "mediapipe";
        } catch {
          detector = await faceLandmarksDetection.createDetector(
            faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
            {
              runtime: "tfjs",
              refineLandmarks: true,
              maxFaces: 1,
            },
          );
          runtimeUsed = "tfjs";
        }

        if (videoRef.current) {
          try {
            await detector.estimateFaces(videoRef.current, {
              flipHorizontal: false,
            });
          } catch {}
        }

        if (isMounted) {
          modelRef.current = detector;
          setIsModelLoaded(true);
          setModelRuntime(runtimeUsed);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load the face model. Please refresh and try again.");
        }
      }
    };

    const resetSmoothing = () => {
      previousDisplayLandmarksRef.current = null;
    };

    const startDetectionLoop = () => {
      let animationId = 0;

      const detect = async () => {
        if (!isMounted) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const detector = modelRef.current;
        if (!video || !canvas || !detector) {
          animationId = requestAnimationFrame(detect);
          return;
        }

        const containerWidth = displaySizeRef.current.width;
        const containerHeight = displaySizeRef.current.height;
        const containerOffset = displayOffsetRef.current;
        if (
          !containerWidth ||
          !containerHeight ||
          !video.videoWidth ||
          !video.videoHeight
        ) {
          animationId = requestAnimationFrame(detect);
          return;
        }

        const transform = computeCoverTransform(
          video,
          containerWidth,
          containerHeight,
        );
        if (!transform) {
          animationId = requestAnimationFrame(detect);
          return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          animationId = requestAnimationFrame(detect);
          return;
        }

        const dpr = window.devicePixelRatio || 1;
        const requiredWidth = Math.round(containerWidth * dpr);
        const requiredHeight = Math.round(containerHeight * dpr);
        if (
          canvasSizeRef.current.width !== requiredWidth ||
          canvasSizeRef.current.height !== requiredHeight
        ) {
          canvas.width = requiredWidth;
          canvas.height = requiredHeight;
          canvasSizeRef.current = { width: requiredWidth, height: requiredHeight };
        }

        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;
        canvas.style.left = `${containerOffset.left}px`;
        canvas.style.top = `${containerOffset.top}px`;

        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, containerWidth, containerHeight);

        try {
          const predictions = await detector.estimateFaces(video, {
            flipHorizontal: false,
          });
          if (predictions.length > 0) {
            const firstPrediction: FacePrediction | undefined = predictions[0];
            const landmarks = firstPrediction ? toPoints(firstPrediction) : null;
            if (landmarks) {
              const displayMap = buildSmoothedDisplayLandmarks(
                previousDisplayLandmarksRef,
                landmarks,
                transform,
                containerWidth,
              );
              const outer = getPointsForIndices(LIP_OUTER, displayMap);
              const inner = getPointsForIndices(LIP_INNER, displayMap);

              if (outer.length > 2) {
                drawLipstick(
                  ctx,
                  outer,
                  inner,
                  lipstickColorRef.current,
                  lipstickOpacityRef.current,
                );
                setFaceDetected(true);
              } else {
                setFaceDetected(false);
                resetSmoothing();
              }
            } else {
              setFaceDetected(false);
              resetSmoothing();
            }
          } else {
            setFaceDetected(false);
            resetSmoothing();
          }
        } catch {}
        ctx.restore();
        animationId = requestAnimationFrame(detect);
      };

      void detect();
      return () => cancelAnimationFrame(animationId);
    };

    const bootstrap = async () => {
      await setupCamera();
      await loadModel();
      stopLoop = startDetectionLoop();
    };

    void bootstrap();

    return () => {
      isMounted = false;
      stopLoop();
      const stream = activeVideo?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [isMobile, lipstickColorRef, lipstickOpacityRef]);

  return {
    wrapperRef,
    videoRef,
    canvasRef,
    cameraReady,
    isModelLoaded,
    faceDetected,
    modelRuntime,
    error,
    isLoading,
  };
}
