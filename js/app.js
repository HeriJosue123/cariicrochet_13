/**
 * CARI CROCHET - Controlador Principal
 * Efectos de navegación, acordeón, animaciones y Modo Oscuro/Claro
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navLinksItems = document.querySelectorAll('.nav-link');
  const faqItems = document.querySelectorAll('.faq-item');
  const themeToggle = document.getElementById('themeToggle');

  // ==========================================================================
  // 1. GESTOR DE TEMA (MODO OSCURO / CLARO) CON LOCALSTORAGE
  // ==========================================================================
  const savedTheme = localStorage.getItem('cari_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('cari_theme', 'dark');
      updateThemeIcon('☀️');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('cari_theme', 'light');
      updateThemeIcon('🌙');
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  }

  function updateThemeIcon(icon) {
    if (themeToggle) {
      const iconEl = themeToggle.querySelector('.theme-icon');
      if (iconEl) iconEl.textContent = icon;
    }
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // ==========================================================================
  // 2. EFECTO SCROLL EN HEADER
  // ==========================================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // 3. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
  // ==========================================================================
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 4. SCROLL SUAVE Y ENLACE ACTIVO EN NAVEGACIÓN
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 5. ANIMACIÓN DE REVELACIÓN SUAVE AL HACER SCROLL
  // ==========================================================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.category-card, .product-card, .gallery-item, .pillar-card, .channel-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
