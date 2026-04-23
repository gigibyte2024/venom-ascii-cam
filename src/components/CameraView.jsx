import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Power } from "lucide-react";

// CameraView: handles webcam access using the browser's getUserMedia API.
// It exposes the underlying <video> element to the parent through `videoRef`
// so the ASCII renderer can read frames from it.
export default function CameraView({ videoRef }) {
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const localRef = useRef(null);

  // Use the parent's ref if provided, otherwise fall back to a local one.
  const ref = videoRef || localRef;

  async function startCamera() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: false,
      });
      if (ref.current) {
        ref.current.srcObject = stream;
        await ref.current.play();
      }
      setStreaming(true);
    } catch (err) {
      setError(err.message || "Unable to access camera");
    }
  }

  function stopCamera() {
    const v = ref.current;
    const stream = v && v.srcObject;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    if (v) v.srcObject = null;
    setStreaming(false);
  }

  // Stop the camera when this component is removed from the page.
  useEffect(() => {
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        {streaming ? (
          <button
            onClick={stopCamera}
            className="px-3 py-2 text-xs tracking-[0.2em] border border-destructive/60 text-destructive hover:bg-destructive/10 flex items-center"
          >
            <CameraOff className="h-4 w-4 mr-2" /> STOP
          </button>
        ) : (
          <button
            onClick={startCamera}
            className="px-3 py-2 text-xs tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow flex items-center"
          >
            <Power className="h-4 w-4 mr-2" /> GO LIVE
          </button>
        )}
      </div>

      <div className="relative aspect-video w-full overflow-hidden neon-border-pink bg-black scanlines crt-vignette scan-sweep">
        <video ref={ref} className="h-full w-full object-cover scale-x-[-1]" muted playsInline />
        {!streaming && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <Camera className="h-12 w-12 neon-text-pink mb-3 animate-float" />
            <p className="text-sm text-muted-foreground max-w-xs">
              {error || "Tap GO LIVE to start streaming. Smile, baddie."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
