(function () {
  function initHero() {
    document.querySelectorAll('.hero-anim').forEach(function (el, i) {
      setTimeout(function () { el.classList.add('is-visible'); }, 80 + i * 200);
    });
  }

  function initScrollReveal() {
    var items = document.querySelectorAll('[data-anim]');
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.dataset.animDelay || 0, 10);
        setTimeout(function () { el.classList.add('is-visible'); }, delay);
        observer.unobserve(el);
      });
    }, { threshold: 0.12 });

    items.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initScrollReveal();
  });
})();
