(function () {

  // ── Typewriter ─────────────────────────────────────────────────
  function typewriter(el, text, charDelay, onDone) {
    el.textContent = '';
    el.classList.add('is-typing');
    var i = 0;
    function tick() {
      i++;
      el.textContent = text.slice(0, i);
      if (i < text.length) {
        setTimeout(tick, charDelay);
      } else {
        el.classList.remove('is-typing');
        el.classList.add('is-typed');
        if (onDone) onDone();
      }
    }
    setTimeout(tick, charDelay);
  }

  // ── Parallax — cursor-based ──────────────────────────────────
  function initParallax() {
    var items = [
      { sel: '.cs-letters', sx: 0.018, sy: 0.010 },
    ].map(function (item) {
      item.el = document.querySelector(item.sel);
      return item;
    }).filter(function (item) { return !!item.el; });

    var cx = window.innerWidth  / 2;
    var cy = window.innerHeight / 2;
    var curX = cx, curY = cy;
    var mouseX = cx, mouseY = cy;

    window.addEventListener('resize', function () {
      cx = window.innerWidth  / 2;
      cy = window.innerHeight / 2;
    });

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    (function loop() {
      curX += (mouseX - curX) * 0.06;
      curY += (mouseY - curY) * 0.06;
      var dx = curX - cx;
      var dy = curY - cy;
      items.forEach(function (item) {
        item.el.style.translate = (dx * item.sx) + 'px ' + (dy * item.sy) + 'px';
      });
      requestAnimationFrame(loop);
    }());
  }

  // ── Glitch on mike-splash ──────────────────────────────────────
  function startGlitch() {
    var letters = document.querySelector('.cs-letters');
    if (!letters) return;
    (function scheduleGlitch() {
      setTimeout(function () {
        letters.classList.add('is-glitching');
        setTimeout(function () {
          letters.classList.remove('is-glitching');
          scheduleGlitch();
        }, 450);
      }, 2000 + Math.random() * 4000);
    }());
  }

  // ── Reveal sequence ────────────────────────────────────────────
  function revealSequence() {
    var commit = document.querySelector('.cs-commit');
    var sub    = document.querySelector('.cs-sub');
    var images = ['.cs-letters'];

    if (commit) typewriter(commit, commit.textContent.trim(), 38);

    setTimeout(function () { if (sub) sub.classList.add('is-visible'); }, 2400);

    images.forEach(function (sel, i) {
      setTimeout(function () {
        var el = document.querySelector(sel);
        if (el) el.classList.add('is-visible');
      }, 3100 + i * 180);
    });

    setTimeout(startGlitch, 4200);
  }

  // ── Init ───────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initParallax();
    revealSequence();
  });

}());
