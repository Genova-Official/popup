/**
 * Genova Payment Popup Script
 * Version 1.0.0
 * 
 * This script allows easy integration of Genova payment popups
 * into any website by adding a simple button with a data attribute.
 */

(function() {
  // Configuration
  const POPUP_WIDTH = 500;
  const POPUP_HEIGHT = 700;
  
  // Create and append styles
  const style = document.createElement('style');
  style.textContent = `
    .genova-pay-button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 4px;
    }
    
    .genova-pay-button:hover {
      background-color: #45a049;
    }
  `;
  document.head.appendChild(style);
  
  // Main function to initialize the payment buttons
  function initGenovaPayButtons() {
    // Find all buttons with the genova-pay-button class
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
        
        // Calculate center position for the popup
        const left = (window.innerWidth - POPUP_WIDTH) / 2 + window.screenX;
        const top = (window.innerHeight - POPUP_HEIGHT) / 2 + window.screenY;
        
        // Open the payment popup
        const popup = window.open(
          `https://genovatransact.com/pay/${paymentId}`,
          'GenovaPayment',
          `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
        );
        
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          alert('Popup blocked! Please allow popups for this website to make payments.');
        }
      });
    });
  }
  
  // Initialize when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGenovaPayButtons);
  } else {
    initGenovaPayButtons();
  }
  
  // Expose global function for manual initialization
  window.initGenovaPayButtons = initGenovaPayButtons;
})();
