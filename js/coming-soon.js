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

  // ── Parallax — claude excluded, it follows cursor instead ──────
  var parallaxItems = [];

  function initParallax() {
    parallaxItems = [
      { sel: '.cs-letters', base: 520, speed: 0.3  },
      { sel: '.cs-monkey',  base: 436, speed: 0.15 },
      { sel: '.cs-atari',   base: 651, speed: 0.1  },
    ].map(function (item) {
      item.el = document.querySelector(item.sel);
      return item;
    }).filter(function (item) { return !!item.el; });
  }

  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(function () {
      var sy = window.scrollY;
      parallaxItems.forEach(function (item) {
        item.el.style.top = (item.base + sy * item.speed) + 'px';
      });
      scrollTicking = false;
    });
  }, { passive: true });

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

  // ── Claude cursor follow ───────────────────────────────────────
  function initCursorFollow() {
    var claudeEl = document.querySelector('.cs-claude');
    if (!claudeEl) return;

    var mouseX = window.innerWidth  * 0.74;
    var mouseY = window.innerHeight * 0.35;
    var curX   = mouseX;
    var curY   = mouseY;
    var followEnabled = true;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function disableFollow() {
      followEnabled = false;
      claudeEl.style.opacity = '0';
      claudeEl.style.pointerEvents = 'none';
    }
    function enableFollow() {
      followEnabled = true;
      claudeEl.style.opacity = '1';
      claudeEl.style.pointerEvents = 'all';
    }

    var barFooter = document.querySelector('.bar-footer');
    if (barFooter) {
      barFooter.addEventListener('mouseenter', disableFollow);
      barFooter.addEventListener('mouseleave', enableFollow);
    }

    function loop() {
      if (followEnabled) {
        curX += (mouseX - curX) * 0.08;
        curY += (mouseY - curY) * 0.08;
        claudeEl.style.left = (curX - claudeEl.offsetWidth  / 2) + 'px';
        claudeEl.style.top  = (curY - claudeEl.offsetHeight / 2) + 'px';
      }
      requestAnimationFrame(loop);
    }
    loop();

    // ── Click: fire orange bullets downward ─────────────────────
    claudeEl.addEventListener('click', function () {
      var rect    = claudeEl.getBoundingClientRect();
      var bx      = rect.left + rect.width / 2;
      var by      = rect.bottom;
      var travelY = window.innerHeight - by + 11;
      var duration = 120 + (travelY / window.innerHeight) * 500;

      [0, 120].forEach(function (delay) {
        setTimeout(function () {
          var bullet = document.createElement('div');
          bullet.className = 'cs-bullet';
          bullet.style.left = (bx - 5.5) + 'px';
          bullet.style.top  = by + 'px';
          document.body.appendChild(bullet);

          bullet.animate([
            { transform: 'translateY(0)',          opacity: 1 },
            { transform: 'translateY(' + travelY + 'px)', opacity: 1 }
          ], { duration: duration, easing: 'linear', fill: 'forwards' }).onfinish = function () {
            bullet.remove();
          };
        }, delay);
      });
    });
  }

  // ── Reveal sequence ────────────────────────────────────────────
  function revealSequence() {
    var commit = document.querySelector('.cs-commit');
    var sub    = document.querySelector('.cs-sub');
    var images = ['.cs-letters', '.cs-monkey', '.cs-atari', '.cs-claude'];

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
    initCursorFollow();
    revealSequence();
  });

}());
