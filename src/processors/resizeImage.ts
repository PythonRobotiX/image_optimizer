import sharp from "sharp";

export async function resizeImage(input: Buffer, width: number) {
  return sharp(input).resize({ width }).toBuffer();
}
