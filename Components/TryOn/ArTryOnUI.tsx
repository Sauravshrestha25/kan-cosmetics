"use client";

import type { RefObject } from "react";
import { Camera, LoaderCircle, ScanFace, Sparkles } from "lucide-react";
import {
  PRESET_LIPSTICKS,
  type PresetLipstick,
  type PresetLipstickId,
} from "./constants";

type ArTryOnUIProps = {
  wrapperRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  isMobile: boolean;
  error: string | null;
  cameraReady: boolean;
  isModelLoaded: boolean;
  faceDetected: boolean;
  modelRuntime: string;
  isLoading: boolean;
  selectedShade: PresetLipstickId;
  lipstickOpacity: number;
  onShadeClick: (shade: PresetLipstick) => void;
  onOpacityChange: (value: number) => void;
};

const statusItems = (
  cameraReady: boolean,
  isModelLoaded: boolean,
  faceDetected: boolean,
  modelRuntime: string,
) => [
  {
    label: cameraReady ? "Camera ready" : "Waiting for camera",
    active: cameraReady,
  },
  {
    label: isModelLoaded ? "Model ready" : "Loading model",
    active: isModelLoaded,
  },
  {
    label: faceDetected ? "Face detected" : "No face detected",
    active: faceDetected,
  },
  { label: `Runtime: ${modelRuntime}`, active: isModelLoaded },
];

export default function ArTryOnUI({
  wrapperRef,
  videoRef,
  canvasRef,
  isMobile,
  error,
  cameraReady,
  isModelLoaded,
  faceDetected,
  modelRuntime,
  isLoading,
  selectedShade,
  lipstickOpacity,
  onShadeClick,
  onOpacityChange,
}: ArTryOnUIProps) {
  return (
    <div className="mx-auto max-w-375 px-4 sm:px-6 lg:px-10">
      {error ? (
        <div className="mb-6 border border-[#f0c7c7] bg-[#fff5f5] px-4 py-3 font-matter text-sm text-[#b42318]">
          {error}
        </div>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.18fr)_minmax(18rem,0.82fr)] lg:items-start">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {statusItems(
              cameraReady,
              isModelLoaded,
              faceDetected,
              modelRuntime,
            ).map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 border border-[#e4e7ef] bg-white px-3 py-2 font-matter text-sm text-[#4f5c73]"
              >
                <span
                  className={[
                    "h-2.5 w-2.5",
                    item.active ? "bg-[#4ade80]" : "bg-[#b5bfce]",
                  ].join(" ")}
                />
                {item.label}
              </div>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div
              ref={wrapperRef}
              className="relative min-h-116 overflow-hidden border border-[#dce1ea] bg-black md:min-h-144"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="block h-full w-full scale-x-[-1] object-cover"
                style={{ visibility: isLoading ? "hidden" : "visible" }}
              />
              <canvas
                ref={canvasRef}
                className="pointer-events-none absolute left-0 top-0 h-full w-full"
                style={{ visibility: isLoading ? "hidden" : "visible" }}
              />

              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0f172af2]">
                  <div className="flex flex-col items-center gap-4 text-white">
                    <LoaderCircle className="h-10 w-10 animate-spin" />
                    <p className="font-matter text-sm uppercase tracking-[0.18em]">
                      Preparing try-on
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {!isMobile ? (
              <div className="overflow-hidden border border-[#dce1ea] bg-[#f2ece2]">
                <div
                  className="h-full min-h-116 bg-cover bg-center p-4 md:min-h-144"
                  style={{ backgroundImage: "url('/images/try-on-wood.png')" }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage: "url('/images/try-on-model.jpeg')",
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-8 border border-[#dce1ea] bg-[#fcfcfd] p-6 sm:p-8">
          <div>
            <p className="font-matter text-sm uppercase tracking-[0.22em] text-[#8b92a3]">
              Lipstick Try-On
            </p>
            <h1 className="mt-3 font-matter text-[clamp(2.2rem,4vw,3.4rem)] font-semibold tracking-[-0.05em] text-[#141c35]">
              Try shades live on camera
            </h1>
            <p className="mt-4 font-matter text-[1rem] leading-8 text-[#5f6f86]">
              Select a lipstick shade and adjust opacity while the model tracks
              your face in real time.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[#1d2c63]" />
              <h2 className="font-matter text-xl font-semibold text-[#141c35]">
                Preset shades
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {PRESET_LIPSTICKS.map((shade) => (
                <button
                  key={shade.id}
                  type="button"
                  onClick={() => onShadeClick(shade)}
                  disabled={isLoading}
                  title={shade.name}
                  className={[
                    "group flex h-12 w-12 items-center justify-center border transition-transform",
                    selectedShade === shade.id
                      ? "border-[#141c35] scale-105"
                      : "border-transparent hover:scale-105",
                  ].join(" ")}
                  style={{ backgroundColor: shade.hex }}
                >
                  <span className="sr-only">{shade.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ScanFace className="h-5 w-5 text-[#1d2c63]" />
              <h2 className="font-matter text-xl font-semibold text-[#141c35]">
                Lip opacity
              </h2>
            </div>

            <div className="space-y-3">
              <input
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={lipstickOpacity}
                onChange={(event) =>
                  onOpacityChange(Number(event.target.value))
                }
                className="w-full accent-[#1d2c63]"
              />
              <div className="flex justify-between font-matter text-sm text-[#7a889d]">
                <span>Soft</span>
                <span>{Math.round(lipstickOpacity * 100)}%</span>
                <span>Bold</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e4e7ef] pt-6">
            <div className="flex items-center gap-3">
              <Camera className="h-5 w-5 text-[#1d2c63]" />
              <p className="font-matter text-sm leading-7 text-[#5f6f86]">
                Use good front lighting and keep your face centered for the most
                accurate lipstick overlay.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
