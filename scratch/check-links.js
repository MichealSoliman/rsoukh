const fs = require('fs');

['index.html', 'services.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/href="service-[^"]+"/g);
  console.log(f, matches ? matches.length : 0, 'service links found');
  if (matches) console.log(matches.slice(0, 10));
});
