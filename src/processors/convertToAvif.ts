import sharp from "sharp";

export async function convertToAvif(input: Buffer, quality: number) {
  return sharp(input).avif({ quality }).toBuffer();
}
