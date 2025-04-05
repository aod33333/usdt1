// Trust Wallet Log Function Fix - Enhanced Solution
(function() {
  // Initialize CONFIG with required settings
  window.CONFIG = {
    debug: true,                // Enable debug logging
    initDelay: 300,            // Delay before initialization (ms)
    version: '3.1.0'           // Version number
  };

  // Define logging function
  window.log = function(message, type = 'info') {
    const CONFIG = window.CONFIG || {debug: true};
    if (CONFIG.debug || type === 'error') {
      const timestamp = new Date().toISOString().substring(11, 19);
      const prefix = type === 'error' ? '🔴' : '🔵';
      console.log(`${prefix} [${timestamp}] TrustWallet Patch: ${message}`);
    }
  };

  // Store original error handler
  const originalOnError = window.onerror;

  // Add global error handler
  window.onerror = function(message, source, lineno, colno, error) {
    log(`Global error: ${message}`, 'error');
    console.error("Error details:", error);
    
    if (typeof originalOnError === 'function') {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };

  // Main initialization function
  function initializeTrustWallet() {
    log('Starting Trust Wallet initialization...');

    // Initialize passcode handling first
    if (typeof window.initPasscodeHandling === 'function') {
      try {
        window.initPasscodeHandling();
        log('Passcode handling initialized');
      } catch (e) {
        log('Failed to initialize passcode handling: ' + e.message, 'error');
      }
    } else {
      log('initPasscodeHandling not found, waiting for script load...', 'error');
      // Wait for combined.js to load and retry
      setTimeout(initializeTrustWallet, 500);
      return;
    }

    // Additional initialization can go here
    log('Trust Wallet initialization complete');
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initializeTrustWallet, 100);
    });
  } else {
    setTimeout(initializeTrustWallet, 100);
  }

  // Log successful setup
  log('Trust Wallet patch loaded successfully');
})();
