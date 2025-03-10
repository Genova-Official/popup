/**
 * Genova Payment Modal Script
 * Version 1.0.0
 * 
 * This script creates a modal dialog for Genova payment integration.
 */

(function() {
  // Create the modal elements if they don't exist
  function createModalElements() {
    // Check if modal already exists
    if (document.getElementById('genovaModalOverlay')) {
      return;
    }
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'genovaModalOverlay';
    overlay.className = 'genova-modal-overlay';
    
    // Create modal container
    const container = document.createElement('div');
    container.className = 'genova-modal-container';
    
    // Create modal header
    const header = document.createElement('div');
    header.className = 'genova-modal-header';
    
    const title = document.createElement('h3');
    title.textContent = 'Complete Your Payment';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'genova-modal-close';
    closeButton.innerHTML = '&times;';
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'genovaPaymentFrame';
    iframe.className = 'genova-modal-iframe';
    iframe.title = 'Genova Payment';
    
    // Assemble the modal
    container.appendChild(header);
    container.appendChild(iframe);
    overlay.appendChild(container);
    
    // Add modal to the document
    document.body.appendChild(overlay);
    
    // Add styles to the document
    addModalStyles();
  }
  
  // Add modal styles to the document
  function addModalStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .genova-modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;
      }
      
      .genova-modal-container {
        position: relative;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow: hidden;
      }
      
      .genova-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
      }
      
      .genova-modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6c757d;
      }
      
      .genova-modal-iframe {
        width: 100%;
        height: 600px;
        border: none;
      }
      
      body.genova-modal-open {
        overflow: hidden;
      }
    `;
    document.head.appendChild(styleEl);
  }
  
  // Function to open modal
  function openGenovaModal(paymentId) {
    const overlay = document.getElementById('genovaModalOverlay');
    const iframe = document.getElementById('genovaPaymentFrame');
    
    iframe.src = `https://genovatransact.com/pay/${paymentId}`;
    overlay.style.display = 'flex';
    document.body.classList.add('genova-modal-open');
  }
  
  // Function to close modal
  function closeGenovaModal() {
    const overlay = document.getElementById('genovaModalOverlay');
    const iframe = document.getElementById('genovaPaymentFrame');
    
    overlay.style.display = 'none';
    iframe.src = 'about:blank';
    document.body.classList.remove('genova-modal-open');
  }
  
  // Initialize Genova Pay buttons
  function initGenovaPayButtons() {
    // Create modal elements if they don't exist
    createModalElements();
    
    // Find all buttons with the genova-pay-button class or data-genova-pay attribute
    const buttons = document.querySelectorAll('.genova-pay-button, [data-genova-pay]');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the payment ID from the data attribute
        const paymentId = this.getAttribute('data-payment-id');
        
        if (!paymentId) {
          console.error('Genova Pay Error: No payment ID provided. Add data-payment-id attribute to your button.');
          return;
        }
        
        openGenovaModal(paymentId);
        return false;
      });
    });
    
    // Set up close button event handler
    const closeButton = document.querySelector('.genova-modal-close');
    closeButton.addEventListener('click', closeGenovaModal);
    
    // Close modal when clicking outside the modal container
    const overlay = document.getElementById('genovaModalOverlay');
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeGenovaModal();
      }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.style.display === 'flex') {
        closeGenovaModal();
      }
    });
  }
  
  // Initialize when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGenovaPayButtons);
  } else {
    initGenovaPayButtons();
  }
  
  // Expose global functions
  window.GenovaPay = {
    openModal: openGenovaModal,
    closeModal: closeGenovaModal,
    init: initGenovaPayButtons
  };
})();
