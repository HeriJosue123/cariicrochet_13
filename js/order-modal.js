/**
 * CARI CROCHET - Módulo de Pedidos y Cotizaciones
 * Generador interactivo de pedidos con integración a WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  const orderModal = document.getElementById('orderModal');
  const orderModalClose = document.querySelector('.order-modal-close');
  const orderForm = document.getElementById('orderForm');
  const orderTypeSelect = document.getElementById('orderType');
  const orderDetailsInput = document.getElementById('orderDetails');
  const orderNameInput = document.getElementById('orderName');

  // Abrir modal de pedido
  window.openOrderModal = function(category = 'amigurumi', itemName = '') {
    if (!orderModal) return;

    if (orderTypeSelect && category) {
      orderTypeSelect.value = category;
    }

    if (orderDetailsInput && itemName) {
      orderDetailsInput.value = `Hola, me interesa consultar sobre la creación: "${itemName}".`;
    }

    orderModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Cerrar modal
  window.closeOrderModal = function() {
    if (!orderModal) return;
    orderModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (orderModalClose) {
    orderModalClose.addEventListener('click', closeOrderModal);
  }

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        closeOrderModal();
      }
    });
  }

  // Enviar pedido por WhatsApp
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = orderNameInput ? orderNameInput.value.trim() : '';
      const type = orderTypeSelect ? orderTypeSelect.options[orderTypeSelect.selectedIndex].text : '';
      const details = orderDetailsInput ? orderDetailsInput.value.trim() : '';

      let message = `¡Hola Carito! Vengo desde la página web de *Cari Crochet*.\n\n`;
      if (name) message += `👤 *Nombre:* ${name}\n`;
      if (type) message += `🧶 *Tipo de Creación:* ${type}\n`;
      if (details) message += `📝 *Detalles / Idea:* ${details}\n\n`;
      message += `¿Podrías brindarme más información sobre disponibilidad y cotización? ¡Muchas gracias! ✨`;

      const encodedMessage = encodeURIComponent(message);
      
      // Enlace a WhatsApp (utiliza placeholder o número del cliente)
      // Si no tiene número configurado, abre con el texto listo
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
      closeOrderModal();
    });
  }

  // Vincular botones con disparadores
  document.querySelectorAll('[data-open-order]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.getAttribute('data-order-cat') || 'personalizado';
      const item = btn.getAttribute('data-order-item') || '';
      openOrderModal(cat, item);
    });
  });
});
