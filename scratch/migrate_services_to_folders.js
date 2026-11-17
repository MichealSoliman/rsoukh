const fs = require('fs');
const path = require('path');

const servicePages = [
  'services.html',
  'service-development.html',
  'service-architectural-design.html',
  'service-project-management.html',
  'service-sales-marketing.html',
  'service-consulting.html',
  'service-facility-management.html',
  'service-single.html'
];

function transformPathsForSubfolder(html) {
  let res = html;

  // 1. Fix CSS links
  res = res.replace(/href=["'](\.\/)?css\//g, 'href="../css/');

  // 2. Fix JS script tags
  res = res.replace(/src=["'](\.\/)?js\//g, 'src="../js/');

  // 3. Fix Data script tags
  res = res.replace(/src=["'](\.\/)?data\//g, 'src="../data/');

  // 4. Fix Image sources
  res = res.replace(/src=["'](\.\/)?img\//g, 'src="../img/');

  // 5. Fix Inline CSS url('img/...') or url("img/...")
  res = res.replace(/url\((['"])?(\.\/)?img\//g, 'url($1../img/');

  // 6. Fix links to other pages:
  // Root index
  res = res.replace(/href=["'](\.\/)?index\.html(["'#?])/g, 'href="../index.html$2');
  
  // About
  res = res.replace(/href=["'](\.\/)?about(\.html|\/)?(["'#?])/g, 'href="../about/$3');
  
  // Contact
  res = res.replace(/href=["'](\.\/)?contact(\.html|\/)?(["'#?])/g, 'href="../contact/$3');
  
  // Services main
  res = res.replace(/href=["'](\.\/)?services(\.html|\/)?(["'#?])/g, 'href="../services/$3');
  
  // Individual services
  res = res.replace(/href=["'](\.\/)?service-development(\.html|\/)?(["'#?])/g, 'href="../service-development/$3');
  res = res.replace(/href=["'](\.\/)?service-architectural-design(\.html|\/)?(["'#?])/g, 'href="../service-architectural-design/$3');
  res = res.replace(/href=["'](\.\/)?service-project-management(\.html|\/)?(["'#?])/g, 'href="../service-project-management/$3');
  res = res.replace(/href=["'](\.\/)?service-sales-marketing(\.html|\/)?(["'#?])/g, 'href="../service-sales-marketing/$3');
  res = res.replace(/href=["'](\.\/)?service-consulting(\.html|\/)?(["'#?])/g, 'href="../service-consulting/$3');
  res = res.replace(/href=["'](\.\/)?service-facility-management(\.html|\/)?(["'#?])/g, 'href="../service-facility-management/$3');
  res = res.replace(/href=["'](\.\/)?service-single(\.html|\/)?(["'#?])/g, 'href="../service-single/$3');

  // Project single links
  res = res.replace(/href=["'](\.\/)?project-single\.html(["'#?])/g, 'href="../project-single.html$2');

  return res;
}

// Process each service file
servicePages.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Skipping non-existent file: ${file}`);
    return;
  }

  const folderName = file.replace(/\.html$/, '');
  const targetDir = path.join(__dirname, '..', folderName);
  const targetFile = path.join(targetDir, 'index.html');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`Created directory: ${folderName}`);
  }

  const rawHtml = fs.readFileSync(file, 'utf8');
  const transformedHtml = transformPathsForSubfolder(rawHtml);

  fs.writeFileSync(targetFile, transformedHtml, 'utf8');
  console.log(`Generated ${folderName}/index.html with updated relative paths.`);
});

// Also fix about/index.html and contact/index.html
['about/index.html', 'contact/index.html'].forEach(relFile => {
  if (!fs.existsSync(relFile)) return;
  const rawHtml = fs.readFileSync(relFile, 'utf8');
  const transformedHtml = transformPathsForSubfolder(rawHtml);
  fs.writeFileSync(relFile, transformedHtml, 'utf8');
  console.log(`Audited and fixed relative paths in ${relFile}.`);
});
