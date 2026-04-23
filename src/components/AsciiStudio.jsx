import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Camera, Upload, Download } from "lucide-react";
import CameraView from "./CameraView";
import UploadView from "./UploadView";
import AsciiCanvas from "./AsciiCanvas";
import Controls from "./Controls";
import { PRESETS, TINT_HSL } from "@/lib/presets";

// Plain hex versions of the tint colors (used when drawing the export PNG).
const TINT_HEX = {
  pink: "#ff1f8f",
  magenta: "#ff19b8",
  purple: "#c84dff",
  blue: "#33d4ff",
  blood: "#ff1a3c",
  bone: "#f1e9d6",
};

// AsciiStudio is the main page. It holds the user's settings and wires the
// camera/upload sources to the ASCII renderer and the controls panel.
export default function AsciiStudio() {
  const videoRef = useRef(null);
  const preRef = useRef(null);
  const imageElRef = useRef(null);

  const [mode, setMode] = useState("camera");
  const [imageSrc, setImageSrc] = useState(null);
  const [imageEl, setImageEl] = useState(null);

  // ASCII settings.
  const [charSetName, setCharSetName] = useState("Standard");
  const [width, setWidth] = useState(150);
  const [brightness, setBrightness] = useState(8);
  const [contrast, setContrast] = useState(40);
  const [invert, setInvert] = useState(false);
  const [tint, setTint] = useState("pink");
  const [glow, setGlow] = useState(true);

  const options = { charSetName, width, brightness, contrast, invert };

  // If the URL has ?preset=<id>, load that preset on mount.
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const id = searchParams.get("preset");
    if (!id) return;
    const p = PRESETS.find((x) => x.id === id);
    if (p) {
      setCharSetName(p.options.charSetName);
      setWidth(p.options.width);
      setBrightness(p.options.brightness);
      setContrast(p.options.contrast);
      setInvert(p.options.invert);
      setTint(p.tint);
      setGlow(p.glow);
    }
    searchParams.delete("preset");
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  function handleImage(img, url) {
    imageElRef.current = img;
    setImageEl(img);
    setImageSrc(url);
    setMode("upload");
  }

  // Render the current ASCII text into a PNG file and trigger a download.
  function saveAsPng() {
    const pre = preRef.current;
    if (!pre || !pre.textContent) return;

    const text = pre.textContent;
    const lines = text.split("\n");
    const fontSize = 14;
    const charWidth = fontSize * 0.6;
    const padding = 32;
    const cols = lines.reduce((m, l) => Math.max(m, l.length), 0);

    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(cols * charWidth) + padding * 2;
    canvas.height = lines.length * fontSize + padding * 2;
    const ctx = canvas.getContext("2d");

    // Background gradient.
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#0a0210");
    grad.addColorStop(1, "#1a0316");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ASCII text with optional neon glow.
    ctx.fillStyle = TINT_HEX[tint];
    ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
    ctx.textBaseline = "top";
    if (glow) {
      ctx.shadowColor = TINT_HEX[tint];
      ctx.shadowBlur = 8;
    }
    lines.forEach((line, i) => ctx.fillText(line, padding, padding + i * fontSize));

    // Watermark.
    ctx.shadowBlur = 0;
    ctx.fillStyle = TINT_HEX[tint] + "aa";
    ctx.font = `bold 11px "Unbounded", sans-serif`;
    ctx.fillText("VENOM CAM", padding, canvas.height - padding + 8);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `venom-cam-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  return (
    <div className="container py-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 animate-fade-in">
      <section className="space-y-6 min-w-0">
        {/* Source: camera or upload. */}
        <div className="panel corners p-4 hover-lift">
          <span className="c-bl" /><span className="c-br" />
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-sm tracking-[0.3em] neon-text-bone">SOURCE FEED</h2>
            <span className="label-tag">[ INPUT CHANNEL ]</span>
          </div>

          <div className="flex gap-2 mb-4 border border-primary/30 w-fit">
            <button
              onClick={() => setMode("camera")}
              className={`px-3 py-2 text-xs tracking-[0.2em] flex items-center ${
                mode === "camera" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <Camera className="h-4 w-4 mr-2" /> CAM
            </button>
            <button
              onClick={() => setMode("upload")}
              className={`px-3 py-2 text-xs tracking-[0.2em] flex items-center ${
                mode === "upload" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
              }`}
            >
              <Upload className="h-4 w-4 mr-2" /> FILE
            </button>
          </div>

          {mode === "camera" ? (
            <CameraView videoRef={videoRef} />
          ) : (
            <UploadView imageSrc={imageSrc} onImage={handleImage} />
          )}
        </div>

        {/* The ASCII output. */}
        <div className="panel corners p-4 hover-lift">
          <span className="c-bl" /><span className="c-br" />
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="font-display text-sm tracking-[0.3em] neon-text-bone">ASCII OUTPUT</h2>
            <button
              onClick={saveAsPng}
              className="px-3 py-2 text-xs tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow flex items-center"
            >
              <Download className="h-4 w-4 mr-2" /> SAVE PNG
            </button>
          </div>

          <AsciiCanvas
            videoRef={videoRef}
            imageEl={imageEl}
            mode={mode}
            options={options}
            tint={tint}
            glow={glow}
            preRef={preRef}
          />
        </div>
      </section>

      <aside className="space-y-4">
        <Controls
          charSetName={charSetName} setCharSetName={setCharSetName}
          width={width} setWidth={setWidth}
          brightness={brightness} setBrightness={setBrightness}
          contrast={contrast} setContrast={setContrast}
          invert={invert} setInvert={setInvert}
          glow={glow} setGlow={setGlow}
          tint={tint} setTint={setTint}
        />

        <div className="panel corners p-4 text-[11px] text-muted-foreground leading-relaxed space-y-2">
          <span className="c-bl" /><span className="c-br" />
          <p className="label-tag neon-text-pink">TIP</p>
          <p>Stand close, light your face from the front, and crank Brightness/Contrast for a sharper look.</p>
        </div>
      </aside>
    </div>
  );
}
