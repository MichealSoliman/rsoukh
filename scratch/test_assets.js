const http = require('http');

const assetUrls = [
  'http://localhost:8089/css/style.css',
  'http://localhost:8089/css/project-details.css',
  'http://localhost:8089/img/logo.webp',
  'http://localhost:8089/img/projects/p-elite.webp',
  'http://localhost:8089/js/service-details.js',
  'http://localhost:8089/data/services-data.js'
];

let pending = assetUrls.length;

assetUrls.forEach(u => {
  http.get(u, res => {
    console.log(`Asset ${res.statusCode} ${res.statusMessage} <- ${u}`);
    pending--;
    if (pending === 0) console.log('All referenced assets verified 200 OK!');
  }).on('error', err => {
    console.error(`Asset error for ${u}:`, err.message);
    pending--;
  });
});
