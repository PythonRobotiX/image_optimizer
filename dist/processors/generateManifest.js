"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateManifest = generateManifest;
function generateManifest(baseName, variants, aspect, width, height) {
    return {
        baseName,
        variants,
        aspect,
        width,
        height
    };
}
