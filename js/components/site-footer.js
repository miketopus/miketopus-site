/**
 * <site-footer>
 *
 * Custom Element that renders the full site footer.
 * No shadow DOM — inherits global styles from css/styles.css.
 */
(function () {

  class SiteFooter extends HTMLElement {
    connectedCallback() { this._render(); }

    _render() {
      this.innerHTML = `
        <footer class="site-footer">
          <div class="footer-space" aria-hidden="true"></div>
          <div class="bar-footer">
            <span>All Rights Reserved  ©2024</span>
            <a href="wall-space.html">Wall Space Store</a>
          </div>
        </footer>`;
    }
  }

  customElements.define('site-footer', SiteFooter);

})();
