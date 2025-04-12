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

  // ----------------
  // Token Detail View Functions
  // ----------------

  // Fix #5: Token Detail View Fixes
  function fixTokenDetailView() {
    log('Fixing token detail view');
    
    const tokenDetail = document.getElementById('token-detail');
    if (!tokenDetail) {
      log('Token detail view not found, creating it', 'error');
      createTokenDetailView();
      return;
    }

    // Apply all token detail fixes
    fixTokenDetailHeader();
    fixTokenDetailLayout();
    fixInvestmentBanner();
    fixPriceSectionAndScrolling();
    fixStakingBanner();
    enhanceTokenActions();
  }

function enhanceNetworkBadges() {
    log('Enhancing network badges');
    
    // Define which tokens should have network badges based on their chainBadge property
    const tokenItems = document.querySelectorAll('.token-item');
    
    tokenItems.forEach(item => {
      const tokenId = item.getAttribute('data-token-id');
      if (!tokenId) return;
      
      const activeWallet = window.activeWallet || 'main';
      const wallet = window.currentWalletData && window.currentWalletData[activeWallet];
      if (!wallet || !wallet.tokens) return;
      
      const token = wallet.tokens.find(t => t.id === tokenId);
      if (!token || !token.chainBadge) return;
      
      const tokenIcon = item.querySelector('.token-icon');
      if (!tokenIcon) return;
      
      // Check if badge already exists
      let badge = tokenIcon.querySelector('.chain-badge');
      
      // Create or update badge
      if (!badge) {
        badge = createNetworkBadge(token.id, token.chainBadge, token.network);
        tokenIcon.appendChild(badge);
      } else {
        // Update badge properties directly
        const badgeImg = badge.querySelector('img');
        if (badgeImg) {
          badgeImg.src = token.chainBadge;
          badgeImg.alt = token.network || (token.id.toUpperCase() + ' Network');
        }
        applyBadgeStyling(badge);
      }
    });
    
    // Add network badge to token detail icon if appropriate
    enhanceTokenDetailBadge();
}
  
  function enhanceTokenDetailBadge() {
    const tokenDetailIcon = document.querySelector('.token-detail-icon-container');
    if (!tokenDetailIcon) return;
    
    const tokenSymbol = document.getElementById('detail-symbol');
    if (!tokenSymbol) return;
    
    const tokenId = tokenSymbol.textContent.toLowerCase();
    if (!tokenId) return;
    
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData?.[activeWallet];
    if (!wallet) return;
    
    const token = wallet.tokens.find(t => t.id === tokenId);
    if (!token || !token.chainBadge) return;
    
    // Check if badge already exists
    let detailBadge = tokenDetailIcon.querySelector('.chain-badge');
    
    if (!detailBadge) {
      detailBadge = createNetworkBadge(token.id, token.chainBadge, token.network);
      tokenDetailIcon.appendChild(detailBadge);
    } else {
      updateNetworkBadge(detailBadge, token.id, token.chainBadge, token.network);
    }
  }

  function createNetworkBadge(tokenId, badgeUrl, network) {
    const badge = document.createElement('div');
    badge.className = 'chain-badge';
    
    const badgeImg = document.createElement('img');
    badgeImg.src = badgeUrl;
    badgeImg.alt = network || (tokenId.toUpperCase() + ' Network');
    
    badge.appendChild(badgeImg);
    
    // Force proper styling
    applyBadgeStyling(badge);
    
    return badge;
  }

  function applyBadgeStyling(badge) {
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
  }

  // Fix network selection filters
  function fixNetworkSelection() {
    log('Fixing network selection filters');
    
    const networkFilters = document.querySelectorAll('.networks-filter .all-networks');
    networkFilters.forEach(filter => {
      filter.style.cssText = `
        display: inline-flex !important;
        align-items: center !important;
        background: #F5F5F5 !important;
        border-radius: 16px !important;
        padding: 6px 12px !important;
        font-size: 12px !important;
        color: #5F6C75 !important;
        margin: 8px 8px !important;
        font-weight: 500 !important;
      `;
      
      const chevron = filter.querySelector('i.fa-chevron-down');
      if (chevron) {
        chevron.style.cssText = `
          margin-left: 6px !important;
          font-size: 10px !important;
        `;
      }
    });
    
    const filterContainers = document.querySelectorAll('.networks-filter');
    filterContainers.forEach(container => {
      container.style.cssText = `
        text-align: left !important;
        padding-left: 8px !important;
      `;
    });
  }

  // Create token detail view if missing
  function createTokenDetailView() {
    const existingView = document.getElementById('token-detail');
    if (existingView && existingView.children.length > 0) return;
    
    log('Creating token detail view');
    
    const tokenDetail = existingView || document.createElement('div');
    tokenDetail.id = 'token-detail';
    tokenDetail.className = 'screen hidden';
    
    tokenDetail.innerHTML = `
      <div class="detail-header">
        <button class="back-button">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="token-detail-title">
          <h2 id="detail-symbol">BTC</h2>
          <p id="detail-fullname">Bitcoin</p>
        </div>
        <div class="header-icons">
          <button class="icon-button">
            <i class="fas fa-bell"></i>
          </button>
          <button class="icon-button">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
      
      <div class="token-detail-content">
        <div class="token-detail-icon-container">
          <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Bitcoin" class="token-detail-large-icon">
          <!-- Chain badge will be added here if needed -->
        </div>
        
        <div class="token-detail-balance">
          <h2>0.00 BTC</h2>
          <p>$0.00</p>
        </div>
        
        <div class="token-detail-actions">
          <button class="detail-action" id="detail-send">
            <i class="fas fa-arrow-up"></i>
            <span>Send</span>
          </button>
          <button class="detail-action" id="detail-receive">
            <i class="fas fa-arrow-down"></i>
            <span>Receive</span>
          </button>
          <button class="detail-action" id="detail-buy">
            <i class="fas fa-credit-card"></i>
            <span>Buy</span>
          </button>
          <button class="detail-action" id="detail-swap">
            <i class="fas fa-exchange-alt"></i>
            <span>Swap</span>
          </button>
        </div>
        
        <div class="staking-container" style="display: none;">
          <div class="staking-icon">
            <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Staking">
          </div>
          <div class="staking-content">
            <h3>Earn <span class="staking-apy">5.5%</span> APY</h3>
            <p>Stake your assets and earn rewards</p>
          </div>
          <i class="fas fa-chevron-right staking-arrow"></i>
        </div>
        
        <div class="gas-fee-indicator">
          <i class="fas fa-gas-pump"></i>
          <span>Network fee: <span class="gas-fee">0.000105 BNB</span></span>
        </div>
        
        <div class="transaction-header">
          <h3>Transactions</h3>
          <button class="filter-button">
            <i class="fas fa-filter"></i>
          </button>
        </div>
        
        <div class="transaction-list" id="transaction-list">
          <!-- Transactions will be inserted here by JS -->
          <div class="no-transactions">
            <p>No transaction history available</p>
            <div class="explorer-link">
              <a href="#" id="view-on-explorer">View on Block Explorer</a>
            </div>
          </div>
        </div>
        
        <div class="token-price-info">
          <div class="current-price">
            <h3>Current Price</h3>
            <div class="price-with-change">
              <span id="token-current-price">$83,984.74</span>
              <span id="token-price-change" class="negative">-0.59%</span>
            </div>
            <div class="price-timeframe">in the last 24h</div>
          </div>
          
          <div class="price-disclaimer">
            Past performance is not a reliable indicator of future results. Data provided by CoinMarketCap.
          </div>
        </div>
      </div>
    `;
    
    if (!existingView) {
      document.querySelector('.app-container').appendChild(tokenDetail);
    }
    
    // Set up event listeners
    setupTokenDetailEvents(tokenDetail);
  }

  // Token Detail Header style fixes
  function fixTokenDetailHeader() {
    const detailHeader = document.querySelector('#token-detail .detail-header');
    if (!detailHeader) return;

    detailHeader.style.cssText = `
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      height: 48px !important;
      position: relative !important;
      padding: 8px 16px !important;
    `;

    const titleElement = detailHeader.querySelector('.token-detail-title');
    if (titleElement) {
      titleElement.style.cssText = `
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: auto !important;
        max-width: 70% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        z-index: 1 !important;
        pointer-events: none !important;
      `;

      styleTitleElements(titleElement);
    }

    styleHeaderButtons(detailHeader);
  }

  function styleTitleElements(titleElement) {
    const symbolElement = titleElement.querySelector('#detail-symbol');
    if (symbolElement) {
      symbolElement.style.cssText = `
        font-size: 18px !important;
        font-weight: 600 !important;
        margin-bottom: 0 !important;
        line-height: 1.2 !important;
      `;
    }

    const fullnameElement = titleElement.querySelector('#detail-fullname');
    if (fullnameElement) {
      fullnameElement.style.cssText = `
        font-size: 11px !important;
        color: #8A939D !important;
        line-height: 1.2 !important;
        margin-top: 0 !important;
      `;
    }
  }

  function styleHeaderButtons(header) {
    const backButton = header.querySelector('.back-button');
    if (backButton) {
      backButton.style.cssText = `
        position: relative !important;
        z-index: 2 !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 32px !important;
        height: 32px !important;
      `;
    }

    const headerIcons = header.querySelector('.header-icons');
    if (headerIcons) {
      headerIcons.style.cssText = `
        position: relative !important;
        z-index: 2 !important;
        display: flex !important;
        gap: 8px !important;
      `;

      const iconButtons = headerIcons.querySelectorAll('.icon-button');
      iconButtons.forEach(btn => {
        btn.style.cssText = `
          width: 32px !important;
          height: 32px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 0 !important;
          margin: 0 !important;
        `;
      });
    }
  }

  // Fix token detail layout
  function fixTokenDetailLayout() {
    const tokenDetailContent = document.querySelector('.token-detail-content');
    if (!tokenDetailContent) return;

    tokenDetailContent.style.cssText = `
      flex: 1 !important;
      overflow-y: auto !important;
      padding: 0 !important;
      scrollbar-width: none !important;
    `;

    fixIconAndBalance(tokenDetailContent);
    fixActionButtons(tokenDetailContent);
    fixTransactionSection(tokenDetailContent);
  }

  function fixIconAndBalance(content) {
    const iconContainer = content.querySelector('.token-detail-icon-container');
    if (iconContainer) {
      iconContainer.style.cssText = `
        margin: 8px 0 4px !important;
        position: relative !important;
        overflow: visible !important;
      `;
    }

    const balanceContainer = content.querySelector('.token-detail-balance');
    if (balanceContainer) {
      balanceContainer.style.cssText = `
        margin: 4px 0 8px !important;
        text-align: center !important;
      `;

      const balanceAmount = balanceContainer.querySelector('h2');
      if (balanceAmount) {
        balanceAmount.style.cssText = `
          font-size: 18px !important;
          margin-bottom: 2px !important;
          font-weight: 600 !important;
        `;
      }

      const balanceValue = balanceContainer.querySelector('p');
      if (balanceValue) {
        balanceValue.style.cssText = `
          font-size: 14px !important;
          color: #8A939D !important;
        `;
      }
    }
  }

  function fixActionButtons(content) {
    const actionButtons = content.querySelector('.token-detail-actions');
    if (!actionButtons) return;

    actionButtons.style.cssText = `
      margin: 8px 0 !important;
      padding: 0 16px !important;
      display: flex !important;
      justify-content: space-between !important;
    `;

    const actions = actionButtons.querySelectorAll('.detail-action');
    actions.forEach(action => {
      action.style.cssText = `
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      `;

      styleActionIcon(action);
      styleActionLabel(action);
    });
  }

  function styleActionIcon(action) {
    const icon = action.querySelector('i');
    if (icon) {
      icon.style.cssText = `
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        background-color: rgba(51, 117, 187, 0.08) !important;
        color: #3375BB !important;
        margin-bottom: 4px !important;
        font-size: 14px !important;
      `;
    }
  }

  function styleActionLabel(action) {
    const label = action.querySelector('span');
    if (label) {
      label.style.cssText = `
        font-size: 11px !important;
        color: #5F6C75 !important;
      `;
    }
  }

  function fixTransactionSection(content) {
    const transactionHeader = content.querySelector('.transaction-header');
    if (transactionHeader) {
      transactionHeader.style.cssText = `
        padding: 8px 16px !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
      `;

      const headerTitle = transactionHeader.querySelector('h3');
      if (headerTitle) {
        headerTitle.style.cssText = `
          font-size: 14px !important;
          font-weight: 600 !important;
          margin: 0 !important;
        `;
      }
    }

    const transactionList = content.querySelector('.transaction-list');
    if (transactionList) {
      transactionList.style.cssText = `
        margin-bottom: 16px !important;
      `;

      styleTransactionItems(transactionList);
    }
  }

  function styleTransactionItems(list) {
    const transactions = list.querySelectorAll('.transaction-item');
    transactions.forEach(tx => {
      tx.style.cssText = `
        padding: 12px 16px !important;
        display: flex !important;
        align-items: center !important;
        border-bottom: 1px solid #F5F5F5 !important;
      `;
    });

    const noTransactions = list.querySelector('.no-transactions');
    if (noTransactions) {
      styleNoTransactionsMessage(noTransactions);
    }
  }

  function styleNoTransactionsMessage(element) {
    element.style.cssText = `
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      padding: 40px 20px !important;
      text-align: center !important;
    `;

    const message = element.querySelector('p');
    if (message) {
      message.style.cssText = `
        font-size: 12px !important;
        color: #8A939D !important;
        margin-bottom: 4px !important;
      `;
    }

    const explorerLink = element.querySelector('.explorer-link');
    if (explorerLink) {
      explorerLink.style.cssText = `
        font-size: 11px !important;
        color: #8A939D !important;
      `;

      const link = explorerLink.querySelector('a');
      if (link) {
        link.style.cssText = `
          color: #3375BB !important;
          text-decoration: none !important;
        `;
      }
    }
  }

  function fixInvestmentBanner() {
    const investmentWarning = document.getElementById('investment-warning');
    if (!investmentWarning) return;

    investmentWarning.style.cssText = `
      margin: 8px 16px !important;
      background-color: #FEF9E7 !important;
      border-radius: 8px !important;
      border-left: 4px solid #D4AC0D !important;
      padding: 8px 12px !important;
    `;

    const warningIcon = investmentWarning.querySelector('.warning-icon');
    if (warningIcon) {
      warningIcon.style.cssText = `
        color: #D4AC0D !important;
        margin-right: 8px !important;
      `;
    }

    const warningText = investmentWarning.querySelector('.investment-warning-text');
    if (warningText) {
      warningText.style.cssText = `
        font-size: 11px !important;
        color: #5F6C75 !important;
        line-height: 1.4 !important;
      `;
    }
  }

  function fixPriceSectionAndScrolling() {
    const priceSection = document.querySelector('.token-price-info');
    if (!priceSection) return;

    priceSection.style.cssText = `
      padding: 16px !important;
      border-top: 8px solid #F5F5F5 !important;
      margin-top: 16px !important;
    `;

    const currentPrice = priceSection.querySelector('.current-price');
    if (currentPrice) {
      currentPrice.style.cssText = `
        margin-bottom: 16px !important;
      `;
    }

    const priceLabel = priceSection.querySelector('.current-price h3');
    if (priceLabel) {
      priceLabel.style.cssText = `
        font-size: 12px !important;
        color: #8A939D !important;
        margin-bottom: 4px !important;
      `;
    }

    const priceValue = priceSection.querySelector('#token-current-price');
    if (priceValue) {
      priceValue.style.cssText = `
        font-size: 18px !important;
        font-weight: 600 !important;
        margin-right: 8px !important;
      `;
    }

    const disclaimer = priceSection.querySelector('.price-disclaimer');
    if (disclaimer) {
      disclaimer.style.cssText = `
        font-size: 11px !important;
        color: #8A939D !important;
        line-height: 1.4 !important;
      `;
    }
  }

  function fixStakingBanner() {
    const stakingBanner = document.querySelector('.staking-container');
    if (!stakingBanner) return;

    // Only show staking for certain tokens
    const symbolElement = document.getElementById('detail-symbol');
    if (!symbolElement) return;

    const symbol = symbolElement.textContent.toLowerCase();
    if (!symbol) return;
    
    const stakingTokens = ['eth', 'bnb', 'sol', 'ada', 'dot', 'matic'];
    
    if (stakingTokens.includes(symbol)) {
      stakingBanner.style.display = 'flex';
      
      // Set APY based on token
      const apyValues = {
        'eth': '4.8%',
        'bnb': '5.2%',
        'sol': '6.5%',
        'ada': '5.0%',
        'dot': '10.5%',
        'matic': '8.2%'
      };
      
      const apyElement = stakingBanner.querySelector('.staking-apy');
      if (apyElement) {
        apyElement.textContent = apyValues[symbol] || '5.5%';
      }
      
      // Set icon
      const iconImg = stakingBanner.querySelector('.staking-icon img');
      if (iconImg) {
        iconImg.src = `https://cryptologos.cc/logos/${symbol}-${symbol}-logo.png`;
      }
    } else {
      stakingBanner.style.display = 'none';
    }
  }

  function enhanceTokenActions() {
    const actionButtons = document.querySelectorAll('.token-detail-actions .detail-action');
    if (!actionButtons.length) return;
    
    // Add event listeners to token detail action buttons
    actionButtons.forEach(button => {
      const id = button.id;
      
      if (id === 'detail-send') {
        button.addEventListener('click', function() {
          const tokenId = document.getElementById('detail-symbol').textContent.toLowerCase();
          window.showSendScreen(tokenId);
        });
      } else if (id === 'detail-receive') {
        button.addEventListener('click', function() {
          const tokenId = document.getElementById('detail-symbol').textContent.toLowerCase();
          window.showReceiveScreen(tokenId);
        });
      } else if (id === 'detail-buy') {
        button.addEventListener('click', function() {
          window.showToast('Buy feature coming soon');
        });
      } else if (id === 'detail-swap') {
        button.addEventListener('click', function() {
          window.showToast('Swap feature coming soon');
        });
      }
    });
  }

  // Setup token detail events
  function setupTokenDetailEvents(detailScreen) {
    if (!detailScreen) return;
    
    // Back button
    const backButton = detailScreen.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', function() {
        window.navigateTo('wallet-screen');
      });
    }
    
    // Send button
    const sendButton = detailScreen.querySelector('#detail-send');
    if (sendButton) {
      sendButton.addEventListener('click', function() {
        const tokenId = document.getElementById('detail-symbol')?.textContent.toLowerCase();
        if (tokenId) {
          window.showSendScreen(tokenId);
        }
      });
    }
    
    // Receive button
    const receiveButton = detailScreen.querySelector('#detail-receive');
    if (receiveButton) {
      receiveButton.addEventListener('click', function() {
        const tokenId = document.getElementById('detail-symbol')?.textContent.toLowerCase();
      if (tokenId) {
          window.showReceiveScreen(tokenId);
        }
      });
    }
    
    // Buy and swap buttons
    const buyButton = detailScreen.querySelector('#detail-buy');
    if (buyButton) {
      buyButton.addEventListener('click', function() {
        window.showToast('Buy feature coming soon');
      });
    }
    
    const swapButton = detailScreen.querySelector('#detail-swap');
    if (swapButton) {
      swapButton.addEventListener('click', function() {
        window.showToast('Swap feature coming soon');
      });
    }
    
    // View on explorer link
    const viewOnExplorer = detailScreen.querySelector('#view-on-explorer');
    if (viewOnExplorer) {
      viewOnExplorer.addEventListener('click', function(e) {
        e.preventDefault();
        const explorerOverlay = document.getElementById('explorer-overlay');
        if (explorerOverlay) {
          explorerOverlay.style.display = 'flex';
        }
      });
    }
  }

  // ----------------
  // Send Screen Management
  // ----------------

  // Fix #6: Send Screen Fixes
  function fixSendScreen() {
    log('Fixing send screen');
    
    const sendScreen = document.getElementById('send-screen');
    if (!sendScreen || sendScreen.children.length === 0) {
      createSendScreen();
      return;
    }

    // Ensure we're on the first page of the send screen (not a second page)
    const sendContent = sendScreen.querySelector('.send-content');
    if (sendContent) {
      sendContent.style.display = 'block';
    }

    // Fix token selection row
    const tokenSelectionRow = sendScreen.querySelector('.token-selection-row');
    if (tokenSelectionRow) {
      tokenSelectionRow.style.cssText = `
        display: grid !important;
        grid-template-columns: 36px 1fr auto !important;
        align-items: center !important;
        gap: 16px !important;
        padding: 12px 16px !important;
        background-color: #F5F5F5 !important;
        border-radius: 8px !important;
        margin-bottom: 16px !important;
        cursor: pointer !important;
      `;
    }

    // Fix token name styling
    const tokenFullname = sendScreen.querySelector('.token-fullname');
    if (tokenFullname) {
      tokenFullname.style.cssText = `
        font-size: 12px !important;
        color: #8A939D !important;
        background-color: transparent !important;
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      `;
    }

    // Add dollar value under amount
    addDollarValueUnderAmount(sendScreen);
    
    // Reset amount input field and recipient address
    const amountInput = sendScreen.querySelector('#send-amount');
    const recipientInput = sendScreen.querySelector('#recipient-address');
    if (amountInput) amountInput.value = '';
    if (recipientInput) recipientInput.value = '';
    
    // Update dollar value to reflect empty amount
    const dollarValue = sendScreen.querySelector('#dollar-value');
    if (dollarValue) dollarValue.textContent = '≈ $0.00';
    
    // Make sure send button is properly styled
    const sendButton = sendScreen.querySelector('#send-button-confirm');
    if (sendButton) {
      sendButton.disabled = true;
      sendButton.style.opacity = '0.6';
    }
    
    // Remove any potential second pages or overlays
    const tokenSelectScreen = document.getElementById('send-token-select');
    if (tokenSelectScreen) {
      tokenSelectScreen.classList.add('hidden');
    }
    
    // Setup event listeners (only if not already set)
    setupSendScreenEvents(sendScreen);
  }

  // Create send screen if missing
  function createSendScreen() {
    const existingScreen = document.getElementById('send-screen');
    if (existingScreen && existingScreen.children.length > 0) return;
    
    log('Creating send screen');
    
    const sendScreen = existingScreen || document.createElement('div');
    sendScreen.id = 'send-screen';
    sendScreen.className = 'screen hidden';
    
    sendScreen.innerHTML = `
      <div class="screen-header">
        <button class="back-button">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>Send</h2>
        <div class="placeholder-icon"></div>
      </div>
      
      <div class="send-content">
        <div class="token-selection-row">
          <div class="token-icon">
            <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT">
            <div class="chain-badge">
              <img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" alt="BNB Chain">
            </div>
          </div>
          <div class="token-info-column">
            <div class="token-name-row">
              <div class="token-name" id="send-token-symbol">USDT</div>
              <div class="token-network-badge" id="send-token-network">BNB Chain</div>
            </div>
            <div class="token-fullname" id="send-token-name">Tether USD</div>
          </div>
          <i class="fas fa-chevron-down"></i>
        </div>
        
        <div class="amount-input-container">
          <div class="balance-row">
            <div class="available-balance">Available: <span id="available-balance"><span id="max-amount">50000.00</span> USDT</span></div>
            <button class="max-button">MAX</button>
          </div>
          <div class="amount-input-wrapper">
            <input type="text" id="send-amount" placeholder="0" inputmode="decimal">
            <div class="amount-dollar-value" id="dollar-value">≈ $0.00</div>
          </div>
        </div>
        
        <div class="recipient-container">
          <div class="recipient-label">Send to</div>
          <div class="recipient-input-row">
            <input type="text" id="recipient-address" placeholder="Wallet address or ENS">
            <button class="scan-button">
              <i class="fas fa-qrcode"></i>
            </button>
          </div>
        </div>
        
        <div class="network-fee-container">
          <div class="fee-label">Network Fee</div>
          <div class="fee-options">
            <div class="fee-option active" data-speed="fast">
              <div class="fee-option-header">
                <div class="fee-speed">Fast</div>
                <div class="fee-amount">0.000105 BNB</div>
              </div>
              <div class="fee-time">~10 sec</div>
            </div>
            <div class="fee-option" data-speed="normal">
              <div class="fee-option-header">
                <div class="fee-speed">Normal</div>
                <div class="fee-amount">0.000085 BNB</div>
              </div>
              <div class="fee-time">~30 sec</div>
            </div>
            <div class="fee-option" data-speed="slow">
              <div class="fee-option-header">
                <div class="fee-speed">Slow</div>
                <div class="fee-amount">0.000055 BNB</div>
              </div>
              <div class="fee-time">~1 min</div>
            </div>
          </div>
        </div>
        
        <button id="send-button-confirm" class="send-button">
          Continue
        </button>
      </div>
    `;
    
    if (!existingScreen) {
      document.querySelector('.app-container').appendChild(sendScreen);
    }
    
    // Set up event listeners
    setupSendScreenEvents(sendScreen);
  }

function addDollarValueUnderAmount(screen) {
    const availableBalance = screen.querySelector('#available-balance');
    if (!availableBalance) return;

    if (!availableBalance.querySelector('.balance-dollar-value')) {
      const tokenId = window.activeSendTokenId || 'usdt';
      const activeWallet = window.activeWallet || 'main';
      const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
      
      if (!token) return;

      const maxAmountEl = document.getElementById('max-amount');
      if (!maxAmountEl) return;

      const maxAmount = parseFloat(maxAmountEl.textContent);
      const dollarValue = maxAmount * (token.price || 0);

      const valueSpan = document.createElement('span');
      valueSpan.className = 'balance-dollar-value';
      valueSpan.textContent = ` (${window.FormatUtils.formatCurrency(dollarValue)})`;
      valueSpan.style.cssText = `
        font-size: 12px !important;
        color: #8A939D !important;
        margin-left: 4px !important;
      `;

      availableBalance.appendChild(valueSpan);
    }
}
  function setupSendScreenEvents(sendScreen) {
    // Back button handler
    const backButton = sendScreen.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', function() {
        window.navigateTo('wallet-screen');
      });
    }
    
    // Token selection handler
    const tokenSelection = sendScreen.querySelector('.token-selection-row');
    if (tokenSelection) {
      tokenSelection.addEventListener('click', function() {
        const tokenSelectScreen = document.getElementById('send-token-select');
        if (tokenSelectScreen) {
          tokenSelectScreen.classList.remove('hidden');
        } else {
          window.showToast('Token selection coming soon');
        }
      });
    }
    
    // Max button handler
    const maxButton = sendScreen.querySelector('.max-button');
    if (maxButton) {
      maxButton.addEventListener('click', function() {
        const maxAmount = document.getElementById('max-amount');
        const sendAmount = document.getElementById('send-amount');
        if (maxAmount && sendAmount) {
          sendAmount.value = maxAmount.textContent;
          // Update dollar value
          updateDollarValue(sendAmount.value);
        }
      });
    }
    
    // Amount input handler
    const amountInput = sendScreen.querySelector('#send-amount');
    if (amountInput) {
      amountInput.addEventListener('input', function() {
        updateDollarValue(this.value);
      });
    }
    
    // Fee option selection
    const feeOptions = sendScreen.querySelectorAll('.fee-option');
    feeOptions.forEach(option => {
      option.addEventListener('click', function() {
        feeOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Send button handler
    const sendButton = sendScreen.querySelector('#send-button-confirm');
    if (sendButton) {
      sendButton.addEventListener('click', function() {
        const amount = document.getElementById('send-amount')?.value;
        const recipient = document.getElementById('recipient-address')?.value;
        
        if (!amount || parseFloat(amount) <= 0) {
          window.showToast('Please enter a valid amount');
          return;
        }
        
        if (!recipient) {
          window.showToast('Please enter recipient address');
          return;
        }
        
        // Show biometric verification
        const biometricOverlay = document.getElementById('biometric-overlay');
        if (biometricOverlay) {
          biometricOverlay.style.display = 'flex';
          
          // Simulate biometric auth
          setTimeout(() => {
            biometricOverlay.style.display = 'none';
            
            // Show transaction status
            const txModal = document.getElementById('tx-status-modal');
            if (txModal) {
              txModal.style.display = 'flex';
              
              // Update tx hash
              const txHash = document.getElementById('tx-hash');
              if (txHash) {
                txHash.textContent = '0x' + Math.random().toString(16).substring(2, 10) + '...';
              }
              
              // Simulate confirmation progress
              let confirms = 0;
              const txPending = document.getElementById('tx-pending');
              const txSuccess = document.getElementById('tx-success');
              const confirmCount = document.getElementById('confirm-count');
              const txAmount = document.getElementById('tx-amount');
              const txTo = document.getElementById('tx-to');
              
              if (txPending && txSuccess && confirmCount && txAmount && txTo) {
                const interval = setInterval(() => {
                  confirms++;
                  confirmCount.textContent = confirms;
                  
                  if (confirms >= 3) {
                    clearInterval(interval);
                    
                    // Hide pending view
                    txPending.classList.add('hidden');
                    
                    // Update success details
                    const tokenSymbol = document.getElementById('send-token-symbol')?.textContent || 'USDT';
                    txAmount.textContent = `${amount} ${tokenSymbol}`;
                    txTo.textContent = recipient.substring(0, 6) + '...' + recipient.substring(recipient.length - 4);
                    
                    // Show success view
                    txSuccess.classList.remove('hidden');
                    
                    // Add transaction to history
                    addTransactionToHistory('send', amount, tokenSymbol);
                    
                    // Update balances
                    updateBalanceAfterTransaction('send', amount);
                  }
                }, 1000);
              }
              
              // Done button handler
              const closeSuccessButton = document.getElementById('close-tx-success');
              if (closeSuccessButton) {
                closeSuccessButton.addEventListener('click', function() {
                  txModal.style.display = 'none';
                  window.navigateTo('wallet-screen');
                });
              }
            }
          }, 2000);
        }
      });
    }
  }

  function updateDollarValue(amount) {
    const dollarValue = document.getElementById('dollar-value');
    if (!dollarValue) return;
    
    const tokenId = window.activeSendTokenId || 'usdt';
    const activeWallet = window.activeWallet || 'main';
    const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
    
    if (!token) return;
    
    const value = parseFloat(amount) * (token.price || 0);
    
    dollarValue.textContent = '≈ ' + (isNaN(value) ? '$0.00' : window.FormatUtils.formatCurrency(value));
}

  // ----------------
  // Receive Screen Management
  // ----------------

  // Fix #7: Receive Screen Fixes
  function fixReceiveScreen() {
    log('Fixing receive screen');
    
    const receiveScreen = document.getElementById('receive-screen');
    if (!receiveScreen || receiveScreen.children.length === 0) {
      createReceiveScreen();
      return;
    }

    // Check for token list or QR view
    const tokenList = receiveScreen.querySelector('#receive-token-list');
    if (tokenList) {
      fixReceiveTokenList(tokenList);
    } else {
      fixReceiveQRView(receiveScreen);
    }
    
    // Setup event listeners
    setupReceiveScreenEvents(receiveScreen);
  }

  // Create receive screen if missing
  function createReceiveScreen() {
    const existingScreen = document.getElementById('receive-screen');
    if (existingScreen && existingScreen.children.length > 0) return;
    
    log('Creating receive screen');
    
    const receiveScreen = existingScreen || document.createElement('div');
    receiveScreen.id = 'receive-screen';
    receiveScreen.className = 'screen hidden';
    
    receiveScreen.innerHTML = `
      <div class="screen-header">
        <button class="back-button">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>Receive</h2>
        <div class="placeholder-icon"></div>
      </div>
      
      <div class="receive-content">
        <div class="token-selection-row">
          <div class="token-icon">
            <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT">
            <div class="chain-badge">
              <img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" alt="BNB Chain">
            </div>
          </div>
          <div class="token-info-column">
            <div class="token-name-row">
              <div class="token-name" id="receive-token-symbol">USDT</div>
              <div class="token-network-badge" id="receive-token-network">BNB Chain</div>
            </div>
            <div class="token-fullname" id="receive-token-name">Tether USD</div>
          </div>
          <i class="fas fa-chevron-down"></i>
        </div>
        
        <div class="qr-section">
          <div class="qr-code-container">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAYASURBVO3BQY4cy5LAQDLQ978yR0tfBZCoain+GzezP1jrEoc1LnJY4yKHNS5yWOMihzUucljjIoc1LnJY4yKHNS5yWOMihzUucljjIoc1LnJY4yKHNS7y4UMq35TwRJWnVJ5Q+aaEJ4c1LnJY4yKHNS7y4ctSvknlDZUnEp5QeUPlmxK+6bDGRQ5rXOSwxkU+/GUqT6g8kfBEwhsJTyQ8ofI3JTxxWOMihzUucljjIh/+MpU3VN5IeEPlDZU3Ev4lhzUucljjIoc1LvLhL0v4myQ8kfCEyt+U8H/JYY2LHNa4yGGNi3z4MpXbJLyh8obKv+SwxkUOa1zksMZFPvyQyv9SwjclPKHyRMIbCf+SwxoXOaxxkcMaF/nwIQlvqHxTwlMqTyR8U8ITCbdReULlicMaFzmscZHDGhf58CGVb0p4QuU2Kk8kPJHwTQlPJDyl8sRhjYsc1rjIYY2LfPhQwm1U3lB5QuWJhCcS3lB5SuWJhG86rHGRwxoXOaxxkQ8fUvmmhG9KeErlNipvJDyR8E0JTyQ8cVjjIoc1LnJY4yIf/jKVJ1TeSHhC5Q2VJxK+SeWNhL/psMZFDmtc5LDGRT78ZSpPJDyR8ITKGwnflPCEyhMJT6g8kfDNhzUucljjIoc1LvLhQyrflPCUyhtBpfbhP0h4Q+WJwxoXOaxxkcMaF/nwIZVvSviXqDyR8ITKEwlPJNxG5YnDGhc5rHGRwxoX+fBlKt+k8kTCGyr/EpU3Et5QeeKwxkUOa1zksGZmfzDWJQ5rXOSwxkUOa1zksLGhBdcMg8Jwm4TbqDyR8ITKEwlflfAbKk8k3OawxkUOa1zksGZmf/BfJLyh8kTCEyq3SbhJQGP6FZU3Em5zWOMihzUuclizsz8Yf4HKGyq3SbhJQGQaP5Fwm8MaFzmscZHDGhf58KGEJxLeUHlC5Q2V26g8kfAblScSnki4zWGNixzWuMhhjYu8/lf8JpVvSrhJ8NTuofKGyhsqTyTc5rDGRQ5rXOSwxkU+/GEJTyS8ofJEwm9UbpPwN6k8kfDEYY2LHNa4yGGNi7z+V/yQyrdKuI3KTxLeULlNwm0Oa1zksLGhBdf4UMJvqDyR8ITKTRJuEjy1e6g8kXCbwxoXOaxxkcMaF/nwl6m8kfAbCU+oPJHwGwm3UXki4YnDGhc5rHGRwxoX+fChhCdUvirhJsF7dg+VN1RukvDEYY2LHNa4yGGNi7z+V/yQyhMJNwl+o3KbhH+JyhMJTxzWuMhhjYsc1rjIhw+pPKXyRMJvVG6S8ETCGypPJLyh8obKGwm3OaxxkcMaFzmscZHXBX9Qwk0CSqsnVJ5IeCLhiYQnVP6mhCcOa1zksLGhBdcIKq2eUHkj4SYJt1F5IuEmAbXVd6k8kXCbwxoXOaxxkcMamf3BH5bwhMpNEr4q4TdUnki4jcoTCbc5rHGRwxoXOaxxkdcFf1DCTQJqqydUnki4ScBD+zWVNxJuc1jjIoc1LnJYI7M/GH+ByhMJv6HyRMJXJfydDmtc5LDGRQ5rXOTDh1SeUHkj4YmEb1J5SuWJhNskvJHwlMoThzUucljjIoc1LvLhL0v4myTcJOG/UPmNhKdUnjiscZHDGhc5rHGRD3+ZyhMqTyQ8pfJEwm0S3lB5QuUmCU+oPHFY4yKHNS5yWOMiH/4ylTcS3lB5IuEJlScSbpLwVMITKr9xWOMihzUucljjIh/+ZQnflPCEyhsqTyTcJOGbVJ5IeOKwxkUOa1zksGZmf/BFCU+oPJHwVQk3CZ7aPVTeULlJwhOHNS5yWOMihzUu8uFDKt+U8ETwm94nqLR6QuWJhCcSbpPwxGGNixzWuMhhjYt8+LKUb1J5Q+WJhCcSnlK5ScJvqDyRcJvDGhc5rHGRwxoX+fCXqTyhcpvgN71P8NTuofJGwm1Unji
          scZHDGhc5rHGRD38Zlack3CThiYQnEm6S8ETCEyq/kXCbwxoXOaxxkcMaF/nwL0t4I+EJlScSnlB5SuUJlScSbpPwxGGNixzWuMhhjYt8+DKV26j8TcFTu4fKGwm3UXni/9NhjYsc1rjIYY2LfPghCf+ShG9SeULlKZU3Em5zWOMihzUucljjIhuLdYnDGhc5rHGRwxoXOaxxkcMaFzmscZHDGhc5rHGRwxoXOaxxkcMaFzmscZHDGhc5rHGRwxoX+T95ZlIbGzP7MQAAAABJRU5ErkJggg==" alt="QR Code" id="qr-code">
          </div>
        </div>
        
        <div class="receive-warning">
          Only send USDT (BEP-20) to this address.<br>
          Sending any other coin may result in permanent loss.
        </div>
        
        <div class="address-container">
          <div class="address-text" id="wallet-address">0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71</div>
          <button class="copy-button" id="copy-address">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        
        <div class="receive-actions">
          <button class="action-button" id="share-address-btn">
            <i class="fas fa-share-alt"></i>
            <span>Share</span>
          </button>
          
          <button class="action-button" id="save-address-btn">
            <i class="fas fa-download"></i>
            <span>Save</span>
          </button>
        </div>
      </div>
    `;
    
    if (!existingScreen) {
      document.querySelector('.app-container').appendChild(receiveScreen);
    }
    
    // Set up event listeners
    setupReceiveScreenEvents(receiveScreen);
  }

  function fixReceiveTokenList(tokenList) {
    tokenList.style.cssText = `
      padding: 0 16px !important;
    `;
    
    const tokenItems = tokenList.querySelectorAll('.token-item');
    tokenItems.forEach(item => {
      item.style.cssText = `
        display: flex !important;
        align-items: center !important;
        padding: 16px !important;
        border-bottom: 1px solid #F5F5F5 !important;
        cursor: pointer !important;
      `;
      
      const tokenIcon = item.querySelector('.token-icon');
      if (tokenIcon) {
        tokenIcon.style.cssText = `
          width: 36px !important;
          height: 36px !important;
          position: relative !important;
          margin-right: 16px !important;
        `;
      }
    });
  }

  function fixReceiveQRView(receiveScreen) {
    const qrSection = receiveScreen.querySelector('.qr-section');
    if (!qrSection) return;
    
    qrSection.style.cssText = `
      background-color: #F5F5F5 !important;
      border-radius: 16px !important;
      padding: 16px !important;
      width: fit-content !important;
      margin: 0 auto !important;
    `;
    
    const qrCode = receiveScreen.querySelector('#qr-code');
    if (qrCode) {
      qrCode.style.cssText = `
        width: 160px !important;
        height: 160px !important;
      `;
    }
    
    const receiveWarning = receiveScreen.querySelector('.receive-warning');
    if (receiveWarning) {
      receiveWarning.style.cssText = `
        color: #EB5757 !important;
        font-size: 12px !important;
        text-align: center !important;
        margin: 16px 0 !important;
        line-height: 1.4 !important;
      `;
    }
    
    const addressContainer = receiveScreen.querySelector('.address-container');
    if (addressContainer) {
      addressContainer.style.cssText = `
        display: flex !important;
        align-items: center !important;
        background-color: #F5F5F5 !important;
        border-radius: 8px !important;
        padding: 8px 12px !important;
        margin: 0 16px !important;
      `;
      
      const addressText = addressContainer.querySelector('.address-text');
      if (addressText) {
        addressText.style.cssText = `
          flex: 1 !important;
          font-family: monospace !important;
          font-size: 14px !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        `;
      }
    }
  }

  function setupReceiveScreenEvents(receiveScreen) {
    // Back button handler
    const backButton = receiveScreen.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', function() {
        window.navigateTo('wallet-screen');
      });
    }
    
    // Token selection handler
    const tokenSelection = receiveScreen.querySelector('.token-selection-row');
    if (tokenSelection) {
      tokenSelection.addEventListener('click', function() {
        window.showToast('Token selection coming soon');
      });
    }
    
    // Copy address button
    const copyButton = receiveScreen.querySelector('#copy-address');
    if (copyButton) {
      copyButton.addEventListener('click', function() {
        const addressText = document.getElementById('wallet-address')?.textContent;
        if (addressText) {
          navigator.clipboard.writeText(addressText)
            .then(() => window.showToast('Address copied to clipboard'))
            .catch(() => window.showToast('Failed to copy address'));
        }
      });
    }
    
    // Share button
    const shareButton = receiveScreen.querySelector('#share-address-btn');
    if (shareButton) {
      shareButton.addEventListener('click', function() {
       window.showToast('Share feature coming soon');
      });
    }
    
    // Save button
    const saveButton = receiveScreen.querySelector('#save-address-btn');
    if (saveButton) {
      saveButton.addEventListener('click', function() {
        window.showToast('Save feature coming soon');
      });
    }
  }

  // ----------------
  // History Screen Management
  // ----------------

  // Fix #8: History Screen Fixes
  function fixHistoryScreen() {
    log('Fixing history screen');
    
    const historyScreen = document.getElementById('history-screen');
    if (!historyScreen || historyScreen.children.length === 0) {
      createHistoryScreen();
      return;
    }
    
    // Set up transaction list
    const txList = historyScreen.querySelector('#history-transaction-list');
    if (txList) {
      // Make sure we populate the transaction list
      setTimeout(() => {
        if (typeof window.populateTransactionHistory === 'function') {
          window.populateTransactionHistory();
        }
      }, 100);
    }
  }

  // Create history screen if missing
  function createHistoryScreen() {
    const existingScreen = document.getElementById('history-screen');
    if (existingScreen && existingScreen.children.length > 0) return;
    
    log('Creating history screen');
    
    const historyScreen = existingScreen || document.createElement('div');
    historyScreen.id = 'history-screen';
    historyScreen.className = 'screen hidden';
    
    historyScreen.innerHTML = `
      <div class="screen-header">
        <button class="back-button">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>Transaction History</h2>
        <button class="icon-button search-button">
          <i class="fas fa-search"></i>
        </button>
      </div>
      
      <div class="filter-options">
        <div class="filter-tabs">
          <button class="filter-tab active" data-filter="all">All</button>
          <button class="filter-tab" data-filter="send">Sent</button>
          <button class="filter-tab" data-filter="receive">Received</button>
          <button class="filter-tab" data-filter="swap">Swaps</button>
        </div>
      </div>
      
      <div class="transaction-list" id="history-transaction-list">
        <!-- Transactions will be inserted here by JS -->
        <div class="no-transactions">
          <p>No transaction history available</p>
        </div>
      </div>
    `;
    
    if (!existingScreen) {
      document.querySelector('.app-container').appendChild(historyScreen);
    }
    
    // Set up event listeners
    setupHistoryScreenEvents(historyScreen);
  }

  function setupHistoryScreenEvents(historyScreen) {
    // Back button handler
    const backButton = historyScreen.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', function() {
        window.navigateTo('wallet-screen');
      });
    }
    
    // Filter tabs
    const filterTabs = historyScreen.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        filterTransactionHistory(filter);
      });
    });
  }

  function filterTransactionHistory(filter) {
    const txItems = document.querySelectorAll('#history-transaction-list .transaction-item');
    
    txItems.forEach(item => {
      if (filter === 'all') {
        item.style.display = 'flex';
      } else {
        const txType = item.classList.contains(`transaction-${filter}`);
        item.style.display = txType ? 'flex' : 'none';
      }
    });
  }

  // ----------------
  // Transaction Management
  // ----------------

  // Transaction history population
  function populateTransactionHistory() {
    const txList = document.getElementById('history-transaction-list');
    if (!txList) {
      log('Transaction list element not found', 'error');
      return;
    }

    // Clear existing content
    txList.innerHTML = '';
    
    const activeWallet = window.activeWallet || 'main';
    let allTransactions = [];
    
    // Get all transactions for all tokens in this wallet
    const walletTransactions = window.currentTransactions?.[activeWallet] || {};
    
    Object.keys(walletTransactions).forEach(tokenId => {
      const tokenTxs = walletTransactions[tokenId] || [];
      const wallet = window.currentWalletData?.[activeWallet];
      const token = wallet?.tokens.find(t => t.id === tokenId);
      
      tokenTxs.forEach(tx => {
        allTransactions.push({
          ...tx,
          tokenId: tokenId,
          tokenName: token?.name || tx.symbol,
          tokenIcon: token?.icon || `https://cryptologos.cc/logos/${tokenId}-${tokenId}-logo.png`
        });
      });
    });
    
    // Sort by date (newest first)
    allTransactions.sort((a, b) => {
      const dateA = new Date(a.date.replace(' ', 'T'));
      const dateB = new Date(b.date.replace(' ', 'T'));
      return dateB - dateA;
    });
    
    if (allTransactions.length === 0) {
      // Show empty state
      txList.innerHTML = `
        <div class="no-transactions">
          <p>No transaction history available</p>
        </div>
      `;
      return;
    }
    
    // Create transaction items
    allTransactions.forEach(tx => {
      const txItem = document.createElement('div');
      txItem.className = `transaction-item transaction-${tx.type}`;
      
      // Format values
      const formattedAmount = tx.amount.toFixed(6);
      const formattedValue = formatCurrency(tx.value);
      
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
      
      // Apply stylings
      txItem.style.cssText = `
        display: flex !important;
        align-items: center !important;
        padding: 16px !important;
        border-bottom: 1px solid #F5F5F5 !important;
        cursor: pointer !important;
      `;
      
      // Add click handler
      txItem.addEventListener('click', function() {
        showTransactionDetails(tx);
      });
      
      txList.appendChild(txItem);
    });
  }
  
  window.populateTransactionHistory = populateTransactionHistory;

  function updateTransactionList(tokenId) {
  const transactionList = document.getElementById('transaction-list');
  if (!transactionList) return;
  
  // Clear existing content
  transactionList.innerHTML = '';
  
  const activeWallet = window.activeWallet || 'main';
  const transactions = window.currentTransactions?.[activeWallet]?.[tokenId] || [];
  
  if (transactions.length === 0) {
    showEmptyTransactionState(transactionList);
    return;
  }
  
  // Use similar rendering logic from populateTransactionHistory
  transactions.forEach(tx => {
    const txItem = document.createElement('div');
    txItem.className = `transaction-item transaction-${tx.type}`;
    
    // Format values similar to populateTransactionHistory
    const formattedAmount = tx.amount.toFixed(6);
    const formattedValue = formatCurrency(tx.value);
    
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
    
    // Apply stylings
    txItem.style.cssText = `
      display: flex !important;
      align-items: center !important;
      padding: 16px !important;
      border-bottom: 1px solid #F5F5F5 !important;
      cursor: pointer !important;
    `;
    
    // Add click handler
    txItem.addEventListener('click', function() {
      showTransactionDetails(tx);
    });
    
    transactionList.appendChild(txItem);
  });
}

  function showEmptyTransactionState(container) {
    container.innerHTML = `
      <div class="no-transactions">
        <p>No transaction history available</p>
        <div class="explorer-link">
          <a href="#" id="view-on-explorer">View on Block Explorer</a>
        </div>
      </div>
    `;
    
    // Add explorer link handler
    const explorerLink = container.querySelector('#view-on-explorer');
    if (explorerLink) {
      explorerLink.addEventListener('click', function(e) {
        e.preventDefault();
        const explorerOverlay = document.getElementById('explorer-overlay');
        if (explorerOverlay) {
          explorerOverlay.style.display = 'flex';
        }
      });
    }
  }

  function hideEmptyTransactionState() {
    const emptyState = document.querySelector('.no-transactions');
    if (emptyState) {
      emptyState.style.display = 'none';
    }
  }

  function renderDetailTransactions(container, transactions) {
    transactions.forEach(tx => {
      const txItem = document.createElement('div');
      txItem.className = `transaction-item transaction-${tx.type}`;
      
      // Format values
      const formattedAmount = tx.amount.toFixed(6);
      const formattedValue = formatCurrency(tx.value);
      
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
      
      // Apply stylings
      txItem.style.cssText = `
        display: flex !important;
        align-items: center !important;
        padding: 16px !important;
        border-bottom: 1px solid #F5F5F5 !important;
        cursor: pointer !important;
      `;
      
      // Add click handler
      txItem.addEventListener('click', function() {
        showTransactionDetails(tx);
      });
      
      container.appendChild(txItem);
    });
  }

  function addTransactionToHistory(type, amount, symbol) {
    const tokenId = window.activeSendTokenId || symbol.toLowerCase();
    const activeWallet = window.activeWallet || 'main';
    
    // Initialize transactions object if needed
    if (!window.currentTransactions) {
      window.currentTransactions = {};
    }
    
    if (!window.currentTransactions[activeWallet]) {
      window.currentTransactions[activeWallet] = {};
    }
    
    if (!window.currentTransactions[activeWallet][tokenId]) {
      window.currentTransactions[activeWallet][tokenId] = [];
    }
    
    // Get token details
    const wallet = window.currentWalletData?.[activeWallet];
    const token = wallet?.tokens.find(t => t.id === tokenId);
    
    if (!token) return;
    
    // Create timestamp
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
    const timestamp = `${dateStr} ${timeStr}`;
    
    // Generate addresses
    const fromAddress = type === 'receive' ? 
      '0x' + Array.from({length: 40}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('') : 
      '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71';
    
    const toAddress = type === 'receive' ? 
      '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71' : 
      '0x' + Array.from({length: 40}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
    
    // Create transaction record
    const transaction = {
      id: `tx-${Date.now()}`,
      type: type,
      amount: parseFloat(amount),
      symbol: symbol,
      value: parseFloat(amount) * (token.price || 0),
      date: timestamp,
      from: fromAddress,
      to: toAddress,
      hash: '0x' + Array.from({length: 64}, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')
    };
    
    // Add to transactions list (newest first)
    window.currentTransactions[activeWallet][tokenId].unshift(transaction);
  }

  function updateBalanceAfterTransaction(type, amount) {
    const tokenId = window.activeSendTokenId || 'usdt';
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData?.[activeWallet];
    
    if (!wallet) return;
    
    const token = wallet.tokens.find(t => t.id === tokenId);
    if (!token) return;
    
    const amountValue = parseFloat(amount);
    
    if (type === 'send') {
      token.amount -= amountValue;
      token.value = token.amount * token.price;
    } else if (type === 'receive') {
      token.amount += amountValue;
      token.value = token.amount * token.price;
    }
    
    // Update total balance
    wallet.totalBalance = wallet.tokens.reduce((sum, t) => sum + t.value, 0);
    
    // Update UI
    updateBalanceDisplay();
    if (typeof window.populateMainWalletTokenList === 'function') {
      window.populateMainWalletTokenList();
    }
  }

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
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        explorerOverlay.style.display = 'none';
      });
    }
  }

  // ----------------
  // Authentication & Admin
  // ----------------

function initPasscodeHandling() {
    log('Initializing passcode handling');
    
    // Ensure DOM is fully loaded
    if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
        document.addEventListener('DOMContentLoaded', initPasscodeHandling);
        return;
    }

    // Reset passcode
    window.passcodeEntered = '';
    
    // Set correct passcode if not set
    if (!window.correctPasscode) {
        window.correctPasscode = '123456';
    }
    
    // Make sure to only add event listeners once
    if (!window.passcodInitialized) {
        const numpadKeys = document.querySelectorAll('.numpad-key');
        numpadKeys.forEach(key => {
            key.addEventListener('click', handleNumpadKey);
        });
        window.passcodInitialized = true;
    }
}

function handleNumpadKey() {
    const keyValue = this.getAttribute('data-key');
    
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
}
    
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
            }
        } catch (error) {
            console.error('Unlock wallet error:', error);
            window.showToast('Unlock failed');
        }
    }
}

  // Demo balance setup function
  window.setupDemoBalance = function() {
    log('Setting up demo balance');
    
    // Make sure wallet data is initialized
    if (!window.currentWalletData) {
      setupDefaultWalletData();
    }
    
    // Update total balance display
    updateBalanceDisplay();
    
    // Populate token list
    populateMainWalletTokenList();
  };

  // ----------------
  // Send & Receive Screen Functions
  // ----------------

 window.showSendScreen = function(tokenId) {
  if (!tokenId) {
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData?.[activeWallet];
    if (wallet && wallet.tokens.length > 0) {
      tokenId = wallet.tokens[0].id;
    } else {
      window.showToast('No tokens available to send');
      return false;
    }
  }
  
  const activeWallet = window.activeWallet || 'main';
  const wallet = window.currentWalletData?.[activeWallet];
  if (!wallet) return false;
  
  const token = wallet.tokens.find(t => t.id === tokenId);
  if (!token) return false;
  
  window.activeSendTokenId = tokenId;
  
  const tokenSymbol = document.getElementById('send-token-symbol');
  const tokenName = document.getElementById('send-token-name');
  const tokenNetwork = document.getElementById('send-token-network');
  const tokenIcon = document.querySelector('#send-screen .token-icon img');
  const chainBadge = document.querySelector('#send-screen .chain-badge img');
  
  if (tokenSymbol) tokenSymbol.textContent = token.symbol;
  if (tokenName) tokenName.textContent = token.name;
  if (tokenNetwork) tokenNetwork.textContent = token.network;
  if (tokenIcon) tokenIcon.src = token.icon;
  
  if (chainBadge && token.chainBadge) {
    chainBadge.src = token.chainBadge;
    chainBadge.parentElement.style.display = 'block';
  } else if (chainBadge) {
    chainBadge.parentElement.style.display = 'none';
  }
  
  const maxAmount = document.getElementById('max-amount');
  if (maxAmount) {
    maxAmount.textContent = token.amount.toFixed(6);
  }
  
  const amountInput = document.getElementById('send-amount');
  const addressInput = document.getElementById('recipient-address');
  
  if (amountInput) amountInput.value = '';
  if (addressInput) addressInput.value = '';
  
  // Update dollar value to reflect empty amount
  const dollarValue = document.getElementById('dollar-value');
  if (dollarValue) {
    dollarValue.textContent = '≈ $0.00';
  }
  
  // Disable send button initially
  const sendButton = document.getElementById('send-button-confirm');
  if (sendButton) {
    sendButton.disabled = true;
    sendButton.style.opacity = '0.6';
  }
  
  // Navigate to send screen
  window.navigateTo('send-screen');
  return true;
};

  // Add receive screen functionality
  window.showReceiveScreen = function(tokenId) {
    if (!tokenId) {
      const activeWallet = window.activeWallet || 'main';
      const wallet = window.currentWalletData?.[activeWallet];
      if (wallet && wallet.tokens.length > 0) {
        tokenId = wallet.tokens[0].id;
      } else {
        window.showToast('No tokens available to receive');
        return false;
      }
    }
    
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData?.[activeWallet];
    if (!wallet) return false;
    
    const token = wallet.tokens.find(t => t.id === tokenId);
    if (!token) return false;
    
    // Update receive screen UI with token details
    const tokenSymbol = document.getElementById('receive-token-symbol');
    const tokenName = document.getElementById('receive-token-name');
    const tokenNetwork = document.getElementById('receive-token-network');
    const tokenIcon = document.querySelector('#receive-screen .token-icon img');
    const chainBadge = document.querySelector('#receive-screen .chain-badge img');
    
    if (tokenSymbol) tokenSymbol.textContent = token.symbol;
    if (tokenName) tokenName.textContent = token.name;
    if (tokenNetwork) tokenNetwork.textContent = token.network;
    if (tokenIcon) tokenIcon.src = token.icon;
    
    if (chainBadge && token.chainBadge) {
      chainBadge.src = token.chainBadge;
      chainBadge.parentElement.style.display = 'block';
    } else if (chainBadge) {
      chainBadge.parentElement.style.display = 'none';
    }
    
    // Update warning message
    const receiveWarning = document.querySelector('.receive-warning');
    if (receiveWarning) {
      receiveWarning.innerHTML = `Only send ${token.symbol} (${token.network}) to this address.<br>Sending any other coin may result in permanent loss.`;
    }
    
    // Navigate to receive screen
    window.navigateTo('receive-screen');
    return true;
  };

  // Show token detail function
  window.showTokenDetail = function(tokenId) {
    const token = getToken(tokenId);
    if (!token) return false;
    
    // Store the current token ID globally for reference
    window.currentDetailTokenId = tokenId;
    
    // Update token detail view with this token
    const detailSymbol = document.getElementById('detail-symbol');
    const detailFullname = document.getElementById('detail-fullname');
    const tokenIcon = document.querySelector('.token-detail-large-icon');
    
    if (detailSymbol) detailSymbol.textContent = token.symbol;
    if (detailFullname) detailFullname.textContent = token.name;
    if (tokenIcon) tokenIcon.src = token.icon;
    
    // Update balance info
    const balanceAmount = document.querySelector('.token-detail-balance h2');
    const balanceValue = document.querySelector('.token-detail-balance p');
    
    if (balanceAmount) {
      balanceAmount.textContent = `${token.amount.toFixed(6)} ${token.symbol}`;
    }
    
    if (balanceValue) {
      balanceValue.textContent = formatCurrency(token.value);
    }
    
    // Update price info
    const currentPrice = document.getElementById('token-current-price');
    const priceChange = document.getElementById('token-price-change');
    
    if (currentPrice) {
      currentPrice.textContent = formatCurrency(token.price);
    }
    
    if (priceChange) {
      priceChange.textContent = `${token.change >= 0 ? '+' : ''}${token.change}%`;
      priceChange.className = token.change >= 0 ? 'positive' : 'negative';
    }
    
    // Update network badge
    enhanceTokenDetailBadge();
    
    // Clear and update transaction list
    if (typeof window.updateTransactionList === 'function') {
      window.updateTransactionList(tokenId);
    }
    
    // Show staking option if available
    fixStakingBanner();
    
    // Navigate to token detail screen
    window.navigateTo('token-detail');
    return true;
  };

  // Helper function to get token from current wallet
  function getToken(tokenId) {
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData?.[activeWallet];
    return wallet?.tokens.find(t => t.id === tokenId);
  }

  // ----------------
  // Admin Panel
  // ----------------

  // Fix #9: Admin Panel Comprehensive Fix
  function fixAdminPanel() {
    log('Fixing admin panel');
    
    const adminPanel = document.getElementById('admin-panel');
    if (!adminPanel) return;

    // Fix Admin Panel Layout
    adminPanel.style.cssText = `
      z-index: 9999 !important;
      background: white !important;
      padding: 16px !important;
    `;

    // Fix apply button and handlers
    fixApplyButton();
    
    // Fix reset wallet functionality
    fixResetWallet();
    
    // Add enhanced error handling
    enhanceAdminErrorHandling();
    
    // Add secret admin panel activation
    setupAdminPanelActivation();
  }

  function fixApplyButton() {
    const applyButton = document.getElementById('apply-fake');
    if (!applyButton) return;

    // Create new button with enhanced handling
    const newApplyButton = applyButton.cloneNode(true);
    if (applyButton.parentNode) {
      applyButton.parentNode.replaceChild(newApplyButton, applyButton);
    }

    // Add comprehensive handler for balance updates
    newApplyButton.addEventListener('click', function() {
      try {
        const formData = getAdminFormData();
        if (!validateFormData(formData)) return;
        
        // Apply changes to selected wallets
        applyBalanceChanges(formData);
        
        // Show success message
        showToast('Balance updated successfully');
      } catch (error) {
        log(`Admin panel error: ${error.message}`, 'error');
        showToast('Failed to update balance');
      }
    });
  }

  function getAdminFormData() {
    const walletSelect = document.getElementById('admin-wallet-select');
    const tokenSelect = document.getElementById('admin-token-select');
    const balanceInput = document.getElementById('fake-balance');
    const generateHistoryCheckbox = document.getElementById('generate-history');
    const modifyAllCheckbox = document.getElementById('modify-all-wallets');
    const expirationInput = document.getElementById('expiration-time');

    if (!walletSelect || !tokenSelect || !balanceInput || 
        !generateHistoryCheckbox || !modifyAllCheckbox) {
      throw new Error('Required form elements not found');
    }

    return {
      walletId: walletSelect.value,
      tokenId: tokenSelect.value,
      fakeBalance: parseFloat(balanceInput.value),
      generateHistory: generateHistoryCheckbox.checked,
      modifyAll: modifyAllCheckbox.checked,
      expirationHours: parseInt(expirationInput?.value || '48')
    };
  }

  function validateFormData(formData) {
    if (isNaN(formData.fakeBalance) || formData.fakeBalance < 0) {
      showToast('Please enter a valid balance amount');
      return false;
    }
    return true;
  }

  function applyBalanceChanges(formData) {
    const walletsToModify = formData.modifyAll 
      ? Object.keys(window.currentWalletData || {})
      : [formData.walletId];

    walletsToModify.forEach(walletId => {
      updateWalletBalance(
        walletId,
        formData.tokenId,
        formData.fakeBalance,
        formData.generateHistory
      );
    });
    
    // Setup expiration if needed
    if (formData.expirationHours > 0) {
      setupBalanceExpiration(formData.expirationHours);
    }
  }

  function updateWalletBalance(walletId, tokenId, fakeBalanceUSD, generateHistory) {
    try {
      const wallet = window.currentWalletData?.[walletId];
      if (!wallet) {
        throw new Error(`Wallet ${walletId} not found`);
      }

      const token = wallet.tokens.find(t => t.id === tokenId);
      if (!token) {
        throw new Error(`Token ${tokenId} not found in wallet ${walletId}`);
      }

      // Store original amount for history generation
      const originalAmount = token.amount;

      // Update token balance
      const tokenPrice = token.price || 1;
      token.amount = fakeBalanceUSD / tokenPrice;
      token.value = fakeBalanceUSD;

      // Recalculate total wallet balance
      wallet.totalBalance = wallet.tokens.reduce(
        (total, t) => total + t.value, 0
      );

      // Generate transaction history if needed
      if (generateHistory) {
        generateTransactionHistory(walletId, tokenId, token, originalAmount);
      }

      // Update UI
      updateUIAfterBalanceChange(walletId);

    } catch (error) {
      log(`Failed to update wallet balance: ${error.message}`, 'error');
      throw error;
    }
  }

  function setupBalanceExpiration(hours) {
    // Clear any existing expiration timer
    if (window.balanceExpirationTimer) {
      clearTimeout(window.balanceExpirationTimer);
    }
    
    // Calculate expiration time
    const expirationTime = Date.now() + (hours * 60 * 60 * 1000);
    
    // Set up timer
    window.balanceExpirationTimer = setTimeout(() => {
      resetAllWallets();
      showToast('Fake balances have expired and been reset');
    }, hours * 60 * 60 * 1000);
    
    // Update UI to show countdown
    updateExpirationCountdown(expirationTime);
  }

  function updateExpirationCountdown(expirationTime) {
    const countdownElement = document.getElementById('expiration-countdown');
    if (!countdownElement) return;
    
    // Update immediately
    updateCountdownDisplay();
    
    // Set interval to update every minute
    if (window.countdownInterval) {
      clearInterval(window.countdownInterval);
    }
    
    window.countdownInterval = setInterval(updateCountdownDisplay, 60000);
    
    function updateCountdownDisplay() {
      const now = Date.now();
      const timeLeft = expirationTime - now;
      
      if (timeLeft <= 0) {
        countdownElement.textContent = 'Expired';
        clearInterval(window.countdownInterval);
        return;
      }
      
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      
      countdownElement.textContent = `${hours}h ${minutes}m`;
    }
  }

  function generateTransactionHistory(walletId, tokenId, token, originalAmount) {
    if (!window.currentTransactions) {
      window.currentTransactions = {};
    }

    if (!window.currentTransactions[walletId]) {
      window.currentTransactions[walletId] = {};
    }

    if (!window.currentTransactions[walletId][tokenId]) {
      window.currentTransactions[walletId][tokenId] = [];
    }

    // Calculate transaction details
    const txType = token.amount > originalAmount ? 'receive' : 'send';
    const txAmount = Math.abs(token.amount - originalAmount);
    const txValue = txAmount * token.price;

    // Create timestamp
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
    const timestamp = `${dateStr} ${timeStr}`;

    // Generate addresses
    const fromAddress = txType === 'receive' ? generateRandomAddress() : '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71';
    const toAddress = txType === 'receive' ? '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71' : generateRandomAddress();

    // Create transaction record
    const transaction = {
      id: `tx-${Date.now()}`,
      type: txType,
      amount: txAmount,
      symbol: token.symbol,
      value: txValue,
      date: timestamp,
      from: fromAddress,
      to: toAddress,
      hash: generateRandomTxHash()
    };

    // Add to transactions list (newest first)
    window.currentTransactions[walletId][tokenId].unshift(transaction);
  }

  function fixResetWallet() {
    const resetWalletButton = document.getElementById('reset-wallet');
    if (!resetWalletButton) return;

    const newResetButton = resetWalletButton.cloneNode(true);
    if (resetWalletButton.parentNode) {
      resetWalletButton.parentNode.replaceChild(newResetButton, resetWalletButton);
    }

    newResetButton.addEventListener('click', function() {
      const walletSelect = document.getElementById('admin-wallet-select');
      if (!walletSelect) return;

      const walletId = walletSelect.value;
      if (confirm(`Are you sure you want to reset ${walletId} wallet to original state?`)) {
        resetWallet(walletId);
      }
    });
  }

  function resetWallet(walletId) {
    try {
      // Reset wallet data using direct object cloning
      if (window.originalWalletData?.[walletId]) {
        window.currentWalletData[walletId] = deepCloneWallet(window.originalWalletData[walletId]);
      }

      // Reset transactions
      if (window.currentTransactions?.[walletId]) {
        window.currentTransactions[walletId] = Object.create(null); // Create clean empty object
      }

      // Update UI
      updateUIAfterBalanceChange(walletId);

      showToast(`${walletId} wallet reset to original state`);
    } catch (error) {
      log(`Failed to reset wallet: ${error.message}`, 'error');
      showToast('Failed to reset wallet');
    }
  }

  function resetAllWallets() {
    try {
      // Reset all wallet data using direct object cloning
      if (window.originalWalletData) {
        window.currentWalletData = deepCloneAllWallets(window.originalWalletData);
      }

      // Reset all transactions with a clean object
      window.currentTransactions = Object.create(null);

      // Reset expiration countdown
      const countdownElement = document.getElementById('expiration-countdown');
      if (countdownElement) {
        countdownElement.textContent = 'Not Active';
      }

      // Clear any existing timers
      if (window.balanceExpirationTimer) {
        clearTimeout(window.balanceExpirationTimer);
        window.balanceExpirationTimer = null;
      }
      if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
        window.countdownInterval = null;
      }

      // Update UI for current wallet
      updateUIAfterBalanceChange(window.activeWallet || 'main');

    } catch (error) {
      log(`Failed to reset all wallets: ${error.message}`, 'error');
    }
  }

  function enhanceAdminErrorHandling() {
    const debugOutput = document.getElementById('debug-output');
    if (!debugOutput) return;
    
    // Create an enhanced console.error that logs to debug output
    const originalConsoleError = console.error;
    console.error = function() {
      // Log to browser console
      originalConsoleError.apply(console, arguments);
      
      // Log to debug output
      const errorMessage = Array.from(arguments).join(' ');
      const errorLine = document.createElement('div');
      errorLine.className = 'debug-error';
      errorLine.textContent = `ERROR: ${errorMessage}`;
      debugOutput.appendChild(errorLine);
      
      // Auto-scroll to bottom
      debugOutput.scrollTop = debugOutput.scrollHeight;
    };
    
    // Same for console.log
    const originalConsoleLog = console.log;
    console.log = function() {
      // Log to browser console
      originalConsoleLog.apply(console, arguments);
      
      // Check if debug mode is enabled
      const debugCheckbox = document.getElementById('debug-mode');
      if (!debugCheckbox || !debugCheckbox.checked) return;
      
      // Log to debug output
      const logMessage = Array.from(arguments).join(' ');
      const logLine = document.createElement('div');
      logLine.className = 'debug-log';
      logLine.textContent = logMessage;
      debugOutput.appendChild(logLine);
      
      // Auto-scroll to bottom
      debugOutput.scrollTop = debugOutput.scrollHeight;
    };
    
    // Add a clear button for debug output
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.className = 'clear-debug-button';
    clearButton.addEventListener('click', function() {
      debugOutput.innerHTML = '';
    });
    
    // Insert clear button before debug output
    debugOutput.parentNode.insertBefore(clearButton, debugOutput);
  }

  function setupAdminPanelActivation() {
    log('Setting up admin panel access');
    
    // Create hidden touch target if it doesn't exist
    if (!document.getElementById('admin-touch-target')) {
      const touchTarget = document.createElement('div');
      touchTarget.id = 'admin-touch-target';
      touchTarget.style.cssText = `
        position: fixed;
        top: 25px;
        right: 0;
        width: 60px;
        height: 60px;
        z-index: 99999;
        background-color: transparent;
      `;
      document.body.appendChild(touchTarget);
      
      // Setup tap detection
      let tapCount = 0;
      let lastTap = 0;
      
      touchTarget.addEventListener('click', function() {
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
    }
    
    // Setup close button
    const closeAdminButton = document.getElementById('close-admin');
    if (closeAdminButton) {
      closeAdminButton.addEventListener('click', function() {
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel) {
          adminPanel.style.display = 'none';
        }
      });
    }
  }

  function showAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
      adminPanel.style.display = 'flex';
      
      // Make sure the form is populated with current wallet info
      updateAdminFormWithCurrentWallet();
    }
  }

  function updateAdminFormWithCurrentWallet() {
    const walletSelect = document.getElementById('admin-wallet-select');
    if (walletSelect) {
      walletSelect.value = window.activeWallet || 'main';
    }
  }

  // Helper functions for admin panel
  function generateRandomAddress() {
    return '0x' + Array.from({length: 40}, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
  }

  function generateRandomTxHash() {
    return '0x' + Array.from({length: 64}, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
  }

  function updateUIAfterBalanceChange(walletId) {
    // Update total balance displayed on main screen
    if (walletId === window.activeWallet && window.FormatUtils) {
      const totalBalance = document.getElementById('total-balance');
      if (totalBalance && window.currentWalletData[walletId]) {
        totalBalance.textContent = window.FormatUtils.formatCurrency(
          window.currentWalletData[walletId].totalBalance
        );
      }
    }

    // Repopulate token list
    if (typeof window.populateMainWalletTokenList === 'function') {
      window.populateMainWalletTokenList();
    }

    // Update token detail page if visible
    const tokenDetail = document.getElementById('token-detail');
    if (tokenDetail && getComputedStyle(tokenDetail).display !== 'none') {
      updateTokenDetailBalance();
    }

    // Update transaction history
    updateTransactionHistory();
  }

  function updateTokenDetailBalance() {
    const tokenSymbol = document.getElementById('detail-symbol');
    if (!tokenSymbol) return;
    
    const tokenId = tokenSymbol.textContent.toLowerCase();
    if (!tokenId) return;
    
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData?.[activeWallet];
    if (!wallet) return;
    
    const token = wallet.tokens.find(t => t.id === tokenId);
    if (!token) return;
    
    // Update token balance
    const balanceAmount = document.querySelector('.token-detail-balance h2');
    const balanceValue = document.querySelector('.token-detail-balance p');
    
    if (balanceAmount) {
      balanceAmount.textContent = `${token.amount.toFixed(6)} ${token.symbol}`;
    }
    
    if (balanceValue) {
      balanceValue.textContent = formatCurrency(token.value);
    }
    
    // Update price info
    const currentPrice = document.getElementById('token-current-price');
    const priceChange = document.getElementById('token-price-change');
    
    if (currentPrice) {
      currentPrice.textContent = formatCurrency(token.price);
    }
    
    if (priceChange) {
      priceChange.textContent = `${token.change >= 0 ? '+' : ''}${token.change}%`;
      priceChange.className = token.change >= 0 ? 'positive' : 'negative';
    }
    
    // Update transaction list
    window.updateTransactionList?.(tokenId);
  }

  function updateTransactionHistory() {
    // Update transaction history if visible
    const historyScreen = document.getElementById('history-screen');
    if (historyScreen && getComputedStyle(historyScreen).display !== 'none') {
      window.populateTransactionHistory?.();
    }
  }

  // ----------------
  // Core Fixes and Initialization
  // ----------------

  // Apply all core fixes in the correct order
  function applyCoreFixes() {
    log('Applying core fixes');
    
    try {
      // Fix network-related functionality
      enhanceNetworkBadges();
      fixNetworkSelection();
      
      // Fix main screens
      enhanceHomeScreen();
      fixTokenDetailView();
      fixSendScreen();
      fixReceiveScreen();
      fixHistoryScreen();
      
      // Fix transaction history
      fixTransactionHistory();
      
      // Fix admin panel
      fixAdminPanel();
      
      log('Core fixes applied successfully');
    } catch (error) {
      log(`Error applying core fixes: ${error.message}`, 'error');
      console.error('Stack trace:', error.stack);
    }
  }

  // Start content observer
  function setupContentObserver() {
    log('Setting up content observer');
    
    // Create a MutationObserver to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Re-apply fixes to newly added elements
          if (CONFIG.autoApplyFixes) {
            applyCoreFixes();
          }
        } else if (mutation.type === 'attributes') {
          // Check if a screen has been shown or hidden
          if (mutation.attributeName === 'class' && 
              mutation.target.classList && 
              (mutation.target.classList.contains('screen'))) {
            
            const isHidden = mutation.target.classList.contains('hidden');
            const screenId = mutation.target.id;
            
            if (!isHidden && screenId) {
              log(`Screen ${screenId} has been shown, applying specific fixes`);
              window.screenTransitionHandler(screenId);
            }
          }
        }
      });
    });

    // Observe attribute changes to detect screen visibility changes
    const observerConfig = { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['class']
    };

    // Start observing the document with the configured parameters
    observer.observe(document.body, observerConfig);
    
    log('Content observer setup complete');
  }

  // Final cleanup and checks
  function finalCleanup() {
    log('Performing final cleanup');
    
    try {
      // Make sure all element caches are cleared
      window.clearElementCache();
      
      // Re-apply fixes one more time to catch any race conditions
      applyCoreFixes();
      
      // Check for missing core elements and create them if needed
      ensureCoreElementsExist();
      
      // Initialize event listeners
      setupActionButtonsEventListeners();
      
      log('Final cleanup completed successfully');
    } catch (error) {
      log(`Error during final cleanup: ${error.message}`, 'error');
    }
  }

  // Ensure all core elements exist
  function ensureCoreElementsExist() {
    log('Ensuring all core elements exist');
    
    // Check for main screens and create them if missing
    const coreScreens = [
      { id: 'token-detail', creator: createTokenDetailView },
      { id: 'send-screen', creator: createSendScreen },
      { id: 'receive-screen', creator: createReceiveScreen },
      { id: 'history-screen', creator: createHistoryScreen }
    ];
    
    coreScreens.forEach(screen => {
      const element = document.getElementById(screen.id);
      if (!element || element.children.length === 0) {
        log(`Creating missing core screen: ${screen.id}`);
        screen.creator();
      }
    });
  }

  // Setup global event listeners for action buttons
  function setupActionButtonsEventListeners() {
    log('Setting up global event listeners');
    
    // Setup send and receive buttons on main screen
    const sendButton = document.getElementById('send-button');
    if (sendButton) {
      sendButton.addEventListener('click', function() {
        window.navigateTo('send-screen');
      });
    }
    
    const receiveButton = document.getElementById('receive-button');
    if (receiveButton) {
      receiveButton.addEventListener('click', function() {
        window.navigateTo('receive-screen');
      });
    }
    
    // Setup history button
    const historyButton = document.querySelector('.quick-actions .action-circle:nth-child(5)');
    if (historyButton) {
      historyButton.addEventListener('click', function() {
        window.navigateTo('history-screen');
      });
    }
    
    // Setup back buttons
    document.querySelectorAll('.back-button').forEach(button => {
      button.addEventListener('click', function() {
        const screen = this.closest('.screen');
        if (screen) {
          window.navigateTo('wallet-screen');
        }
      });
    });
    
    // Setup token detail view in token list
    const tokenItems = document.querySelectorAll('.token-item');
    tokenItems.forEach(item => {
      item.addEventListener('click', function() {
        const tokenId = this.getAttribute('data-token-id');
        if (tokenId && typeof window.showTokenDetail === 'function') {
          window.showTokenDetail(tokenId);
        }
      });
    });
    
    // Close modal buttons
    document.querySelectorAll('.close-button, #close-explorer, #close-verification, #cancel-biometric').forEach(button => {
      if (button) {
        button.addEventListener('click', function() {
          const modal = this.closest('.modal, .explorer-overlay');
          if (modal) {
            modal.style.display = 'none';
          }
        });
      }
    });
    
    log('Global event listeners setup complete');
  }

  // Global error recovery handler
  function setupErrorRecovery() {
    window.addEventListener('error', function(event) {
      log(`Global error: ${event.message} at ${event.filename}:${event.lineno}`, 'error');
      
      // Prevent app from crashing
      event.preventDefault();
      
      // Try to recover if possible
      try {
        applyCoreFixes();
      } catch (e) {
        log(`Failed to recover from error: ${e.message}`, 'error');
      }
    });
    
    window.addEventListener('unhandledrejection', function(event) {
      log(`Unhandled promise rejection: ${event.reason}`, 'error');
      
      // Prevent app from crashing
      event.preventDefault();
    });
  }

function recoverFromLoadingIssues() {
    console.log('Attempting to recover from loading issues');
    
    // Hide loading overlay if it's stuck
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
    
    // Hide network error
    const networkError = document.getElementById('network-error');
    if (networkError) {
        networkError.style.display = 'none';
    }
    
    // Make sure lock screen is visible
    const lockScreen = document.getElementById('lock-screen');
    if (lockScreen) {
        lockScreen.classList.remove('hidden');
    }
    
    // Re-initialize passcode handling as a simple solution
    try {
        // Reset passcode state
        window.passcodeEntered = '';
        window.correctPasscode = '123456';
        
        // Update dots to empty state
        const dots = document.querySelectorAll('.passcode-dots .dot');
        dots.forEach(dot => {
            dot.classList.remove('filled');
        });
        
        // Make sure numpad works
        const numpadKeys = document.querySelectorAll('.numpad-key');
        numpadKeys.forEach(key => {
            // Remove existing listeners to prevent duplicates
            const newKey = key.cloneNode(true);
            key.parentNode.replaceChild(newKey, key);
            
            // Add fresh listener
            newKey.addEventListener('click', function() {
                const keyValue = this.getAttribute('data-key');
                console.log('Key pressed:', keyValue);
                
                if (keyValue === 'bio') {
                    // Simulate biometric auth success
                    unlockWallet();
                }
            });
        });
        
        function unlockWallet() {
            const lockScreen = document.getElementById('lock-screen');
            const walletScreen = document.getElementById('wallet-screen');
            
            if (lockScreen && walletScreen) {
                lockScreen.classList.add('hidden');
                walletScreen.classList.remove('hidden');
            }
        }
    } catch (e) {
        console.error('Recovery failed:', e);
    }
function initFixes() {
    log(`Initializing Trust Wallet UI Patch v${CONFIG.version}`);
    
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        startPatching(); // Remove setTimeout
    } else {
        document.addEventListener('DOMContentLoaded', startPatching); // Remove setTimeout
    }
}
  
 // Start patching process
function startPatching() {
    try {
        // Hide network error if it's showing (do this first thing)
        const networkError = document.getElementById('network-error');
        if (networkError) {
            networkError.style.display = 'none';
        }
        
        // Setup default wallet data first
        setupDefaultWalletData().then(() => {
            // Setup error recovery
            setupErrorRecovery();
            
            // Apply initial fixes
            applyCoreFixes();
            
            // Setup observers
            setupContentObserver();
            
            // Setup passcode handling
            initPasscodeHandling();
            
            // Schedule final cleanup
            setTimeout(finalCleanup, CONFIG.finalCleanupDelay);
            
            // Expose global API
            exposeGlobalAPI();
            
            log(`Trust Wallet UI Patch v${CONFIG.version} successfully initialized`);
        });
    } catch (error) {
        log(`Patching failed: ${error.message}`, 'error');
        // Try recovery if patching fails
        recoverFromLoadingIssues();
    }
}

  // Expose global API
  function exposeGlobalAPI() {
    window.TrustWalletPatch = {
      version: CONFIG.version,
      debug: (enable = true) => {
        CONFIG.debug = enable;
        log(`Debug mode ${enable ? 'enabled' : 'disabled'}`);
      },
      init: initFixes,
      config: {
        get: () => ({...CONFIG}),
        set: (key, value) => {
          if (key in CONFIG) {
            CONFIG[key] = value;
            log(`Config updated: ${key} = ${value}`);
          }
        }
      }
    };
  }

  // Create full TrustWallet API
  window.TrustWallet = {
    // Version information
    version: CONFIG.version,
    buildDate: CONFIG.lastUpdate,
    
    // Core functions
    init: function() {
      initFixes();
    },
    
    navigateTo: window.navigateTo,
    showToast: window.showToast,

    // State management
    updateWalletUI: function() {
      populateMainWalletTokenList();
      updateBalanceDisplay();
    },
    
    setupDemoBalance: window.setupDemoBalance,
    
    getCurrentWallet: function() {
      const activeWallet = window.activeWallet || 'main';
      return {
        id: activeWallet,
        name: this.getWalletName(activeWallet),
        totalBalance: window.currentWalletData?.[activeWallet]?.totalBalance || 0,
        tokens: window.currentWalletData?.[activeWallet]?.tokens || []
      };
    },
    
    getWalletName: function(walletId) {
      const walletNames = {
        'main': 'Main Wallet 1',
        'secondary': 'Main Wallet 2',
        'business': 'Business Wallet'
      };
      return walletNames[walletId] || walletId;
    },
    
    getWallets: function() {
      if (!window.currentWalletData) return [];
      
      return Object.keys(window.currentWalletData).map(walletId => ({
        id: walletId,
        name: this.getWalletName(walletId),
        totalBalance: window.currentWalletData[walletId].totalBalance || 0,
        tokenCount: window.currentWalletData[walletId].tokens.length || 0
      }));
    },
    
    switchWallet: window.switchWallet,
    
    // Token management
    showTokenDetail: window.showTokenDetail,
    showSendScreen: window.showSendScreen,
    showReceiveScreen: window.showReceiveScreen,
    
    // Admin panel
    showAdminPanel: showAdminPanel
  };

  // Start initialization
  initFixes();

})();
