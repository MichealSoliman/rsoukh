const fs = require('fs');
const html = fs.readFileSync('services.html', 'utf8');
console.log(html.substring(html.indexOf('</style>'), html.indexOf('</style>') + 2500));
