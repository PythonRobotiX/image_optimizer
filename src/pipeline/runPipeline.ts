import fs from "fs";
import path from "path";
import sharp from "sharp";

import { DEVICE_PROFILES } from "../config/deviceProfiles";
import { OUTPUT_DIR } from "../config/paths";

import { ensureDir } from "../utils/ensureDir";
import { generateFilename } from "../utils/generateFilename";
import { writeJSON } from "../utils/writeJSON";

import { cropImage } from "../processors/cropImage";
import { convertToWebp } from "../processors/convertToWebp";
import { convertToAvif } from "../processors/convertToAvif";
import { generateManifest } from "../processors/generateManifest";

export async function runPipeline(inputPath: string) {
  const baseName = path.basename(inputPath).split(".")[0];
  const outputFolder = path.join(OUTPUT_DIR, baseName);

  ensureDir(outputFolder);

  const original = fs.readFileSync(inputPath);
  const meta = await sharp(original).metadata();

  const variants: Record<string, { webp: string; avif: string }> = {};

  // PARALLEL: process all device profiles at once
  await Promise.all(
    Object.entries(DEVICE_PROFILES).map(async ([key, profile]) => {
      const cropped = await cropImage(original, profile.aspect, profile.width);

      const [webp, avif] = await Promise.all([
        convertToWebp(cropped, profile.quality),
        convertToAvif(cropped, profile.quality)
      ]);

      const webpName = generateFilename(baseName, profile.width);
      const avifName = webpName.replace(".webp", ".avif");

      const webpPath = path.join(outputFolder, webpName);
      const avifPath = path.join(outputFolder, avifName);

      fs.writeFileSync(webpPath, webp);
      fs.writeFileSync(avifPath, avif);

      variants[String(profile.width)] = {
        webp: `/output/${baseName}/${webpName}`,
        avif: `/output/${baseName}/${avifName}`
      };
    })
  );

  const manifest = generateManifest(
    baseName,
    variants,
    "16:9",
    meta.width!,
    meta.height!
  );

  writeJSON(path.join(outputFolder, "manifest.json"), manifest);

  return manifest;
}
