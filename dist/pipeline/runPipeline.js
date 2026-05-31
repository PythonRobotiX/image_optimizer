"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPipeline = runPipeline;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const deviceProfiles_1 = require("../config/deviceProfiles");
const paths_1 = require("../config/paths");
const ensureDir_1 = require("../utils/ensureDir");
const generateFilename_1 = require("../utils/generateFilename");
const writeJSON_1 = require("../utils/writeJSON");
const cropImage_1 = require("../processors/cropImage");
const convertToWebp_1 = require("../processors/convertToWebp");
const convertToAvif_1 = require("../processors/convertToAvif");
const generateManifest_1 = require("../processors/generateManifest");
async function runPipeline(inputPath) {
    const baseName = path_1.default.basename(inputPath).split(".")[0];
    const outputFolder = path_1.default.join(paths_1.OUTPUT_DIR, baseName);
    (0, ensureDir_1.ensureDir)(outputFolder);
    const original = fs_1.default.readFileSync(inputPath);
    const meta = await (0, sharp_1.default)(original).metadata();
    const variants = {};
    // PARALLEL: process all device profiles at once
    await Promise.all(Object.entries(deviceProfiles_1.DEVICE_PROFILES).map(async ([key, profile]) => {
        const cropped = await (0, cropImage_1.cropImage)(original, profile.aspect, profile.width);
        const [webp, avif] = await Promise.all([
            (0, convertToWebp_1.convertToWebp)(cropped, profile.quality),
            (0, convertToAvif_1.convertToAvif)(cropped, profile.quality)
        ]);
        const webpName = (0, generateFilename_1.generateFilename)(baseName, profile.width);
        const avifName = webpName.replace(".webp", ".avif");
        const webpPath = path_1.default.join(outputFolder, webpName);
        const avifPath = path_1.default.join(outputFolder, avifName);
        fs_1.default.writeFileSync(webpPath, webp);
        fs_1.default.writeFileSync(avifPath, avif);
        variants[String(profile.width)] = {
            webp: `/output/${baseName}/${webpName}`,
            avif: `/output/${baseName}/${avifName}`
        };
    }));
    const manifest = (0, generateManifest_1.generateManifest)(baseName, variants, "16:9", meta.width, meta.height);
    (0, writeJSON_1.writeJSON)(path_1.default.join(outputFolder, "manifest.json"), manifest);
    return manifest;
}
