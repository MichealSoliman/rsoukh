const fs = require('fs');
const html = fs.readFileSync('services.html', 'utf8');
console.log(html.substring(0, 2000));
