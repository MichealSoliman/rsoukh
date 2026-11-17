const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<section[^>]*class="([^"]*)"/g;
let m;
console.log('Sections in index.html:');
while ((m = regex.exec(html)) !== null) {
  console.log(m[1]);
}
