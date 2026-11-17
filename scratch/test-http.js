const http = require('http');

const pages = [
  '',
  'services.html',
  'about/',
  'contact/',
  'service-development.html',
  'service-project-management.html',
  'service-sales-marketing.html',
  'service-consulting.html',
  'service-architectural-design.html',
  'service-facility-management.html',
  'service-single.html'
];

async function checkPages() {
  for (const page of pages) {
    await new Promise(resolve => {
      http.get(`http://localhost:8089/${page}`, res => {
        console.log(`HTTP ${res.statusCode} -> /${page}`);
        resolve();
      }).on('error', err => {
        console.error(`Error requesting /${page}:`, err.message);
        resolve();
      });
    });
  }
}

checkPages();
