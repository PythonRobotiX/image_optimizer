"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSrcset = generateSrcset;
exports.generateSizes = generateSizes;
function generateSrcset(manifest, format = "webp") {
    const entries = Object.entries(manifest.variants)
        .map(([width, v]) => `${v[format]} ${width}w`)
        .join(", ");
    return entries;
}
// Simple default sizes for responsive layouts
function generateSizes() {
    return "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px";
}
