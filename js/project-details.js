/**
 * شركة رسوخ العقارية - Rosokh Real Estate
 * Dynamic Project Single Page Engine
 * Loads and renders project data strictly from data/projects.json
 * Implements Conditional Rendering: Missing fields are NEVER rendered!
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Get Project ID from URL query parameters (e.g. ?id=elite)
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || 'elite';

  // 2. Fetch Projects Data from JSON
  let allProjects = {};
  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    allProjects = await res.json();
  } catch (err) {
    console.warn('Could not fetch data/projects.json directly, using window.PROJECTS_DATA fallback if available.', err);
    if (window.PROJECTS_DATA) {
      allProjects = window.PROJECTS_DATA;
    }
  }

  // Fallback to elite if requested id does not exist
  const project = allProjects[projectId] || allProjects['elite'];

  if (!project) {
    console.error('Project not found in JSON data.');
    return;
  }

  // 3. Render Page Header & Title
  document.title = `${project.name} | شركة رسوخ العقارية`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && project.subtitle) {
    metaDesc.setAttribute('content', `${project.name} - ${project.subtitle}`);
  }

  // Breadcrumbs
  const breadcrumbCrumb = document.getElementById('pBreadcrumbName');
  if (breadcrumbCrumb) breadcrumbCrumb.textContent = project.name;

  // Hero Metadata
  const pCategoryBadge = document.getElementById('pCategoryBadge');
  if (pCategoryBadge) {
    if (project.category) {
      pCategoryBadge.textContent = project.category;
      pCategoryBadge.className = `badge-tag-category ${project.categoryKey || 'elite'}`;
      pCategoryBadge.style.display = '';
    } else {
      pCategoryBadge.style.display = 'none';
    }
  }

  const pStatusBadge = document.getElementById('pStatusBadge');
  if (pStatusBadge) {
    if (project.statusLabel) {
      const isAvailable = project.status === 'available';
      pStatusBadge.innerHTML = `<span class="${isAvailable ? 'pulse-status-dot' : ''}"></span> <span>${project.statusLabel}</span>`;
      pStatusBadge.className = `badge-status-pill ${isAvailable ? 'available' : 'sold'}`;
      pStatusBadge.style.display = '';
    } else {
      pStatusBadge.style.display = 'none';
    }
  }

  const pCodeBadge = document.getElementById('pCodeBadge');
  if (pCodeBadge) {
    if (project.code) {
      pCodeBadge.textContent = project.code;
      pCodeBadge.style.display = '';
    } else {
      pCodeBadge.style.display = 'none';
    }
  }

  const pTitle = document.getElementById('pTitle');
  if (pTitle) {
    pTitle.innerHTML = `${project.name} ${project.enName ? `<span>${project.enName}</span>` : ''}`;
  }

  const pSlogan = document.getElementById('pSlogan');
  if (pSlogan) {
    if (project.subtitle) {
      pSlogan.textContent = project.subtitle;
      pSlogan.style.display = '';
    } else {
      pSlogan.style.display = 'none';
    }
  }

  const pLocationRow = document.getElementById('pLocationRow');
  if (pLocationRow) {
    if (project.location) {
      const locText = [project.location.city, project.location.district, project.location.street].filter(Boolean).join(' • ');
      pLocationRow.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        <span>${locText}</span>
      `;
      pLocationRow.style.display = '';
    } else {
      pLocationRow.style.display = 'none';
    }
  }

  // Populate Full-Bleed Hero Background & Hero Metadata
  const projectHeroSection = document.getElementById('projectHeroSection');
  const heroWhatsAppBtn = document.getElementById('heroWhatsAppBtn');
  const heroPhotosCount = document.getElementById('heroPhotosCount');
  const heroMetricsStrip = document.getElementById('heroMetricsStrip');
  const btnOpenHeroGallery = document.getElementById('btnOpenHeroGallery');

  const heroImgUrl = (project.gallery && project.gallery[0]?.url) || 'img/projects/p-247.webp';
  if (projectHeroSection) {
    projectHeroSection.style.backgroundImage = `url('${heroImgUrl}')`;
  }

  if (heroPhotosCount && project.gallery) {
    heroPhotosCount.textContent = project.gallery.length;
  }

  if (heroWhatsAppBtn) {
    const waText = encodeURIComponent(`مرحباً شركة رسوخ العقارية، أود الاستفسار عن مشروع (${project.name} - ${project.code || ''}).`);
    heroWhatsAppBtn.href = `https://wa.me/966500000000?text=${waText}`;
  }

  const floatingWhatsAppBtn = document.getElementById('floatingWhatsAppBtn');
  if (floatingWhatsAppBtn && project) {
    const waText = encodeURIComponent(`مرحباً شركة رسوخ العقارية، أود الاستفسار عن تفاصيل وحجز مشروع (${project.name} - ${project.code || ''}).`);
    floatingWhatsAppBtn.href = `https://wa.me/966500000000?text=${waText}`;
  }

  // Populate Hero Metrics Capsules Strip
  if (heroMetricsStrip && project.specs) {
    const capsules = [];
    if (project.specs.landArea) {
      capsules.push({ label: 'مساحة الأرض', val: project.specs.landArea, icon: '<path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>' });
    }
    if (project.specs.builtArea) {
      capsules.push({ label: 'مسطح البناء', val: project.specs.builtArea, icon: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>' });
    }
    if (project.specs.bedrooms) {
      capsules.push({ label: 'أجنحة النوم', val: project.specs.bedrooms, icon: '<path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>' });
    }
    if (project.price) {
      capsules.push({ label: 'القيمة الاستثمارية', val: `${project.pricePrefix || ''} ${project.price} ${project.currency || 'ر.س'}`, icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>' });
    }

    heroMetricsStrip.innerHTML = capsules.map(c => `
      <div class="hero-metric-capsule">
        <svg viewBox="0 0 24 24">${c.icon}</svg>
        <div>
          <div class="m-label">${c.label}</div>
          <div class="m-val">${c.val}</div>
        </div>
      </div>
    `).join('');
  }

  // Navbar Interactions (Mobile Menu Drawer & Dropdowns)
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

  function setMobileMenu(isOpen) {
    if (!mobileToggle || !navMenu) return;
    if (isOpen) {
      mobileToggle.classList.add('active');
      navMenu.classList.add('active');
      if (navBackdrop) navBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      if (navBackdrop) navBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      dropdownItems.forEach(d => d.classList.remove('open'));
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !navMenu.classList.contains('active');
      setMobileMenu(willOpen);
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', () => setMobileMenu(false));
    }

    dropdownItems.forEach(dropdown => {
      const toggle = dropdown.querySelector('.nav-link');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            dropdown.classList.toggle('open');
          }
        });
      }
    });

    document.querySelectorAll('.nav-menu a:not(.nav-item-dropdown > .nav-link)').forEach(link => {
      link.addEventListener('click', () => {
        setMobileMenu(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        setMobileMenu(false);
      }
    });
  }

  // 4. Creative Bento Mosaic Photo Gallery & Full-Screen Lightbox Modal
  const bentoGalleryWrap = document.getElementById('bentoGalleryWrap');
  const bentoMosaicGrid = document.getElementById('bentoMosaicGrid');
  const btnOpenAllPhotos = document.getElementById('btnOpenAllPhotos');
  const lightboxModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxThumbnailsWrap = document.getElementById('lightboxThumbnailsWrap');

  let currentPhotoIndex = 0;
  const galleryList = (project.gallery && Array.isArray(project.gallery)) ? project.gallery : [];

  // Build Thumbnail strip once if galleryList exists
  function renderLightboxThumbnails() {
    if (!lightboxThumbnailsWrap || !galleryList.length) return;
    lightboxThumbnailsWrap.innerHTML = '';
    galleryList.forEach((item, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `lightbox-thumb-item ${idx === currentPhotoIndex ? 'active' : ''}`;
      thumb.setAttribute('data-idx', idx);
      thumb.innerHTML = `<img src="${item.url}" alt="${item.caption || project.name}">`;
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(idx);
      });
      lightboxThumbnailsWrap.appendChild(thumb);
    });
  }

  function updateActiveThumbnail() {
    if (!lightboxThumbnailsWrap) return;
    const thumbs = lightboxThumbnailsWrap.querySelectorAll('.lightbox-thumb-item');
    thumbs.forEach((th, idx) => {
      if (idx === currentPhotoIndex) {
        th.classList.add('active');
        th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        th.classList.remove('active');
      }
    });
  }

  function openLightbox(index) {
    if (!galleryList.length || !lightboxModal) return;
    currentPhotoIndex = (index + galleryList.length) % galleryList.length;
    const item = galleryList[currentPhotoIndex];
    if (lightboxImg) {
      lightboxImg.src = item.url;
      lightboxImg.alt = item.caption || project.name;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = item.caption || project.name;
    }
    if (lightboxCounter) {
      lightboxCounter.innerHTML = `<span dir="ltr">${currentPhotoIndex + 1} / ${galleryList.length}</span>`;
    }
    updateActiveThumbnail();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentPhotoIndex + 1);
    });
  }
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentPhotoIndex - 1);
    });
  }

  // Click on image to advance to next photo
  if (lightboxImg) {
    lightboxImg.style.cursor = 'pointer';
    lightboxImg.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentPhotoIndex + 1);
    });
  }

  // Close when clicking outside stage and navigation buttons
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-stage')) {
        closeLightbox();
      }
    });
  }

  // Touch Swipe for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // Swipe right (in RTL -> prev)
          openLightbox(currentPhotoIndex - 1);
        } else {
          // Swipe left (in RTL -> next)
          openLightbox(currentPhotoIndex + 1);
        }
      }
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox(currentPhotoIndex - 1); // RTL right arrow = previous
    if (e.key === 'ArrowLeft') openLightbox(currentPhotoIndex + 1);  // RTL left arrow = next
  });

  // Initialize thumbnails once
  renderLightboxThumbnails();

  if (btnOpenAllPhotos) btnOpenAllPhotos.addEventListener('click', () => openLightbox(0));
  if (btnOpenHeroGallery) btnOpenHeroGallery.addEventListener('click', () => openLightbox(0));

  if (bentoGalleryWrap && bentoMosaicGrid) {
    if (galleryList.length > 0) {
      bentoMosaicGrid.innerHTML = '';
      const displayCount = Math.min(5, galleryList.length);

      for (let i = 0; i < displayCount; i++) {
        const item = galleryList[i];
        const cell = document.createElement('div');
        cell.className = `bento-cell ${i === 0 ? 'bento-cell-main' : ''}`;
        
        let overlayHtml = '';
        if (i === 4 && galleryList.length > 5) {
          overlayHtml = `
            <div class="bento-overlay-count">
              <span class="plus-num">+${galleryList.length - 4}</span>
              <span class="t-view">صور إضافية</span>
            </div>
          `;
        }

        cell.innerHTML = `
          <img src="${item.url}" alt="${item.caption || project.name}" loading="lazy">
          <div class="bento-cell-badge">${item.caption || `معاينة ${i + 1}`}</div>
          ${overlayHtml}
        `;

        cell.addEventListener('click', () => openLightbox(i));
        bentoMosaicGrid.appendChild(cell);
      }
      bentoGalleryWrap.style.display = '';

      if (urlParams.get('openGallery') === '1') {
        setTimeout(() => openLightbox(0), 150);
      }
    } else {
      bentoGalleryWrap.style.display = 'none';
    }
  }

  // 5. Specifications Grid (Conditional: only keys present in JSON are rendered)
  const specsSection = document.getElementById('specsSection');
  const specsGrid = document.getElementById('specsGrid');
  if (specsSection && specsGrid) {
    if (project.specs && Object.keys(project.specs).length > 0) {
      specsGrid.innerHTML = '';
      const specLabels = {
        landArea: { label: 'مساحة الأرض', icon: '<path d="M19 12h-2V8h-2v4h-2V6H9v6H7V9H5v10h14v-7z"/>' },
        builtArea: { label: 'مسطح البناء الإجمالي', icon: '<path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>' },
        bedrooms: { label: 'الأجنحة وغرف النوم', icon: '<path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>' },
        bathrooms: { label: 'دورات المياه', icon: '<path d="M12 2c1.1 0 2 .9 2 2v1h5c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h5V4c0-1.1.9-2 2-2z"/>' },
        livingRooms: { label: 'الصالات والمجالس', icon: '<path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z"/>' },
        floors: { label: 'عدد الأدوار والمناسيب', icon: '<path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>' },
        parking: { label: 'مواقف السيارات', icon: '<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/>' },
        facade: { label: 'الواجهة والشارع', icon: '<path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>' },
        elevator: { label: 'المصعد', icon: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 10.5l-2.5 3-2.5-3h5zm0-3h-5l2.5-3 2.5 3z"/>' },
        acSystem: { label: 'نظام التكييف', icon: '<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>' },
        deedType: { label: 'نوع الصك والملكية', icon: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>' },
        overallWarranty: { label: 'الضمان المعتمد', icon: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>' }
      };

      let hasRenderedAnySpec = false;
      for (const [key, val] of Object.entries(project.specs)) {
        if (val && String(val).trim()) {
          hasRenderedAnySpec = true;
          const meta = specLabels[key] || { label: key, icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"/>' };
          const cell = document.createElement('div');
          cell.className = 'spec-cell';
          cell.innerHTML = `
            <div class="spec-cell-icon">
              <svg viewBox="0 0 24 24">${meta.icon}</svg>
            </div>
            <div class="spec-cell-text">
              <span class="label">${meta.label}</span>
              <span class="value">${val}</span>
            </div>
          `;
          specsGrid.appendChild(cell);
        }
      }

      specsSection.style.display = hasRenderedAnySpec ? '' : 'none';
    } else {
      specsSection.style.display = 'none';
    }
  }

  // 6. Features & Amenities (Conditional)
  const featuresSection = document.getElementById('featuresSection');
  const featuresGrid = document.getElementById('featuresGrid');
  if (featuresSection && featuresGrid) {
    if (project.features && Array.isArray(project.features) && project.features.length > 0) {
      featuresGrid.innerHTML = '';
      project.features.forEach(feat => {
        const item = document.createElement('div');
        item.className = 'feature-pill-card';
        item.innerHTML = `
          <div class="feature-check-icon">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </div>
          <span>${feat.name}</span>
        `;
        featuresGrid.appendChild(item);
      });
      featuresSection.style.display = '';
    } else {
      featuresSection.style.display = 'none';
    }
  }

  // 7. Interactive Floor Plans (Conditional)
  const plansSection = document.getElementById('plansSection');
  const plansTabsStrip = document.getElementById('plansTabsStrip');
  const planDetailsFrame = document.getElementById('planDetailsFrame');

  if (plansSection && plansTabsStrip && planDetailsFrame) {
    if (project.floorPlans && Array.isArray(project.floorPlans) && project.floorPlans.length > 0) {
      plansTabsStrip.innerHTML = '';

      function renderPlan(planObj) {
        planDetailsFrame.innerHTML = `
          <div class="plan-img-wrap">
            <img src="${planObj.image}" alt="${planObj.name}" loading="lazy">
          </div>
          <div class="plan-info-wrap">
            <h4>${planObj.name}</h4>
            <p>${planObj.summary || ''}</p>
            ${planObj.spaces && planObj.spaces.length > 0 ? `
              <ul class="plan-spaces-checklist">
                ${planObj.spaces.map(s => `
                  <li>
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    <span>${s}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        `;
      }

      project.floorPlans.forEach((plan, idx) => {
        const tab = document.createElement('button');
        tab.className = `plan-nav-tab ${idx === 0 ? 'active' : ''}`;
        tab.textContent = plan.name;
        tab.addEventListener('click', () => {
          plansTabsStrip.querySelectorAll('.plan-nav-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          renderPlan(plan);
        });
        plansTabsStrip.appendChild(tab);
      });

      renderPlan(project.floorPlans[0]);
      plansSection.style.display = '';
    } else {
      plansSection.style.display = 'none';
    }
  }

  // 8. Nearby Landmarks (Conditional)
  const landmarksSection = document.getElementById('landmarksSection');
  const landmarksGrid = document.getElementById('landmarksGrid');
  const mapFrameWrap = document.getElementById('landmarksMapFrame');

  if (landmarksSection) {
    const hasLandmarks = project.nearbyLandmarks && Array.isArray(project.nearbyLandmarks) && project.nearbyLandmarks.length > 0;
    const hasMap = project.location && project.location.mapEmbedUrl;

    if (hasLandmarks || hasMap) {
      if (landmarksGrid) {
        landmarksGrid.innerHTML = '';
        if (hasLandmarks) {
          project.nearbyLandmarks.forEach(lm => {
            const card = document.createElement('div');
            card.className = 'landmark-item-card';
            card.innerHTML = `
              <div class="landmark-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <div class="landmark-info">
                <span class="name">${lm.name}</span>
                <span class="time">⏱️ ${lm.distance}</span>
              </div>
            `;
            landmarksGrid.appendChild(card);
          });
          landmarksGrid.style.display = '';
        } else {
          landmarksGrid.style.display = 'none';
        }
      }

      if (mapFrameWrap) {
        if (hasMap) {
          mapFrameWrap.innerHTML = `<iframe src="${project.location.mapEmbedUrl}" title="موقع المشروع" allowfullscreen loading="lazy"></iframe>`;
          mapFrameWrap.style.display = '';
        } else {
          mapFrameWrap.style.display = 'none';
        }
      }

      landmarksSection.style.display = '';
    } else {
      landmarksSection.style.display = 'none';
    }
  }

  // 9. Warranties & Guarantee Certificates (Conditional)
  const warrantiesSection = document.getElementById('warrantiesSection');
  const warrantiesGrid = document.getElementById('warrantiesGrid');
  if (warrantiesSection && warrantiesGrid) {
    if (project.warranties && Array.isArray(project.warranties) && project.warranties.length > 0) {
      warrantiesGrid.innerHTML = '';
      project.warranties.forEach(w => {
        const item = document.createElement('div');
        item.className = 'warranty-box-card';
        item.innerHTML = `
          <h4 class="warranty-title">${w.title}</h4>
          <span class="warranty-period-badge">ضمان معتمد: ${w.period}</span>
          ${w.provider ? `<div class="warranty-provider">الجهة الضامنة: ${w.provider}</div>` : ''}
        `;
        warrantiesGrid.appendChild(item);
      });
      warrantiesSection.style.display = '';
    } else {
      warrantiesSection.style.display = 'none';
    }
  }

  // 10. Sidebar Actions & Price Card
  const sidebarPrice = document.getElementById('sidebarPrice');
  const sidebarPricePrefix = document.getElementById('sidebarPricePrefix');
  const sidebarPaymentPlan = document.getElementById('sidebarPaymentPlan');
  const sidebarBrochureBtn = document.getElementById('sidebarBrochureBtn');
  const sidebarWhatsAppBtn = document.getElementById('sidebarWhatsAppBtn');
  const sidebarShareBtn = document.getElementById('sidebarShareBtn');

  if (sidebarPrice) {
    if (project.price) {
      sidebarPrice.innerHTML = `${project.price} ${project.currency ? `<span>${project.currency}</span>` : ''}`;
    }
  }

  if (sidebarPricePrefix && project.pricePrefix) {
    sidebarPricePrefix.textContent = project.pricePrefix;
  }

  // Populate Mobile Bottom Action Bar
  const mBarPrice = document.getElementById('mBarPrice');
  const mBarPriceLabel = document.getElementById('mBarPriceLabel');
  const mBarWaBtn = document.getElementById('mBarWaBtn');

  if (mBarPrice && project.price) {
    mBarPrice.innerHTML = `${project.price} <small style="font-size:0.75rem;color:var(--secondary);font-weight:700;">${project.currency || 'ر.س'}</small>`;
  }
  if (mBarPriceLabel && project.pricePrefix) {
    mBarPriceLabel.textContent = project.pricePrefix;
  }
  if (mBarWaBtn) {
    const waText = encodeURIComponent(`مرحباً شركة رسوخ العقارية، أود الاستفسار عن مشروع (${project.name} - ${project.code || ''}).`);
    mBarWaBtn.href = `https://wa.me/966500000000?text=${waText}`;
  }

  // Payment Plan Box
  if (sidebarPaymentPlan) {
    if (project.paymentPlan && (project.paymentPlan.downPayment || project.paymentPlan.milestones)) {
      sidebarPaymentPlan.innerHTML = `
        <strong>خطة السداد والدفعات:</strong><br>
        ${project.paymentPlan.downPayment ? `• ${project.paymentPlan.downPayment}<br>` : ''}
        ${project.paymentPlan.milestones ? `• ${project.paymentPlan.milestones}` : ''}
      `;
      sidebarPaymentPlan.style.display = '';
    } else {
      sidebarPaymentPlan.style.display = 'none';
    }
  }

  // Brochure PDF Button (Conditional)
  if (sidebarBrochureBtn) {
    if (project.brochurePdf) {
      sidebarBrochureBtn.href = project.brochurePdf;
      sidebarBrochureBtn.style.display = '';
      sidebarBrochureBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('جاري تجهيز وتحميل ملف بروشور ومخططات ' + project.name + ' بصيغة PDF...');
      });
    } else {
      sidebarBrochureBtn.style.display = 'none';
    }
  }

  // WhatsApp Pre-filled CTA
  if (sidebarWhatsAppBtn) {
    const waText = encodeURIComponent(`مرحباً شركة رسوخ العقارية، أود الاستفسار عن تفاصيل ومشروع (${project.name} - ${project.code || ''}).`);
    sidebarWhatsAppBtn.href = `https://wa.me/966500000000?text=${waText}`;
  }

  // Share Project Button
  if (sidebarShareBtn) {
    sidebarShareBtn.addEventListener('click', async () => {
      const shareUrl = window.location.href;
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(shareUrl);
          showToast(`تم نسخ رابط مشروع ${project.name} إلى الحافظة بنجاح!`);
        } catch (e) {
          showToast(`رابط المشروع: ${shareUrl}`);
        }
      } else {
        showToast(`رابط المشروع: ${shareUrl}`);
      }
    });
  }

  // 11. Similar Projects (مشاريع متشابهة) (Conditional)
  const similarSection = document.getElementById('similarSection');
  const similarGrid = document.getElementById('similarGrid');
  if (similarSection && similarGrid) {
    let similarIds = project.similarProjectIds || [];

    // Fallback: If no similar IDs specified, pick 3 other projects from the list
    if (!similarIds.length) {
      similarIds = Object.keys(allProjects).filter(id => id !== project.id).slice(0, 3);
    }

    const validSimilar = similarIds.map(id => allProjects[id]).filter(Boolean).slice(0, 3);

    if (validSimilar.length > 0) {
      similarGrid.innerHTML = '';
      validSimilar.forEach(sim => {
        const card = document.createElement('article');
        card.className = 'project-matrix-card';
        const simImg = (sim.gallery && sim.gallery[0]?.url) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
        card.innerHTML = `
          <div class="p-card-media">
            <img src="${simImg}" alt="${sim.name}" loading="lazy">
            <div class="p-card-overlay"></div>
            <div class="p-card-top-badges">
              <span class="p-category-tag ${sim.categoryKey === 'elite' ? 'tag-elite' : 'tag-series'}">${sim.category || 'مشروع سكني'}</span>
              <span class="p-status-pill ${sim.status === 'available' ? 'pill-available' : 'pill-sold'}">
                <span class="dot"></span> ${sim.statusLabel || 'متاح'}
              </span>
            </div>
            <span class="p-code-badge">${sim.code || ''}</span>
          </div>
          <div class="p-card-body">
            <div class="p-card-location">
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>${sim.location?.district || 'الرياض'}</span>
            </div>
            <h3 class="p-card-title">${sim.name}</h3>
            <p class="p-card-type">${sim.subtitle || ''}</p>
            
            <div class="p-card-footer">
              <div class="p-card-price">
                <span class="pr-label">${sim.pricePrefix || 'يبدأ من'}</span>
                <span class="pr-val">${sim.price} ${sim.currency || ''}</span>
              </div>
              <a href="project-single.html?id=${sim.id}" class="p-card-link-btn">
                <span>عرض الصرح</span>
                <svg viewBox="0 0 24 24"><path d="M14 7l-5 5 5 5V7z"/></svg>
              </a>
            </div>
          </div>
        `;
        similarGrid.appendChild(card);
      });
      similarSection.style.display = '';
    } else {
      similarSection.style.display = 'none';
    }
  }

  // 12. Booking Modal Controller
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const openBookingBtns = document.querySelectorAll('.open-booking-modal');
  const bookingForm = document.getElementById('bookingForm');
  const modalProjectInput = document.getElementById('modalProjectName');

  function openModal() {
    if (bookingModal) {
      if (modalProjectInput) modalProjectInput.value = `${project.name} (${project.code || ''})`;
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openBookingBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBookingModal) closeBookingModal.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => { if (e.target === bookingModal) closeModal(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName')?.value || 'عميلنا العزيز';
      closeModal();
      showToast(`شكراً لك ${name}! تم تسجيل طلبك بخصوص ${project.name} وسيتواصل معك مستشار المشروع فوراً.`);
      bookingForm.reset();
    });
  }

  // Handle WhatsApp Direct Lead Form Submission
  const whatsappLeadForm = document.getElementById('whatsappLeadForm');
  if (whatsappLeadForm) {
    whatsappLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('waLeadName')?.value.trim() || 'عميل كريم';
      const phone = document.getElementById('waLeadPhone')?.value.trim() || '';
      const email = document.getElementById('waLeadEmail')?.value.trim() || 'غير محدد';
      const interest = document.getElementById('waLeadInterest')?.value || 'استفسار عام';

      const messageText = `مرحباً شركة رسوخ العقارية 🌟\nأود الاستفسار والتواصل بخصوص مشروع (${project.name} - ${project.code || ''}):\n\n👤 *الاسم:* ${name}\n📱 *رقم الجوال:* ${phone}\n✉️ *البريد الإلكتروني:* ${email}\n🎯 *نوع الاهتمام:* ${interest}\n\nأرجو تزويدي بكافة التفاصيل والأسعار والمخططات المتاحة، شكراً لكم!`;

      const encodedMsg = encodeURIComponent(messageText);
      const waUrl = `https://wa.me/966500000000?text=${encodedMsg}`;

      showToast(`شكراً لك ${name}! جاري تحويلك الآن لمحادثة واتساب الرسمية مع مستشار رسوخ...`);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      whatsappLeadForm.reset();
    });
  }

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
    setTimeout(() => { toast.classList.remove('show'); }, 4500);
  }

  window.showToast = showToast;
});
