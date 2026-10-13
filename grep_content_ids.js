const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Enhance Resume for UX Roles – Figma Make.mhtml');
const mhtmlContent = fs.readFileSync(filePath, 'utf-8');

const regex = /Content-ID:\s*<([^>]+)>/gi;
let match;
const cids = [];
while ((match = regex.exec(mhtmlContent)) !== null) {
  cids.push(match[1]);
}

console.log("All Content-IDs found in MHTML file:");
cids.forEach((c, idx) => {
  console.log(`[${idx}] ${c}`);
});
