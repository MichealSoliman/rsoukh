const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));

Object.entries(data).forEach(([id, p]) => {
  console.log(`ID: ${id}`);
  console.log(`  Name: ${p.name}`);
  console.log(`  District: ${p.location?.district || p.location?.city || 'Not specified'}`);
  console.log(`  Gallery count: ${p.gallery?.length || 0}`);
  console.log(`  Features count: ${p.features?.length || 0}`);
  console.log(`  Landmarks count: ${p.nearbyLandmarks?.length || 0}`);
  console.log(`  Has map: ${!!p.location?.mapEmbedUrl}`);
  console.log(`  Floor plans count: ${p.floorPlans?.length || 0}`);
  console.log(`  Warranties count: ${p.warranties?.length || 0}`);
  console.log('--------------------------------------------------');
});
