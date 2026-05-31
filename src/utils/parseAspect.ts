export function parseAspect(aspect: string) {
  const [w, h] = aspect.split(":").map(Number);
  return w / h;
}
