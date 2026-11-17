const http = require('http');

const urls = [
  'http://localhost:8089/services/',
  'http://localhost:8089/service-development/',
  'http://localhost:8089/service-architectural-design/',
  'http://localhost:8089/service-project-management/',
  'http://localhost:8089/service-sales-marketing/',
  'http://localhost:8089/service-consulting/',
  'http://localhost:8089/service-facility-management/',
  'http://localhost:8089/about/',
  'http://localhost:8089/contact/'
];

let pending = urls.length;

urls.forEach(u => {
  http.get(u, res => {
    console.log(`${res.statusCode} ${res.statusMessage} <- ${u}`);
    pending--;
    if (pending === 0) console.log('All URLs verified successfully!');
  }).on('error', err => {
    console.error(`Error requesting ${u}:`, err.message);
    pending--;
  });
});
