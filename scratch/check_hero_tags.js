const fs = require('fs');

const pages = [
  'project-single.html',
  'services.html',
  'about.html',
  'contact.html',
  'service-development.html',
  'service-architectural-design.html',
  'service-project-management.html',
  'service-sales-marketing.html',
  'service-consulting.html',
  'service-facility-management.html'
];

pages.forEach(p => {
  if (!fs.existsSync(p)) return;
  const html = fs.readFileSync(p, 'utf8');
  const m = html.match(/<section[^>]*class="[^"]*(project-single-hero|page-hero|hero)[^"]*"[^>]*>/i);
  if (m) console.log(`${p}: ${m[0]}`);
});
