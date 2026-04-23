import { Heart, Eye, Cpu, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import baddiePortrait from "@/assets/baddie-portrait.jpg";

const About = () => {
  return (
    <>
      <section className="border-b border-primary/20 bg-background/40">
        <div className="container py-8 animate-fade-in">
          <p className="label-tag neon-text-pink">CHANNEL 03</p>
          <h1 className="font-display text-3xl md:text-4xl tracking-[0.12em] mt-2">
            <span className="neon-text-bone">THE </span>
            <span className="baddie-gradient-text shimmer-text">MANIFESTO</span>
          </h1>
        </div>
      </section>

      <div className="container py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article className="panel corners p-6 lg:col-span-2 space-y-4 animate-slide-in-left hover-lift">
          <span className="c-bl" /><span className="c-br" />
          <Heart className="h-10 w-10 neon-text-pink animate-flicker fill-current" strokeWidth={1.2} />
          <p className="font-display tracking-[0.15em] text-xl neon-text-bone">FLESH IS A FREQUENCY.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            VENOM CAM strips light down to glyphs. A face becomes a mosaic of characters.
            A bedroom becomes a stage of zeros and ones. We do not augment reality —
            we <span className="neon-text-pink">remix</span> it.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every frame is sampled by an HTML5 canvas, reduced to luminance, and mapped to a glyph ramp.
            Brightness becomes geometry. Geometry becomes a portrait of the baddie staring back.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            No servers. No tracking. No accounts. Just the raw bones of the web —
            <span className="neon-text-purple"> HTML, CSS, JavaScript</span> — and your camera, your rules.
          </p>
          <div className="pt-4 flex flex-wrap gap-2">
            <Link
              to="/"
              className="px-4 py-2 text-xs tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow inline-flex items-center"
            >
              ENTER STUDIO
            </Link>
            <Link
              to="/presets"
              className="px-4 py-2 text-xs tracking-[0.2em] border border-secondary/60 text-secondary hover:bg-secondary/10 inline-flex items-center"
            >
              BROWSE PRESETS
            </Link>
          </div>
        </article>

        <aside className="space-y-4">
          <div className="panel corners overflow-hidden hover-lift animate-fade-in" style={{ animationDelay: "100ms" }}>
            <span className="c-bl" /><span className="c-br" />
            <img
              src={baddiePortrait}
              alt="Baddie portrait in pink and black"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full h-64 object-cover"
            />
          </div>
          <Spec icon={Eye}   title="getUserMedia"  body="Live webcam frames acquired in-browser via the MediaDevices API." color="pink" />
          <Spec icon={Cpu}   title="Canvas Sampling" body="Frames downscaled and read pixel-by-pixel for luminance." color="purple" />
          <Spec icon={Code2} title="Pure Frontend"   body="No backend. Your image never leaves your device." color="blue" />
        </aside>
      </div>
    </>
  );
};

const Spec = ({ icon: Icon, title, body, color }) => {
  const cls = color === "pink" ? "neon-text-pink" : color === "purple" ? "neon-text-purple" : "neon-text-blue";
  return (
    <div className="panel corners p-4 hover-lift">
      <span className="c-bl" /><span className="c-br" />
      <Icon className={`h-5 w-5 mb-2 ${cls}`} />
      <p className={`font-display tracking-[0.18em] text-sm ${cls}`}>{title.toUpperCase()}</p>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{body}</p>
    </div>
  );
};

export default About;
