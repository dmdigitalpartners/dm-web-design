// Replace ASCII '"' that closes a Bulgarian „…"-pair with proper U+201C.
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dir = "lib/data";
for (const f of readdirSync(dir)) {
  if (!f.endsWith(".ts")) continue;
  const p = join(dir, f);
  const src = readFileSync(p, "utf8");
  const out = src.replace(/„([^"]*?)"/g, "„$1“");
  if (out !== src) {
    writeFileSync(p, out);
    console.log("fixed", f);
  }
}
