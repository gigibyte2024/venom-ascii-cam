import AsciiStudio from "@/components/AsciiStudio";
import baddieHero from "@/assets/baddie-hero.jpg";
import { Link } from "react-router-dom";
import { Sparkles, Camera } from "lucide-react";

const Studio = () => {
  return (
    <>
      <section className="relative border-b border-primary/20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${baddieHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, hsl(320 40% 3% / 0.95) 0%, hsl(320 40% 3% / 0.7) 50%, hsl(320 40% 3% / 0.4) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative container py-12 md:py-16 animate-fade-in">
          <p className="label-tag neon-text-pink">CHANNEL 01</p>
          <h1 className="font-display text-3xl md:text-5xl tracking-[0.12em] mt-2 max-w-3xl">
            <span className="neon-text-bone">LIVE </span>
            <span className="baddie-gradient-text shimmer-text">ASCII</span>
            <span className="neon-text-bone"> STUDIO</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Plug in your camera, drop in a photo, and watch yourself rendered in glowing pink glyphs.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="#studio"
              className="px-4 py-2 text-xs tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow inline-flex items-center"
            >
              <Camera className="h-4 w-4 mr-2" /> START SHOOTING
            </a>
            <Link
              to="/presets"
              className="px-4 py-2 text-xs tracking-[0.2em] border border-secondary/60 text-secondary hover:bg-secondary/10 inline-flex items-center"
            >
              <Sparkles className="h-4 w-4 mr-2" /> BROWSE PRESETS
            </Link>
          </div>
        </div>
      </section>
      <div id="studio">
        <AsciiStudio />
      </div>
    </>
  );
};

export default Studio;
