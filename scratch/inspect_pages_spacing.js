const fs = require('fs');

['about.html', 'contact.html', 'css/pages.css'].forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  console.log(`=== ${f} ===`);
  const regex = /(\.[a-zA-Z0-9_-]*(hero|story|channel|values|standards|pavilion|faq|section)[a-zA-Z0-9_-]*)\s*\{([^}]*padding[^}]*)\}/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    console.log(m[1], '->', m[3].replace(/\s+/g, ' ').trim());
  }
});
