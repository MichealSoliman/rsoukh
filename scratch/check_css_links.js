const fs = require('fs');

const pages = [
  'index.html',
  'about/',
  'services.html',
  'contact/',
  'project-single.html',
  'service-development.html',
  'service-architectural-design.html',
  'service-project-management.html',
  'service-sales-marketing.html',
  'service-consulting.html',
  'service-facility-management.html'
];

pages.forEach(p => {
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  console.log(`${p}: includes css/style.css? ${content.includes('css/style.css')}`);
});
