export function generateManifest(
  baseName: string,
  variants: any,
  aspect: string,
  width: number,
  height: number
) {
  return {
    baseName,
    variants,
    aspect,
    width,
    height
  };
}
