/**
 * <site-header page="work|wall-space|about|">
 *
 * Custom Element that renders the full site header + mobile menu.
 * Set the `page` attribute to the current page slug to activate
 * the correct nav item and show the right page label on mobile.
 *
 * No shadow DOM — inherits global styles from css/styles.css.
 */
(function () {

  /* ─── Icon HTML (shared between desktop 32px and mobile 40px) ─ */

  const ICONS = {
    work: {
      default: `<img src="assets/icons/menu/work.svg" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;">`,
      active:  `<img src="assets/icons/menu/worlk_selected.svg" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;">`,
    },
    'wall-space': {
      default: `<img src="assets/icons/menu/wspace.svg" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;">`,
      active:  `<img src="assets/icons/menu/wspace_selected.svg" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;">`,
    },
    about: {
      default: `<img src="assets/icons/menu/about.svg" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;">`,
      active:  `<img src="assets/icons/menu/about_selected.svg" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;">`,
    },
  };

  /* ─── Logo & Social assets per context ──────────────────────── */

  const LOGOS = {
    default:     'assets/avatar-miketopus.png',
    'wall-space': 'assets/avatar-miketopus.png',
  };

  const SOCIAL = {
    default: `
      <a href="https://instagram.com" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="assets/icons/instagram.svg" alt="Instagram" width="20" height="20"></a>
      <a href="https://dribbble.com"  class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Dribbble"><img src="assets/icons/dribbble.svg"   alt="Dribbble"  width="20" height="20"></a>
      <a href="https://unsplash.com"  class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Unsplash"><img src="assets/icons/unsplash.svg"   alt="Unsplash"  width="20" height="20"></a>`,
    'wall-space': `
      <a href="https://instagram.com" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="assets/icons/instagram.svg" alt="Instagram" width="20" height="20"></a>
      <a href="https://dribbble.com"  class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Dribbble"><img src="assets/icons/dribbble.svg"   alt="Dribbble"  width="20" height="20"></a>
      <a href="https://unsplash.com"  class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Unsplash"><img src="assets/icons/unsplash.svg"   alt="Unsplash"  width="20" height="20"></a>`,
  };

  /* ─── Helpers ────────────────────────────────────────────────── */

  const CHEVRON_RIGHT = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const CHEVRON_DOWN  = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const PAGES = [
    { id: 'work',       href: 'work.html',       label: 'work',       desktopText: 'work'      },
    { id: 'wall-space', href: 'wall-space.html',  label: 'wall space', desktopText: 'wall space' },
    { id: 'about',      href: 'about.html',       label: 'about',      desktopText: 'about'     },
  ];

  function navItem(p, activePage) {
    const active  = p.id === activePage;
    const icon    = active ? ICONS[p.id].active : ICONS[p.id].default;
    return `
      <a href="${p.href}" class="nav-item${active ? ' active' : ''}"${active ? ' aria-current="page"' : ''}>
        <span class="nav-icon" aria-hidden="true">${icon}</span>
        ${p.desktopText}
      </a>`;
  }

  function mobileItem(p, activePage) {
    const active = p.id === activePage;
    const icon   = active ? ICONS[p.id].active : ICONS[p.id].default;
    return `
      <a href="${p.href}" class="mobile-menu-item${active ? ' active' : ''}">
        <span class="mobile-nav-icon" aria-hidden="true">${icon}</span>
        ${p.label}
        ${active ? '' : `<span class="mobile-menu-chevron" aria-hidden="true">${CHEVRON_RIGHT}</span>`}
      </a>`;
  }

  /* ─── Web Component ──────────────────────────────────────────── */

  class SiteHeader extends HTMLElement {
    static get observedAttributes() { return ['page']; }

    connectedCallback()                        { this._render(); }
    attributeChangedCallback(n, old, val)      { if (old !== null) this._render(); }

    _render() {
      const page    = this.getAttribute('page') || '';
      const logo    = LOGOS[page] || LOGOS.default;
      const social  = SOCIAL[page] || SOCIAL.default;
      const btnLabel = { work: 'work', 'wall-space': 'wall space', about: 'about' }[page] || 'menu';

      this.innerHTML = `
        <header class="site-header">
          <a href="index.html" class="header-logo" aria-label="miketopus home">
            <img src="${logo}" alt="miketopus logo">
          </a>

          <button class="header-mobile-btn" id="mobile-menu-btn"
                  aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
            <span class="mobile-btn-label">${btnLabel}</span>
            <span class="mobile-btn-icon" aria-hidden="true">${CHEVRON_DOWN}</span>
          </button>

          <nav class="header-nav" aria-label="Main navigation">
            ${PAGES.map(p => navItem(p, page)).join('')}
          </nav>

          <div class="header-social">${social}</div>
        </header>

        <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
          <div class="mobile-menu-card">
            ${PAGES.map(p => mobileItem(p, page)).join('')}
          </div>
        </div>`;

      this._initMenu();
    }

    _initMenu() {
      const btn  = this.querySelector('#mobile-menu-btn');
      const menu = this.querySelector('#mobile-menu');
      if (!btn || !menu) return;

      const open  = () => { menu.classList.add('is-open');    btn.classList.add('is-open');    btn.setAttribute('aria-expanded','true');  menu.setAttribute('aria-hidden','false'); };
      const close = () => { menu.classList.remove('is-open'); btn.classList.remove('is-open'); btn.setAttribute('aria-expanded','false'); menu.setAttribute('aria-hidden','true');  };

      btn.addEventListener('click', e => { e.stopPropagation(); menu.classList.contains('is-open') ? close() : open(); });
      document.addEventListener('click', e => { if (!this.contains(e.target)) close(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }
  }

  customElements.define('site-header', SiteHeader);

})();
