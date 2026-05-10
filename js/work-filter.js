(function () {
  const filters = document.querySelectorAll('.work-filters .tag-pill');
  const cards   = Array.from(document.querySelectorAll('.work-cards-grid work-card'));
  const pending = new WeakMap(); // track per-card hide timeouts

  function applyFilter(active) {
    let idx = 0;

    cards.forEach(card => {
      const match = active === 'all' || card.getAttribute('category') === active;

      // Cancel any in-flight hide timeout for this card
      if (pending.has(card)) {
        clearTimeout(pending.get(card));
        pending.delete(card);
      }

      // Reset animation classes cleanly
      card.classList.remove('card-in', 'card-out');
      void card.offsetWidth; // force reflow so animation restarts

      if (match) {
        card.style.display = '';
        card.style.setProperty('--card-delay', `${idx * 55}ms`);
        card.classList.add('card-in'); // fill-mode:both applies from-state immediately
        idx++;
      } else {
        if (card.style.display === 'none') return; // already hidden, skip
        card.classList.add('card-out');
        const timer = setTimeout(() => {
          card.style.display = 'none';
          card.classList.remove('card-out');
          pending.delete(card);
        }, 220); // slightly over the 200ms CSS duration
        pending.set(card, timer);
      }
    });
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('tag-pill--selected')) return;
      filters.forEach(f => f.classList.toggle('tag-pill--selected', f === btn));
      applyFilter(btn.dataset.filter);
    });
  });
})();
