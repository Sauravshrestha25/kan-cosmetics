import type { MutableRefObject } from "react";
import { LIP_INDICES, LIP_SMOOTHING_ALPHA, MIRROR_DISPLAY } from "./constants";

type Point = [number, number, number?];
type DisplayPoint = [number, number];

export function computeCoverTransform(
  video: HTMLVideoElement,
  containerWidth: number,
  containerHeight: number,
) {
  if (!video || !containerWidth || !containerHeight) return null;
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;
  if (!videoWidth || !videoHeight) return null;

  const scale = Math.max(
    containerWidth / videoWidth,
    containerHeight / videoHeight,
  );
  const drawnWidth = videoWidth * scale;
  const drawnHeight = videoHeight * scale;
  const offsetX = (containerWidth - drawnWidth) / 2;
  const offsetY = (containerHeight - drawnHeight) / 2;

  return { offsetX, offsetY, scale };
}

export function mapPointToDisplay(
  point: Point,
  transform: { offsetX: number; offsetY: number; scale: number },
  containerWidth: number,
  mirror: boolean,
): DisplayPoint {
  const x = point[0] * transform.scale + transform.offsetX;
  const y = point[1] * transform.scale + transform.offsetY;
  return mirror ? [containerWidth - x, y] : [x, y];
}

export function buildSmoothedDisplayLandmarks(
  prevRef: MutableRefObject<Record<number, DisplayPoint> | null>,
  landmarks: Point[],
  transform: { offsetX: number; offsetY: number; scale: number },
  containerWidth: number,
) {
  const previous = prevRef.current || {};
  const smoothed: Record<number, DisplayPoint> = {};

  LIP_INDICES.forEach((index) => {
    const raw = landmarks[index];
    if (!raw) return;
    const mapped = mapPointToDisplay(
      raw,
      transform,
      containerWidth,
      MIRROR_DISPLAY,
    );
    const prevPoint = previous[index];

    smoothed[index] = prevPoint
      ? [
          LIP_SMOOTHING_ALPHA * mapped[0] +
            (1 - LIP_SMOOTHING_ALPHA) * prevPoint[0],
          LIP_SMOOTHING_ALPHA * mapped[1] +
            (1 - LIP_SMOOTHING_ALPHA) * prevPoint[1],
        ]
      : mapped;
  });

  prevRef.current = smoothed;
  return smoothed;
}

export function getPointsForIndices(
  indices: number[],
  displayMap: Record<number, DisplayPoint> | null,
) {
  if (!displayMap) return [] as DisplayPoint[];
  return indices
    .map((idx) => displayMap[idx])
    .filter((entry): entry is DisplayPoint => Boolean(entry));
}

export function toPoints(prediction: {
  scaledMesh?: Point[];
  keypoints?: { x: number; y: number; z?: number }[];
}) {
  if (prediction.scaledMesh) return prediction.scaledMesh;
  if (prediction.keypoints) {
    return prediction.keypoints.map((kp) => [kp.x, kp.y, kp.z ?? 0] as Point);
  }
  return null;
}

export function drawSmoothClosedPath(
  ctx: CanvasRenderingContext2D,
  points: DisplayPoint[],
) {
  if (points.length < 2) return;

  const len = points.length;
  ctx.moveTo(points[0][0], points[0][1]);

  for (let i = 0; i < len; i += 1) {
    const p0 = points[(i - 1 + len) % len];
    const p1 = points[i];
    const p2 = points[(i + 1) % len];
    const p3 = points[(i + 2) % len];

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2[0], p2[1]);
  }

  ctx.closePath();
}

export function drawLipstick(
  ctx: CanvasRenderingContext2D,
  outerPoints: DisplayPoint[],
  innerPoints: DisplayPoint[],
  color: string,
  opacity: number,
) {
  if (outerPoints.length < 3) return;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  drawSmoothClosedPath(ctx, outerPoints);
  if (innerPoints.length > 2) {
    drawSmoothClosedPath(ctx, [...innerPoints].reverse());
  }
  ctx.fill("evenodd");

  ctx.filter = "none";
  ctx.strokeStyle = "rgba(0,0,0,0.30)";
  ctx.lineWidth = 0.2;
  ctx.beginPath();
  drawSmoothClosedPath(ctx, outerPoints);
  ctx.stroke();
  ctx.restore();
}
