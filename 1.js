// Trust Wallet UI - Comprehensive Merged Solution
// Last updated: 2025-04-06
// Combined solution merged from combined.js and d.js

(function() {
  'use strict';
  
  // Configuration constants
  const CONFIG = {
    debug: true,
    initDelay: 300,
    screenLoadDelay: 300,
    useAnimations: true,
    badgeRemovalInterval: 500,
    autoApplyFixes: true,
    finalCleanupDelay: 800,
    version: '3.1.1',
    lastUpdate: '2025-04-06'
  };
  
  // Enhanced logging system
  function log(message, type = 'info') {
    if (CONFIG.debug || type === 'error') {
      const timestamp = new Date().toISOString().substring(11, 19);
      const prefix = type === 'error' ? '🔴' : '🔵';
      console.log(`${prefix} [${timestamp}] TrustWallet Patch: ${message}`);
    }
  }

  // Safely initialize toast notifications
  if (typeof window.showToast !== 'function') {
    window.showToast = function(message, duration = 2000) {
      // Initialize toast queue if not exists
      if (!window.toastQueue) {
        window.toastQueue = [];
      }
      
      // Add to queue
      window.toastQueue.push({
        message,
        duration
      });
      
      // Process queue if not already processing
      if (!window.processingToast) {
        processToastQueue();
      }
      
      function processToastQueue() {
        if (window.toastQueue.length === 0) {
          window.processingToast = false;
          return;
        }
        
        window.processingToast = true;
        const toast = window.toastQueue.shift();
        showSingleToast(toast.message, toast.duration);
      }
      
      function showSingleToast(message, duration) {
        // Remove any existing toast
        const existingToast = document.querySelector('.tw-toast');
        if (existingToast) {
          document.body.removeChild(existingToast);
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'tw-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
          toast.classList.add('visible');
        }, 10);
        
        // Hide toast after duration
        setTimeout(() => {
          toast.classList.remove('visible');
          setTimeout(() => {
            if (toast.parentNode) {
              document.body.removeChild(toast);
            }
            // Process next toast in queue
            processToastQueue();
          }, 300);
        }, duration);
      }
    };
  }

  // Format utilities
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
    },
    
    formatPercentage: function(value) {
      return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
    },
    
    formatDate: function(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    },
    
    shortenAddress: function(address) {
      if (!address) return '';
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
  };

  // Token Logo URL Management
  window.getTokenLogoUrl = function(tokenId) {
    const logoUrls = {
      'btc': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      'eth': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      'usdt': 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      'bnb': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      'xrp': 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
      'sol': 'https://cryptologos.cc/logos/solana-sol-logo.png',
      'ada': 'https://cryptologos.cc/logos/cardano-ada-logo.png',
      'doge': 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
      'dot': 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
      'matic': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      'avax': 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
      'shib': 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png',
      'link': 'https://cryptologos.cc/logos/chainlink-link-logo.png',
      'uni': 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
      'dai': 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
      'atom': 'https://cryptologos.cc/logos/cosmos-atom-logo.png',
      'arb': 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
      'op': 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
      'twt': 'https://cryptologos.cc/logos/trust-wallet-token-twt-logo.png'
    };
    
    return logoUrls[tokenId] || 'https://cryptologos.cc/logos/unknown-token.png';
  };

  // Element Cache System
  window._cachedElements = {};
  window.getCachedElement = function(id) {
    if (!window._cachedElements[id]) {
      window._cachedElements[id] = document.getElementById(id);
    }
    return window._cachedElements[id];
  };

  // Clear cache on page changes
  window.clearElementCache = function() {
    window._cachedElements = {};
  };

  // Screen Manager
  window.ScreenManager = {
    screens: [
      'lock-screen',
      'wallet-screen',
      'token-detail',
      'send-screen',
      'receive-screen',
      'history-screen'
    ],
    
    currentScreen: 'lock-screen',
    
    initializeScreenVisibility: function() {
      this.screens.forEach(screenId => {
        const screen = document.getElementById(screenId);
        if (screen) {
          if (screenId === this.currentScreen) {
            screen.classList.remove('hidden');
          } else {
            screen.classList.add('hidden');
          }
        }
      });
    },
    
    showScreen: function(screenId) {
      if (!this.screens.includes(screenId)) return false;
      
      // Hide all screens
      this.screens.forEach(id => {
        const screen = document.getElementById(id);
        if (screen) screen.classList.add('hidden');
      });
      
      // Show requested screen
      const targetScreen = document.getElementById(screenId);
      if (targetScreen) {
        targetScreen.classList.remove('hidden');
        this.currentScreen = screenId;
        
        // Trigger screen-specific initialization
        this.triggerScreenInitialization(screenId);
        
        return true;
      }
      
      return false;
    },
    
    triggerScreenInitialization: function(screenId) {
      switch (screenId) {
        case 'wallet-screen':
          if (typeof window.populateMainWalletTokenList === 'function') {
            window.populateMainWalletTokenList();
          }
          break;
        case 'history-screen':
          if (typeof window.populateTransactionHistory === 'function') {
            window.populateTransactionHistory();
          }
          break;
        default:
          // No specific initialization needed
          break;
      }
    }
  };

  // ----------------
  // Screen Transitions and Navigation Handlers
  // ----------------

 window.screenTransitionHandler = function(screenId) {
  log(`Handling screen transition to: ${screenId}`);
  
  // Apply screen-specific fixes
  switch(screenId) {
    case 'wallet-screen':
      enhanceHomeScreen();
      updateBalanceDisplay();
      populateMainWalletTokenList();
      break;
      
    case 'token-detail':
      fixTokenDetailView();
      enhanceTokenDetailBadge();
      
      // Update transaction list for current token
      const tokenId = document.getElementById('detail-symbol')?.textContent.toLowerCase();
      if (tokenId && typeof window.updateTransactionList === 'function') {
        window.updateTransactionList(tokenId);
      }
      break;
      
    case 'send-screen':
      fixSendScreen();
      break;
      
    case 'receive-screen':
      fixReceiveScreen();
      break;
      
    case 'history-screen':
      fixHistoryScreen();
      populateTransactionHistory();
      break;
  }

  // Universal styling and layout fixes
  const screen = document.getElementById(screenId);
  if (screen) {
    // Ensure consistent screen styling
    screen.style.cssText = `
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      background-color: #FFFFFF !important;
      overflow: hidden !important;
    `;

    // Add safe padding for status bar
    const statusBarHeight = 20; // Matches CSS status bar height
    screen.style.paddingTop = `${statusBarHeight}px`;

    // Ensure consistent header styling
    const header = screen.querySelector('.screen-header, .main-header');
    if (header) {
      header.style.cssText = `
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 8px 16px !important;
        height: 48px !important;
        background-color: #FFFFFF !important;
      `;
    }

    // Ensure back buttons are consistent
    const backButtons = screen.querySelectorAll('.back-button');
    backButtons.forEach(button => {
      button.style.cssText = `
        width: 36px !important;
        height: 36px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        background: transparent !important;
        border: none !important;
        color: #1A2024 !important;
      `;
    });
  }

  // Trigger any pending UI updates
  window.clearElementCache();

  // Ensure bottom tabs are always at the bottom for scrollable screens
  const bottomTabs = document.querySelector('.bottom-tabs');
  if (bottomTabs) {
    bottomTabs.style.cssText = `
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      z-index: 9999 !important;
      background-color: #FFFFFF !important;
      border-top: 1px solid #F5F5F5 !important;
    `;
  }

  // Accessibility and focus management
  try {
    // Remove focus from any previous active elements
    if (document.activeElement) {
      document.activeElement.blur();
    }

    // Find first focusable element in the screen
    const focusableElements = screen.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus({ preventScroll: true });
    }
  } catch (error) {
    log(`Focus management error: ${error.message}`, 'error');
  }
};
  // ----------------
  // Wallet Data Management
  // ----------------

  // Wallet Data Setup
  const setupDefaultWalletData = function() {
    return new Promise(resolve => {
      log('Setting up default wallet data');
      
      // Deep clone function
      const deepClone = (obj) => {
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }

        if (Array.isArray(obj)) {
          return obj.map(deepClone);
        }

        const clonedObj = {};
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = deepClone(obj[key]);
          }
        }

        return clonedObj;
      };
      
      // Initialize default wallet data if not present
      if (!window.walletData) {
        window.walletData = {
          main: {
            totalBalance: 350000,
            tokens: [
              {
                id: 'btc',
                name: 'Bitcoin',
                symbol: 'BTC',
                network: 'Bitcoin',
                icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                amount: 1.5,
                value: 125976.11,
                price: 83984.74,
                change: -0.59,
                chainBadge: null
              },
              {
                id: 'eth',
                name: 'Ethereum',
                symbol: 'ETH',
                network: 'Ethereum',
                icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
                amount: 10,
                value: 19738.10,
                price: 1973.81,
                change: -0.71,
                chainBadge: null
              },
              {
                id: 'usdt',
                name: 'Tether',
                symbol: 'USDT',
                network: 'BNB Smart Chain',
                icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
                amount: 50000,
                value: 50000,
                price: 1.00,
                change: 0.00,
                chainBadge: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
              },
              {
                id: 'bnb',
                name: 'Binance Coin',
                symbol: 'BNB',
                network: 'BNB Smart Chain',
                icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
                amount: 25,
                value: 7500.75,
                price: 300.03,
                change: 1.25,
                chainBadge: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
              },
              {
                id: 'xrp',
                name: 'XRP',
                symbol: 'XRP',
                network: 'XRP Ledger',
                icon: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
                amount: 500,
                value: 267.50,
                price: 0.535,
                change: 1.25,
                chainBadge: null
              },
              {
                id: 'sol',
                name: 'Solana',
                symbol: 'SOL',
                network: 'Solana',
                icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
                amount: 15,
                value: 2250.75,
                price: 150.05,
                change: 2.15,
                chainBadge: null
              },
              {
                id: 'ada',
                name: 'Cardano',
                symbol: 'ADA',
                network: 'Cardano',
                icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
                amount: 10000,
                value: 5000.00,
                price: 0.50,
                change: 2.15,
                chainBadge: null
              },
              {
                id: 'doge',
                name: 'Dogecoin',
                symbol: 'DOGE',
                network: 'Dogecoin',
                icon: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
                amount: 50000,
                value: 4500.00,
                price: 0.09,
                change: 3.45,
                chainBadge: null
              },
              {
                id: 'dot',
                name: 'Polkadot',
                symbol: 'DOT',
                network: 'Polkadot',
                icon: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
                amount: 1000,
                value: 6500.00,
                price: 6.50,
                change: 1.75,
                chainBadge: null
              }
            ]
          },
          secondary: {
            totalBalance: 75000,
            tokens: [
              {
                id: 'usdt',
                name: 'Tether',
                symbol: 'USDT',
                network: 'Polygon',
                icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
                amount: 25000,
                value: 25000,
                price: 1.00,
                change: 0.00,
                chainBadge: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
              },
              {
                id: 'matic',
                name: 'Polygon',
                symbol: 'MATIC',
                network: 'Polygon',
                icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
                amount: 500,
                value: 750.25,
                price: 1.50,
                change: 1.25,
                chainBadge: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
              }
            ]
          },
          business: {
            totalBalance: 100000,
            tokens: [
              {
                id: 'usdt',
                name: 'Tether',
                symbol: 'USDT',
                network: 'Ethereum',
                icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
                amount: 75000,
                value: 75000,
                price: 1.00,
                change: 0.00,
                chainBadge: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
              },
              {
                id: 'eth',
                name: 'Ethereum',
                symbol: 'ETH',
                network: 'Ethereum',
                icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
                amount: 5,
                value: 9869.05,
                price: 1973.81,
                change: -0.71,
                chainBadge: null
              }
            ]
          }
        };
      }
      
      // Initialize wallet state using deep clone
      if (!window.originalWalletData) {
        window.originalWalletData = deepClone(window.walletData);
      }
      
      if (!window.currentWalletData) {
        window.currentWalletData = deepClone(window.walletData);
      }
      
      // Set active wallet if not already set
      window.activeWallet = window.activeWallet || 'main';
      
      // Initialize transactions data if not present
      if (!window.currentTransactions) {
        window.currentTransactions = {
          main: {
            usdt: [
              {
                id: 'tx-' + Date.now(),
                type: 'receive',
                amount: 50000,
                symbol: 'USDT',
                value: 50000,
                date: '2025-04-05 10:15',
                from: '0x' + Array.from({length: 40}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join(''),
                to: '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71',
                hash: '0x' + Array.from({length: 64}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')
              }
            ],
            btc: [
              {
                id: 'tx-' + (Date.now() - 86400000),
                type: 'receive',
                amount: 1.5,
                symbol: 'BTC',
                value: 125976.11,
                date: '2025-04-04 15:30',
                from: '0x' + Array.from({length: 40}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join(''),
                to: '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71',
                hash: '0x' + Array.from({length: 64}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')
              }
            ]
          }
        };
      }
      
      // Populate token list immediately
      try {
        if (typeof window.populateMainWalletTokenList === 'function') {
          window.populateMainWalletTokenList();
        }
      } catch (e) {
        console.error('Error in initial token list population:', e);
      }
      
      // Set up balance display
      updateBalanceDisplay();
      
      resolve();
    });
  };
  
  window.setupDefaultWalletData = setupDefaultWalletData;

  
  // Update wallet balance display
  function updateBalanceDisplay() {
    const totalBalanceElement = document.getElementById('total-balance');
    if (!totalBalanceElement) return;
    
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData && window.currentWalletData[activeWallet];
    
    if (wallet) {
      const formattedBalance = window.FormatUtils && typeof window.FormatUtils.formatCurrency === 'function' ?
        window.FormatUtils.formatCurrency(wallet.totalBalance) : 
        '$' + wallet.totalBalance.toFixed(2);
      
      totalBalanceElement.textContent = formattedBalance;
    }
  }
  
  window.updateBalanceDisplay = updateBalanceDisplay;

  // ----------------
  // Token List and Management
  // ----------------

  // Token list population function
  function populateMainWalletTokenList() {
    const tokenList = document.getElementById('token-list');
    if (!tokenList) {
      log('Token list element not found', 'error');
      return;
    }
    
    // Clear list
    tokenList.innerHTML = '';
    
    // Get active wallet data with better fallback
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData && window.currentWalletData[activeWallet];
    
    if (!wallet || !wallet.tokens || !wallet.tokens.length) {
      log('No tokens available for main wallet display', 'error');
      
      // Add placeholder tokens
      tokenList.innerHTML = `
        <div class="token-item">
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
        </div>
      `;
      return;
    }
    
    // Create token items
    wallet.tokens.forEach(token => {
      try {
        const tokenItem = document.createElement('div');
        tokenItem.className = 'token-item';
        tokenItem.setAttribute('data-token-id', token.id);
        
        // Format numbers for display
        const formattedAmount = token.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6
        });
        
        const formattedValue = window.FormatUtils && typeof window.FormatUtils.formatCurrency === 'function' ?
          window.FormatUtils.formatCurrency(token.value) : 
          '$' + token.value.toFixed(2);
        
        // Show network badge for tokens with chainBadge
        const networkBadge = token.chainBadge ? 
          `<div class="chain-badge"><img src="${token.chainBadge}" alt="${token.network}"></div>` : '';
        
        tokenItem.innerHTML = `
          <div class="token-icon">
            <img src="${window.getTokenLogoUrl ? window.getTokenLogoUrl(token.id) : token.icon}" alt="${token.name}">
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
            console.log('Token clicked:', token.id);
          }
        });
        
        tokenList.appendChild(tokenItem);
      } catch (error) {
        console.error('Error creating token item:', error);
      }
    });
  }
  
  window.populateMainWalletTokenList = populateMainWalletTokenList;

  // ----------------
  // Screen Enhancement Functions
  // ----------------

  // Fix #8: Home Screen Enhancements
  function enhanceHomeScreen() {
    log('Enhancing home screen');
    
    const walletScreen = document.getElementById('wallet-screen');
    if (!walletScreen) return;

    // Fix wallet selector
    const walletSelector = walletScreen.querySelector('.wallet-selector');
    if (walletSelector) {
      walletSelector.style.cssText = `
        padding: 8px 0 !important;
        cursor: pointer !important;
      `;

      const walletName = walletSelector.querySelector('.wallet-name');
      if (walletName) {
        walletName.style.cssText = `
          font-size: 14px !important;
          font-weight: 600 !important;
          color: #1A2024 !important;
        `;
      }
      
      // Add wallet selector functionality
      walletSelector.addEventListener('click', showWalletSelectorModal);
    }

    // Fix balance display
    const balanceDisplay = walletScreen.querySelector('.balance-display');
    if (balanceDisplay) {
      balanceDisplay.style.cssText = `
        padding: 8px 16px 16px !important;
      `;

      const balanceAmount = balanceDisplay.querySelector('.balance-amount');
      if (balanceAmount) {
        balanceAmount.style.cssText = `
          font-size: 28px !important;
          font-weight: 700 !important;
          color: #1A2024 !important;
        `;
      }
      
      // Add visibility toggle
      const visibilityToggle = balanceDisplay.querySelector('.visibility-toggle');
      if (visibilityToggle) {
        visibilityToggle.addEventListener('click', toggleBalanceVisibility);
      }
    }

    // Enhance quick actions
    enhanceQuickActions(walletScreen);
    
    // Fix token list
    fixTokenList(walletScreen);
    
    // Setup investment warning
    const investmentWarning = document.getElementById('investment-warning');
    if (investmentWarning) {
      // Show warning initially
      investmentWarning.style.display = 'block';
      
      // Setup close button
      const closeWarningBtn = document.getElementById('close-investment-warning');
      if (closeWarningBtn) {
        closeWarningBtn.addEventListener('click', function() {
          investmentWarning.style.display = 'none';
        });
      }
    }
  }

  function enhanceQuickActions(screen) {
    const quickActions = screen.querySelector('.quick-actions');
    if (!quickActions) return;

    quickActions.style.cssText = `
      padding: 0 16px 16px !important;
    `;

    const actionButtons = quickActions.querySelectorAll('.action-circle');
    actionButtons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.style.cssText = `
          background-color: #F5F5F5 !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          border-radius: 50% !important;
          margin-bottom: 4px !important;
        `;
      }

      const label = btn.querySelector('span');
      if (label) {
        label.style.cssText = `
          font-size: 10px !important;
          font-weight: 500 !important;
        `;
      }
    });
  }

  function fixTokenList(screen) {
    const tokenList = screen.querySelector('#token-list');
    if (!tokenList) return;

    const tokenItems = tokenList.querySelectorAll('.token-item');
    tokenItems.forEach(item => {
      item.style.cssText = `
        padding: 14px 16px !important;
        border-bottom: 1px solid #F5F5F5 !important;
      `;

      const tokenIcon = item.querySelector('.token-icon');
      if (tokenIcon) {
        tokenIcon.style.cssText = `
          width: 36px !important;
          height: 36px !important;
          min-width: 36px !important;
          margin-right: 16px !important;
          position: relative !important;
        `;
      }
    });
  }

  function showWalletSelectorModal() {
    // Create wallet selector modal if it doesn't exist
    let walletModal = document.getElementById('wallet-selector-modal');
    
    if (!walletModal) {
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
  }

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
      
      // Update balance
      updateBalanceDisplay();
      
      // Update token list
      if (typeof window.populateMainWalletTokenList === 'function') {
        window.populateMainWalletTokenList();
      }
      
      window.showToast(`Switched to ${walletId} wallet`);
    }
  }

  function toggleBalanceVisibility() {
    const balanceAmount = document.querySelector('.balance-amount');
    const visibilityIcon = document.querySelector('.visibility-toggle i');
    
    if (!balanceAmount || !visibilityIcon) return;
    
    const isHidden = balanceAmount.getAttribute('data-hidden') === 'true';
    
    if (isHidden) {
      // Show balance
      const activeWallet = window.activeWallet || 'main';
      const wallet = window.currentWalletData && window.currentWalletData[activeWallet];
      
      if (wallet) {
        const formattedBalance = window.FormatUtils && typeof window.FormatUtils.formatCurrency === 'function' ?
          window.FormatUtils.formatCurrency(wallet.totalBalance) : 
          '$' + wallet.totalBalance.toFixed(2);
        
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
  }
