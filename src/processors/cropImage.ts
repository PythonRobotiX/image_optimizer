import sharp from "sharp";
import { parseAspect } from "../utils/parseAspect";

export async function cropImage(input: Buffer, aspect: string, targetWidth: number) {
  const ratio = parseAspect(aspect);
  const targetHeight = Math.round(targetWidth / ratio);

  // Smart-ish crop: cover + attention
  return sharp(input)
    .resize({
      width: targetWidth,
      height: targetHeight,
      fit: "cover",
      position: "attention"
    })
    .toBuffer();
}
