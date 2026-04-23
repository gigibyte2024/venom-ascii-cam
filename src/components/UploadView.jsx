import { Upload } from "lucide-react";

// UploadView: lets the user pick an image file (or drop one in).
// When an image is loaded, we pass the HTMLImageElement back via `onImage`.
export default function UploadView({ imageSrc, onImage }) {
  function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) return;

    // Create a temporary URL pointing to the file in browser memory.
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => onImage(img, url);
    img.src = url;
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <label>
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => handleFile(e.target.files && e.target.files[0])}
          />
          <span className="px-3 py-2 text-xs tracking-[0.2em] border border-secondary/60 text-secondary hover:bg-secondary/10 cursor-pointer inline-flex items-center">
            <Upload className="h-4 w-4 mr-2" /> CHOOSE FILE
          </span>
        </label>
      </div>

      <div
        className="relative aspect-video w-full overflow-hidden neon-border-purple bg-black flex items-center justify-center scanlines crt-vignette"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files && e.dataTransfer.files[0]);
        }}
      >
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded source" className="max-h-full max-w-full object-contain" />
        ) : (
          <div className="text-center p-6">
            <Upload className="h-12 w-12 neon-text-purple mx-auto mb-3 animate-float" />
            <p className="text-sm text-muted-foreground">Drop a JPG or PNG here, or use CHOOSE FILE.</p>
          </div>
        )}
      </div>
    </div>
  );
}
