(function () {
  const ARROW_LG = `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="white" fill-opacity="0.12"/><path d="M28 40H52M44 32L52 40L44 48" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const ARROW_SM = `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="28" fill="white" fill-opacity="0.12"/><path d="M18 28H38M31 21L38 28L31 35" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  class WorkCard extends HTMLElement {
    static get observedAttributes() {
      return ['src', 'title', 'category', 'href', 'variant', 'featured'];
    }
    connectedCallback()                   { this._render(); }
    attributeChangedCallback(n, old, val) { if (old !== null) this._render(); }

    _render() {
      const src      = this.getAttribute('src')      || '';
      const title    = this.getAttribute('title')    || 'Name project';
      const category = this.getAttribute('category') || '';
      const href     = this.getAttribute('href')     || '#';
      const variant  = this.getAttribute('variant')  || 'small';
      const featured = this.hasAttribute('featured');

      if (variant === 'big') {
        const cls = featured ? 'big-card big-card--featured' : 'big-card';
        this.innerHTML = `
          <article class="${cls}">
            <img class="card-bg" src="${src}" alt="${title}">
            ${featured ? '<div class="card-overlay" aria-hidden="true"></div>' : ''}
            <div class="card-bar">
              <div class="card-info">
                <h3>${title}</h3>
                <p>${category}</p>
              </div>
            </div>
            <a href="${href}" class="hover-btn" aria-label="View ${title}">${ARROW_LG}</a>
          </article>`;

      } else if (variant === 'grid') {
        this.innerHTML = `
          <article class="work-small-card">
            <img src="${src}" alt="${title}">
            <div class="work-card-info">
              <h3>${title}</h3>
              <p>${category}</p>
            </div>
            <a href="${href}" class="hover-btn" aria-label="View ${title}">${ARROW_SM}</a>
          </article>`;

      } else {
        // variant="small" — with optional featured modifier
        const cls = featured ? 'small-card small-card--featured' : 'small-card';
        this.innerHTML = `
          <article class="${cls}">
            <img class="card-img" src="${src}" alt="${title}">
            ${featured ? '<div class="card-overlay" aria-hidden="true"></div>' : ''}
            <div class="${featured ? 'card-content-featured' : 'small-card-info'}">
              <h3>${title}</h3>
              <p>${category}</p>
            </div>
            <a href="${href}" class="hover-btn hover-btn--sm" aria-label="View ${title}">${ARROW_SM}</a>
          </article>`;
      }
    }
  }

  customElements.define('work-card', WorkCard);
})();
