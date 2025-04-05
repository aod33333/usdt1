// Trust Wallet Log Function Fix - Minimal Solution
// This precisely fixes the initialization error by defining the log function before it's needed

(function() {
  // Define the log function globally before combined.js tries to use it
  window.log = function(message, type = 'info') {
    const CONFIG = window.CONFIG || {debug: true};  // Default to debug=true to see all messages
    
    if (CONFIG.debug || type === 'error') {
      const timestamp = new Date().toISOString().substring(11, 19);
      const prefix = type === 'error' ? '🔴' : '🔵';
      console.log(`${prefix} [${timestamp}] TrustWallet Patch: ${message}`);
    }
  };
  
  // Store original window.onerror to preserve any existing handlers
  const originalOnError = window.onerror;
  
  // Add global error handler to prevent silent failures
  window.onerror = function(message, source, lineno, colno, error) {
    console.error(`Global error: ${message} at ${source}:${lineno}:${colno}`);
    console.error("Error details:", error);
    
    // Call original handler if it exists
    if (typeof originalOnError === 'function') {
      return originalOnError(message, source, lineno, colno, error);
    }
    
    // Returning true prevents the error from being displayed in console again
    return false;
  };
  
  console.log("✅ Trust Wallet log function initialized successfully");
})();
