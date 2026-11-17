const fs = require('fs');

const rootFiles = ['index.html', 'project-single.html'];

const replacements = [
  { from: /href=["']service-development\.html["']/g, to: 'href="service-development/"' },
  { from: /href=["']service-architectural-design\.html["']/g, to: 'href="service-architectural-design/"' },
  { from: /href=["']service-project-management\.html["']/g, to: 'href="service-project-management/"' },
  { from: /href=["']service-sales-marketing\.html["']/g, to: 'href="service-sales-marketing/"' },
  { from: /href=["']service-consulting\.html["']/g, to: 'href="service-consulting/"' },
  { from: /href=["']service-facility-management\.html["']/g, to: 'href="service-facility-management/"' },
  { from: /href=["']service-single\.html["']/g, to: 'href="service-single/"' },
  { from: /href=["']services\.html["']/g, to: 'href="services/"' },
  { from: /href=["']about\.html["']/g, to: 'href="about/"' },
  { from: /href=["']contact\.html["']/g, to: 'href="contact/"' }
];

rootFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  replacements.forEach(r => {
    html = html.replace(r.from, r.to);
  });
  fs.writeFileSync(file, html, 'utf8');
  console.log(`Updated clean folder links in ${file}`);
});
