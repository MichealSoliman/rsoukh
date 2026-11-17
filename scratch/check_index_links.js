const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const links = indexHtml.match(/href="([^"]*(about|contact|service)[^"]*)"/g);
console.log('Index links to pages:', links);
