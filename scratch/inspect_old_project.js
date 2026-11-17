const { execSync } = require('child_process');
const fs = require('fs');

const oldHtml = execSync('git show 425c58a:project-single.html').toString();
fs.writeFileSync('scratch/old_project_single.html', oldHtml, 'utf8');

console.log('Old project single length:', oldHtml.length);
const sections = oldHtml.match(/<section[^>]*class="[^"]*"[^>]*>/g);
console.log('Sections:', sections);

// Search for map in old html
const mapMatches = oldHtml.match(/.*(map|خريطة|موقع|location|iframe).*/gi) || [];
console.log('Map occurrences:', mapMatches.slice(0, 15));
