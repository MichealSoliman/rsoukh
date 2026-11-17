const fs = require('fs');

const servicePages = [
  'service-development.html',
  'service-architectural-design.html',
  'service-project-management.html',
  'service-sales-marketing.html',
  'service-consulting.html',
  'service-facility-management.html'
];

servicePages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('padding: 160px 0 70px;')) {
    content = content.replace('padding: 160px 0 70px;', 'padding: 160px 0 95px;');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated hero padding in ${file}`);
  } else {
    console.log(`No match in ${file}`);
  }
});
