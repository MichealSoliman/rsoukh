const http = require('http');

['http://localhost:8089/data/projects.json', 'http://localhost:8089/data/projects-data.js', 'http://localhost:8089/project-single.html?id=259'].forEach(u => {
  http.get(u, res => {
    console.log(`${res.statusCode} ${res.statusMessage} <- ${u}`);
  }).on('error', e => console.error(e.message));
});
