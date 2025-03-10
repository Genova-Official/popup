/**
 * Genova Payment Popup Script (Fixed Version)
 * 
 * This modified script ensures the payment page opens in a popup
 * window rather than a new tab.
 */

// Use an immediately invoked function expression to avoid global scope pollution
(function() {
  // Configuration
  const POPUP_WIDTH = 500;
  const POPUP_HEIGHT = 700;
  
  // Main function to initialize the payment buttons
  function initGenovaPayButtons() {
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
        
        // Calculate center position for the popup
        const left = (window.innerWidth - POPUP_WIDTH) / 2 + window.screenX;
        const top = (window.innerHeight - POPUP_HEIGHT) / 2 + window.screenY;
        
        // The specific window features string is important for opening a popup
        const popup = window.open(
          `https://genovatransact.com/pay/${paymentId}`,
          'GenovaPayment',
          `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},top=${top},left=${left},toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        );
        
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          alert('Popup blocked! Please allow popups for this website to make payments.');
        }
        
        // Return false to prevent any default action
        return false;
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
