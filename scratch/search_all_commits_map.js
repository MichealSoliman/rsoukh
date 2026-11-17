const { execSync } = require('child_process');

const commits = execSync('git log --format="%H %s"').toString().trim().split('\n');

commits.forEach(c => {
  const [hash, ...rest] = c.split(' ');
  const subject = rest.join(' ');
  try {
    const files = execSync(`git show --name-only --format="" ${hash}`).toString().trim().split('\n');
    console.log(`Commit ${hash.slice(0, 7)}: ${subject}`);
    files.forEach(f => {
      if (!f) return;
      try {
        const content = execSync(`git show ${hash}:${f}`).toString('utf8');
        const hasIframe = content.includes('<iframe') || content.includes('google.com/maps');
        const hasLocationSection = content.includes('location') || content.includes('موقع المشروع') || content.includes('خريطة');
        if (hasIframe) console.log(`  -> ${f} HAS IFRAME / MAP!`);
        if (content.includes('موقع المشروع')) console.log(`  -> ${f} HAS "موقع المشروع"!`);
      } catch (e) {}
    });
  } catch (e) {}
});
