const fs = require('fs');

['about/index.html', 'contact/index.html'].forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  console.log(`=== ${f} ===`);
  
  // Find img src
  const imgMatches = content.match(/src="([^"]*)"/g) || [];
  console.log('Images (sample):', imgMatches.slice(0, 10));

  // Find css href
  const cssMatches = content.match(/href="([^"]*\.css)"/g) || [];
  console.log('CSS:', cssMatches);

  // Find js src
  const jsMatches = content.match(/src="([^"]*\.js)"/g) || [];
  console.log('JS:', jsMatches);

  // Find nav links
  const navMatches = content.match(/class="nav-link[^"]*"[^>]*href="([^"]*)"/g) || [];
  console.log('Nav links:', navMatches);
});
