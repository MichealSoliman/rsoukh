const fs = require('fs');

const css = fs.readFileSync('css/project-details.css', 'utf8');

const regex = /body[^{]*\{[^}]*padding-bottom[^}]*\}/g;
const matches = css.match(regex);
console.log('Matches for body padding-bottom in project-details.css:', matches);
