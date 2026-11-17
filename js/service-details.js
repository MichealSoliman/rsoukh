/**
 * شركة رسوخ العقارية - Rosokh Real Estate
 * Service Single Page Details Engine & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Router (for service-single.html?id=...)
  if (document.body.getAttribute('data-dynamic') === 'true') {
    handleDynamicServiceRender();
  }

  // 2. Lightbox Initialization
  initServiceLightbox();
});

function handleDynamicServiceRender() {
  if (!window.SERVICES_DATA) return;
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id');
  if (!serviceId || !window.SERVICES_DATA[serviceId]) return;

  const targetFile = window.SERVICES_DATA[serviceId].file;
  if (targetFile && window.location.pathname.indexOf(targetFile) === -1) {
    window.location.replace(targetFile);
  }
}

function initServiceLightbox() {
  const modal = document.getElementById('serviceLightbox');
  if (!modal) return;

  const closeBtn = document.getElementById('lightboxClose');

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });
  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') closeLightbox();
  });
}

window.openSingleImageLightbox = function(url, caption, tag) {
  const modal = document.getElementById('serviceLightbox');
  if (!modal) return;

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');

  if (lightboxImg) lightboxImg.src = url;
  if (lightboxCaption) lightboxCaption.textContent = caption || tag || '';
  if (lightboxCounter) lightboxCounter.textContent = tag || 'صورة معمارية حصرية';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.submitServiceConsultation = function(serviceTitle) {
  const nameInput = document.getElementById('consultName');
  const phoneInput = document.getElementById('consultPhone');
  const typeSelect = document.getElementById('consultType');
  const notesInput = document.getElementById('consultNotes');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const type = typeSelect ? typeSelect.value : 'فيلا سكنية فاخرة';
  const notes = notesInput ? notesInput.value.trim() : '';

  if (!name || !phone) {
    alert('يرجى إدخال الاسم ورقم الجوال للتواصل');
    return;
  }

  const messageText = [
    `*طلب استشارة VIP - شركة رسوخ العقارية*`,
    `الخدمة المطلوبة: ${serviceTitle}`,
    `الاسم الكريم: ${name}`,
    `رقم الجوال: ${phone}`,
    `نوع العقار / المشروع: ${type}`,
    notes ? `ملاحظات العميل: ${notes}` : null,
    `--------------------------------`,
    `تم الإرسال عبر البوابة الرسمية لشركة رسوخ العقارية`
  ].filter(Boolean).join('\n');

  const waUrl = `https://wa.me/966500000000?text=${encodeURIComponent(messageText)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
};
