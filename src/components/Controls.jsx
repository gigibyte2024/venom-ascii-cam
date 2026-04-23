import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CHAR_SETS } from "@/lib/ascii";
import { TINT_HSL } from "@/lib/presets";

// A simple labeled slider built with a native <input type="range">.
function Slider({ label, value, min, max, step = 1, onChange, suffix }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="label-tag">{label}</span>
        <span className="text-[10px] text-primary tracking-widest">{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

// A simple toggle switch using a native checkbox styled as a pill.
function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="label-tag">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 border border-primary/40 relative transition ${
          checked ? "bg-primary/40" : "bg-muted"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 h-3.5 w-3.5 bg-primary transition-all ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

// Controls: all the knobs the user can tweak. Pure presentation —
// the parent owns the state and tells us how to update it.
export default function Controls({
  charSetName, setCharSetName,
  width, setWidth,
  brightness, setBrightness,
  contrast, setContrast,
  invert, setInvert,
  glow, setGlow,
  tint, setTint,
}) {
  const navigate = useNavigate();
  const tintColors = Object.keys(TINT_HSL);

  return (
    <div className="panel panel-purple corners p-4 space-y-5 hover-lift">
      <span className="c-bl" /><span className="c-br" />

      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm tracking-[0.3em] neon-text-pink">CONTROLS</h2>
        <button
          onClick={() => navigate("/presets")}
          className="text-xs h-7 px-2 text-muted-foreground hover:text-primary flex items-center"
        >
          <Sparkles className="h-3 w-3 mr-1" /> Presets
        </button>
      </div>

      <div className="space-y-2">
        <span className="label-tag">Character Ramp</span>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(CHAR_SETS).map((name) => (
            <button
              key={name}
              onClick={() => setCharSetName(name)}
              className={`text-[11px] py-2 px-2 border tracking-widest transition ${
                charSetName === name
                  ? "border-primary text-primary bg-primary/10 shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <Slider label="Density"    value={width}      min={40}   max={240} step={2} onChange={setWidth}      suffix={`${width}c`} />
      <Slider label="Brightness" value={brightness} min={-100} max={100}          onChange={setBrightness} suffix={`${brightness}`} />
      <Slider label="Contrast"   value={contrast}   min={-100} max={100}          onChange={setContrast}   suffix={`${contrast}`} />

      <Toggle label="Invert"    checked={invert} onChange={setInvert} />
      <Toggle label="Neon Glow" checked={glow}   onChange={setGlow} />

      <div className="space-y-2">
        <span className="label-tag">Tint</span>
        <div className="flex gap-2 flex-wrap">
          {tintColors.map((c) => (
            <button
              key={c}
              onClick={() => setTint(c)}
              aria-label={`Tint ${c}`}
              className={`h-8 w-8 border-2 transition ${tint === c ? "scale-110" : "opacity-70 hover:opacity-100"}`}
              style={{
                backgroundColor: `hsl(${TINT_HSL[c]})`,
                borderColor: tint === c ? `hsl(${TINT_HSL[c]})` : "transparent",
                boxShadow: tint === c ? `0 0 14px hsl(${TINT_HSL[c]} / 0.8)` : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
