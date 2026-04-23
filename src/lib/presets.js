// Tint colors map to CSS variables defined in index.css.
export const TINT_HSL = {
  pink: "var(--neon-pink)",
  magenta: "var(--neon-magenta)",
  purple: "var(--neon-purple)",
  blue: "var(--neon-blue)",
  blood: "var(--neon-blood)",
  bone: "var(--neon-bone)",
};

export const PRESETS = [
  {
    id: "baddie",
    name: "Baddie",
    tagline: "Hot pink, sharp edges, all eyes on you.",
    options: { width: 150, brightness: 8, contrast: 40, invert: false, charSetName: "Standard" },
    tint: "pink",
    glow: true,
  },
  {
    id: "venom",
    name: "Venom",
    tagline: "Toxic magenta drip with deep blacks.",
    options: { width: 130, brightness: 0, contrast: 55, invert: false, charSetName: "Detailed" },
    tint: "magenta",
    glow: true,
  },
  {
    id: "noir",
    name: "Noir Goddess",
    tagline: "Bone-white glyphs over pure void.",
    options: { width: 140, brightness: -5, contrast: 45, invert: false, charSetName: "Standard" },
    tint: "bone",
    glow: false,
  },
  {
    id: "xray",
    name: "X-Ray",
    tagline: "Inverted brightness — bones in the light.",
    options: { width: 130, brightness: 0, contrast: 30, invert: true, charSetName: "Detailed" },
    tint: "blue",
    glow: true,
  },
  {
    id: "blockprint",
    name: "Block Print",
    tagline: "Dense unicode blocks, posterized.",
    options: { width: 100, brightness: 0, contrast: 40, invert: false, charSetName: "Blocks" },
    tint: "purple",
    glow: false,
  },
  {
    id: "binary",
    name: "Binary Ghost",
    tagline: "Ones and zeros only. Minimalist.",
    options: { width: 120, brightness: 0, contrast: 60, invert: false, charSetName: "Binary" },
    tint: "pink",
    glow: true,
  },
];
