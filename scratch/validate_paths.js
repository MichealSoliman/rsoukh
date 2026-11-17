const fs = require('fs');
const path = require('path');

const folders = [
  'about',
  'contact',
  'services',
  'service-development',
  'service-architectural-design',
  'service-project-management',
  'service-sales-marketing',
  'service-consulting',
  'service-facility-management',
  'service-single'
];

folders.forEach(dir => {
  const filePath = path.join(dir, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.log(`Missing: ${filePath}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for any unescaped relative paths that start with 'img/' or './img/' or 'css/' or 'js/'
  const badImg = content.match(/src=["'](\.\/)?img\/[^"']*/g) || [];
  const badCss = content.match(/href=["'](\.\/)?css\/[^"']*/g) || [];
  const badJs = content.match(/src=["'](\.\/)?js\/[^"']*/g) || [];
  const badData = content.match(/src=["'](\.\/)?data\/[^"']*/g) || [];
  const badBg = content.match(/url\((['"])?(\.\/)?img\/[^)]*/g) || [];
  const unshiftedIndex = content.match(/href=["']index\.html["']/g) || [];

  console.log(`=== ${dir}/index.html ===`);
  if (badImg.length) console.log('  Bad Img:', badImg);
  if (badCss.length) console.log('  Bad CSS:', badCss);
  if (badJs.length) console.log('  Bad JS:', badJs);
  if (badData.length) console.log('  Bad Data:', badData);
  if (badBg.length) console.log('  Bad BG:', badBg);
  if (unshiftedIndex.length) console.log('  Unshifted Index:', unshiftedIndex);
  if (!badImg.length && !badCss.length && !badJs.length && !badData.length && !badBg.length && !unshiftedIndex.length) {
    console.log('  All paths verified clean and valid!');
  }
});
