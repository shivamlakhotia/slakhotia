/* ============================================================
   SHIVAM LAKHOTIA — Portfolio JS
   All reveal logic unified: classes applied THEN observer set up.
   ============================================================ */

// ── 1. Theme (runs synchronously — no flash) ──────────────────
(function () {
  const html = document.documentElement;
  const btn  = document.querySelector('[data-theme-toggle]');

  // Restore saved preference, otherwise always dark
  let theme = localStorage.getItem('sl-theme') || 'dark';
  html.setAttribute('data-theme', theme);

  function setIcon(t) {
    if (!btn) return;
    btn.innerHTML = t === 'dark'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  setIcon(theme);

  if (btn) {
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', theme);
      localStorage.setItem('sl-theme', theme);
      setIcon(theme);
    });
  }
})();

// ── 2. Scroll-aware header ────────────────────────────────────
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  let lastY = 0, ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 60);
      header.classList.toggle('hidden', y > lastY && y > 120);
      lastY = y;
      ticking = false;
    });
  }, { passive: true });
})();

// ── 3. Mobile nav ─────────────────────────────────────────────
(function () {
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  function close() {
    toggle.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function open() {
    toggle.classList.add('open');
    mobileNav.classList.add('open');
    mobileNav.removeAttribute('aria-hidden');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', () =>
    toggle.classList.contains('open') ? close() : open()
  );

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (toggle.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !toggle.contains(e.target)) {
      close();
    }
  });
})();

// ── 4. Reveal animations (classes applied first, THEN observed) ──
(function () {
  // ---- Step A: tag all elements that should animate ----
  function tag(selector, maxDelay) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (maxDelay && i < maxDelay) el.classList.add(`reveal-delay-${i + 1}`);
    });
  }

  tag('.section-label');
  tag('.about-text h2');
  tag('.about-body p',    5);
  tag('.about-tags');
  tag('.about-photo-col');
  tag('.timeline-item',   5);
  tag('.adventures-title');
  tag('.adventure-card',  6);
  tag('.photo-grid-section');
  tag('.interest-item',   5);
  tag('.writing-card',    3);
  tag('.contact-inner h2');
  tag('.contact-sub');
  tag('.contact-links');

  // ---- Step B: now that .reveal exists, observe everything ----
  // Fallback: no IntersectionObserver support → show everything immediately
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  // Observe — and immediately mark anything already in the viewport as visible
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible'); // already in view on load
    } else {
      observer.observe(el);
    }
  });
})();

// ── 5. Active nav link highlight ─────────────────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!navLinks.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--color-text)' : '';
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();
