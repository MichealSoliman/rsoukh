const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const MASTERPIECE_FOOTER_HTML = `<footer class="masterpiece-footer">
    
    <!-- VIP Newsletter & Investor Club Strip -->
    <div class="footer-vip-strip">
      <div class="container">
        <div class="vip-strip-content">
          <div class="vip-text-wrap">
            <h3>انضم إلى <span>نادي النخبة والمستثمرين</span> لدى رُسوخ</h3>
            <p>احصل على أحدث الفرص الاستثمارية والقصور الحصرية قبل طرحها في السوق مع استشارات خاصة.</p>
          </div>
          <form class="vip-form" onsubmit="event.preventDefault(); alert('شكراً لانضمامك لنادي النخبة لدى رسوخ! ستصلك أحدث العروض الحصرية.'); this.reset();">
            <input type="email" class="vip-input" placeholder="أدخل بريدك الإلكتروني" required>
            <button type="submit" class="btn-vip-submit">
              <span>اشتراك حصري</span>
              <svg style="width:16px;height:16px;fill:currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Main Footer Columns Grid -->
    <div class="container">
      <div class="footer-main-grid">

        <!-- Col 1: Brand Logo & About Rosokh -->
        <div class="footer-brand-box">
          <div class="footer-logo-wrap">
            <a href="index.html" aria-label="شركة رسوخ العقارية">
              <img src="./img/logo.webp" alt="شركة رسوخ العقارية" class="footer-brand-logo">
            </a>
          </div>

          <span class="footer-brand-slogan">نحن نبني مجتمعات تدوم</span>

          <p class="footer-brand-desc">
            ريادة في تطوير وتسويق الصروح المعمارية والفلل الفاخرة بالمملكة العربية السعودية؛ نبتكر حلولاً وخدمات عقارية متكاملة تصنع قيمة حقيقية تدوم للأجيال.
          </p>

          <div class="footer-licenses-pills">
            <span class="lic-pill">ترخيص فال العقاري: 1200028471</span>
            <span class="lic-pill">س.ت: 1010892341</span>
          </div>
        </div>

        <!-- Col 2: Our Services -->
        <div class="footer-col">
          <h4 class="footer-col-title">
            <svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
            <span>خدماتنا</span>
          </h4>
          <ul class="footer-links-list">
            <li><a href="service-development.html">التطوير العقاري والاستثمار</a></li>
            <li><a href="service-project-management.html">إدارة المشاريع والإشراف الهندسي</a></li>
            <li><a href="service-sales-marketing.html">التسويق والمبيعات وحلول التملّك</a></li>
            <li><a href="service-consulting.html">الاستشارات ودراسات الجدوى</a></li>
            <li><a href="service-architectural-design.html">التصميم المعماري والديكور الداخلي</a></li>
            <li><a href="service-facility-management.html">إدارة الأصول وتشغيل المرافق</a></li>
          </ul>
        </div>

        <!-- Col 3: Exclusive Projects -->
        <div class="footer-col">
          <h4 class="footer-col-title">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            <span>مشاريعنا</span>
          </h4>
          <ul class="footer-links-list">
            <li><a href="project-single.html?id=elite">رسوخ إيليت (حي حطين)</a></li>
            <li><a href="project-single.html?id=residence">رسوخ ريزيدنس (حي النرجس)</a></li>
            <li><a href="project-single.html?id=riwaq">رسوخ رواق (حي الياسمين)</a></li>
            <li><a href="project-single.html?id=darwazah262">رسوخ دروازة 262</a></li>
            <li><a href="index.html#projects">سلسلة رسوخ السكنية</a></li>
          </ul>
        </div>

        <!-- Col 4: Contact & Interactive QR Code -->
        <div class="footer-col">
          <h4 class="footer-col-title">
            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span>المقر والتواصل</span>
          </h4>
          
          <div class="footer-contact-items">
            <div class="footer-contact-row">
              <div class="footer-contact-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <span>الرياض، حي حطين الراقي | طريق الأمير تركي بن عبدالعزيز الأول</span>
            </div>

            <div class="footer-contact-row">
              <div class="footer-contact-icon">
                <svg viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.01A11.36 11.36 0 0 1 8.5 3.92c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.54c0-.55-.45-1-.99-1z"/></svg>
              </div>
              <span>الهاتف المجاني: <strong style="color:#BF9F76;" dir="ltr">800 123 7000</strong></span>
            </div>

            <div class="footer-contact-row">
              <div class="footer-contact-icon">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <span>info@rosohk.com</span>
            </div>
          </div>

          <!-- Mini QR Code Card from the Flyer -->
          <div class="footer-qr-container">
            <div class="footer-qr-img">
              <svg viewBox="0 0 100 100" fill="#101F30">
                <path d="M0 0h34v34H0V0zm6 6v22h22V6H6zm5 5h12v12H11V11zM66 0h34v34H66V0zm6 6v22h22V6H72zm5 5h12v12H77V11zM0 66h34v34H0V66zm6 6v22h22V72H6zm5 5h12v12H11V77zM42 0h16v10H42V0zm0 18h8v16h-8V18zm8 8h8v8h-8v-8zm16 16h10v8H66v-8zm8 8h10v8H74v-8zm-32 8h8v8h-8v-8zm8 8h8v8h-8v-8zm8-8h8v16h-8V50zm-16 8h8v8h-8v-8zm-8 8h8v8h-8v-8zm32 0h16v8H66v-8zm0 16h8v10H66V74zm8 10h10v8H74v-8zm10-18h8v8h-8v-8zm8 8h8v16h-8V72zm0-16h8v8h-8v-8z"/>
              </svg>
            </div>
            <div class="footer-qr-text">
              <span class="t1">امسح الكود عبر هاتفك</span>
              <span class="t2">لتحميل الكتالوج وحجز معاينة</span>
            </div>
          </div>

          <!-- Social Media Icons -->
          <div class="footer-social-row">
            <a href="https://x.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72M7.86 18.5v-8.37H5.07v8.37h2.79z"/></svg>
            </a>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener" class="social-circle-btn" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Legal & Copyright Bar -->
    <div class="footer-bottom-bar">
      <div class="container">
        <div class="bottom-bar-flex">
          <p class="footer-copy-text">
            جميع الحقوق محفوظة © شركة رسوخ العقارية 2026. ريادة في بناء مجتمعات تدوم.
          </p>
          <div class="footer-legal-links">
            <a href="#">سياسة الخصوصية</a>
            <span>•</span>
            <a href="#">الشروط والأحكام</a>
            <span>•</span>
            <a href="#">الهيئة العامة للعقار</a>
          </div>
        </div>
      </div>
    </div>
  </footer>`;

const targetFiles = ['index.html', 'about/', 'contact/', 'services.html', 'project-single.html'];

targetFiles.forEach(file => {
  const filePath = path.join(ROOT_DIR, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  const footerRegex = /<footer class="masterpiece-footer">[\s\S]*?<\/footer>/;

  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, MASTERPIECE_FOOTER_HTML);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Synced Masterpiece Footer in ${file}`);
  } else {
    console.log(`⚠️ No masterpiece-footer found in ${file}`);
  }
});
