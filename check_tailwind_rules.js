const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'part_18.css'), 'utf-8');

console.log("part_18.css length:", content.length);
console.log("Contains bg-[#DDD9D0]?", content.includes('bg-[#DDD9D0]') || content.includes('DDD9D0'));
console.log("Contains max-w-[900px]?", content.includes('max-w-[900px]'));
console.log("Contains grid?", content.includes('.grid'));
console.log("Contains flex?", content.includes('.flex'));
console.log("Contains text-[19px]?", content.includes('text-[19px]'));

// Let's print a few match snippets
const matches = ['.tailwind', 'bg-[#DDD9D0]', 'text-[19px]', 'max-w-[900px]'];
matches.forEach(m => {
  const idx = content.indexOf(m);
  if (idx !== -1) {
    console.log(`Found "${m}" around ${idx}:`, content.substring(idx - 50, idx + 150));
  } else {
    console.log(`"${m}" not found`);
  }
});
