/* ============================================================
   SHIVAM LAKHOTIA — Portfolio JS
   ============================================================ */

// ── Theme Toggle ──
(function () {
  const html = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');

  // Always default to dark — only switch on user toggle
  let currentTheme = 'dark';
  html.setAttribute('data-theme', currentTheme);

  function updateIcon(theme) {
    if (!btn) return;
    if (theme === 'dark') {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
      btn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  updateIcon(currentTheme);

  if (btn) {
    btn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', currentTheme);
      updateIcon(currentTheme);
    });
  }
})();

// ── Scroll-aware header ──
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (scrollY > 60) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (scrollY > lastScrollY && scrollY > 120) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }

        lastScrollY = scrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── Mobile nav toggle ──
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !mobileNav) return;

  function openNav() {
    toggle.classList.add('open');
    mobileNav.classList.add('open');
    mobileNav.removeAttribute('aria-hidden');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggle.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('open');
    isOpen ? closeNav() : openNav();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });
})();

// ── Scroll reveal ──
(function () {
  const revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();

// ── Add reveal classes dynamically ──
(function () {
  // About section
  const aboutEls = document.querySelectorAll('.about-text h2, .about-body p, .about-tags, .about-photo-col');
  aboutEls.forEach((el, i) => {
    el.classList.add('reveal');
    if (i < 5) el.classList.add(`reveal-delay-${i + 1}`);
  });

  // Work timeline items
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.classList.add('reveal');
    if (i < 5) el.classList.add(`reveal-delay-${i + 1}`);
  });

  // Adventure cards
  document.querySelectorAll('.adventure-card').forEach((el, i) => {
    el.classList.add('reveal');
    if (i < 6) el.classList.add(`reveal-delay-${i + 1}`);
  });

  // Interest items
  document.querySelectorAll('.interest-item').forEach((el, i) => {
    el.classList.add('reveal');
    if (i < 5) el.classList.add(`reveal-delay-${i + 1}`);
  });

  // Contact
  const contactEls = document.querySelectorAll('.contact-inner h2, .contact-sub, .contact-links');
  contactEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.classList.add(`reveal-delay-${i + 1}`);
  });

  // Section labels and headings
  document.querySelectorAll('.section-label, .adventures-title').forEach(el => {
    el.classList.add('reveal');
  });
})();

// ── Smooth active nav link ──
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--color-text)';
          }
        });
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(s => observer.observe(s));
})();
