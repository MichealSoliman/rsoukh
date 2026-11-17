const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

const classes = [
  'hero-section',
  'rosokh-about-section',
  'rosokh-projects-section',
  'rosokh-services-section',
  'rosokh-contact-section'
];

classes.forEach(c => {
  const reg = new RegExp(`\\.${c}\\s*\\{[^}]*\\}`, 'g');
  const m = css.match(reg);
  if (m) console.log(m[0]);
});
