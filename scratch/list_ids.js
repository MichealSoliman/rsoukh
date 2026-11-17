const fs = require('fs');

const html = fs.readFileSync('project-single.html', 'utf8');

const matches = html.match(/id="([^"]*)"/g);
console.log('IDs in project-single.html:', matches);
