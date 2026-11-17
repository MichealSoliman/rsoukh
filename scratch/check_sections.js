const fs = require('fs');

const pages = [
  'project-single.html',
  'services.html',
  'about/',
  'contact/',
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
  console.log(`=== ${p} ===`);
  const sections = [];
  const regex = /<section[^>]*class="([^"]*)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    sections.push(match[1]);
  }
  console.log('Sections:', sections);
});
