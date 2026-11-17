const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));

Object.entries(data).forEach(([id, p]) => {
  if (!p.similarProjectIds || p.similarProjectIds.length === 0) {
    // pick 3 other project IDs
    const otherIds = Object.keys(data).filter(x => x !== id).slice(0, 3);
    p.similarProjectIds = otherIds;
    console.log(`Assigned similar projects to ${id}:`, otherIds);
  }
});

fs.writeFileSync('data/projects.json', JSON.stringify(data, null, 2), 'utf8');
const jsContent = `// Auto-generated comprehensive projects dataset for Rosokh Real Estate\nwindow.PROJECTS_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data/projects-data.js', jsContent, 'utf8');
console.log('Saved projects.json & projects-data.js with similar projects!');
