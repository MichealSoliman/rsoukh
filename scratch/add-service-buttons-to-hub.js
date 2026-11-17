const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'services.html');
let html = fs.readFileSync(filePath, 'utf8');

const servicesList = [
  { id: 'development', link: 'service-development.html', name: 'التطوير العقاري' },
  { id: 'project-management', link: 'service-project-management.html', name: 'إدارة المشاريع' },
  { id: 'sales-marketing', link: 'service-sales-marketing.html', name: 'التسويق والمبيعات' },
  { id: 'consulting', link: 'service-consulting.html', name: 'الاستشارات ودراسات الجدوى' },
  { id: 'architectural-design', link: 'service-architectural-design.html', name: 'التصميم المعماري' },
  { id: 'facility-management', link: 'service-facility-management.html', name: 'إدارة الأصول والمرافق' },
];

servicesList.forEach(s => {
  const cardRegex = new RegExp(`(<article class="service-detail-card" id="${s.id}">[\\s\\S]*?<div class="service-detail-footer">[\\s\\S]*?<div class="service-metrics-row">[\\s\\S]*?<\\/div>)([\\s\\S]*?<\\/div>\\s*<\\/article>)`);
  
  if (cardRegex.test(html)) {
    html = html.replace(cardRegex, (match, p1, p2) => {
      // Check if button already exists
      if (p2.includes(s.link)) return match;
      
      const btnHtml = `
            <div class="service-footer-btns-group">
              <a href="${s.link}" class="service-details-full-btn">
                <span>استعراض صفحة الخدمة الشاملة والمشاريع</span>
                <svg viewBox="0 0 24 24"><path d="M14 7l-5 5 5 5V7z"/></svg>
              </a>`;
      
      const updatedP2 = p2.replace('<a href="https://wa.me/', `${btnHtml}\n              <a href="https://wa.me/`)
                          .replace('</a>\n        </div>', '</a>\n            </div>\n        </div>');
      return p1 + updatedP2;
    });
    console.log(`✅ Added full page button for ${s.id} in services.html`);
  }
});

// Also add styling for .service-details-full-btn and .service-footer-btns-group to services.html style block
if (!html.includes('.service-details-full-btn')) {
  const stylePatch = `
    .service-footer-btns-group {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .service-details-full-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 22px;
      background: var(--gold-gradient);
      color: #101F30;
      font-weight: 800;
      font-size: 0.92rem;
      border-radius: var(--radius-full);
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(191, 159, 118, 0.3);
      transition: all 0.3s ease;
    }

    .service-details-full-btn:hover {
      background: var(--gold-gradient-hover);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(191, 159, 118, 0.45);
      color: #101F30;
    }

    .service-details-full-btn svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  </style>`;
  html = html.replace('</style>', stylePatch);
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ Updated services.html');
