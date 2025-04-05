// Quick fix for the missing log function
// Add this script before combined.js

(function() {
  // Define the log function globally so it's accessible everywhere
  window.log = function(message, type = 'info') {
    if (window.CONFIG?.debug || type === 'error') {
      const timestamp = new Date().toISOString().substring(11, 19);
      const prefix = type === 'error' ? '🔴' : '🔵';
      console.log(`${prefix} [${timestamp}] TrustWallet Patch: ${message}`);
    }
  };
  
  // Define default CONFIG if needed
  window.CONFIG = window.CONFIG || {
    debug: false,
    initDelay: 300,
    screenLoadDelay: 300,
    useAnimations: true,
    badgeRemovalInterval: 500,
    autoApplyFixes: true,
    finalCleanupDelay: 800,
    version: '3.1.0',
    lastUpdate: '2025-04-05'
  };
  
  console.log("Log function fix applied - window.log is now available");
})();
