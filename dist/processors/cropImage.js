"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropImage = cropImage;
const sharp_1 = __importDefault(require("sharp"));
const parseAspect_1 = require("../utils/parseAspect");
async function cropImage(input, aspect, targetWidth) {
    const ratio = (0, parseAspect_1.parseAspect)(aspect);
    const targetHeight = Math.round(targetWidth / ratio);
    // Smart-ish crop: cover + attention
    return (0, sharp_1.default)(input)
        .resize({
        width: targetWidth,
        height: targetHeight,
        fit: "cover",
        position: "attention"
    })
        .toBuffer();
}
