(function() {
  function initSidebar() {
    if (document.getElementById('app-left-sidebar')) return;

    // Check if stylesheet is loaded
    if (!document.querySelector('link[href*="sidebar.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/sidebar.css';
      document.head.appendChild(link);
    }

    const currentPath = window.location.pathname;

    const navItems = [
      {
        section: "EXECUTIVE PORTFOLIO",
        items: [
          {
            title: "Leadership Deck (10 Slides)",
            path: "/leadership-deck",
            badge: "Featured",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
          },
          {
            title: "Corporate UX Leader",
            path: "/",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
          },
          {
            title: "UI/UX Case Studies (5)",
            path: "/#cases",
            badge: "New",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`
          }
        ]
      },
      {
        section: "APPLICATION TRACKING",
        items: [
          {
            title: "Live Tracker (26 Applied)",
            path: "/tracker",
            badge: "26 Active",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`
          }
        ]
      },
      {
        section: "INTERVIEW PREPARATION",
        items: [
          {
            title: "1st Call: Screening Prep",
            path: "/prep-first-call",
            badge: "Essential",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`
          },
          {
            title: "Subsequent Stages: Studio & Panel",
            path: "/prep-interview-stages",
            badge: "Stages 2-4",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
          }
        ]
      }
    ];

    const sidebar = document.createElement('aside');
    sidebar.id = 'app-left-sidebar';

    let navHtml = '';
    navItems.forEach(group => {
      navHtml += `<div class="sb-section-label">${group.section}</div>`;
      navHtml += `<div class="sb-nav-group">`;
      group.items.forEach(item => {
        const isActive = (currentPath === item.path) || (item.path === '/' && (currentPath === '' || currentPath === '/index.html'));
        navHtml += `
          <a href="${item.path}" class="sb-link ${isActive ? 'active' : ''}">
            ${item.icon}
            <span>${item.title}</span>
            ${item.badge ? `<span class="sb-badge sb-badge-gold">${item.badge}</span>` : ''}
          </a>
        `;
      });
      navHtml += `</div>`;
    });

    sidebar.innerHTML = `
      <div class="sb-header">
        <div class="sb-brand-wrap">
          <img src="/profile.jpg" alt="Balaajee VR" class="sb-avatar">
          <div class="sb-title-group">
            <h2>BALAAJEE VR</h2>
            <span>Executive &amp; UX Hub</span>
          </div>
        </div>
        <button class="sb-close-btn" id="sb-collapse-trigger" title="Collapse sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>
      <div class="sb-nav-body">
        ${navHtml}
      </div>
      <div class="sb-footer">
        <button class="sb-action-btn" onclick="window.print()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print / Save PDF
        </button>
      </div>
    `;

    // Floating toggle button for restoring sidebar when collapsed
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'sidebar-toggle-btn';
    toggleBtn.title = 'Open Navigation';
    toggleBtn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;

    document.body.appendChild(sidebar);
    document.body.appendChild(toggleBtn);

    const isResumePage = !currentPath.includes('prep-') && !currentPath.includes('tracker');

    function updatePadding() {
      if (isResumePage && window.innerWidth >= 1240 && !sidebar.classList.contains('sb-collapsed')) {
        document.body.classList.add('has-sidebar-padding');
      } else {
        document.body.classList.remove('has-sidebar-padding');
      }
    }

    // Event listeners
    const collapseTrigger = document.getElementById('sb-collapse-trigger');
    collapseTrigger.addEventListener('click', () => {
      sidebar.classList.add('sb-collapsed');
      toggleBtn.style.display = 'flex';
      localStorage.setItem('sb_collapsed', 'true');
      updatePadding();
    });

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.remove('sb-collapsed');
      toggleBtn.style.display = 'none';
      localStorage.setItem('sb_collapsed', 'false');
      updatePadding();
    });

    // Check stored preference
    if (localStorage.getItem('sb_collapsed') === 'true') {
      sidebar.classList.add('sb-collapsed');
      toggleBtn.style.display = 'flex';
    } else {
      toggleBtn.style.display = 'none';
    }

    updatePadding();
    window.addEventListener('resize', updatePadding);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
