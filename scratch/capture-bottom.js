const { execSync } = require('child_process');
const path = require('path');

const edgePath = `"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`;
const brainDir = `C:\\Users\\HP\\.gemini\\antigravity\\brain\\de411bd3-f352-48e7-9155-b6a5dcce54d9`;
const out = path.join(brainDir, 'service_bottom_footer.png');
const url = 'http://localhost:8089/service-architectural-design.html';

const cmd = `${edgePath} --headless=new --disable-gpu --window-size=1440,4800 --screenshot="${out}" "${url}"`;
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('Saved bottom screenshot');
} catch (e) {
  console.error(e);
}
