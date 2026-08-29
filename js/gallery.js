/**
 * CARI CROCHET - Módulo de Galería y Lightbox
 * Maneja el filtrado de imágenes y el visor a pantalla completa
 */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.querySelector('.gallery-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxMeta = document.getElementById('lightboxMeta');
  const closeBtn = document.querySelector('.lightbox-close-btn');
  const prevBtn = document.querySelector('.lightbox-prev-btn');
  const nextBtn = document.querySelector('.lightbox-next-btn');

  let currentItems = [];
  let currentIndex = 0;

  // Actualizar lista activa de elementos en galería
  function updateActiveItems() {
    currentItems = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"])'));
  }

  // Filtrado de Galería
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const allItems = document.querySelectorAll('.gallery-item');

      allItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });

      setTimeout(updateActiveItems, 350);
    });
  });

  // Abrir Lightbox
  function openLightbox(index) {
    updateActiveItems();
    if (index < 0 || index >= currentItems.length) return;

    currentIndex = index;
    const targetItem = currentItems[currentIndex];
    const img = targetItem.querySelector('img');
    const title = targetItem.getAttribute('data-title') || 'Creación Cari Crochet';
    const category = targetItem.getAttribute('data-category-name') || 'Hecho a mano';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || title;
    lightboxTitle.textContent = title;
    lightboxMeta.textContent = `${category} • Foto ${currentIndex + 1} de ${currentItems.length}`;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
  }

  // Cerrar Lightbox
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Navegar siguiente/anterior
  function showNext() {
    if (currentItems.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentItems.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    if (currentItems.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    openLightbox(currentIndex);
  }

  // Event Listeners para cada imagen de la galería
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      updateActiveItems();
      const index = currentItems.indexOf(item);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  // También permitir abrir productos destacados en el lightbox
  document.querySelectorAll('.product-img-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const img = wrap.querySelector('img');
      lightboxImg.src = img.src;
      lightboxTitle.textContent = wrap.closest('.product-card').querySelector('.product-title').textContent;
      lightboxMeta.textContent = 'Pieza destacada • Cari Crochet';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Controles del modal
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  // Cerrar al hacer clic en el fondo oscuro
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  // Controles de teclado (Escape, Flechas)
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Soporte de gestos táctiles (Swipe en móvil)
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      showNext(); // Swipe a la izquierda
    }
    if (touchEndX > touchStartX + threshold) {
      showPrev(); // Swipe a la derecha
    }
  }

  updateActiveItems();
});
