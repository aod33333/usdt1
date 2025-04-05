// Trust Wallet Log Function Fix - Enhanced Solution
// Initialize logging and core functionality before combined.js loads

(function() {
  // Initialize CONFIG with required settings
  window.CONFIG = {
    debug: true,                // Enable debug logging
    initDelay: 300,            // Delay before initialization (ms)
    screenLoadDelay: 300,      // Delay after loading screens (ms)
    useAnimations: true,       // Use smooth animations
    badgeRemovalInterval: 500, // Badge cleanup interval (ms)
    autoApplyFixes: true,      // Auto-reapply fixes on screen changes
    finalCleanupDelay: 800,    // Final cleanup delay (ms)
    version: '3.1.0',          // Version number
    lastUpdate: '2025-04-05'   // Last update date
  };

  // Enhanced logging function with timestamp and emoji indicators
  window.log = function(message, type = 'info') {
    if (CONFIG.debug || type === 'error') {
      const timestamp = new Date().toISOString().substring(11, 19);
      const prefix = type === 'error' ? '🔴' : (type === 'success' ? '✅' : '🔵');
      console.log(`${prefix} [${timestamp}] TrustWallet Patch: ${message}`);
    }
  };

  // Enhanced error handler with detailed reporting
  window.onerror = function(message, source, lineno, colno, error) {
    log(`Global error: ${message}`, 'error');
    log(`Location: ${source}:${lineno}:${colno}`, 'error');
    
    if (error && error.stack) {
      log(`Stack trace: ${error.stack}`, 'error');
    }

    // Try to recover from error
    try {
      if (typeof window.applyCoreFixes === 'function') {
        window.applyCoreFixes();
      }
    } catch (recoveryError) {
      log(`Recovery failed: ${recoveryError.message}`, 'error');
    }

    return false; // Prevent default error handling
  };

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', function(event) {
    log(`Unhandled promise rejection: ${event.reason}`, 'error');
    event.preventDefault();
  });

  // Initialize core functionality
  function initializeCore() {
    // Set up password handling as soon as DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startInitialization);
    } else {
      startInitialization();
    }
  }

  function startInitialization() {
    log('Starting Trust Wallet initialization...');
    
    // Initialize password handling
    setTimeout(() => {
      if (typeof window.initPasscodeHandling === 'function') {
        try {
          window.initPasscodeHandling();
          log('Passcode handling initialized successfully', 'success');
        } catch (error) {
          log(`Failed to initialize passcode handling: ${error.message}`, 'error');
        }
      } else {
        log('Warning: Password handling function not found', 'error');
      }
    }, CONFIG.initDelay);
  }

  // Monitor script loading
  function checkScriptLoading() {
    const requiredScripts = ['combined.js'];
    const loadedScripts = Array.from(document.scripts).map(script => 
      script.src.split('/').pop()
    );

    requiredScripts.forEach(script => {
      if (!loadedScripts.includes(script)) {
        log(`Warning: Required script ${script} not found`, 'error');
      }
    });
  }

  // Set up mutation observer to watch for DOM changes
  function setupDOMObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          if (CONFIG.autoApplyFixes && typeof window.applyCoreFixes === 'function') {
            window.applyCoreFixes();
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Export public API
  window.TrustWalletCore = {
    version: CONFIG.version,
    log: window.log,
    init: initializeCore,
    checkScripts: checkScriptLoading
  };

  // Start initialization
  try {
    log('Trust Wallet patch loading...');
    initializeCore();
    setupDOMObserver();
    checkScriptLoading();
    log('Trust Wallet patch initialized successfully', 'success');
  } catch (error) {
    log(`Critical initialization error: ${error.message}`, 'error');
  }
})();
