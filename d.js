// Trust Wallet UI Patch - Essential Fixes
// Last updated: 2025-04-06
// Author: Claude

(function() {
  'use strict';

  // Initialize patch configuration
  const PATCH_CONFIG = {
    debug: true,                // Enable debug logging
    initDelay: 300,             // Delay before initialization (ms)
    patchVersion: '3.1.1',      // Patch version number
    lastUpdate: '2025-04-06'    // Last update date
  };

  // Enhanced logging system - safely defined even if combined.js has its own
  const originalLog = window.log;
  window.log = function(message, type = 'info') {
    const timestamp = new Date().toISOString().substring(11, 19);
    const prefix = type === 'error' ? '🔴' : '🔵';
    
    // Always log errors, use PATCH_CONFIG.debug for info messages
    if (PATCH_CONFIG.debug || type === 'error') {
      console.log(`${prefix} [${timestamp}] TrustWallet Patch: ${message}`);
    }
    
    // Call original log function if it exists
    if (typeof originalLog === 'function') {
      originalLog(message, type);
    }
  };

  // Safely initialize toast notifications if not already defined
  if (typeof window.showToast !== 'function') {
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
  }

  // Utility function to safely execute functions if they exist
  const safeExecute = function(funcName, ...args) {
    if (typeof window[funcName] === 'function') {
      try {
        return window[funcName](...args);
      } catch (error) {
        log(`Error executing ${funcName}: ${error.message}`, 'error');
        return null;
      }
    }
    return null;
  };

  // Screen transition handler - only defined if not already present
  if (typeof window.screenTransitionHandler !== 'function') {
    window.screenTransitionHandler = function(screenId) {
      log(`Handling screen transition to: ${screenId}`);
      
      // Apply screen-specific fixes
      switch(screenId) {
        case 'wallet-screen':
          safeExecute('enhanceHomeScreen');
          safeExecute('updateBalanceDisplay');
          safeExecute('populateMainWalletTokenList');
          break;
          
        case 'token-detail':
          safeExecute('fixTokenDetailView');
          safeExecute('enhanceTokenDetailBadge');
          
          // Update transaction list for current token
          const tokenId = document.getElementById('detail-symbol')?.textContent.toLowerCase();
          if (tokenId && typeof window.updateTransactionList === 'function') {
            window.updateTransactionList(tokenId);
          }
          break;
          
        case 'send-screen':
          safeExecute('fixSendScreen');
          break;
          
        case 'receive-screen':
          safeExecute('fixReceiveScreen');
          break;
          
        case 'history-screen':
          safeExecute('fixHistoryScreen');
          safeExecute('populateTransactionHistory');
          break;
      }
    };
  }

  // Enhanced navigation function - patched version that doesn't conflict
  const originalNavigateTo = window.navigateTo;
  window.navigateTo = function(screenId) {
    log(`Navigating to screen: ${screenId}`);
    
    if (typeof originalNavigateTo === 'function') {
      // Call original function if it exists
      const result = originalNavigateTo(screenId);
      if (result) return result;
    }
    
    // Fallback implementation if original function fails or doesn't exist
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      screen.classList.add('hidden');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.remove('hidden');
      
      // Use our handler to ensure all necessary fixes are applied
      if (typeof window.screenTransitionHandler === 'function') {
        window.screenTransitionHandler(screenId);
      }
      
      return true;
    } else {
      log(`Screen not found: ${screenId}`, 'error');
      return false;
    }
  };

  // Enhanced formatting utilities that don't conflict with existing ones
  if (!window.FormatUtils) {
    window.FormatUtils = {
      formatCurrency: function(amount, currency = 'USD') {
        try {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(amount);
        } catch (e) {
          return '$' + parseFloat(amount).toFixed(2);
        }
      },
      
      formatTokenAmount: function(amount, decimals = 6) {
        try {
          return parseFloat(amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: decimals
          });
        } catch (e) {
          return parseFloat(amount).toFixed(2);
        }
      }
    };
  }

  // Critical bug fixes for token detail view
  function patchTokenDetailView() {
    log('Applying token detail view patches');
    
    // Monitor for display changes on token detail screen
    const tokenDetailObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const detailScreen = document.getElementById('token-detail');
          if (detailScreen && !detailScreen.classList.contains('hidden')) {
            // Fix chain badge in token detail
            fixTokenDetailChainBadge();
          }
        }
      });
    });
    
    const tokenDetail = document.getElementById('token-detail');
    if (tokenDetail) {
      tokenDetailObserver.observe(tokenDetail, { attributes: true });
    }
  }

  // Fix the chain badge in token detail view
  function fixTokenDetailChainBadge() {
    log('Fixing token detail chain badge');
    
    const tokenSymbol = document.getElementById('detail-symbol');
    if (!tokenSymbol) return;
    
    const tokenId = tokenSymbol.textContent.toLowerCase();
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData?.[activeWallet];
    
    if (!wallet || !wallet.tokens) return;
    
    const token = wallet.tokens.find(t => t.id === tokenId);
    if (!token) return;
    
    const iconContainer = document.querySelector('.token-detail-icon-container');
    if (!iconContainer) return;
    
    // Remove any existing chain badges
    const existingBadges = iconContainer.querySelectorAll('.chain-badge, .chain-badge-detail, .chain-badge-fixed');
    existingBadges.forEach(badge => badge.remove());
    
    // Add the chain badge if token has one
    if (token.chainBadge) {
      const chainBadge = document.createElement('div');
      chainBadge.className = 'chain-badge';
      chainBadge.style.cssText = `
        position: absolute !important;
        bottom: -6px !important;
        right: -6px !important;
        width: 20px !important;
        height: 20px !important;
        border-radius: 50% !important;
        background-color: white !important;
        border: 2px solid white !important;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
        z-index: 5 !important;
        overflow: visible !important;
        display: block !important;
      `;
      
      const badgeImg = document.createElement('img');
      badgeImg.src = token.chainBadge;
      badgeImg.alt = token.network || '';
      
      chainBadge.appendChild(badgeImg);
      iconContainer.appendChild(chainBadge);
    }
  }

  // Critical bug fix: Token list population
  function patchTokenList() {
    log('Applying token list patches');
    
    // Save original function if it exists
    const originalPopulateMainWalletTokenList = window.populateMainWalletTokenList;
    
    // Create our enhanced version that handles edge cases
    window.populateMainWalletTokenList = function() {
      // First try to call the original function
      if (typeof originalPopulateMainWalletTokenList === 'function') {
        try {
          const result = originalPopulateMainWalletTokenList();
          if (result !== false) return result;
        } catch (error) {
          log(`Error in original populateMainWalletTokenList: ${error.message}`, 'error');
        }
      }
      
      // Fallback implementation if original function fails or doesn't exist
      const tokenList = document.getElementById('token-list');
      if (!tokenList) {
        log('Token list element not found', 'error');
        return false;
      }
      
      // Clear existing content, but keep any templates
      const tokenTemplate = tokenList.querySelector('.token-template');
      tokenList.innerHTML = '';
      if (tokenTemplate) {
        tokenList.appendChild(tokenTemplate);
      }
      
      // Get active wallet tokens
      const activeWallet = window.activeWallet || 'main';
      const wallet = window.currentWalletData?.[activeWallet];
      
      if (!wallet || !wallet.tokens || !wallet.tokens.length) {
        log('No tokens available for main wallet display', 'error');
        
        // Add placeholder token
        const placeholderToken = document.createElement('div');
        placeholderToken.className = 'token-item';
        placeholderToken.innerHTML = `
          <div class="token-icon">
            <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Bitcoin">
          </div>
          <div class="token-info">
            <div class="token-name">BTC</div>
            <div class="token-price">
              Bitcoin
              <span class="token-price-change positive">+0.32%</span>
            </div>
          </div>
          <div class="token-amount">
            <div class="token-balance">0.00 BTC</div>
            <div class="token-value">$0.00</div>
          </div>
        `;
        tokenList.appendChild(placeholderToken);
        return false;
      }
      
      // Create token items
      wallet.tokens.forEach(token => {
        try {
          const tokenItem = document.createElement('div');
          tokenItem.className = 'token-item';
          tokenItem.setAttribute('data-token-id', token.id);
          
          // Format numbers for display
          const formattedAmount = typeof window.FormatUtils?.formatTokenAmount === 'function' 
            ? window.FormatUtils.formatTokenAmount(token.amount)
            : token.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6
              });
          
          const formattedValue = typeof window.FormatUtils?.formatCurrency === 'function'
            ? window.FormatUtils.formatCurrency(token.value)
            : '$' + token.value.toFixed(2);
          
          // Show network badge for tokens with chainBadge
          const networkBadge = token.chainBadge 
            ? `<div class="chain-badge"><img src="${token.chainBadge}" alt="${token.network}"></div>` 
            : '';
          
          tokenItem.innerHTML = `
            <div class="token-icon">
              <img src="${typeof window.getTokenLogoUrl === 'function' ? window.getTokenLogoUrl(token.id) : token.icon}" alt="${token.name}">
              ${networkBadge}
            </div>
            <div class="token-info">
              <div class="token-name">${token.symbol}</div>
              <div class="token-price">
                ${token.name}
                <span class="token-price-change ${token.change >= 0 ? 'positive' : 'negative'}">
                  ${token.change >= 0 ? '+' : ''}${token.change}%
                </span>
              </div>
            </div>
            <div class="token-amount">
              <div class="token-balance">${formattedAmount} ${token.symbol}</div>
              <div class="token-value">${formattedValue}</div>
            </div>
          `;
          
          // Add click handler
          tokenItem.addEventListener('click', function() {
            if (typeof window.showTokenDetail === 'function') {
              window.showTokenDetail(token.id);
            } else {
              log('Token clicked but showTokenDetail not available:', token.id);
            }
          });
          
          tokenList.appendChild(tokenItem);
        } catch (error) {
          log(`Error creating token item: ${error.message}`, 'error');
        }
      });
      
      return true;
    };
  }

  // Initialize authentication system
  function initializeAuthentication() {
    log('Initializing authentication system');
    
    // Ensure DOM is fully loaded
    if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
      document.addEventListener('DOMContentLoaded', initializeAuthentication);
      return;
    }
    
    // Setup passcode handling
    const numpadKeys = document.querySelectorAll('.numpad-key');
    const dots = document.querySelectorAll('.passcode-dots .dot');
    const unlockButton = document.getElementById('unlock-button');
    
    if (!numpadKeys.length || !dots.length || !unlockButton) {
      log('Authentication UI elements not found', 'error');
      return;
    }
    
    // Reset passcode and setup default passcode
    window.passcodeEntered = '';
    window.correctPasscode = window.correctPasscode || '123456';
    
    // Add click handlers to numpad keys
    numpadKeys.forEach(key => {
      // Skip if already has event listener
      if (key._hasListener) return;
      
      key.addEventListener('click', function() {
        const keyValue = this.getAttribute('data-key');
        
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
          log(`Error in numpad key handler: ${error.message}`, 'error');
        }
      });
      
      key._hasListener = true;
    });
    
    // Update passcode dots display
    function updateDots() {
      try {
        dots.forEach((dot, index) => {
          if (index < window.passcodeEntered.length) {
            dot.classList.add('filled');
            // Add pulse animation effect
            dot.classList.add('pulse');
            setTimeout(() => {
              dot.classList.remove('pulse');
            }, 300);
          } else {
            dot.classList.remove('filled');
          }
        });
      } catch (error) {
        log(`Error updating dots: ${error.message}`, 'error');
      }
    }
    
    // Validate entered passcode
    function validatePasscode() {
      try {
        if (window.passcodeEntered === window.correctPasscode) {
          unlockWallet();
        } else if (window.passcodeEntered.length === 6) {
          // Show error animation
          const dotsContainer = document.querySelector('.passcode-dots');
          if (dotsContainer) {
            dotsContainer.classList.add('shake');
            
            setTimeout(() => {
              window.passcodeEntered = '';
              updateDots();
              dotsContainer.classList.remove('shake');
            }, 500);
          }
          
          if (typeof window.showToast === 'function') {
            window.showToast('Invalid passcode. Try again.', 1500);
          }
        }
      } catch (error) {
        log(`Error validating passcode: ${error.message}`, 'error');
      }
    }
    
    // Unlock the wallet and show main wallet screen
    function unlockWallet() {
      try {
        const lockScreen = document.getElementById('lock-screen');
        const walletScreen = document.getElementById('wallet-screen');
        
        if (lockScreen && walletScreen) {
          lockScreen.classList.add('hidden');
          walletScreen.classList.remove('hidden');
          
          // Initialize wallet data
          if (typeof window.setupDemoBalance === 'function') {
            window.setupDemoBalance();
          } else if (typeof window.setupDefaultWalletData === 'function') {
            window.setupDefaultWalletData();
          }
          
          // Populate token list
          safeExecute('populateMainWalletTokenList');
          
          // Setup basic event handlers
          setupBasicEventHandlers();
        }
      } catch (error) {
        log(`Error unlocking wallet: ${error.message}`, 'error');
      }
    }
    
    // Handle the Reset Wallet button
    const resetWalletButton = document.getElementById('reset-wallet-button');
    if (resetWalletButton && !resetWalletButton._hasListener) {
      resetWalletButton.addEventListener('click', function() {
        if (typeof window.showToast === 'function') {
          window.showToast('Wallet reset feature is disabled in demo mode', 2000);
        }
      });
      resetWalletButton._hasListener = true;
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
          if (navigator.clipboard && address) {
            navigator.clipboard.writeText(address)
              .then(() => {
                if (typeof window.showToast === 'function') {
                  window.showToast('Address copied to clipboard');
                }
              })
              .catch(() => {
                if (typeof window.showToast === 'function') {
                  window.showToast('Failed to copy address');
                }
              });
          }
        }
      });
      copyAddressButton._hasListener = true;
    }
    
    // Setup token detail buttons
    setupTokenDetailButtons();
  }

  // Setup token detail action buttons
  function setupTokenDetailButtons() {
    const detailSend = document.getElementById('detail-send');
    const detailReceive = document.getElementById('detail-receive');
    
    if (detailSend && !detailSend._hasListener) {
      detailSend.addEventListener('click', function() {
        const tokenId = document.getElementById('detail-symbol')?.textContent.toLowerCase();
        if (tokenId && typeof window.showSendScreen === 'function') {
          window.showSendScreen(tokenId);
        } else {
          window.navigateTo('send-screen');
        }
      });
      detailSend._hasListener = true;
    }
    
    if (detailReceive && !detailReceive._hasListener) {
      detailReceive.addEventListener('click', function() {
        const tokenId = document.getElementById('detail-symbol')?.textContent.toLowerCase();
        if (tokenId && typeof window.showReceiveScreen === 'function') {
          window.showReceiveScreen(tokenId);
        } else {
          window.navigateTo('receive-screen');
        }
      });
      detailReceive._hasListener = true;
    }
  }

  // Fix balance display updates
  function patchBalanceDisplay() {
    // Save original function if it exists
    const originalUpdateBalanceDisplay = window.updateBalanceDisplay;
    
    // Create enhanced version
    window.updateBalanceDisplay = function() {
      // Try to call original function
      if (typeof originalUpdateBalanceDisplay === 'function') {
        try {
          const result = originalUpdateBalanceDisplay();
          if (result !== false) return result;
        } catch (error) {
          log(`Error in original updateBalanceDisplay: ${error.message}`, 'error');
        }
      }
      
      // Fallback implementation
      const totalBalanceElement = document.getElementById('total-balance');
      if (!totalBalanceElement) return false;
      
      const activeWallet = window.activeWallet || 'main';
      const wallet = window.currentWalletData && window.currentWalletData[activeWallet];
      
      if (wallet) {
        const formattedBalance = typeof window.FormatUtils?.formatCurrency === 'function'
          ? window.FormatUtils.formatCurrency(wallet.totalBalance)
          : '$' + wallet.totalBalance.toFixed(2);
        
        totalBalanceElement.textContent = formattedBalance;
        return true;
      }
      
      return false;
    };
  }

  // Global error recovery handler
  function setupErrorRecovery() {
    log('Setting up error recovery system');
    
    // Store original handler if present
    const originalErrorHandler = window.onerror;
    
    // Add enhanced error handler
    window.onerror = function(message, source, lineno, colno, error) {
      log(`Global error: ${message}`, 'error');
      
      // Try to recover wallet state if basic data is missing
      if (!window.currentWalletData || !window.walletData) {
        log('Wallet data missing, attempting recovery', 'error');
        safeExecute('setupDefaultWalletData');
      }
      
      // Call original handler if present
      if (typeof originalErrorHandler === 'function') {
        return originalErrorHandler(message, source, lineno, colno, error);
      }
      
      // Return false to allow default browser error handling
      return false;
    };
    
    // Add unhandled rejection handler
    window.addEventListener('unhandledrejection', function(event) {
      log(`Unhandled promise rejection: ${event.reason}`, 'error');
      
      // Attempt recovery
      if (!window.currentWalletData || !window.walletData) {
        safeExecute('setupDefaultWalletData');
      }
    });
  }

  // Patch wallet selector functionality
  function patchWalletSelector() {
    log('Patching wallet selector');
    
    const walletSelector = document.querySelector('.wallet-selector');
    if (walletSelector && !walletSelector._hasListener) {
      walletSelector.addEventListener('click', function() {
        // Check if modal already exists
        let walletModal = document.getElementById('wallet-selector-modal');
        
        if (!walletModal) {
          // Create wallet selector modal
          walletModal = document.createElement('div');
          walletModal.id = 'wallet-selector-modal';
          walletModal.className = 'modal';
          
          const wallets = {
            'main': 'Main Wallet 1',
            'secondary': 'Main Wallet 2',
            'business': 'Business Wallet'
          };
          
          let walletItems = '';
          for (const [id, name] of Object.entries(wallets)) {
            const isActive = window.activeWallet === id;
            walletItems += `
              <div class="wallet-option ${isActive ? 'active' : ''}" data-wallet-id="${id}">
                <div class="wallet-option-name">${name}</div>
                ${isActive ? '<i class="fas fa-check"></i>' : ''}
              </div>
            `;
          }
          
          walletModal.innerHTML = `
            <div class="modal-content wallet-selector-content">
              <div class="modal-header">
                <h3>Select Wallet</h3>
                <button class="close-button" id="close-wallet-selector">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="wallet-options">
                ${walletItems}
              </div>
              <button class="add-wallet-button">
                <i class="fas fa-plus"></i> Create New Wallet
              </button>
            </div>
          `;
          
          document.body.appendChild(walletModal);
          
          // Add event listeners
          walletModal.querySelector('#close-wallet-selector').addEventListener('click', function() {
            walletModal.style.display = 'none';
          });
          
          walletModal.querySelector('.add-wallet-button').addEventListener('click', function() {
            walletModal.style.display = 'none';
            if (typeof window.showToast === 'function') {
              window.showToast('Create wallet feature coming soon');
            }
          });
          
          const walletOptions = walletModal.querySelectorAll('.wallet-option');
          walletOptions.forEach(option => {
            option.addEventListener('click', function() {
              const walletId = this.getAttribute('data-wallet-id');
              switchWallet(walletId);
              walletModal.style.display = 'none';
            });
          });
        }
        
        walletModal.style.display = 'flex';
      });
      
      walletSelector._hasListener = true;
    }
    
    // Switch wallet function
    function switchWallet(walletId) {
      if (window.currentWalletData && window.currentWalletData[walletId]) {
        window.activeWallet = walletId;
        
        // Update wallet name
        const walletName = document.querySelector('.wallet-selector .wallet-name');
        if (walletName) {
          const walletNames = {
            'main': 'Main Wallet 1',
            'secondary': 'Main Wallet 2',
            'business': 'Business Wallet'
          };
          walletName.textContent = walletNames[walletId] || walletId;
        }
        
        // Update balance and token list
        safeExecute('updateBalanceDisplay');
        safeExecute('populateMainWalletTokenList');
        
        if (typeof window.showToast === 'function') {
          window.showToast(`Switched to ${walletId} wallet`);
        }
      }
    }
  }

  // Setup admin panel access
  function setupAdminPanelAccess() {
    log('Setting up admin panel access');
    
    const adminTouchTarget = document.getElementById('admin-touch-target');
    if (!adminTouchTarget || adminTouchTarget._hasListener) return;
    
    // Setup tap detection for admin access
    let tapCount = 0;
    let lastTap = 0;
    
    adminTouchTarget.addEventListener('click', function() {
      const currentTime = new Date().getTime();
      const tapGap = currentTime - lastTap;
      lastTap = currentTime;
      
      // Reset if too slow
      if (tapGap > 1000) {
        tapCount = 1;
        return;
      }
      
      tapCount++;
      
      // Show admin panel after 5 quick taps
      if (tapCount >= 5) {
        showAdminPanel();
        tapCount = 0;
      }
    });
    
    adminTouchTarget._hasListener = true;
    
    // Setup close button for admin panel
    const closeAdminButton = document.getElementById('close-admin');
    if (closeAdminButton && !closeAdminButton._hasListener) {
      closeAdminButton.addEventListener('click', function() {
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel) {
          adminPanel.style.display = 'none';
        }
      });
      closeAdminButton._hasListener = true;
    }
    
    // Setup apply-fake button handler
    const applyFakeButton = document.getElementById('apply-fake');
    if (applyFakeButton && !applyFakeButton._hasListener) {
      applyFakeButton.addEventListener('click', function() {
        if (typeof window.showToast === 'function') {
          window.showToast('Changes applied successfully');
        }
      });
      applyFakeButton._hasListener = true;
    }
  }

 // Show admin panel function
function showAdminPanel() {
  const adminPanel = document.getElementById('admin-panel');
  if (adminPanel) {
    adminPanel.style.display = 'flex';
    
    // Make sure the form is populated with current wallet info
    const walletSelect = document.getElementById('admin-wallet-select');
    if (walletSelect) {
      walletSelect.value = window.activeWallet || 'main';
    }
    
    // Initialize fake-balance field with current balance
    const fakeBalanceInput = document.getElementById('fake-balance');
    if (fakeBalanceInput) {
      const activeWallet = window.activeWallet || 'main';
      const tokenSelect = document.getElementById('admin-token-select');
      const selectedToken = tokenSelect ? tokenSelect.value : 'usdt';
      
      if (window.currentWalletData && window.currentWalletData[activeWallet]) {
        const wallet = window.currentWalletData[activeWallet];
        const token = wallet.tokens.find(t => t.id === selectedToken);
        
        if (token) {
          fakeBalanceInput.value = token.value.toFixed(2);
        }
      }
    }
  }
}

  // Patch transaction list
  function patchTransactionList() {
    log('Patching transaction list');
    
    // Only define if not already present
    if (typeof window.updateTransactionList !== 'function') {
      window.updateTransactionList = function(tokenId) {
        const transactionList = document.getElementById('transaction-list');
        if (!transactionList) return;
        
        // Clear existing content, but keep any templates
        const txTemplate = transactionList.querySelector('.transaction-template');
        let templateHTML = '';
        if (txTemplate) {
          templateHTML = txTemplate.outerHTML;
        }
        
        transactionList.innerHTML = templateHTML;
        
        const activeWallet = window.activeWallet || 'main';
        const transactions = window.currentTransactions?.[activeWallet]?.[tokenId] || [];
        
        if (transactions.length === 0) {
          // Show empty state
          transactionList.innerHTML += `
            <div class="no-transactions">
              <p>No transaction history available</p>
              <div class="explorer-link">
                <a href="#" id="view-on-explorer">View on Block Explorer</a>
              </div>
            </div>
          `;
          
          // Add explorer link handler
          const explorerLink = transactionList.querySelector('#view-on-explorer');
          if (explorerLink) {
            explorerLink.addEventListener('click', function(e) {
              e.preventDefault();
              const explorerOverlay = document.getElementById('explorer-overlay');
              if (explorerOverlay) {
                explorerOverlay.style.display = 'flex';
              }
            });
          }
          
          return;
        }
        
        // Get token details
        const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
        
        // Create transaction items
        transactions.forEach(tx => {
          const txItem = document.createElement('div');
          txItem.className = `transaction-item transaction-${tx.type}`;
          
          // Format values
          const formattedAmount = tx.amount.toFixed(6);
          const formattedValue = typeof window.FormatUtils?.formatCurrency === 'function'
            ? window.FormatUtils.formatCurrency(tx.value)
            : '$' + tx.value.toFixed(2);
          
          txItem.innerHTML = `
            <div class="transaction-icon">
              <i class="fas fa-${tx.type === 'receive' ? 'arrow-down' : 'arrow-up'}"></i>
            </div>
            <div class="transaction-info">
              <div class="transaction-type">${tx.type === 'receive' ? 'Received' : 'Sent'} ${tx.symbol}</div>
              <div class="transaction-date">${tx.date}</div>
            </div>
            <div class="transaction-amount">
              <div class="transaction-value ${tx.type === 'receive' ? 'positive' : 'negative'}">
                ${tx.type === 'receive' ? '+' : '-'}${formattedAmount} ${tx.symbol}
              </div>
              <div class="transaction-usd">${formattedValue}</div>
            </div>
          `;
          
          // Add click handler for transaction details
          txItem.addEventListener('click', function() {
            showTransactionDetails(tx);
          });
          
          transactionList.appendChild(txItem);
        });
      };
    }
    
    // Show transaction details in explorer overlay
    function showTransactionDetails(tx) {
      const explorerOverlay = document.getElementById('explorer-overlay');
      if (!explorerOverlay) return;
      
      // Update explorer content
      const txHash = explorerOverlay.querySelector('#explorer-tx-hash');
      const txFrom = explorerOverlay.querySelector('#explorer-from');
      const txTo = explorerOverlay.querySelector('#explorer-to');
      const txAmount = explorerOverlay.querySelector('#explorer-token-amount');
      const tokenIcon = explorerOverlay.querySelector('.explorer-token-icon img');
      
      if (txHash) txHash.textContent = tx.hash || '0x...';
      if (txFrom) txFrom.textContent = tx.from || '0x...';
      if (txTo) txTo.textContent = tx.to || '0x...';
      if (txAmount) txAmount.textContent = `${tx.amount.toFixed(6)} ${tx.symbol}`;
      
      if (tokenIcon) {
        tokenIcon.src = `https://cryptologos.cc/logos/${tx.symbol.toLowerCase()}-${tx.symbol.toLowerCase()}-logo.png`;
      }
      
      // Show explorer
      explorerOverlay.style.display = 'flex';
      
      // Setup close button
      const closeButton = explorerOverlay.querySelector('.explorer-back-button');
      if (closeButton && !closeButton._hasListener) {
        closeButton.addEventListener('click', function() {
          explorerOverlay.style.display = 'none';
        });
        closeButton._hasListener = true;
      }
    }
  }

  // Patch network badge display
  function patchNetworkBadges() {
    log('Patching network badges');
    
    // Add mutation observer to monitor DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check for added token items
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && (node.classList.contains('token-item') || node.querySelector('.token-item'))) {
              fixNetworkBadges();
            }
          });
        }
      });
    });
    
    // Start observing the document body
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Fix network badges immediately
    fixNetworkBadges();
  }

  // Fix network badges
  function fixNetworkBadges() {
    // Get all token items
    const tokenItems = document.querySelectorAll('.token-item');
    
    tokenItems.forEach(item => {
      const tokenId = item.getAttribute('data-token-id');
      if (!tokenId) return;
      
      const activeWallet = window.activeWallet || 'main';
      const wallet = window.currentWalletData?.[activeWallet];
      if (!wallet || !wallet.tokens) return;
      
      const token = wallet.tokens.find(t => t.id === tokenId);
      if (!token || !token.chainBadge) return;
      
      const tokenIcon = item.querySelector('.token-icon');
      if (!tokenIcon) return;
      
      // Check if badge already exists
      let badge = tokenIcon.querySelector('.chain-badge');
      
      // Create or update badge
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'chain-badge';
        badge.style.cssText = `
          position: absolute !important;
          bottom: -6px !important;
          right: -6px !important;
          width: 20px !important;
          height: 20px !important;
          border-radius: 50% !important;
          background-color: white !important;
          border: 2px solid white !important;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
          z-index: 5 !important;
          overflow: visible !important;
          display: block !important;
        `;
        
        const badgeImg = document.createElement('img');
        badgeImg.src = token.chainBadge;
        badgeImg.alt = token.network || '';
        
        badge.appendChild(badgeImg);
        tokenIcon.appendChild(badge);
      } else {
        // Update existing badge
        const badgeImg = badge.querySelector('img');
        if (badgeImg) {
          badgeImg.src = token.chainBadge;
          badgeImg.alt = token.network || '';
        }
      }
    });
  }

  // Handle token visibility toggle
  function patchBalanceVisibility() {
    const visibilityToggle = document.querySelector('.visibility-toggle');
    if (!visibilityToggle || visibilityToggle._hasListener) return;
    
    visibilityToggle.addEventListener('click', function() {
      const balanceAmount = document.querySelector('.balance-amount');
      const visibilityIcon = this.querySelector('i');
      
      if (!balanceAmount || !visibilityIcon) return;
      
      const isHidden = balanceAmount.getAttribute('data-hidden') === 'true';
      
      if (isHidden) {
        // Show balance
        const activeWallet = window.activeWallet || 'main';
        const wallet = window.currentWalletData?.[activeWallet];
        
        if (wallet) {
          const formattedBalance = typeof window.FormatUtils?.formatCurrency === 'function'
            ? window.FormatUtils.formatCurrency(wallet.totalBalance)
            : '$' + wallet.totalBalance.toFixed(2);
          
          balanceAmount.textContent = formattedBalance;
        }
        
        visibilityIcon.className = 'fas fa-eye';
        balanceAmount.setAttribute('data-hidden', 'false');
      } else {
        // Hide balance
        balanceAmount.textContent = '••••••';
        visibilityIcon.className = 'fas fa-eye-slash';
        balanceAmount.setAttribute('data-hidden', 'true');
      }
    });
    
    visibilityToggle._hasListener = true;
  }

  // Fix send screen amount calculations
  function patchSendScreenCalculations() {
    log('Patching send screen calculations');
    
    // Only add if not already defined
    if (typeof window.updateDollarValue !== 'function') {
      window.updateDollarValue = function(amount) {
        const dollarValue = document.getElementById('dollar-value');
        if (!dollarValue) return;
        
        const tokenId = window.activeSendTokenId || 'usdt';
        const activeWallet = window.activeWallet || 'main';
        const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
        
        if (!token) return;
        
        const value = parseFloat(amount) * (token.price || 1);
        
        dollarValue.textContent = '≈ ' + (isNaN(value) ? '$0.00' : (
          typeof window.FormatUtils?.formatCurrency === 'function'
            ? window.FormatUtils.formatCurrency(value)
            : '$' + value.toFixed(2)
        ));
      };
    }
    
    // Patch amount input event handler if needed
    const sendAmountInput = document.getElementById('send-amount');
    if (sendAmountInput && !sendAmountInput._hasListener) {
      sendAmountInput.addEventListener('input', function() {
        if (typeof window.updateDollarValue === 'function') {
          window.updateDollarValue(this.value);
        }
        
        // Enable/disable continue button based on amount
        const continueButton = document.getElementById('send-button-confirm');
        if (continueButton) {
          const amount = parseFloat(this.value);
          const recipientInput = document.getElementById('recipient-address');
          const hasRecipient = recipientInput && recipientInput.value.length > 0;
          
          if (!isNaN(amount) && amount > 0 && hasRecipient) {
            continueButton.removeAttribute('disabled');
            continueButton.style.opacity = '1';
          } else {
            continueButton.setAttribute('disabled', 'disabled');
            continueButton.style.opacity = '0.5';
          }
        }
      });
      
      sendAmountInput._hasListener = true;
    }
    
    // Patch recipient input event handler if needed
    const recipientInput = document.getElementById('recipient-address');
    if (recipientInput && !recipientInput._hasListener) {
      recipientInput.addEventListener('input', function() {
        // Enable/disable continue button based on recipient
        const continueButton = document.getElementById('send-button-confirm');
        if (continueButton) {
          const sendAmountInput = document.getElementById('send-amount');
          const amount = sendAmountInput ? parseFloat(sendAmountInput.value) : 0;
          const hasRecipient = this.value.length > 0;
          
          if (!isNaN(amount) && amount > 0 && hasRecipient) {
            continueButton.removeAttribute('disabled');
            continueButton.style.opacity = '1';
          } else {
            continueButton.setAttribute('disabled', 'disabled');
            continueButton.style.opacity = '0.5';
          }
        }
      });
      
      recipientInput._hasListener = true;
    }
  }

  // Initialize all fixes
  function initializeAllFixes() {
    log(`Initializing Trust Wallet UI patch v${PATCH_CONFIG.patchVersion}`);
    
    // Ensure DOM is fully loaded
    if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(initializeAllFixes, PATCH_CONFIG.initDelay));
      return;
    }
    
    // Apply all patches in the correct order
    setupErrorRecovery();
    patchTokenList();
    patchBalanceDisplay();
    patchTokenDetailView();
    patchTransactionList();
    patchNetworkBadges();
    patchWalletSelector();
    patchBalanceVisibility();
    patchSendScreenCalculations();
    setupAdminPanelAccess();
    
    // Initialize authentication
    initializeAuthentication();
    
    log('All patches successfully applied');
  }

  // Initialize immediately with a small delay
  setTimeout(initializeAllFixes, PATCH_CONFIG.initDelay);
})();
