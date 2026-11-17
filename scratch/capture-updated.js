const { execSync } = require('child_process');
const path = require('path');

const edgePath = `"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`;
const brainDir = `C:\\Users\\HP\\.gemini\\antigravity\\brain\\de411bd3-f352-48e7-9155-b6a5dcce54d9`;

const targets = [
  { url: 'http://localhost:8089/service-architectural-design.html', out: path.join(brainDir, 'service_design_updated.png') },
  { url: 'http://localhost:8089/service-development.html', out: path.join(brainDir, 'service_dev_updated.png') }
];

targets.forEach(t => {
  console.log(`Capturing ${t.url} ...`);
  const cmd = `${edgePath} --headless=new --disable-gpu --window-size=1440,2400 --screenshot="${t.out}" "${t.url}"`;
  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`Saved screenshot to ${t.out}`);
  } catch (err) {
    console.error(`Failed to capture ${t.url}`, err);
  }
});
