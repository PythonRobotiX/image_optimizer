import sharp from "sharp";

export async function convertToWebp(input: Buffer, quality: number) {
  return sharp(input).webp({ quality }).toBuffer();
}
