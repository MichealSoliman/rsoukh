const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));
console.log('Keys of elite:', Object.keys(data.elite));
console.log(JSON.stringify(data.elite, null, 2).slice(0, 3000));
