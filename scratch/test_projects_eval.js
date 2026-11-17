const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));

['259', '248', 'elite', '235'].forEach(id => {
  const p = data[id];
  console.log(`=== Project ${id} (${p.name}) ===`);
  console.log('Map URL:', p.location?.mapEmbedUrl);
  console.log('Landmarks:', p.nearbyLandmarks?.length);
  console.log('Floor plans:', p.floorPlans?.length);
  console.log('Features:', p.features?.length);
  console.log('Warranties:', p.warranties?.length);
  console.log('Specs keys:', Object.keys(p.specs || {}).length);
});
