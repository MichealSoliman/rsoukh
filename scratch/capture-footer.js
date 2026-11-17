const { execSync } = require('child_process');
const path = require('path');

const edgePath = `"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`;
const brainDir = `C:\\Users\\HP\\.gemini\\antigravity\\brain\\de411bd3-f352-48e7-9155-b6a5dcce54d9`;
const out = path.join(brainDir, 'service_footer_updated.png');
const url = 'http://localhost:8089/service-architectural-design.html';

// Scroll to bottom or capture full page
const cmd = `${edgePath} --headless=new --disable-gpu --window-size=1440,3200 --screenshot="${out}" "${url}"`;
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('Saved footer screenshot');
} catch (e) {
  console.error(e);
}
