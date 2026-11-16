/**
 * شركة رسوخ العقارية - Rosokh Real Estate
 * Interactive Features & Video Controllers
 * Font: Alexandria
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mode Switcher (Full Video Hero vs Flyer Shape Cut)
  const heroSection = document.getElementById('hero');
  const btnModeFullVideo = document.getElementById('btnModeFullVideo');
  const btnModeFlyerShape = document.getElementById('btnModeFlyerShape');

  if (btnModeFullVideo && btnModeFlyerShape && heroSection) {
    btnModeFullVideo.addEventListener('click', () => {
      btnModeFullVideo.classList.add('active');
      btnModeFlyerShape.classList.remove('active');
      heroSection.classList.remove('mode-flyer-shape');
      showToast('تم تفعيل نمط: فيديو كامل الهيرو مع المحتوى');
    });

    btnModeFlyerShape.addEventListener('click', () => {
      btnModeFlyerShape.classList.add('active');
      btnModeFullVideo.classList.remove('active');
      heroSection.classList.add('mode-flyer-shape');
      showToast('تم تفعيل نمط: قَصّة وتصميم البروشور الأصلي');
    });
  }

  // 3. Mobile Menu Toggle & Dropdown Accordions
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Handle Mobile Dropdown Accordion
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    dropdownItems.forEach(dropdown => {
      const toggle = dropdown.querySelector('.nav-link');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('open');
          }
        });
      }
    });

    // Close when clicking actual nav links (not dropdown toggles)
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        dropdownItems.forEach(d => d.classList.remove('open'));
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        dropdownItems.forEach(d => d.classList.remove('open'));
      }
    });
  }

  // 4. Hero Video Sound Control (Floating Pill Button)
  const heroVideo = document.getElementById('heroVideo');
  const toggleMuteBtn = document.getElementById('toggleMuteBtn');
  const soundOnIcon = document.getElementById('soundOnIcon');
  const soundOffIcon = document.getElementById('soundOffIcon');
  const soundText = document.getElementById('soundText');

  if (heroVideo && toggleMuteBtn) {
    toggleMuteBtn.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      if (heroVideo.muted) {
        if (soundOnIcon) soundOnIcon.style.display = 'none';
        if (soundOffIcon) soundOffIcon.style.display = 'inline-block';
        if (soundText) soundText.textContent = 'تشغيل الصوت';
      } else {
        if (soundOnIcon) soundOnIcon.style.display = 'inline-block';
        if (soundOffIcon) soundOffIcon.style.display = 'none';
        if (soundText) soundText.textContent = 'كتم الصوت';
      }
    });
  }

  // 5. Booking Consultation Modal
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const openBookingBtns = document.querySelectorAll('.open-booking-modal');
  const bookingForm = document.getElementById('bookingForm');

  function openBooking() {
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeBooking() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBooking();
    });
  });

  if (closeBookingModal) {
    closeBookingModal.addEventListener('click', closeBooking);
  }

  // Close modals on backdrop click or ESC
  window.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBooking();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBooking();
    }
  });

  // Handle Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName')?.value || 'عميلنا العزيز';
      closeBooking();
      showToast(`شكراً لك ${name}! تم استلام طلبك وسيتواصل معك مستشار رسوخ خلال دقائق.`);
      bookingForm.reset();
    });
  }

  // ==========================================================================
  // 6. Interactive Projects Showcase Engine (مشاريع رسوخ الـ 13)
  // ==========================================================================
  const projectsData = {
    elite: {
      id: 'elite',
      title: 'رسـوخ إيـلـيـت',
      enTitle: 'ROSOKH ELITE',
      code: 'R-ELITE-01',
      district: 'حي حطين الراقي (شمال الرياض)',
      category: 'elite',
      categoryName: 'مشاريع النخبة',
      status: 'available',
      statusText: 'متاح للحجز الفوري',
      price: '6,800,000 ر.س',
      area: '450 - 620 م²',
      rooms: '6 أجنحة ماستر ملكية',
      warranty: '25 سنة هيكل إنشائي معتمد',
      deed: 'صك إلكتروني مستقل فوري',
      desc: 'تحفة معمارية تنبض بالحداثة والخصوصية المطلقة في أرقى مربعات حي حطين؛ قصور وفلل فارهة صُممت لتلائم نخبة المجتمع، مع مسابح خاصة ومصاعد وتكييف مركزي مخفي VRF ونظام سمارت هوم متكامل.',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      features: ['مسبح إنفينيتي خاص', 'مصعد بانورامي إيطالي', 'تكييف مركزي VRF مخفي', 'سمارت هوم كامل', 'كراج ذكي يتسع لـ 3 سيارات']
    },
    residence: {
      id: 'residence',
      title: 'رسـوخ ريـزيـدنـس',
      enTitle: 'ROSOKH RESIDENCE',
      code: 'R-RES-02',
      district: 'حي النرجس (شمال طريق الملك سلمان)',
      category: 'elite',
      categoryName: 'مشاريع النخبة',
      status: 'available',
      statusText: 'متاح للحجز الفوري',
      price: '4,200,000 ر.س',
      area: '380 - 480 م²',
      rooms: '5 أجنحة ماستر',
      warranty: '25 سنة هيكل إنشائي',
      deed: 'صك إلكتروني مستقل',
      desc: 'مجتمع سكني مغلق راقي يوفر أعلى مستويات الأمان والرفاهية العائلية، مع حدائق ومسارات مشي خاصة وتشطيبات إيطالية متقنة وإضاءات طبيعية فسيحة.',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85',
      features: ['مجمع مغلق بحراسة 24/7', 'حديقة خاصة وجلسات خارجية', 'مصعد مؤسس', 'تأمين شامل شركة ملاذ']
    },
    riwaq: {
      id: 'riwaq',
      title: 'رسـوخ رِواق',
      enTitle: 'ROSOKH RIWAQ',
      code: 'R-RWQ-03',
      district: 'حي الياسمين النموذجي',
      category: 'elite',
      categoryName: 'مشاريع النخبة',
      status: 'available',
      statusText: 'متاح للحجز',
      price: '2,150,000 ر.س',
      area: '220 - 340 م²',
      rooms: '4 غرف نوم',
      warranty: '15 سنة شاملة',
      deed: 'صك إلكتروني مستقل',
      desc: 'فلل روف وشقق بوتيك فاخرة بتصميم نيوكلاسيك معاصر ومصاعد خاصة وإطلالات بانورامية مفتوحة في أحد أهدأ مواقع حي الياسمين.',
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
      features: ['تراسات واسعة بإطلالة مفتوحة', 'دخول ذكي ببصمة وكود', 'مواقف سيارات قبو مظللة']
    },
    darwazah262: {
      id: 'darwazah262',
      title: 'رسـوخ دروازة 262',
      enTitle: 'DARWAZAH 262',
      code: 'R-DAR-262',
      district: 'حي الملقا (طريق أنس بن مالك)',
      category: 'elite',
      categoryName: 'مشاريع النخبة',
      status: 'sold',
      statusText: 'مباع بالكامل (Sold Out)',
      price: 'مباع بالكامل',
      area: '400 - 520 م²',
      rooms: '5 أجنحة ماستر',
      warranty: '25 سنة',
      deed: 'تم الإفراغ للملاك',
      desc: 'أحد أبرز صروح رسوخ التاريخية في حي الملقا؛ فلل فارهة بقبو ترفيهي وصالة سينما خاصة ومصعد إيطالي وشلالات زجاجية مميزة.',
      img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85',
      features: ['قبو ترفيهي وسينما', 'مصعد إيطالي مدمج', 'مسبح داخلي دافئ', 'مباع 100% بنجاح']
    },
    269: {
      id: '269',
      title: 'رسـوخ 269',
      enTitle: 'ROSOKH 269',
      code: 'R-269',
      district: 'حي العارض (شمال الملك سلمان)',
      category: 'series',
      categoryName: 'سلسلة رسوخ السكنية',
      status: 'available',
      statusText: 'متاح للحجز',
      price: '3,450,000 ر.س',
      area: '320 - 410 م²',
      rooms: '5 غرف ماستر',
      warranty: '20 سنة',
      deed: 'صك إلكتروني مستقل',
      desc: 'فلل مودرن ذكية بواجهات رخامية حديثة بنظام تحكم ذكي كامل بالأجهزة والتكييف والإضاءات مع حوش خلفي فسيح.',
      img: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=85',
      features: ['واجهات حجر طبيعي وزجاج', 'نظام سمارت هوم', 'غرفة خادمة وسائق']
    },
    235: {
      id: '235',
      title: 'رسـوخ 235',
      enTitle: 'ROSOKH 235',
      code: 'R-235',
      district: 'حي النرجس (موقع حيوي)',
      category: 'series',
      categoryName: 'سلسلة رسوخ السكنية',
      status: 'sold',
      statusText: 'مباع بالكامل',
      price: 'مباع بالكامل',
      area: '260 - 350 م²',
      rooms: '4 غرف نوم',
      warranty: '20 سنة',
      deed: 'تم الإفراغ للملاك',
      desc: 'تاون هاوس وأدوار سكنية مستقلة بمداخل سيارات خاصة وتشطيب سوبر ديلوكس في قلب حي النرجس الحيوي.',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85',
      features: ['مدخل خاص لكل وحدة', 'عدادات كهرباء ومياه مستقلة', 'مباع بالكامل']
    },
    247: {
      id: '247',
      title: 'رسـوخ 247',
      enTitle: 'ROSOKH 247',
      code: 'R-247',
      district: 'حي الياسمين (مربع 14)',
      category: 'series',
      categoryName: 'سلسلة رسوخ السكنية',
      status: 'available',
      statusText: 'متاح للحجز',
      price: '3,850,000 ر.س',
      area: '350 - 450 م²',
      rooms: '5 أجنحة ماستر',
      warranty: '25 سنة',
      deed: 'صك إلكتروني مستقل',
      desc: 'فلل سكنية بطراز معماري سلماني حديث يدمج مفردات العمارة النجدية مع راحة وتقنيات الحياة المعاصرة.',
      img: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=85',
      features: ['طراز سلماني أصيل', 'أفنية داخلية مضاءة', 'مصعد مؤسس ومسبح']
    },
    248: {
      id: '248',
      title: 'رسـوخ 248',
      enTitle: 'ROSOKH 248',
      code: 'R-248',
      district: 'حي القيروان الراقي',
      category: 'series',
      categoryName: 'سلسلة رسوخ السكنية',
      status: 'available',
      statusText: 'متاح للحجز',
      price: '3,900,000 ر.س',
      area: '360 - 430 م²',
      rooms: '5 غرف ماستر',
      warranty: '25 سنة',
      deed: 'صك إلكتروني مستقل',
      desc: 'فلل عائلية فارهة بمسطحات خضراء واسعة، مصاعد خاصة، وتوزيع ذكي للفراغات يضمن أعلى مستويات الخصوصية.',
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=85',
      features: ['حدائق طبيعية خاصة', 'صالة ضيافة واسعة بارتفاع 6م', 'شلال مائي جداري']
    },
    251: {
      id: '251',
      title: 'رسـوخ 251',
      enTitle: 'ROSOKH 251',
      code: 'R-251',
      district: 'حي الصحافة (قرب برج الراجحي)',
      category: 'series',
      categoryName: 'سلسلة رسوخ السكنية',
      status: 'sold',
      statusText: 'مباع بالكامل',
      price: 'مباع بالكامل',
      area: '300 - 380 م²',
      rooms: '4 غرف نوم',
      warranty: '20 سنة',
      deed: 'تم الإفراغ للملاك',
      desc: 'مجمع فلل متلاصقة بتشطيبات إيطالية وموقع استراتيجي ممتاز بالقرب من طريق الملك فهد وأبراج الأعمال.',
      img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
      features: ['موقع استثماري متميز', 'تشطيبات أوروبية فاخرة', 'مباع بالكامل']
    },
    257: {
      id: '257',
      title: 'رسـوخ 257',
      enTitle: 'ROSOKH 257',
      code: 'R-257',
      district: 'حي الربيع الفاخر',
      category: 'series',
      categoryName: 'سلسلة رسوخ السكنية',
      status: 'available',
      statusText: 'متاح للحجز',
      price: '4,600,000 ر.س',
      area: '390 - 510 م²',
      rooms: '5 أجنحة ماستر',
      warranty: '25 سنة',
      deed: 'صك إلكتروني مستقل',
      desc: 'فلل فاخرة بإطلالات زجاجية كاملة وتصميم مودرن متطور مع مصاعد راكبة ومسابح خاصة وتكييف كونسيلد.',
      img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=85',
      features: ['واجهات زجاجية مزدوجة معزولة', 'مسبح خاص', 'مصعد إيطالي راكب']
    },
    258: {
      id: '258',
      title: 'رسـوخ 258',
      enTitle: 'ROSOKH 258',
      code: 'R-258',
      district: 'حي الندا (قرب جامعة الإمام)',
      category: 'series',
      categoryName: 'سلسلة رسوخ السكنية',
      status: 'available',
      statusText: 'متاح للحجز',
      price: '2,900,000 ر.س',
      area: '280 - 370 م²',
      rooms: '4 غرف نوم',
      warranty: '20 سنة',
      deed: 'صك إلكتروني مستقل',
      desc: 'وحدات سكنية ذكية بنظام أمني متطور وتشطيب فندقي متكامل بالقرب من الطرق والمحاور الرئيسية.',
      img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=85',
      features: ['أنظمة حماية وكاميرات ذكية', 'تكييف مركزي مخفي', 'مواقف خاصة']
    },
    259: {
      id: '259',
      title: 'رسـوخ 259',
      enTitle: 'ROSOKH 259',
      code: 'R-259',
      district: 'حي الغدير (موقع استراتيجي)',
      category: 'series',
      categoryName: 'سلسلة رسوخ السكنية',
      status: 'sold',
      statusText: 'مباع بالكامل',
      price: 'مباع بالكامل',
      area: '310 - 400 م²',
      rooms: '4 غرف نوم',
      warranty: '20 سنة',
      deed: 'تم الإفراغ للملاك',
      desc: 'فلل دبلكس مودرن مع حدائق أسطح مجهزة لجلسات الشواء وإطلالات ساحرة على شمال الرياض.',
      img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85',
      features: ['حديقة سطح VIP', 'تصميم دبلكس فسيح', 'مباع بالكامل']
    },
    261: {
      id: '261',
      title: 'رسـوخ 261',
      enTitle: 'ROSOKH 261',
      code: 'R-261',
      district: 'حي العقيق (دقيقة من KAFD)',
      category: 'series',
      categoryName: 'سلسلة رسوخ السكنية',
      status: 'available',
      statusText: 'متاح للحجز',
      price: '5,200,000 ر.س',
      area: '420 - 560 م²',
      rooms: '5 أجنحة ماستر',
      warranty: '25 سنة',
      deed: 'صك إلكتروني مستقل',
      desc: 'فلل تنفيذية فاخرة بموقع استثنائي بجوار مركز الملك عبدالله المالي، تمثل فرصة نادرة للسكن الراقي والاستثمار عالي العائد.',
      img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85',
      features: ['إطلالة على KAFD', 'تشطيب رئاسي فاخر', 'مصعد ومسبح وموقف 3 سيارات']
    }
  };

  // Filter Tabs & Search Elements
  const filterTabs = document.querySelectorAll('.p-tab-btn');
  const searchInput = document.getElementById('projectSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const projectCards = document.querySelectorAll('.project-matrix-card');
  const spotlightCard = document.getElementById('spotlightCard');
  const projectsGrid = document.getElementById('projectsGrid');
  const emptyState = document.getElementById('projectsEmptyState');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const projectsCountText = document.getElementById('projectsCountText');
  const viewGridBtn = document.getElementById('viewGridBtn');
  const viewListBtn = document.getElementById('viewListBtn');

  let currentFilter = 'all';
  let currentSearch = '';

  function applyProjectFilters() {
    let visibleCount = 0;
    const query = currentSearch.trim().toLowerCase();

    // Check Spotlight Card
    if (spotlightCard) {
      const spCat = spotlightCard.getAttribute('data-category') || '';
      const spStatus = spotlightCard.getAttribute('data-status') || '';
      const spTitle = (spotlightCard.getAttribute('data-title') || '').toLowerCase();
      const spDistrict = (spotlightCard.getAttribute('data-district') || '').toLowerCase();

      const matchFilter = (currentFilter === 'all') ||
                          (currentFilter === spCat) ||
                          (currentFilter === spStatus);

      const matchSearch = !query || spTitle.includes(query) || spDistrict.includes(query) || 'elite'.includes(query);

      if (matchFilter && matchSearch) {
        spotlightCard.style.display = '';
        visibleCount++;
      } else {
        spotlightCard.style.display = 'none';
      }
    }

    // Check Matrix Grid Cards
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category') || '';
      const status = card.getAttribute('data-status') || '';
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const district = (card.getAttribute('data-district') || '').toLowerCase();

      const matchFilter = (currentFilter === 'all') ||
                          (currentFilter === cat) ||
                          (currentFilter === status);

      const matchSearch = !query || title.includes(query) || district.includes(query);

      if (matchFilter && matchSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update Result Text & Empty State
    if (projectsCountText) {
      projectsCountText.innerHTML = `يتم الآن عرض <strong>${visibleCount} مشروعاً معمارياً</strong>`;
    }

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Filter Tab Clicks
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter') || 'all';
      applyProjectFilters();
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = currentSearch ? 'block' : 'none';
      }
      applyProjectFilters();
    });
  }

  // Search Clear
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        currentSearch = '';
        searchClearBtn.style.display = 'none';
        applyProjectFilters();
      }
    });
  }

  // Reset Filters Button
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      currentFilter = 'all';
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      if (searchClearBtn) searchClearBtn.style.display = 'none';
      filterTabs.forEach(t => {
        if (t.getAttribute('data-filter') === 'all') t.classList.add('active');
        else t.classList.remove('active');
      });
      applyProjectFilters();
    });
  }

  // View Mode Switcher (Grid vs List)
  if (viewGridBtn && viewListBtn && projectsGrid) {
    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      projectsGrid.classList.remove('mode-list');
    });

    viewListBtn.addEventListener('click', () => {
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      projectsGrid.classList.add('mode-list');
    });
  }

  // Quick View Modal Controller
  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickViewModal = document.getElementById('closeQuickViewModal');
  const quickViewContent = document.getElementById('quickViewContent');

  function openQuickView(projectId) {
    const data = projectsData[projectId];
    if (!data || !quickViewContent || !quickViewModal) return;

    quickViewContent.innerHTML = `
      <div class="quickview-grid">
        <div class="quickview-media">
          <img src="${data.img}" alt="${data.title}">
          <div class="p-card-top-badges">
            <span class="p-category-tag ${data.category === 'elite' ? 'tag-elite' : 'tag-series'}">${data.categoryName}</span>
            <span class="p-status-pill ${data.status === 'available' ? 'pill-available' : 'pill-sold'}">
              <span class="dot"></span> ${data.statusText}
            </span>
          </div>
          <span class="p-code-badge">${data.code}</span>
        </div>
        <div class="quickview-info">
          <div>
            <div class="quickview-district">
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>${data.district}</span>
            </div>
            <h2 class="quickview-title">${data.title}</h2>
            <p class="quickview-desc">${data.desc}</p>
            
            <div class="quickview-specs-box">
              <div class="qv-spec">
                <span class="lbl">المساحات:</span>
                <span class="val">${data.area}</span>
              </div>
              <div class="qv-spec">
                <span class="lbl">الغرف والأجنحة:</span>
                <span class="val">${data.rooms}</span>
              </div>
              <div class="qv-spec">
                <span class="lbl">الضمانات:</span>
                <span class="val">${data.warranty}</span>
              </div>
              <div class="qv-spec">
                <span class="lbl">القيمة الاستثمارية:</span>
                <span class="val" style="color:#BF9F76;">${data.price}</span>
              </div>
            </div>
          </div>

          <div class="quickview-footer-actions">
            <a href="project-single.html?id=${data.id}" class="btn-qv-fullpage">
              <span>استكشف صفحة المشروع والمخططات</span>
              <svg viewBox="0 0 24 24"><path d="M14 7l-5 5 5 5V7z"/></svg>
            </a>
            <a href="https://wa.me/966500000000?text=مرحباً%20رسوخ%20العقارية،%20أود%20الاستفسار%20عن%20${encodeURIComponent(data.title)}" target="_blank" rel="noopener" class="btn-qv-wa">
              <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92z"/></svg>
              <span>استفسار واتساب</span>
            </a>
          </div>
        </div>
      </div>
    `;

    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (quickViewModal) {
      quickViewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Trigger quick view from any card or spotlight
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-quickview-btn');
    if (trigger) {
      e.preventDefault();
      const pId = trigger.getAttribute('data-project-id');
      if (pId) openQuickView(pId);
    }
  });

  if (closeQuickViewModal) {
    closeQuickViewModal.addEventListener('click', closeQuickView);
  }

  window.addEventListener('click', (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quickViewModal?.classList.contains('active')) {
      closeQuickView();
    }
  });

  // Toast Function
  function showToast(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg style="width:22px;height:22px;fill:#BF9F76;flex-shrink:0" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  window.showToast = showToast;
});
