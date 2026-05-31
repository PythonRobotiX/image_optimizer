import fs from "fs";

export function writeJSON(path: string, data: any) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
