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

// Add this after the navigateTo function in d.js
window.screenTransitionHandler = function(screenId) {
  log(`Handling screen transition to: ${screenId}`);
  
  // Check if combined.js functions are available
  if (window.TrustWallet) {
    // First, run any core functions that might be needed regardless of screen
    if (typeof window.enhanceNetworkBadges === 'function') {
      window.enhanceNetworkBadges();
    }
    
    // Then apply screen-specific fixes
    switch(screenId) {
      case 'wallet-screen':
        if (typeof window.enhanceHomeScreen === 'function') {
          window.enhanceHomeScreen();
        }
        if (typeof window.updateBalanceDisplay === 'function') {
          window.updateBalanceDisplay();
        }
        if (typeof window.populateMainWalletTokenList === 'function') {
          window.populateMainWalletTokenList();
        }
        break;
        
      case 'token-detail':
        if (typeof window.fixTokenDetailView === 'function') {
          window.fixTokenDetailView();
        }
        if (typeof window.enhanceTokenDetailBadge === 'function') {
          window.enhanceTokenDetailBadge();
        }
        
        // Update transaction list for current token
        const tokenId = document.getElementById('detail-symbol')?.textContent.toLowerCase();
        if (tokenId && typeof window.updateTransactionList === 'function') {
          window.updateTransactionList(tokenId);
        }
        break;
        
      case 'send-screen':
        if (typeof window.fixSendScreen === 'function') {
          window.fixSendScreen();
        }
        break;
        
      case 'receive-screen':
        if (typeof window.fixReceiveScreen === 'function') {
          window.fixReceiveScreen();
        }
        break;
        
      case 'history-screen':
        if (typeof window.fixHistoryScreen === 'function') {
          window.fixHistoryScreen();
        }
        if (typeof window.populateTransactionHistory === 'function') {
          window.populateTransactionHistory();
        }
        break;
    }
  } else {
    // Fallback styling if combined.js isn't loaded yet
    window.applyScreenStyling(screenId);
  }
};

// Update the navigateTo function to use our handler
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
    
    // Use our handler to ensure all necessary fixes are applied
    window.screenTransitionHandler(screenId);
    
    return true;
  } else {
    log(`Screen not found: ${screenId}`, 'error');
    return false;
  }
};

// Formatting utils
    formatCurrency: function(amount, options = {}) {
        const {
            currency = 'USD',
            locale = 'en-US',
            minimumFractionDigits = 2,
            maximumFractionDigits = 2,
            notation = 'standard'
        } = options;

        if (window.FormatUtils && typeof window.FormatUtils.formatCurrency === 'function') {
            return window.FormatUtils.formatCurrency(amount, currency);
        }

        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: minimumFractionDigits,
                maximumFractionDigits: maximumFractionDigits,
                notation: notation
            }).format(amount);
        } catch (e) {
            return '$' + parseFloat(amount).toFixed(2);
        }
    },

    // Safe function caller
    callIfExists: function(funcName, ...args) {
        return new Promise((resolve, reject) => {
            if (typeof window[funcName] === 'function') {
                try {
                    const result = window[funcName](...args);
                    if (result instanceof Promise) {
                        result.then(resolve).catch(reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve(null);
            }
        });
    },

    // Screen styling
    applyScreenStyling: function(screenId, options = {}) {
        const {
            theme = window.ThemeManager?.currentTheme || 'light',
            animate = true,
            preserveScroll = false
        } = options;

        const screen = document.getElementById(screenId);
        if (!screen) return false;

        const colors = {
            light: {
                background: '#ffffff',
                text: '#1A2024',
                border: '#F5F5F5'
            },
            dark: {
                background: '#1F2128',
                text: '#FFFFFF',
                border: '#2C2F36'
            }
        }[theme];

        // Handle screen transitions
        document.querySelectorAll('.screen').forEach(s => {
            if (animate) {
                s.style.transition = 'opacity 0.3s ease-out';
                s.style.opacity = '0';
                setTimeout(() => {
                    s.classList.add('hidden');
                    s.style.opacity = '';
                }, 300);
            } else {
                s.classList.add('hidden');
            }
        });

        // Show target screen
        screen.classList.remove('hidden');
        if (animate) {
            screen.style.opacity = '0';
            requestAnimationFrame(() => {
                screen.style.opacity = '1';
            });
        }

        // Apply screen-specific styling
        switch (screenId) {
            case 'wallet-screen':
                screen.style.cssText = `
                    background-color: ${colors.background} !important;
                    min-height: 100vh !important;
                    overflow-y: auto !important;
                    padding-bottom: 60px !important;
                `;
                break;

            case 'send-screen':
            case 'receive-screen':
            case 'history-screen':
                screen.classList.add('with-status-bar');
                screen.style.cssText = `
                    background-color: ${colors.background} !important;
                    min-height: 100vh !important;
                    padding-top: 20px !important;
                    overflow-y: auto !important;
                    position: relative !important;
                `;
                break;

            case 'token-detail':
                screen.style.cssText = `
                    background-color: ${colors.background} !important;
                    min-height: 100vh !important;
                    overflow-y: auto !important;
                    padding-bottom: 24px !important;
                    position: relative !important;
                `;
                break;
        }

        return true;
    }
};

// Expose utilities to global scope
window.formatCurrency = window.TrustWalletUtils.formatCurrency;
window.callIfExists = window.TrustWalletUtils.callIfExists;
window.applyScreenStyling = window.TrustWalletUtils.applyScreenStyling;

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
