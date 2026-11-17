const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const SERVICE_LINK_MAP = [
  { oldPattern: /services\.html#development/g, newUrl: 'service-development.html' },
  { oldPattern: /services\.html#project-management/g, newUrl: 'service-project-management.html' },
  { oldPattern: /services\.html#sales-marketing/g, newUrl: 'service-sales-marketing.html' },
  { oldPattern: /services\.html#consulting/g, newUrl: 'service-consulting.html' },
  { oldPattern: /services\.html#architectural-design/g, newUrl: 'service-architectural-design.html' },
  { oldPattern: /services\.html#facility-management/g, newUrl: 'service-facility-management.html' },

  // Anchor only links
  { oldPattern: /href="#development"/g, newUrl: 'href="service-development.html"' },
  { oldPattern: /href="#project-management"/g, newUrl: 'href="service-project-management.html"' },
  { oldPattern: /href="#sales-marketing"/g, newUrl: 'href="service-sales-marketing.html"' },
  { oldPattern: /href="#consulting"/g, newUrl: 'href="service-consulting.html"' },
  { oldPattern: /href="#architectural-design"/g, newUrl: 'href="service-architectural-design.html"' },
  { oldPattern: /href="#facility-management"/g, newUrl: 'href="service-facility-management.html"' }
];

const targetFiles = [
  'index.html',
  'services.html',
  'about.html',
  'contact.html',
  'project-single.html'
];

targetFiles.forEach(file => {
  const filePath = path.join(ROOT_DIR, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  SERVICE_LINK_MAP.forEach(({ oldPattern, newUrl }) => {
    if (oldPattern.test(content)) {
      content = content.replace(oldPattern, newUrl);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated service links in ${file}`);
  } else {
    console.log(`ℹ️ No changes needed in ${file}`);
  }
});
