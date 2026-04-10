/* =============================================
   VISNET – script.js
   ============================================= */

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// === MOBILE MENU ===
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// === SMOOTH SCROLL ===
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      closeMobileMenu();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// === SCROLL REVEAL ANIMATION ===
const revealEls = [
  '.about-grid',
  '.activity-card',
  '.summit-feature',
  '.leader-card',
  '.ict-grid',
  '.contact-item',
  '.contact-form',
  '.partnership-box',
  '.section-header',
  '.pillar',
];

function initReveal() {
  revealEls.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });
}

function checkReveal() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

initReveal();
window.addEventListener('scroll', checkReveal, { passive: true });
window.addEventListener('resize', checkReveal, { passive: true });
checkReveal(); // Run on load

// === CONTACT FORM ===
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate form submission (replace with real API call / Formspree / etc.)
  setTimeout(() => {
    success.classList.add('show');
    btn.textContent = 'Send Message';
    btn.disabled = false;
    e.target.reset();

    // Hide success after 6s
    setTimeout(() => success.classList.remove('show'), 6000);
  }, 1200);
}

// === ACTIVE NAV LINK HIGHLIGHT ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.style.color = '';
    link.style.background = '';
    const href = link.getAttribute('href').replace('#', '');
    if (href === current) {
      link.style.color = 'var(--green)';
      link.style.background = 'var(--green-pale)';
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
