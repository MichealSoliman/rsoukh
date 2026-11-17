const fs = require('fs');

const content = fs.readFileSync('data/projects-data.js', 'utf8');
console.log('projects-data.js total length:', content.length);

// Check if projects has mapEmbedUrl or nearbyLandmarks
const hasMap = content.includes('mapEmbedUrl');
const hasNearby = content.includes('nearbyLandmarks');
const hasSpecs = content.includes('specs');
const hasFeatures = content.includes('features');
const hasPlans = content.includes('floorPlans');

console.log({ hasMap, hasNearby, hasSpecs, hasFeatures, hasPlans });

// Let's print project keys
try {
  // eval projects
  const sandbox = {};
  eval(content.replace('window.PROJECTS_DATA =', 'sandbox.PROJECTS_DATA ='));
  const projects = sandbox.PROJECTS_DATA;
  console.log('Project count:', Object.keys(projects).length);
  for (const [id, p] of Object.entries(projects)) {
    console.log(`- Project ${id}: name="${p.name}", mapEmbedUrl=${p.location?.mapEmbedUrl ? 'YES' : 'NO'}, landmarks=${p.nearbyLandmarks?.length || 0}, features=${p.features?.length || 0}, plans=${p.floorPlans?.length || 0}`);
  }
} catch (e) {
  console.error('Eval error:', e.message);
}
