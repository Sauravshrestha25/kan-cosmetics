"use client";

import { useEffect, useRef, useState } from "react";
import ArTryOnUI from "./ArTryOnUI";
import { PRESET_LIPSTICKS } from "./constants";
import useArLipstickTryOn from "./useArLipstickTryOn";

export default function ArTryOnPage() {
  const [lipstickColor, setLipstickColor] = useState(PRESET_LIPSTICKS[0].hex);
  const [lipstickOpacity, setLipstickOpacity] = useState(0.4);
  const [selectedShade, setSelectedShade] = useState(PRESET_LIPSTICKS[0].id);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  const lipstickColorRef = useRef(PRESET_LIPSTICKS[0].hex);
  const lipstickOpacityRef = useRef(0.4);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    lipstickColorRef.current = lipstickColor;
    lipstickOpacityRef.current = lipstickOpacity;
  }, [lipstickColor, lipstickOpacity]);

  const {
    wrapperRef,
    videoRef,
    canvasRef,
    cameraReady,
    isModelLoaded,
    faceDetected,
    modelRuntime,
    error,
    isLoading,
  } = useArLipstickTryOn({
    isMobile,
    lipstickColorRef,
    lipstickOpacityRef,
  });

  return (
    <ArTryOnUI
      wrapperRef={wrapperRef}
      videoRef={videoRef}
      canvasRef={canvasRef}
      isMobile={isMobile}
      error={error}
      cameraReady={cameraReady}
      isModelLoaded={isModelLoaded}
      faceDetected={faceDetected}
      modelRuntime={modelRuntime}
      isLoading={isLoading}
      selectedShade={selectedShade}
      lipstickOpacity={lipstickOpacity}
      onShadeClick={(shade) => {
        if (isLoading) return;
        setSelectedShade(shade.id);
        setLipstickColor(shade.hex);
      }}
      onOpacityChange={setLipstickOpacity}
    />
  );
}
