import { useNavigate } from "react-router-dom";
import { PRESETS, TINT_HSL } from "@/lib/presets";
import { Sparkles } from "lucide-react";
import baddieTexture from "@/assets/baddie-texture.jpg";

const Presets = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative border-b border-primary/20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${baddieTexture})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-background/70" aria-hidden="true" />
        <div className="relative container py-10 animate-fade-in">
          <p className="label-tag neon-text-pink">CHANNEL 02</p>
          <h1 className="font-display text-3xl md:text-4xl tracking-[0.12em] mt-2">
            <span className="neon-text-bone">SIGNATURE </span>
            <span className="baddie-gradient-text">PRESETS</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl">
            Pre-tuned looks for every mood. Tap one — the studio loads instantly with the full vibe dialled in.
          </p>
        </div>
      </section>

      <div className="container py-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {PRESETS.map((p, i) => (
          <article
            key={p.id}
            className="panel corners p-5 flex flex-col group cursor-pointer hover-lift animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
            onClick={() => navigate(`/?preset=${p.id}`)}
          >
            <span className="c-bl" /><span className="c-br" />
            <div
              className="text-[10px] leading-[1] whitespace-pre font-mono p-3 bg-black/80 mb-4 overflow-hidden h-32 scanlines relative"
              style={{
                color: `hsl(${TINT_HSL[p.tint]})`,
                textShadow: p.glow ? `0 0 6px hsl(${TINT_HSL[p.tint]} / 0.8)` : "none",
              }}
            >
              {previewArt(p.id)}
            </div>
            <h3 className="font-display tracking-[0.18em] text-xl neon-text-bone group-hover:neon-text-pink transition-colors">
              {p.name.toUpperCase()}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4 flex-1">{p.tagline}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <Tag>{p.options.charSetName}</Tag>
                <Tag>{p.options.width}c</Tag>
                {p.options.invert && <Tag>INV</Tag>}
              </div>
              <span className="px-3 py-1.5 text-[11px] tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center">
                <Sparkles className="h-3 w-3 mr-1" /> APPLY
              </span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

const Tag = ({ children }) => (
  <span className="text-[9px] tracking-widest border border-primary/40 text-primary px-1.5 py-0.5">{children}</span>
);

function previewArt(id) {
  const samples = {
    baddie:
`     .:-=++**##%%@@%%##**+=-:.
   :+#%@@@@@@@@@@@@@@@@@@@@@%#+:
  =%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%=
 *@@@@@@@*-       BADDIE      -*@@@*
*@@@@@@-                        -@@@*
=@@@@%-     ♥   pretty   ♥      -%@@=
 *@@@@%+-                    -+%@@@@*
   =%@@@@@@%#*++====++*#%@@@@@@@@%=`,
    venom:
`░▒▓██████████████████████████▓▒░
▓████ V E N O M   D R I P ████▓
░▒▓██████████████████████████▓▒░
   ░░▒▓ toxic ▓▒░░ baddie ░░
░▒▓██████████████████████████▓▒░`,
    noir:
`        ::---===++++===---::
      :+#%@@@@@@@@@@@@@@%#+:
    :*%@@@@@@@@@@@@@@@@@@@@%*:
   :%@@@@@@%-  N O I R  -%@@@@@%:
   +@@@@@@@-  goddess.   -@@@@@@@+
    +%@@@@@@%*+-----+*%@@@@@@%+`,
    xray:
`     ░░░▒▒▓▓██▓▓▒▒░░░
   ░▒▓██████████████▓▒░
  ░▓████  X-RAY   ████▓░
  ░▓████   MODE   ████▓░
   ░▒▓██████████████▓▒░
     ░░░▒▒▓▓██▓▓▒▒░░░`,
    blockprint:
`██████████████████████
████░░░░░░░░░░░░░░████
██░░▒▒▓▓████▓▓▒▒░░░░██
██░░▓▓██████████▓▓░░██
██░░▒▒▓▓████▓▓▒▒░░░░██
████░░░░░░░░░░░░░░████`,
    binary:
`01010110 01000101 01001110
01001111 01001101 00100000
01000011 01000001 01001101
00100000 00101111 00101111
01100010 01100001 01100100
01100100 01101001 01100101`,
  };
  return samples[id] || "";
}

export default Presets;
