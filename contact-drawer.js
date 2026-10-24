/**
 * contact-drawer.js — Universal Instant Contact Drawer for Balaajee V.R. Portfolio
 * 
 * Provides an instant, glassmorphic executive contact drawer on any page.
 * Intercepts all "Get in Touch" buttons (e.g. .btn-contact, href="contact.html", href="#contact").
 */

(function () {
  'use strict';

  // Inject CSS styles for the contact drawer
  const drawerStyles = `
    .bvr-drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 99998;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .bvr-drawer-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .bvr-contact-drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-width: 460px;
      background: #FFFFFF;
      z-index: 99999;
      box-shadow: -10px 0 35px -5px rgba(15, 23, 42, 0.18);
      transform: translateX(100%);
      transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overscroll-behavior: contain;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #0F172A;
    }
    .bvr-contact-drawer.active {
      transform: translateX(0);
    }

    .bvr-drawer-header {
      position: sticky;
      top: 0;
      background: #FFFFFF;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10;
    }

    .bvr-drawer-profile {
      display: flex;
      align-items: center;
      gap: 0.875rem;
    }

    .bvr-drawer-avatar-wrap {
      position: relative;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      overflow: visible;
      flex-shrink: 0;
    }
    .bvr-drawer-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #E2E8F0;
    }
    .bvr-drawer-pulse {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 12px;
      height: 12px;
      background: #10B981;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
    }

    .bvr-drawer-name {
      font-family: 'Overpass', sans-serif;
      font-weight: 800;
      font-size: 1.05rem;
      color: #0F172A;
      line-height: 1.2;
    }
    .bvr-drawer-title {
      font-size: 0.78rem;
      color: #475569;
      font-weight: 600;
      margin-top: 2px;
    }
    .bvr-drawer-pedigree {
      font-size: 0.72rem;
      color: #94A3B8;
      font-family: 'JetBrains Mono', monospace;
      margin-top: 1px;
    }

    .bvr-drawer-close {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #E2E8F0;
      background: #F8FAFC;
      color: #475569;
      font-size: 1.25rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.18s ease;
      line-height: 1;
      padding: 0;
    }
    .bvr-drawer-close:hover {
      background: #0F172A;
      color: #FFFFFF;
      border-color: #0F172A;
    }

    .bvr-drawer-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      flex: 1;
    }

    /* Status Banner */
    .bvr-status-card {
      background: #F0FDF4;
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 10px;
      padding: 0.875rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .bvr-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.75rem;
      font-weight: 700;
      color: #065F46;
      letter-spacing: 0.02em;
    }
    .bvr-status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
    }
    .bvr-status-text {
      font-size: 0.8rem;
      color: #047857;
      line-height: 1.35;
      font-weight: 500;
    }

    /* Contact Cards */
    .bvr-contact-cards {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .bvr-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 1rem;
      transition: all 0.18s ease;
    }
    .bvr-card:hover {
      border-color: #CBD5E1;
      box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.06);
    }

    .bvr-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.35rem;
    }
    .bvr-card-label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748B;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .bvr-card-icon {
      width: 14px;
      height: 14px;
      color: #F00658;
    }

    .bvr-card-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: #0F172A;
      margin-bottom: 0.65rem;
      word-break: break-all;
    }

    .bvr-card-actions {
      display: flex;
      gap: 0.5rem;
    }

    .bvr-btn-primary {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.55rem 0.85rem;
      background: #0F172A;
      color: #FFFFFF;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 6px;
      text-decoration: none;
      transition: background 0.18s ease;
      border: none;
      cursor: pointer;
    }
    .bvr-btn-primary:hover {
      background: #F00658;
    }

    .bvr-btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      padding: 0.55rem 0.85rem;
      background: #F8FAFC;
      color: #334155;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 6px;
      text-decoration: none;
      border: 1px solid #E2E8F0;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .bvr-btn-secondary:hover {
      background: #EEF2F6;
      border-color: #CBD5E1;
      color: #0F172A;
    }

    .bvr-btn-resume {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: #FEF3C7;
      border: 1px solid #F59E0B;
      color: #92400E;
      font-weight: 700;
      font-size: 0.85rem;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.18s ease;
    }
    .bvr-btn-resume:hover {
      background: #FDE68A;
      color: #78350F;
      box-shadow: 0 4px 10px rgba(245, 158, 11, 0.18);
    }

    /* Direct note */
    .bvr-note {
      font-size: 0.78rem;
      color: #64748B;
      line-height: 1.45;
      background: #F8FAFC;
      border-radius: 8px;
      padding: 0.75rem 0.875rem;
      border: 1px solid #E2E8F0;
    }
    .bvr-note strong {
      color: #0F172A;
    }

    /* Toast */
    .bvr-toast {
      position: absolute;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #0F172A;
      color: #FFFFFF;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      z-index: 30;
      white-space: nowrap;
    }
    .bvr-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    @media (max-width: 480px) {
      .bvr-contact-drawer {
        max-width: 100%;
      }
      .bvr-drawer-body {
        padding: 1rem;
      }
    }
  `;

  // Drawer HTML template
  const drawerHTML = `
    <div class="bvr-drawer-overlay" id="bvrDrawerOverlay" aria-hidden="true"></div>
    <aside class="bvr-contact-drawer" id="bvrContactDrawer" role="dialog" aria-modal="true" aria-labelledby="bvrDrawerNameTitle">
      <div class="bvr-drawer-header">
        <div class="bvr-drawer-profile">
          <div class="bvr-drawer-avatar-wrap">
            <img src="profile.jpg" alt="Balaajee V.R." class="bvr-drawer-avatar">
            <div class="bvr-drawer-pulse" title="Immediate Availability"></div>
          </div>
          <div>
            <div class="bvr-drawer-name" id="bvrDrawerNameTitle">Balaajee V.R.</div>
            <div class="bvr-drawer-title">Senior UI/UX Design Manager</div>
            <div class="bvr-drawer-pedigree">18+ Years Exp</div>
          </div>
        </div>
        <button type="button" class="bvr-drawer-close" id="bvrDrawerClose" aria-label="Close Contact Drawer">&times;</button>
      </div>

      <div class="bvr-drawer-body">
        <!-- Status & Mobility -->
        <div class="bvr-status-card">
          <div class="bvr-status-badge">
            <span class="bvr-status-dot"></span> Immediate Availability (0 Days Notice)
          </div>
          <div class="bvr-status-text">
            EU Blue Card Eligible &bull; Open to Relocation (India and Global)
          </div>
        </div>

        <!-- Contact Action Cards -->
        <div class="bvr-contact-cards">
          
          <!-- Email Card -->
          <div class="bvr-card">
            <div class="bvr-card-top">
              <span class="bvr-card-label">
                <svg class="bvr-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Direct Email
              </span>
            </div>
            <div class="bvr-card-value">vrbberaj@gmail.com</div>
            <div class="bvr-card-actions">
              <a href="mailto:vrbberaj@gmail.com?subject=Senior%20Design%20Leadership%20Inquiry%20-%20Balaajee%20V.R." class="bvr-btn-primary">
                Send Email &rarr;
              </a>
              <button type="button" class="bvr-btn-secondary" onclick="bvrCopyText('vrbberaj@gmail.com', 'Email address copied!')">
                Copy
              </button>
            </div>
          </div>

          <!-- LinkedIn Card -->
          <div class="bvr-card">
            <div class="bvr-card-top">
              <span class="bvr-card-label">
                <svg class="bvr-card-icon" style="color: #0A66C2;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn Professional Network
              </span>
            </div>
            <div class="bvr-card-value">LinkedIn Profile</div>
            <div class="bvr-card-actions">
              <a href="https://www.linkedin.com/in/balaajee-vr-21647967/" target="_blank" rel="noopener noreferrer" class="bvr-btn-primary" style="background: #0A66C2;">
                Connect on LinkedIn &rarr;
              </a>
              <button type="button" class="bvr-btn-secondary" onclick="bvrCopyText('https://www.linkedin.com/in/balaajee-vr-21647967/', 'LinkedIn URL copied!')">
                Copy
              </button>
            </div>
          </div>

          <!-- Phone & WhatsApp -->
          <div class="bvr-card">
            <div class="bvr-card-top">
              <span class="bvr-card-label">
                <svg class="bvr-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Direct Phone &bull; WhatsApp
              </span>
            </div>
            <div class="bvr-card-value">+91 9994761293</div>
            <div class="bvr-card-actions">
              <a href="https://wa.me/919994761293" target="_blank" rel="noopener noreferrer" class="bvr-btn-primary" style="background: #059669;">
                WhatsApp Chat &rarr;
              </a>
              <a href="tel:+919994761293" class="bvr-btn-secondary">
                Call
              </a>
              <button type="button" class="bvr-btn-secondary" onclick="bvrCopyText('+919994761293', 'Phone number copied!')">
                Copy
              </button>
            </div>
          </div>

        </div>

        <!-- Download CV Action -->
        <a href="Balaajee_VR_Senior_UX_Manager_CV.pdf" download="Balaajee_VR_Senior_UX_Manager_CV.pdf" class="bvr-btn-resume">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Download Balaajee's Resume (PDF &bull; 474 KB)
        </a>

        <!-- Personal note -->
        <div class="bvr-note">
          <strong>Direct Scope:</strong> Currently exploring full-time <strong>Senior UI/UX Design Leadership</strong> roles across India and Europe / Global. 
        </div>

      </div>

      <div class="bvr-toast" id="bvrDrawerToast">Copied to clipboard!</div>
    </aside>
  `;

  // Initialize drawer on DOM ready
  function initContactDrawer() {
    if (document.getElementById('bvrContactDrawer')) return;

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = drawerStyles;
    document.head.appendChild(styleEl);

    // Inject drawer container
    const container = document.createElement('div');
    container.innerHTML = drawerHTML;
    document.body.appendChild(container);

    const overlay = document.getElementById('bvrDrawerOverlay');
    const drawer = document.getElementById('bvrContactDrawer');
    const closeBtn = document.getElementById('bvrDrawerClose');

    window.openContactDrawer = function () {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    window.closeContactDrawer = function () {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    };

    window.bvrCopyText = function (text, message) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast(message || 'Copied!'));
      } else {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast(message || 'Copied!');
      }
    };

    function showToast(msg) {
      const toast = document.getElementById('bvrDrawerToast');
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    }

    overlay.addEventListener('click', window.closeContactDrawer);
    closeBtn.addEventListener('click', window.closeContactDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        window.closeContactDrawer();
      }
    });

    // Intercept clicks on any contact buttons/links
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.btn-contact, a[href*="contact.html"], a[href="#contact"], [data-contact-trigger]');
      if (target) {
        e.preventDefault();
        window.openContactDrawer();
      }
    });

    // Auto-open if URL has hash or parameter
    if (window.location.hash === '#contact' || window.location.search.includes('contact=open') || window.location.search.includes('open_contact=true')) {
      setTimeout(window.openContactDrawer, 350);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactDrawer);
  } else {
    initContactDrawer();
  }
})();
