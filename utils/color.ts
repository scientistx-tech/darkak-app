/**
 * Small color helper utilities used by components to pick readable text
 * colors based on a background hex color.
 */

export function hexToRgb(hex: string) {
  const sanitized = hex.replace('#', '').trim();
  if (sanitized.length === 3) {
    const r = parseInt(sanitized[0] + sanitized[0], 16);
    const g = parseInt(sanitized[1] + sanitized[1], 16);
    const b = parseInt(sanitized[2] + sanitized[2], 16);
    return { r, g, b };
  }
  if (sanitized.length === 6) {
    const r = parseInt(sanitized.substring(0, 2), 16);
    const g = parseInt(sanitized.substring(2, 4), 16);
    const b = parseInt(sanitized.substring(4, 6), 16);
    return { r, g, b };
  }
  // fallback to black
  return { r: 0, g: 0, b: 0 };
}

function srgbToLinear(value: number) {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

export function luminanceFromHex(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function isColorDark(hex: string) {
  // WCAG relative luminance threshold (approx) — lower means darker.
  // We'll use 0.5 as a practical threshold to choose white vs black text.
  try {
    const lum = luminanceFromHex(hex);
    return lum < 0.5;
  } catch (e) {
    return false;
  }
}

export function readableTextColor(hex: string) {
  return isColorDark(hex) ? '#FFFFFF' : '#000000';
}
