/* ═══════════════════════════════════════════════════
   main.js — itsnemo.dev/work
   GSAP + ScrollTrigger for animations
   IntersectionObserver fallback for no-JS
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Lucide icons ─────────────────────────────── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }


  /* ── Nav scroll behavior ─────────────────────── */
  const nav = document.querySelector('#nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  /* ── GSAP + ScrollTrigger ────────────────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero text — staggered entrance on load
    const heroTl = gsap.timeline({ delay: 0.1 });

    heroTl
      .from('.hero-text .eyebrow', {
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out'
      })
      .from('.hero-headline', {
        opacity: 0, y: 32, duration: 0.8, ease: 'power3.out'
      }, '-=0.45')
      .from('.hero-subline', {
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out'
      }, '-=0.5')
      .from('.hero-actions', {
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out'
      }, '-=0.45')
      .from('.hero-visual', {
        opacity: 0, scale: 0.92, duration: 1, ease: 'power3.out'
      }, '-=0.8');


    // Scroll-triggered reveals — handle .reveal elements
    // (We animate with GSAP instead of the CSS class toggle for smoother results)
    const revealEls = document.querySelectorAll('.reveal');

    revealEls.forEach((el) => {
      // Get any existing transition-delay from inline style
      const delayStr = el.style.transitionDelay || '0s';
      const delay = parseFloat(delayStr) || 0;

      // Reset the CSS opacity/transform (GSAP takes over)
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      });
    });


    // Card hover micro-interaction enhancement
    // (adds a subtle amber glow shimmer on enter)
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -4,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });


    // Section headers — slight parallax on scroll
    document.querySelectorAll('.section-header').forEach(header => {
      gsap.to(header, {
        y: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: header,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });

  } else {
    // Fallback: IntersectionObserver if GSAP fails to load
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }


  /* ── Mobile hamburger nav ───────────────────── */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on nav link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ── Smooth scroll for anchor links ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });


  /* ── Contact form handling ───────────────────── */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      const action = form.getAttribute('action') || '';

      // If using Formspree (action contains formspree.io)
      if (action.includes('formspree.io')) {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;

        try {
          const data = new FormData(form);
          const response = await fetch(action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            form.hidden = true;
            successMsg.hidden = false;
            // animate success message in
            if (typeof gsap !== 'undefined') {
              gsap.from(successMsg, { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' });
            }
          } else {
            submitBtn.textContent = 'Something went wrong — try again';
            submitBtn.disabled = false;
          }
        } catch {
          submitBtn.textContent = 'Something went wrong — try again';
          submitBtn.disabled = false;
        }

      } else {
        // mailto fallback — let form submit naturally
        // Show success state after a brief delay (won't work in all browsers, but good UX hint)
        setTimeout(() => {
          form.hidden = true;
          successMsg.hidden = false;
        }, 800);
      }
    });
  }


  /* ── Fix: 5-card grid centering on large screens ─ */
  // Dynamically center last 2 cards in the "What I Build" grid on ≥1024px
  function fixFiveCardGrid() {
    const grid = document.querySelector('.card-grid--5');
    if (!grid) return;
    const cards = grid.querySelectorAll('.card');
    if (cards.length !== 5) return;

    if (window.innerWidth >= 1024) {
      // Reset inline styles first
      cards[3].style.gridColumn = '';
      cards[4].style.gridColumn = '';
      cards[3].style.marginLeft = '';
      cards[4].style.marginLeft = '';

      // Place last 2 in a centered row using grid-column
      grid.style.gridTemplateColumns = 'repeat(6, 1fr)';
      cards[0].style.gridColumn = 'span 2';
      cards[1].style.gridColumn = 'span 2';
      cards[2].style.gridColumn = 'span 2';
      cards[3].style.gridColumn = '2 / span 2';
      cards[4].style.gridColumn = '4 / span 2';
    } else {
      // Reset
      grid.style.gridTemplateColumns = '';
      cards.forEach(c => c.style.gridColumn = '');
    }
  }

  fixFiveCardGrid();
  window.addEventListener('resize', fixFiveCardGrid);

});
