const { execSync } = require('child_process');
const fs = require('fs');

const oldProjectsJson = execSync('git show 0a2bfb4:data/projects.json').toString('utf8');
const data = JSON.parse(oldProjectsJson);
console.log('Total projects in 0a2bfb4:', Object.keys(data).length);
for (const [id, p] of Object.entries(data)) {
  console.log(`- ${id}: name="${p.name}", mapEmbedUrl=${p.location?.mapEmbedUrl ? 'YES' : 'NO'}, landmarks=${p.nearbyLandmarks?.length || 0}`);
}
