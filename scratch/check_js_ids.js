const fs = require('fs');
const js = fs.readFileSync('js/project-details.js', 'utf8');

const idQueries = js.match(/document\.getElementById\(['"]([^'"]*)['"]\)/g) || [];
console.log('Unique IDs queried in js/project-details.js:');
const unique = [...new Set(idQueries.map(q => q.match(/['"]([^'"]*)['"]/)[1]))];
console.log(unique);
