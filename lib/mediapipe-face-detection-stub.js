/**
 * Stub for @mediapipe/face_detection.
 *
 * The real package is an IIFE script with no ES module exports, which breaks
 * Turbopack's static analysis. When using runtime: "mediapipe" with
 * @tensorflow-models/face-landmarks-detection, the mediapipe solution is
 * loaded from CDN (solutionPath), not from this npm package. The tfjs runtime
 * fallback doesn't use FaceDetection from this package either.
 *
 * This stub satisfies the static `import { FaceDetection }` in the
 * @tensorflow-models/face-detection ESM bundle.
 */
export class FaceDetection {
  constructor() {}
  setOptions() {}
  onResults() {}
  send() {}
  close() {}
}

export default { FaceDetection };
