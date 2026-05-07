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
      default: `
        <span style="position:absolute;top:18.75%;left:18.75%;right:21.26%;bottom:21.35%"><img src="https://www.figma.com/api/mcp/asset/822afdfb-c9cb-4bf5-b4aa-051a987c5135" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <span style="position:absolute;background:linear-gradient(180deg,rgba(0,0,0,0),#000);bottom:21.88%;left:21.88%;right:25%;top:37.5%;border-radius:0 0 2px 2px"></span>
        <span style="position:absolute;top:18.75%;left:18.75%;right:21.26%;bottom:21.35%"><span style="position:absolute;inset:-5.22% -5.21%"><img src="https://www.figma.com/api/mcp/asset/fd723a6e-3129-45f0-a14f-b3b2c90a5ccf" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:62.5%;left:33.7%;right:36.32%;bottom:34.65%"><span style="position:absolute;inset:-59.55% -10.42%"><img src="https://www.figma.com/api/mcp/asset/efcd9cdf-e890-4ad8-9471-c29b26aeb858" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>`,
      active: `
        <span style="position:absolute;top:13%;left:21%;right:20%;bottom:34%;background:#835eed;border-radius:3px;transform:rotate(-5.63deg)"></span>
        <span style="position:absolute;top:17%;left:28%;right:19%;bottom:32%;background:#0084ff;border-radius:3px;transform:rotate(2.74deg)"></span>
        <span style="position:absolute;top:18.75%;left:18.75%;right:21.26%;bottom:21.35%"><img src="https://www.figma.com/api/mcp/asset/79c29cef-79b0-47af-b58b-3f701c817677" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <span style="position:absolute;background:linear-gradient(180deg,rgba(0,0,0,0),#000);bottom:21.88%;left:21.88%;right:25%;top:37.5%;border-radius:0 0 2px 2px"></span>
        <span style="position:absolute;top:18.75%;left:18.75%;right:21.26%;bottom:21.35%"><span style="position:absolute;inset:-5.22% -5.21%"><img src="https://www.figma.com/api/mcp/asset/ac09d458-5761-4b52-a435-e6fb53e9004d" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:62.5%;left:33.7%;right:36.32%;bottom:34.65%"><span style="position:absolute;inset:-59.55% -10.42%"><img src="https://www.figma.com/api/mcp/asset/528f034e-0637-42ec-99b4-4e37e0463452" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>`,
    },

    'wall-space': {
      default: `
        <span style="position:absolute;top:71.88%;left:25%;right:9.38%;bottom:15.63%"><img src="https://www.figma.com/api/mcp/asset/dcfb07d1-a763-4c4c-bfac-6825707cfdb2" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <img src="https://www.figma.com/api/mcp/asset/fdc7eb6d-6f80-4e84-a007-919e6627a281" alt="" style="position:absolute;top:6px;left:8px;width:20px;height:18px;display:block;max-width:none">
        <span style="position:absolute;background:linear-gradient(180deg,rgba(0,0,0,0),#000);bottom:28.13%;left:25%;right:15.63%;top:37.5%"></span>
        <span style="position:absolute;top:18.42%;left:24.5%;right:14.36%;bottom:28.04%"><span style="position:absolute;inset:-5.84% -5.11%"><img src="https://www.figma.com/api/mcp/asset/77baffb4-470d-40c7-92df-756282fb35cf" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:14.89%;left:34.95%;right:19.55%;bottom:47.52%"><span style="position:absolute;inset:-7.48% -6.18%"><img src="https://www.figma.com/api/mcp/asset/3f741e45-7ea1-41a6-bb84-e1c8c01b6849" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:46.33%;left:9.95%;right:74.83%;bottom:29.39%"><img src="https://www.figma.com/api/mcp/asset/a80f05c7-5a3f-4d74-ac64-43f58d10d4c5" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <span style="position:absolute;top:39.69%;left:57.16%;right:22.22%;bottom:52.72%"><img src="https://www.figma.com/api/mcp/asset/7f736520-6d9e-433c-95bd-4d6ef0161b6d" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <span style="position:absolute;top:52.16%;left:60.96%;right:26.02%;bottom:41.32%"><span style="position:absolute;inset:-38.39% -19.2%"><img src="https://www.figma.com/api/mcp/asset/4a7bd5e0-d272-44c5-8aeb-cea9e7fd5d42" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:71.88%;left:25%;right:9.38%;bottom:15.63%"><span style="position:absolute;inset:-25% -4.76%"><img src="https://www.figma.com/api/mcp/asset/a9019343-e921-4170-983c-7692579b18a1" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:17.09%;left:11.74%;right:71.81%;bottom:66.46%"><img src="https://www.figma.com/api/mcp/asset/c878834a-dd6f-4fe6-87ab-f5590a84b673" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>`,
      active: `
        <img src="https://www.figma.com/api/mcp/asset/327a0ac9-4d02-45f7-bafa-19ec4fb3eb34" alt="" style="position:absolute;top:6px;left:8px;width:20px;height:18px;display:block;max-width:none">
        <span style="position:absolute;background:linear-gradient(180deg,rgba(0,0,0,0),#000);bottom:28.13%;left:25%;right:15.63%;top:37.5%"></span>
        <span style="position:absolute;top:18.42%;left:24.5%;right:14.36%;bottom:28.04%"><span style="position:absolute;inset:-5.84% -5.11%"><img src="https://www.figma.com/api/mcp/asset/b3f9e2e9-e423-4ac7-8105-344dae7649d2" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:14.89%;left:34.95%;right:19.55%;bottom:47.52%"><span style="position:absolute;inset:-7.48% -6.18%"><img src="https://www.figma.com/api/mcp/asset/c1c8001e-b777-4770-b978-2d366ccb49b4" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:46.33%;left:9.95%;right:74.83%;bottom:29.39%"><img src="https://www.figma.com/api/mcp/asset/7a3ba411-ce78-4bde-b850-29d18933713f" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <span style="position:absolute;top:39.69%;left:57.16%;right:22.22%;bottom:52.72%"><img src="https://www.figma.com/api/mcp/asset/aca5b9b3-8e66-46ca-9132-3522972438f5" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <span style="position:absolute;top:52.16%;left:60.96%;right:26.02%;bottom:41.32%"><span style="position:absolute;inset:-38.39% -19.2%"><img src="https://www.figma.com/api/mcp/asset/577604da-fd42-4ec2-9d51-77e236b90858" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:71.88%;left:25%;right:9.38%;bottom:15.63%"><span style="position:absolute;inset:-25% -4.76%"><img src="https://www.figma.com/api/mcp/asset/488d4cfd-5b14-4073-ba1f-20e35908a3dc" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:17.09%;left:11.74%;right:71.81%;bottom:66.46%"><img src="https://www.figma.com/api/mcp/asset/ba73940a-ba05-459b-a79e-47bb7bc6674f" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>`,
    },

    about: {
      default: `
        <span style="position:absolute;top:18.75%;left:25%;right:25%;bottom:20.09%"><img src="https://www.figma.com/api/mcp/asset/6909dc54-5a83-451c-9a8e-1a74010c9032" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <span style="position:absolute;background:linear-gradient(180deg,rgba(0,0,0,0),#000);bottom:18.75%;left:25%;right:25%;top:59.38%;border-radius:0 0 2px 2px"></span>
        <span style="position:absolute;top:58.48%;left:25%;right:25%;bottom:20.09%"><span style="position:absolute;inset:-14.58% -6.25%"><img src="https://www.figma.com/api/mcp/asset/6eec3931-e3a7-478c-8ac2-cf844213775e" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:18.75%;left:35.71%;right:35.71%;bottom:52.68%"><span style="position:absolute;inset:-10.94%"><img src="https://www.figma.com/api/mcp/asset/73763574-1449-42c3-bd6c-7f1bde39889e" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:33.21%;left:35.71%;right:35.71%;bottom:52.5%;transform:rotate(180deg)"><span style="position:absolute;inset:-21.88% -10.94%"><img src="https://www.figma.com/api/mcp/asset/6d2b51c2-8331-4672-b95c-957c29e711cd" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>`,
      active: `
        <span style="position:absolute;top:21.88%;left:21.88%;right:40.63%;bottom:40.63%"><img src="https://www.figma.com/api/mcp/asset/318232e1-a94e-4191-8ebd-aaafb3f19da4" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <span style="position:absolute;top:18.75%;left:25%;right:25%;bottom:20.09%"><img src="https://www.figma.com/api/mcp/asset/233ef796-a0c9-4fd6-a40c-7b30bfd2ada0" alt="" style="position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none"></span>
        <span style="position:absolute;top:58.48%;left:25%;right:25%;bottom:20.09%"><span style="position:absolute;inset:-14.58% -6.25%"><img src="https://www.figma.com/api/mcp/asset/911a09fb-d030-4c49-8723-9e96e8281ecd" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>
        <span style="position:absolute;top:18.75%;left:35.71%;right:35.71%;bottom:52.68%"><span style="position:absolute;inset:-10.94%"><img src="https://www.figma.com/api/mcp/asset/1cec0eb6-2d0a-4a35-bf75-67464506bd22" alt="" style="display:block;width:100%;height:100%;max-width:none"></span></span>`,
    },
  };

  /* ─── Logo & Social assets per context ──────────────────────── */

  const LOGOS = {
    default:    'https://www.figma.com/api/mcp/asset/5b1a806d-8704-4bb8-9042-f6cf4a315041',
    'wall-space':'https://www.figma.com/api/mcp/asset/adea3e44-c554-4037-89b8-6249a708bd91',
  };

  const SOCIAL = {
    default: `
      <a href="https://instagram.com" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="https://www.figma.com/api/mcp/asset/1fa87762-e164-4d80-aee9-9835ac451192" alt="Instagram" width="20" height="20"></a>
      <a href="https://dribbble.com"  class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Dribbble"><img src="https://www.figma.com/api/mcp/asset/3104bc10-15c8-4727-a969-c171d7b62811" alt="Dribbble"  width="20" height="20"></a>
      <a href="https://unsplash.com"  class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Unsplash"><img src="https://www.figma.com/api/mcp/asset/44451d82-714c-4376-ab2f-7b1850032694" alt="Unsplash"  width="20" height="20"></a>`,
    'wall-space': `
      <a href="https://instagram.com" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="https://www.figma.com/api/mcp/asset/732d254c-03cc-42c9-a0ce-e10a716249aa" alt="Instagram" width="20" height="20"></a>
      <a href="https://dribbble.com"  class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Dribbble"><img src="https://www.figma.com/api/mcp/asset/6f9214a7-33bc-4588-8b7d-118a928db5d1" alt="Dribbble"  width="20" height="20"></a>
      <a href="https://unsplash.com"  class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Unsplash"><img src="https://www.figma.com/api/mcp/asset/34d1da4c-f6f9-46e1-85ae-cc2e38a7596e" alt="Unsplash"  width="20" height="20"></a>`,
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
