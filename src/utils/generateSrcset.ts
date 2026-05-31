type VariantEntry = {
  webp: string;
  avif: string;
};

type Manifest = {
  baseName: string;
  variants: Record<string, VariantEntry>;
  aspect: string;
  width: number;
  height: number;
};

export function generateSrcset(manifest: Manifest, format: "webp" | "avif" = "webp") {
  const entries = Object.entries(manifest.variants)
    .map(([width, v]) => `${v[format]} ${width}w`)
    .join(", ");

  return entries;
}

// Simple default sizes for responsive layouts
export function generateSizes() {
  return "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px";
}
