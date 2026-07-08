// Processes the founders' studio headshots into brand-fit WebP assets.
// Source PNGs live outside the repo (session folder); outputs land in
// public/images/team/. Run from the project root: `node scripts/process-portraits.mjs`.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC_DIR =
  "C:\\Users\\Daniel\\OneDrive\\Documents\\Claude Code\\D&M Web Design";
const OUT_DIR = "public/images/team";

const people = [
  { key: "daniel", src: `${SRC_DIR}\\Daniel.png` },
  { key: "martin", src: `${SRC_DIR}\\Martin.png` },
];

// Very light, tasteful grade so the shots sit on the dark carbon theme without
// looking edited: a hair of warmth + gentle contrast. Faces stay natural.
const grade = (img) =>
  img.modulate({ saturation: 0.96, brightness: 1.01 }).linear(1.04, -6);

await mkdir(OUT_DIR, { recursive: true });

for (const { key, src } of people) {
  const meta = await sharp(src).metadata();
  console.log(`${key}: source ${meta.width}x${meta.height}`);

  // Portrait (3:4) for team blocks
  await grade(sharp(src))
    .resize(900, 1200, { fit: "cover", position: "top" })
    .webp({ quality: 82 })
    .toFile(`${OUT_DIR}/${key}-portrait.webp`);

  // Square, face-focused avatar for testimonial-style use
  await grade(sharp(src))
    .resize(480, 480, { fit: "cover", position: "top" })
    .webp({ quality: 84 })
    .toFile(`${OUT_DIR}/${key}-avatar.webp`);

  console.log(`${key}: wrote portrait + avatar`);
}

console.log("Done.");
