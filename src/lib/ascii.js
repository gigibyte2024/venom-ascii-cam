// Character ramps: dark -> light. The first char represents dark pixels,
// the last char represents bright pixels.
export const CHAR_SETS = {
  Standard: "@%#*+=-:. ",
  Detailed: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  Blocks: "█▓▒░ ",
  Binary: "10 ",
  Glyph: "✦✧♡♥◆◇○●·. ",
};

// Convert an ImageData object (raw pixels from a canvas) into ASCII text.
// Step-by-step:
//   1. Decide how many columns/rows of characters we want.
//   2. For each cell, average the brightness of the pixels inside it.
//   3. Apply brightness/contrast adjustments.
//   4. Pick a character from the ramp based on brightness.
export function imageToAscii(img, opts) {
  const { charSet, width, brightness, contrast, invert } = opts;

  // Each character on screen is taller than it is wide, so we squash vertically.
  const charAspect = 0.5;
  const cols = Math.max(20, Math.min(width, img.width));
  const cellW = img.width / cols;
  const cellH = cellW / charAspect;
  const rows = Math.max(1, Math.floor(img.height / cellH));

  const data = img.data; // [r, g, b, a, r, g, b, a, ...]
  const w = img.width;
  const lastChar = charSet.length - 1;

  // Contrast curve constant (classic formula).
  const cf = (259 * (contrast + 255)) / (255 * (259 - contrast));
  const bAdj = brightness * 2.55;

  let out = "";

  for (let r = 0; r < rows; r++) {
    const y0 = Math.floor(r * cellH);
    const y1 = Math.min(img.height, Math.floor((r + 1) * cellH));

    for (let c = 0; c < cols; c++) {
      const x0 = Math.floor(c * cellW);
      const x1 = Math.min(w, Math.floor((c + 1) * cellW));

      // Step 1+2: average grayscale brightness across the cell.
      let sum = 0;
      let count = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * w + x) * 4;
          // Standard luminance formula (eyes are more sensitive to green).
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          sum += gray;
          count++;
        }
      }
      let v = count ? sum / count : 0;

      // Step 3: apply brightness + contrast.
      v = cf * (v + bAdj - 128) + 128;
      if (v < 0) v = 0;
      if (v > 255) v = 255;

      // Step 4: map brightness to a character.
      let t = v / 255;
      if (invert) t = 1 - t;
      out += charSet[Math.round(t * lastChar)];
    }
    out += "\n";
  }

  return out;
}
