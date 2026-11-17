const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasDock = content.includes('rosokh-floating-dock');
  const hasBodyEnd = content.includes('</body>');
  console.log(`${f}: hasDock=${hasDock}, hasBodyEnd=${hasBodyEnd}`);
});
