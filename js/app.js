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
  // 1. GESTOR DE CARRUSEL DE DESTAQUES
  // ==========================================================================
  const slides = document.querySelectorAll('.home-slide');
  const dots = document.querySelectorAll('.hslider-dot');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0 && dots.length > 0) {
    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    // Auto play (pasa más despacio: cada 8 segundos)
    function startSlider() {
      slideInterval = setInterval(nextSlide, 8000);
    }

    function resetSliderInterval() {
      clearInterval(slideInterval);
      startSlider();
    }

    // Eventos en los puntitos
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetSliderInterval();
      });
    });

    startSlider();
  }

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
