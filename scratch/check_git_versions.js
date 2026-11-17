const { execSync } = require('child_process');
const fs = require('fs');

const commits = ['aba9fb6', '1b44771', '0a2bfb4', '8e3f372'];

commits.forEach(c => {
  try {
    const ps = execSync(`git show ${c}:project-single.html`).toString('utf8');
    const pd = execSync(`git show ${c}:data/projects-data.js`).toString('utf8');
    console.log(`Commit ${c}: project-single.html lines=${ps.split('\n').length}, projects-data.js lines=${pd.split('\n').length}`);
    
    // Check if 259 had map in that commit
    const has259Map = pd.includes('"259"') && pd.slice(pd.indexOf('"259"'), pd.indexOf('"259"') + 1500).includes('mapEmbedUrl');
    console.log(`  -> 259 has mapEmbedUrl in ${c}? ${has259Map}`);
  } catch (e) {
    console.log(`Commit ${c} error:`, e.message);
  }
});
