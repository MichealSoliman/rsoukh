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
    console.warn('Could not fetch data/projects.json directly, using fallback.', err);
    // Graceful error notification
    showToast('جاري تحميل بيانات الصرح المعماري...');
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

  // 4. Interactive Photo Gallery Showcase (Conditional)
  const galleryContainer = document.getElementById('galleryContainer');
  if (galleryContainer) {
    if (project.gallery && Array.isArray(project.gallery) && project.gallery.length > 0) {
      const mainImg = document.getElementById('galleryMainImg');
      const captionText = document.getElementById('galleryCaptionText');
      const counterPill = document.getElementById('galleryCounterPill');
      const thumbsRow = document.getElementById('galleryThumbsRow');

      let activeIndex = 0;

      function setPhoto(index) {
        if (!project.gallery[index]) return;
        activeIndex = index;
        const item = project.gallery[index];
        if (mainImg) {
          mainImg.style.opacity = '0.4';
          setTimeout(() => {
            mainImg.src = item.url;
            mainImg.alt = item.caption || project.name;
            mainImg.style.opacity = '1';
          }, 150);
        }
        if (captionText) captionText.textContent = item.caption || project.name;
        if (counterPill) counterPill.textContent = `صورة ${index + 1} من ${project.gallery.length}`;

        // Update active thumbnail
        if (thumbsRow) {
          thumbsRow.querySelectorAll('.thumb-item').forEach((t, i) => {
            if (i === index) t.classList.add('active');
            else t.classList.remove('active');
          });
        }
      }

      // Populate Thumbnails
      if (thumbsRow) {
        thumbsRow.innerHTML = '';
        project.gallery.forEach((g, idx) => {
          const thumb = document.createElement('div');
          thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
          thumb.innerHTML = `<img src="${g.url}" alt="${g.caption || ''}" loading="lazy">`;
          thumb.addEventListener('click', () => setPhoto(idx));
          thumbsRow.appendChild(thumb);
        });
      }

      setPhoto(0);
      galleryContainer.style.display = '';
    } else {
      galleryContainer.style.display = 'none';
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
