const fs = require('fs');

const raw = fs.readFileSync('data/projects.json', 'utf8');
const data = JSON.parse(raw);
console.log('projects.json total projects:', Object.keys(data).length);

for (const [id, p] of Object.entries(data)) {
  console.log(`- ${id}: name="${p.name}", mapEmbedUrl=${p.location?.mapEmbedUrl ? 'YES' : 'NO'}, landmarks=${p.nearbyLandmarks?.length || 0}, features=${p.features?.length || 0}, plans=${p.floorPlans?.length || 0}`);
}
