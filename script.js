/* ========== Mobile Menu ========== */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

// Close menu on link click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  if (menu && menu.classList.contains('active')) {
    if (e.target.closest('.nav-links a')) {
      menu.classList.remove('active');
    }
  }
});

/* ========== Navbar scroll shadow ========== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

/* ========== Scroll Animations ========== */
const animateElements = document.querySelectorAll(
  '.animate-on-scroll, .fade-up, .scale-up, .slide-left, .slide-right, .slide-down, .zoom-in, ' +
  '.section, .card, .news-card, .stat-card, .about-content'
);

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.1
};

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // Add stagger delay for grouped elements
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c =>
          c.classList.contains('animate-on-scroll') ||
          c.classList.contains('fade-up') ||
          c.classList.contains('scale-up')
        );
        const sibIndex = siblings.indexOf(el);
        if (sibIndex > -1) {
          el.style.transitionDelay = `${sibIndex * 0.1}s`;
        }
      }
      el.classList.add('visible');
      animateObserver.unobserve(el);
    }
  });
}, observerOptions);

animateElements.forEach(el => animateObserver.observe(el));

/* ========== Active nav link highlight ========== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
    // Also highlight parent nav-item
    const parentItem = link.closest('.nav-item');
    if (parentItem) {
      const parentLink = parentItem.firstElementChild;
      if (parentLink && parentLink.tagName === 'A') parentLink.classList.add('active');
    }
  }
});

/* ========== Mobile dropdown toggle ========== */
document.querySelectorAll('.nav-item > a').forEach(link => {
  link.addEventListener('click', function(e) {
    // Only on mobile (when .nav-links is not visible as flex row)
    if (window.innerWidth <= 768) {
      const parent = this.closest('.nav-item');
      if (parent) {
        e.preventDefault();
        parent.classList.toggle('open');
      }
    }
  });
});

// Close dropdowns when clicking outside
// Also close mobile menu when clicking a dropdown link
document.querySelectorAll('.nav-dropdown a').forEach(link => {
  link.addEventListener('click', function() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('active');
  });
});
