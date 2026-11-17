const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = `"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`;
const brainDir = `C:\\Users\\HP\\.gemini\\antigravity\\brain\\de411bd3-f352-48e7-9155-b6a5dcce54d9`;
const out = path.join(brainDir, 'project_lightbox_fixed.png');

// Use a small runner that triggers openLightbox(0) on load or injects script
// We can use a test page or open project-single.html with a query or small test script
const scriptRunner = `
const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe",
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8089/project-single.html?id=259', { waitUntil: 'networkidle0' });
  
  // Click on the first bento cell to open lightbox
  await page.click('.bento-cell-main');
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: ${JSON.stringify(out)} });
  await browser.close();
  console.log('Saved fixed lightbox screenshot');
})();
`;

fs.writeFileSync(path.join(__dirname, 'test-lightbox.js'), scriptRunner, 'utf8');
