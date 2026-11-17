const fs = require('fs');
const html = fs.readFileSync('services.html', 'utf8');
const match = html.match(/\.services-detailed-section\s*\{[^}]*\}/g);
console.log(match);
