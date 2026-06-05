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

  // ── Parallax — cursor-based, claude excluded (follows cursor separately) ──
  function initParallax() {
    var items = [
      { sel: '.cs-letters', sx: 0.018, sy: 0.010 },
      { sel: '.cs-monkey',  sx: 0.040, sy: 0.025 },
      { sel: '.cs-atari',   sx: 0.028, sy: 0.016 },
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

    var csForm = document.querySelector('.cs-form');
    if (csForm) {
      csForm.addEventListener('mouseenter', disableFollow);
      csForm.addEventListener('mouseleave', enableFollow);
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

    setTimeout(function () {
      var form = document.querySelector('.cs-form');
      if (form) form.classList.add('is-visible');
    }, 4140);

    setTimeout(startGlitch, 4200);
  }

  // ── Init ───────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initParallax();
    initCursorFollow();
    revealSequence();
  });

}());
