#!/usr/bin/env node

import path from "path";
import { runPipeline } from "../pipeline/runPipeline";

const input = process.argv[2];

if (!input) {
  console.error("❌ Please provide an input image path");
  process.exit(1);
}

(async () => {
  const fullPath = path.resolve(input);
  const manifest = await runPipeline(fullPath);
  console.log("✅ Optimization complete");
  console.log(manifest);
})();
