const fs = require('fs');
const html = fs.readFileSync('services.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('class="services-')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
