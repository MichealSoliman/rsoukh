const fs = require('fs');

const dockHtml = `
  <!-- ==========================================================================
       Floating Quick Contact Concierge Dock (WhatsApp & Call)
       ========================================================================== -->
  <aside class="rosokh-floating-dock" id="rosokhFloatingDock" aria-label="قنوات التواصل السريع">
    <!-- Live Concierge Badge -->
    <div class="floating-dock-badge">
      <span class="badge-dot-live"></span>
      <span>مستشارك متاح</span>
    </div>

    <!-- WhatsApp Action Button -->
    <a href="https://wa.me/966500000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%B4%D8%B1%D9%83%D8%A9%20%D8%B1%D8%B3%D9%88%D8%AE%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%8A%D8%A9%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1" 
       target="_blank" 
       rel="noopener" 
       class="floating-dock-btn floating-dock-wa" 
       id="floatingWhatsAppBtn"
       aria-label="محادثة واتساب مباشرة">
      <div class="dock-btn-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92zM12.04 20.14c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.23 8.24zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7 0.59.25 1.04.41 1.4.52.59.19 1.13.16 1.56.1 0.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"/>
        </svg>
      </div>
      <span class="dock-btn-label">محادثة واتساب</span>
    </a>

    <!-- Call Action Button -->
    <a href="tel:8001237000" 
       class="floating-dock-btn floating-dock-call" 
       id="floatingCallBtn"
       aria-label="اتصال هاتفي مباشر">
      <div class="dock-btn-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z"/>
        </svg>
      </div>
      <span class="dock-btn-label">اتصل بنا <b dir="ltr">800 123 7000</b></span>
    </a>
  </aside>
`;

const pages = [
  'index.html',
  'about/',
  'services.html',
  'contact/',
  'project-single.html',
  'service-development.html',
  'service-architectural-design.html',
  'service-project-management.html',
  'service-sales-marketing.html',
  'service-consulting.html',
  'service-facility-management.html',
  'service-single.html'
];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('id="rosokhFloatingDock"')) {
    console.log(`Already has dock: ${file}`);
    return;
  }

  if (content.includes('</body>')) {
    content = content.replace('</body>', `${dockHtml}\n</body>`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Inserted dock into ${file}`);
  } else {
    console.log(`No </body> in ${file}`);
  }
});
