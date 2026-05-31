#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const runPipeline_1 = require("../pipeline/runPipeline");
const input = process.argv[2];
if (!input) {
    console.error("❌ Please provide an input image path");
    process.exit(1);
}
(async () => {
    const fullPath = path_1.default.resolve(input);
    const manifest = await (0, runPipeline_1.runPipeline)(fullPath);
    console.log("✅ Optimization complete");
    console.log(manifest);
})();
