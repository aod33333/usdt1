// Trust Wallet Log Function Fix - Enhanced Solution
(function() {
  // Initialize CONFIG with required settings
  window.CONFIG = {
    debug: true,                // Enable debug logging
    initDelay: 300,             // Delay before initialization (ms)
    version: '3.1.0'            // Version number
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

  // Basic toast notification (will be enhanced in combined.js)
  window.showToast = function(message, duration = 2000) {
    log(`Toast: ${message}`);
    
    const toast = document.createElement('div');
    toast.className = 'tw-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('visible');
    }, 10);
    
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => {
        if (toast.parentNode) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, duration);
  };

  // Simple screen navigation
  window.navigateTo = function(screenId) {
    log(`Navigating to screen: ${screenId}`);
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.add('hidden');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.remove('hidden');
      return true;
    } else {
      log(`Screen not found: ${screenId}`, 'error');
      return false;
    }
  };

  // Initialize passcode handling
  function initPasscodeHandling() {
    log('Initializing passcode handling');
    
    // Ensure DOM is fully loaded
    if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
      document.addEventListener('DOMContentLoaded', initPasscodeHandling);
      return;
    }

    // Fallback handling
    const numpadKeys = document.querySelectorAll('.numpad-key');
    const dots = document.querySelectorAll('.passcode-dots .dot');
    const unlockButton = document.getElementById('unlock-button');
    
    if (!numpadKeys.length) {
      console.warn('No numpad keys found');
      window.showToast('Initialization error: Numpad not loaded');
      return;
    }
    
    if (!dots.length) {
      console.warn('No passcode dots found');
      window.showToast('Initialization error: Passcode display not loaded');
      return;
    }
    
    if (!unlockButton) {
      console.warn('No unlock button found');
      window.showToast('Initialization error: Unlock button not loaded');
      return;
    }

    // Reset passcode
    window.passcodeEntered = '';
    
    // Set correct passcode if not set
    if (!window.correctPasscode) {
      window.correctPasscode = '123456';
    }
    
    // Add click handlers to all numpad keys
    numpadKeys.forEach(key => {
      key.addEventListener('click', function() {
        const keyValue = this.getAttribute('data-key');
        
        // Detailed error handling for key interactions
        try {
          if (keyValue === 'back') {
            if (window.passcodeEntered.length > 0) {
              window.passcodeEntered = window.passcodeEntered.slice(0, -1);
              updateDots();
            }
          } else if (keyValue === 'bio') {
            window.passcodeEntered = window.correctPasscode;
            updateDots();
            setTimeout(validatePasscode, 300);
          } else {
            if (window.passcodeEntered.length < 6) {
              window.passcodeEntered += keyValue;
              updateDots();
              
              if (window.passcodeEntered.length === 6) {
                setTimeout(validatePasscode, 300);
              }
            }
          }
        } catch (error) {
          console.error('Error in key handler:', error);
          window.showToast('Input error');
        }
      });
    });
    
    // Detailed function definitions with error handling
    function updateDots() {
      try {
        dots.forEach((dot, index) => {
          if (index < window.passcodeEntered.length) {
            dot.classList.add('filled');
            dot.classList.add('pulse');
            setTimeout(() => {
              dot.classList.remove('pulse');
            }, 300);
          } else {
            dot.classList.remove('filled');
          }
        });
      } catch (error) {
        console.error('Dot update error:', error);
      }
    }
    
    function validatePasscode() {
      try {
        if (window.passcodeEntered === window.correctPasscode) {
          unlockWallet();
        } else if (window.passcodeEntered.length === 6) {
          const dotsContainer = document.querySelector('.passcode-dots');
          dotsContainer.classList.add('shake');
          
          setTimeout(() => {
            window.passcodeEntered = '';
            updateDots();
            dotsContainer.classList.remove('shake');
          }, 500);

          window.showToast('Invalid passcode. Try again.', 1500);
        }
      } catch (error) {
        console.error('Passcode validation error:', error);
        window.showToast('Validation failed');
      }
    }
    
    function unlockWallet() {
      try {
        const lockScreen = document.getElementById('lock-screen');
        const walletScreen = document.getElementById('wallet-screen');
        
        if (lockScreen && walletScreen) {
          lockScreen.classList.add('hidden');
          walletScreen.classList.remove('hidden');
          
          if (typeof window.setupDemoBalance === 'function') {
            window.setupDemoBalance();
          }
          
          if (typeof window.populateMainWalletTokenList === 'function') {
            window.populateMainWalletTokenList();
          }
          
          // Setup basic event handlers for navigation
          setupBasicEventHandlers();
        }
      } catch (error) {
        console.error('Unlock wallet error:', error);
        window.showToast('Unlock failed');
      }
    }
  }
  
  // Setup basic event handlers for navigation
  function setupBasicEventHandlers() {
    log('Setting up basic event handlers');
    
    // Back buttons
    document.querySelectorAll('.back-button').forEach(button => {
      if (!button._hasListener) {
        button.addEventListener('click', function() {
          window.navigateTo('wallet-screen');
        });
        button._hasListener = true;
      }
    });
    
    // Main send/receive buttons
    const sendButton = document.getElementById('send-button');
    if (sendButton && !sendButton._hasListener) {
      sendButton.addEventListener('click', function() {
        window.navigateTo('send-screen');
      });
      sendButton._hasListener = true;
    }
    
    const receiveButton = document.getElementById('receive-button');
    if (receiveButton && !receiveButton._hasListener) {
      receiveButton.addEventListener('click', function() {
        window.navigateTo('receive-screen');
      });
      receiveButton._hasListener = true;
    }
    
    // History button
    const historyButton = document.querySelector('.quick-actions .action-circle:nth-child(5)');
    if (historyButton && !historyButton._hasListener) {
      historyButton.addEventListener('click', function() {
        window.navigateTo('history-screen');
      });
      historyButton._hasListener = true;
    }
    
    // Copy address button in receive screen
    const copyAddressButton = document.getElementById('copy-address');
    if (copyAddressButton && !copyAddressButton._hasListener) {
      copyAddressButton.addEventListener('click', function() {
        const addressElement = document.getElementById('wallet-address');
        if (addressElement) {
          const address = addressElement.textContent;
          navigator.clipboard.writeText(address)
            .then(() => {
              window.showToast('Address copied to clipboard');
            })
            .catch(() => {
              window.showToast('Failed to copy address');
            });
        }
      });
      copyAddressButton._hasListener = true;
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initPasscodeHandling, 100);
    });
  } else {
    setTimeout(initPasscodeHandling, 100);
  }

  // Log successful setup
  log('Trust Wallet patch loaded successfully');
})();
