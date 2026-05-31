"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAspect = parseAspect;
function parseAspect(aspect) {
    const [w, h] = aspect.split(":").map(Number);
    return w / h;
}
