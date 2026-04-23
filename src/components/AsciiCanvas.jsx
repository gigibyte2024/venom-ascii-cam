import { useEffect, useRef } from "react";
import { CHAR_SETS, imageToAscii } from "@/lib/ascii";
import { TINT_HSL } from "@/lib/presets";

// AsciiCanvas: takes a video element OR an image element and draws the
// resulting ASCII art into a <pre> tag.
//
// HOW THE CANVAS WORKS:
//   1. We draw the current video frame (or uploaded image) onto a hidden
//      <canvas>. The canvas can give us the raw pixel data with getImageData.
//   2. We hand those pixels to imageToAscii (see src/lib/ascii.js).
//   3. The returned string is set as the text content of a <pre> element.
//
// We re-render about 22 times per second when reading from the camera using
// requestAnimationFrame.
export default function AsciiCanvas({
  videoRef,
  imageEl,
  mode,
  options,
  tint,
  glow,
  preRef,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pre = preRef.current;
    if (!canvas || !pre) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const charSet = CHAR_SETS[options.charSetName] || CHAR_SETS.Standard;
    const asciiOpts = {
      charSet,
      width: options.width,
      brightness: options.brightness,
      contrast: options.contrast,
      invert: options.invert,
    };

    let rafId = 0;
    let lastTime = 0;
    const frameInterval = 1000 / 22; // ~22 FPS

    function drawFrame() {
      // Decide what we're drawing from: the live video or the uploaded image.
      let src = null;
      let srcW = 0;
      let srcH = 0;
      let mirror = false;

      if (mode === "camera") {
        const v = videoRef.current;
        if (!v || v.readyState < 2 || !v.videoWidth) return;
        src = v;
        srcW = v.videoWidth;
        srcH = v.videoHeight;
        mirror = true; // mirror the webcam like a selfie cam
      } else {
        if (!imageEl || !imageEl.complete || !imageEl.naturalWidth) return;
        src = imageEl;
        srcW = imageEl.naturalWidth;
        srcH = imageEl.naturalHeight;
      }

      // Downscale: we don't need the full resolution to make ASCII art.
      const targetW = Math.min(srcW, options.width * 2);
      const targetH = Math.round((targetW / srcW) * srcH);
      canvas.width = targetW;
      canvas.height = targetH;

      if (mirror) {
        ctx.save();
        ctx.translate(targetW, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(src, 0, 0, targetW, targetH);
        ctx.restore();
      } else {
        ctx.drawImage(src, 0, 0, targetW, targetH);
      }

      // Read raw pixels and convert to ASCII text.
      const pixels = ctx.getImageData(0, 0, targetW, targetH);
      pre.textContent = imageToAscii(pixels, asciiOpts);
    }

    function loop(time) {
      rafId = requestAnimationFrame(loop);
      if (time - lastTime < frameInterval) return;
      lastTime = time;
      drawFrame();
    }

    if (mode === "camera") {
      rafId = requestAnimationFrame(loop);
    } else {
      // For uploaded images we only need to render once when something changes.
      drawFrame();
    }

    return () => cancelAnimationFrame(rafId);
  }, [mode, videoRef, imageEl, options, preRef]);

  return (
    <>
      <div className="relative w-full overflow-auto bg-black/90 p-3 scanlines neon-border-pink" style={{ maxHeight: "70vh" }}>
        <pre
          ref={preRef}
          aria-label="ASCII art output"
          className="font-mono leading-[1] whitespace-pre"
          style={{
            fontSize: "8px",
            color: `hsl(${TINT_HSL[tint]})`,
            textShadow: glow
              ? `0 0 6px hsl(${TINT_HSL[tint]} / 0.9), 0 0 14px hsl(${TINT_HSL[tint]} / 0.45)`
              : "none",
            margin: 0,
          }}
        />
      </div>
      {/* Hidden canvas: used only to read pixel data, never shown to the user. */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
