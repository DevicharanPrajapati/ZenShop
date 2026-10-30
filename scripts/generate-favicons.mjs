import sharp from "sharp";
import fs from "fs";
import path from "path";

// Elegant, bold architectural Z/S logo in SVG
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0c"/>
      <stop offset="100%" stop-color="#141418"/>
    </linearGradient>
    <linearGradient id="slashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#3b82f6" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Squircle Base -->
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)"/>
  <rect x="12" y="12" width="488" height="488" rx="116" fill="none" stroke="#27272a" stroke-width="16"/>

  <!-- Geometric Brand Mark: Z / S -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900">
    <text x="160" y="325" font-size="210" fill="#ffffff" text-anchor="middle" letter-spacing="-4">Z</text>
    <text x="256" y="325" font-size="220" fill="url(#slashGrad)" text-anchor="middle" font-weight="800" filter="url(#glow)">/</text>
    <text x="352" y="325" font-size="210" fill="#ffffff" text-anchor="middle" letter-spacing="-4">S</text>
  </g>
</svg>`;

async function main() {
  const root = process.cwd();
  const publicDir = path.join(root, "public");
  const appDir = path.join(root, "app");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write SVGs
  const svgBuffer = Buffer.from(svg.trim());
  fs.writeFileSync(path.join(appDir, "icon.svg"), svgBuffer);
  fs.writeFileSync(path.join(publicDir, "icon.svg"), svgBuffer);
  console.log("✓ Saved app/icon.svg and public/icon.svg");

  // 2. Generate PNGs
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);
  fs.writeFileSync(path.join(publicDir, "icon-192.png"), png192);
  fs.writeFileSync(path.join(publicDir, "icon-512.png"), png512);
  console.log("✓ Saved public/apple-touch-icon.png (180x180), icon-192.png, icon-512.png");

  // 3. Generate multi-resolution ICO file (contains 16x16, 32x32, 48x48)
  // ICO format structure:
  // ICONDIR header (6 bytes) + (count * 16 bytes for each ICONDIRENTRY) + raw PNG data blocks
  const images = [
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ];

  const headerSize = 6 + images.length * 16;
  let currentOffset = headerSize;

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width, 0); // Width
    entry.writeUInt8(img.height, 1); // Height
    entry.writeUInt8(0, 2); // Colors (0 = no palette)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(currentOffset, 12); // Offset to image data
    entries.push(entry);
    currentOffset += img.buffer.length;
  }

  const iconDir = Buffer.alloc(6);
  iconDir.writeUInt16LE(0, 0); // Reserved
  iconDir.writeUInt16LE(1, 2); // Image type: 1 = ICO
  iconDir.writeUInt16LE(images.length, 4); // Number of images

  const icoBuffer = Buffer.concat([
    iconDir,
    ...entries,
    ...images.map((img) => img.buffer),
  ]);

  fs.writeFileSync(path.join(appDir, "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("✓ Saved app/favicon.ico and public/favicon.ico (Multi-size: 16x16, 32x32, 48x48)");
}

main().catch(console.error);
