export function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  // Remove the '#' if it exists
  const parsedHex = hex.replace(/^#/, '');

  // Ensure it is a valid 6-character hex string
  if (parsedHex.length !== 6) {
    return null
  }

  // Convert the hex string into RGB components
  const r = parseInt(parsedHex.substring(0, 2), 16);
  const g = parseInt(parsedHex.substring(2, 4), 16);
  const b = parseInt(parsedHex.substring(4, 6), 16);

  return { r, g, b };
}

// https://www.geeksforgeeks.org/how-to-change-text-color-depending-on-background-color-using-javascript/?ref=oin_asr4
export function isDarkBackground(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  var color = Math.round(((r * 299) +
    (g * 587) +
    (b * 114)) / 1000);
  return color <= 125
}
