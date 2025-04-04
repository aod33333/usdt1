// Trust Wallet UI - Comprehensive Merged Solution - Part 1: Configuration and Core Setup
// Last updated: 2025-04-04 19:45:47 UTC
// Author: aod33333

(function() {
  // Configuration constants
  const CONFIG = {
    debug: false,                // Enable/disable debug logging
    initDelay: 300,             // Delay before starting initialization (ms)
    screenLoadDelay: 300,       // Delay after loading screens (ms)
    useAnimations: true,        // Use smooth animations for transitions
    badgeRemovalInterval: 500,  // Interval to remove unwanted badges (ms)
    autoApplyFixes: true,       // Automatically re-apply fixes when screens change
    finalCleanupDelay: 800,     // Delay for final cleanup checks (ms)
    version: '3.0.1',           // Combined version number
    lastUpdate: '2025-04-04'    // Last update date
  };

  // Enhanced logging system
  function log(message, type = 'info') {
    if (CONFIG.debug || type === 'error') {
      const timestamp = new Date().toISOString().substring(11, 19);
      const prefix = type === 'error' ? '🔴' : '🔵';
      console.log(`${prefix} [${timestamp}] TrustWallet Patch: ${message}`);
    }
  }

  // Main initialization function with enhanced error handling
  function initFixes() {
    try {
      log('Initializing Trust Wallet UI comprehensive patch v3.0.1...');
      
      // Initialize core components
      initializeCore();
      
      // Expose global API
      exposeGlobalAPI();
      
      log('Trust Wallet comprehensive patch initialized successfully');
    } catch (error) {
      log(`Initialization failed: ${error.message}`, 'error');
      throw error;
    }
  }

  // Core initialization
  function initializeCore() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(startPatching, CONFIG.initDelay));
    } else {
      setTimeout(startPatching, CONFIG.initDelay);
    }
  }

  // Start patching process
  function startPatching() {
    try {
      // Apply initial fixes
      applyCoreFixes();
      
      // Setup observers
      setupContentObserver();
      
      // Schedule final cleanup
      setTimeout(finalCleanup, CONFIG.finalCleanupDelay);
    } catch (error) {
      log(`Patching failed: ${error.message}`, 'error');
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

  // Initial setup
  try {
    log(`Trust Wallet UI Patch v${CONFIG.version} loading...`);
    initFixes();
  } catch (error) {
    log(`Critical initialization error: ${error.message}`, 'error');
  }
})();

// Trust Wallet UI - Comprehensive Merged Solution - Part 2: Core
// Last updated: 2025-04-04 20:06:45 UTC
// Author: aod33333

function setupDefaultWalletData() {
  return new Promise(resolve => {
    log('Setting up default wallet data');
    
    // Deep clone function
    function deepClone(obj) {
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
    }
    
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
    
    // Populate token list immediately
    try {
      if (typeof window.populateMainWalletTokenList === 'function') {
        window.populateMainWalletTokenList();
      }
    } catch (e) {
      console.error('Error in initial token list population:', e);
    }
    
    resolve();
  });
}

// Token list population function
function populateMainWalletTokenList() {
  const tokenList = document.getElementById('token-list');
  if (!tokenList) {
    console.error('Token list element not found');
    return;
  }
  
  // Clear list
  tokenList.innerHTML = '';
  
  // Get active wallet data with better fallback
  const activeWallet = window.activeWallet || 'main';
  const wallet = window.currentWalletData && window.currentWalletData[activeWallet];
  
  if (!wallet || !wallet.tokens || !wallet.tokens.length) {
    console.error('No tokens available for main wallet display');
    
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
      
      // Show network badge for specific tokens
      const showBadge = ['usdt', 'twt', 'bnb'].includes(token.id);
      const networkBadge = showBadge ? 
        `<div class="chain-badge"><img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" alt="BNB Chain"></div>` : '';
      
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

// Trust Wallet UI - Comprehensive Merged Solution - Part 3: Network Functions
// Last updated: 2025-04-04 19:46:47 UTC
// Author: aod33333

// Fix #4: Enhance network badges across all screens
function enhanceNetworkBadges() {
  log('Enhancing network badges');
  
  // Define which tokens should have network badges
  const networkBadgeMap = {
    'usdt': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    'twt': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    'bnb': 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
  };
  
  // Add network badges to token items
  const tokenItems = document.querySelectorAll('.token-item');
  
  tokenItems.forEach(item => {
    const tokenId = item.getAttribute('data-token-id');
    if (!tokenId || !networkBadgeMap[tokenId]) return;
    
    const tokenIcon = item.querySelector('.token-icon');
    if (!tokenIcon) return;
    
    // Check if badge already exists
    let badge = tokenIcon.querySelector('.chain-badge');
    
    // Create or update badge
    if (!badge) {
      badge = createNetworkBadge(tokenId, networkBadgeMap[tokenId]);
      tokenIcon.appendChild(badge);
    } else {
      updateNetworkBadge(badge, tokenId, networkBadgeMap[tokenId]);
    }
  });
  
  // Add network badge to token detail icon if appropriate
  enhanceTokenDetailBadge(networkBadgeMap);
}

function createNetworkBadge(tokenId, badgeUrl) {
  const badge = document.createElement('div');
  badge.className = 'chain-badge';
  
  const badgeImg = document.createElement('img');
  badgeImg.src = badgeUrl;
  badgeImg.alt = tokenId.toUpperCase() + ' Network';
  
  badge.appendChild(badgeImg);
  
  // Force proper styling
  applyBadgeStyling(badge);
  
  return badge;
}

function updateNetworkBadge(badge, tokenId, badgeUrl) {
  const badgeImg = badge.querySelector('img');
  if (badgeImg) {
    badgeImg.src = badgeUrl;
    badgeImg.alt = tokenId.toUpperCase() + ' Network';
  }
  
  // Ensure proper styling
  applyBadgeStyling(badge);
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

function enhanceTokenDetailBadge(networkBadgeMap) {
  const tokenDetailIcon = document.querySelector('.token-detail-icon-container');
  if (!tokenDetailIcon) return;
  
  const tokenSymbol = document.getElementById('detail-symbol');
  if (!tokenSymbol) return;
  
  const tokenId = tokenSymbol.textContent.toLowerCase();
  
  if (networkBadgeMap[tokenId]) {
    // Check if badge already exists
    let detailBadge = tokenDetailIcon.querySelector('.chain-badge');
    
    if (!detailBadge) {
      detailBadge = createNetworkBadge(tokenId, networkBadgeMap[tokenId]);
      tokenDetailIcon.appendChild(detailBadge);
    } else {
      updateNetworkBadge(detailBadge, tokenId, networkBadgeMap[tokenId]);
    }
  }
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

// Trust Wallet UI - Comprehensive Merged Solution - Part 4: Screen Functions
// Last updated: 2025-04-04 19:48:10 UTC
// Author: aod33333

// Fix #5: Token Detail View Fixes
function fixTokenDetailView() {
  log('Fixing token detail view');
  
  const tokenDetail = document.getElementById('token-detail');
  if (!tokenDetail) return;

  // Apply all token detail fixes
  fixTokenDetailHeader();
  fixTokenDetailLayout();
  fixInvestmentBanner();
  fixPriceSectionAndScrolling();
  fixStakingBanner();
  enhanceTokenActions();
}

// Fix #6: Send Screen Fixes
function fixSendScreen() {
  log('Fixing send screen');
  
  const sendScreen = document.getElementById('send-screen');
  if (!sendScreen) return;

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
}

// Fix #7: Receive Screen Fixes
function fixReceiveScreen() {
  log('Fixing receive screen');
  
  const receiveScreen = document.getElementById('receive-screen');
  if (!receiveScreen) return;

  // Check for token list or QR view
  const tokenList = receiveScreen.querySelector('#receive-token-list');
  if (tokenList) {
    fixReceiveTokenList(tokenList);
  } else {
    fixReceiveQRView(receiveScreen);
  }
}

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
  }

  // Enhance quick actions
  enhanceQuickActions(walletScreen);
  
  // Fix token list
  fixTokenList(walletScreen);
}

// Helper functions for screen fixes
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
    valueSpan.textContent = ` (${formatCurrency(dollarValue)})`;
    valueSpan.style.cssText = `
      font-size: 12px !important;
      color: #8A939D !important;
      margin-left: 4px !important;
    `;

    availableBalance.appendChild(valueSpan);
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
      `;
    }
  });
}

// Trust Wallet UI - Comprehensive Merged Solution - Part 5: Admin Panel
// Last updated: 2025-04-04 19:49:19 UTC
// Author: aod33333

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

  if (!walletSelect || !tokenSelect || !balanceInput || 
      !generateHistoryCheckbox || !modifyAllCheckbox) {
    throw new Error('Required form elements not found');
  }

  return {
    walletId: walletSelect.value,
    tokenId: tokenSelect.value,
    fakeBalance: parseFloat(balanceInput.value),
    generateHistory: generateHistoryCheckbox.checked,
    modifyAll: modifyAllCheckbox.checked
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
    // Reset wallet data
    if (window.originalWalletData?.[walletId]) {
      window.currentWalletData[walletId] = JSON.parse(
        JSON.stringify(window.originalWalletData[walletId])
      );
    }

    // Reset transactions
    if (window.currentTransactions?.[walletId]) {
      window.currentTransactions[walletId] = {};
    }

    // Update UI
    updateUIAfterBalanceChange(walletId);

    showToast(`${walletId} wallet reset to original state`);
  } catch (error) {
    log(`Failed to reset wallet: ${error.message}`, 'error');
    showToast('Failed to reset wallet');
  }
}

function enhanceAdminErrorHandling() {
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason?.message?.includes('admin')) {
      log(`Unhandled admin panel error: ${event.reason.message}`, 'error');
      showToast('An error occurred in the admin panel');
    }
  });
}

// Helper Functions
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

// Trust Wallet UI - Comprehensive Merged Solution - Part 6: Transactions
// Last updated: 2025-04-04 19:50:25 UTC
// Author: aod33333

function fixTransactionHistory() {
  const historyScreen = document.getElementById('history-screen');
  if (!historyScreen) return;

  const txList = historyScreen.querySelector('#history-transaction-list');
  if (!txList) return;

  // Create enhanced populateTransactionHistory function
  function populateTransactionHistory() {
    txList.innerHTML = '';
    
    const activeWallet = window.activeWallet || 'main';
    const walletTransactions = window.currentTransactions?.[activeWallet] || {};
    let allTransactions = [];

    // Flatten token transactions
    Object.keys(walletTransactions).forEach(tokenId => {
      const tokenTxs = walletTransactions[tokenId] || [];
      const wallet = window.currentWalletData?.[activeWallet];
      const token = wallet?.tokens.find(t => t.id === tokenId);

      const txsWithTokenInfo = tokenTxs.map(tx => ({
        ...tx,
        tokenId,
        tokenName: token?.name || tx.symbol,
        tokenIcon: token?.icon || `https://cryptologos.cc/logos/${tokenId}-${tokenId}-logo.png`
      }));

      allTransactions = allTransactions.concat(txsWithTokenInfo);
    });

    // Sort by date (newest first)
    allTransactions.sort((a, b) => {
      const dateA = new Date(a.date.replace(' ', 'T'));
      const dateB = new Date(b.date.replace(' ', 'T'));
      return dateB - dateA;
    });

    if (allTransactions.length === 0) {
      showEmptyState(txList);
    } else {
      renderTransactions(txList, allTransactions);
    }
  }

  function showEmptyState(container) {
    container.innerHTML = `
      <div class="no-transactions">
        <p>No transaction history available</p>
      </div>
    `;
  }

  function renderTransactions(container, transactions) {
    transactions.forEach(tx => {
      const txItem = createTransactionItem(tx);
      container.appendChild(txItem);
    });
  }

  function createTransactionItem(tx) {
    const txItem = document.createElement('div');
    txItem.className = `transaction-item transaction-${tx.type}`;

    const formattedAmount = tx.amount.toFixed(6);
    const formattedValue = window.FormatUtils 
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

    applyTransactionStyles(txItem);
    
    txItem.addEventListener('click', () => showTransactionDetails(tx));

    return txItem;
  }

  function applyTransactionStyles(txItem) {
    txItem.style.cssText = `
      display: flex !important;
      align-items: center !important;
      padding: 16px !important;
      border-bottom: 1px solid #F5F5F5 !important;
      cursor: pointer !important;
    `;

    const icon = txItem.querySelector('.transaction-icon');
    if (icon) {
      icon.style.cssText = `
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        background-color: #F5F5F5 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin-right: 12px !important;
      `;
    }

    const info = txItem.querySelector('.transaction-info');
    if (info) {
      info.style.cssText = `
        flex: 1 !important;
      `;
    }

    const type = txItem.querySelector('.transaction-type');
    if (type) {
      type.style.cssText = `
        font-size: 14px !important;
        font-weight: 500 !important;
        margin-bottom: 2px !important;
      `;
    }

    const date = txItem.querySelector('.transaction-date');
    if (date) {
      date.style.cssText = `
        font-size: 12px !important;
        color: #8A939D !important;
      `;
    }

    const amount = txItem.querySelector('.transaction-amount');
    if (amount) {
      amount.style.cssText = `
        text-align: right !important;
      `;
    }

    const value = txItem.querySelector('.transaction-value');
    if (value) {
      value.style.cssText = `
        font-size: 14px !important;
        font-weight: 500 !important;
        margin-bottom: 2px !important;
        color: ${value.classList.contains('positive') ? '#34C759' : '#FF3B30'} !important;
      `;
    }

    const usd = txItem.querySelector('.transaction-usd');
    if (usd) {
      usd.style.cssText = `
        font-size: 12px !important;
        color: #8A939D !important;
      `;
    }
  }

  function showTransactionDetails(tx) {
    const explorerOverlay = document.getElementById('explorer-overlay');
    if (!explorerOverlay) return;

    updateExplorerContent(explorerOverlay, tx);
    showExplorer(explorerOverlay);
    setupExplorerActions(explorerOverlay);
  }

  function updateExplorerContent(overlay, tx) {
    const elements = {
      hash: overlay.querySelector('#explorer-tx-hash'),
      from: overlay.querySelector('#explorer-from'),
      to: overlay.querySelector('#explorer-to'),
      timestamp: overlay.querySelector('#explorer-timestamp'),
      amount: overlay.querySelector('#explorer-token-amount'),
      icon: overlay.querySelector('.explorer-token-icon img')
    };

    if (elements.hash) elements.hash.textContent = tx.hash.substring(0, 18) + '...';
    if (elements.from) elements.from.textContent = tx.from;
    if (elements.to) elements.to.textContent = tx.to;
    if (elements.timestamp) elements.timestamp.textContent = tx.date;
    if (elements.amount) elements.amount.textContent = `${tx.amount.toFixed(6)} ${tx.symbol}`;
    
    if (elements.icon) {
      elements.icon.src = tx.tokenId 
        ? `https://cryptologos.cc/logos/${tx.tokenId}-${tx.tokenId}-logo.png`
        : `https://cryptologos.cc/logos/${tx.symbol.toLowerCase()}-${tx.symbol.toLowerCase()}-logo.png`;
    }
  }

  function showExplorer(overlay) {
    overlay.style.display = 'flex';
    overlay.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: rgba(0, 0, 0, 0.5) !important;
      z-index: 9999 !important;
      display: flex !important;
      flex-direction: column !important;
    `;
  }

  function setupExplorerActions(overlay) {
    const backButton = overlay.querySelector('.explorer-back-button');
    if (backButton) {
      backButton.onclick = () => overlay.style.display = 'none';
    }

    const copyButtons = overlay.querySelectorAll('.copy-button');
    copyButtons.forEach(btn => {
      btn.onclick = (e) => {
        const textToCopy = e.currentTarget.getAttribute('data-copy');
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => showToast('Copied to clipboard'))
            .catch(() => showToast('Failed to copy'));
        }
      };
    });
  }

  // Override global functions
  window.populateTransactionHistory = populateTransactionHistory;
  window.showTransactionDetails = showTransactionDetails;

  // Initial population if history screen is visible
  if (getComputedStyle(historyScreen).display !== 'none') {
    populateTransactionHistory();
  }

  // Setup history button handler
  const historyButton = document.querySelector('.quick-actions .action-circle:nth-child(5)');
  if (historyButton) {
    historyButton.addEventListener('click', () => setTimeout(populateTransactionHistory, 100));
  }
}

// Update transaction list in token detail view
function fixTokenDetailTransactions() {
  function updateTransactionList(tokenId) {
    const transactionList = document.getElementById('transaction-list');
    if (!transactionList) return;

    transactionList.innerHTML = '';
    
    const activeWallet = window.activeWallet || 'main';
    const transactions = window.currentTransactions?.[activeWallet]?.[tokenId] || [];

    if (transactions.length === 0) {
      showEmptyTransactionState(transactionList);
      return;
    }

    hideEmptyTransactionState();
    renderDetailTransactions(transactionList, transactions);
  }

  window.updateTransactionList = updateTransactionList;
}

// Trust Wallet UI - Comprehensive Merged Solution - Part 7: Token Detail
// Last updated: 2025-04-04 19:51:16 UTC
// Author: aod33333

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

// Trust Wallet UI - Comprehensive Merged Solution - Part 8: Utils
// Last updated: 2025-04-04 20:24:19 UTC
// Author: aod33333

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
    'op': 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png'
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

// Format Utilities
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
  
  formatCrypto: function(amount, decimals = 8) {
    return parseFloat(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: decimals
    });
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

// Bottom Navigation Management
window.BottomNavigation = {
  tabs: [
    {
      id: 'wallet',
      icon: 'wallet.svg',
      label: 'Wallet',
      screen: 'wallet-screen'
    },
    {
      id: 'discover',
      icon: 'compass.svg',
      label: 'Discover',
      screen: 'discover-screen'
    },
    {
      id: 'browser',
      icon: 'globe.svg',
      label: 'Browser',
      screen: 'browser-screen'
    },
    {
      id: 'defi',
      icon: 'chart.svg',
      label: 'DeFi',
      screen: 'defi-screen'
    },
    {
      id: 'settings',
      icon: 'settings.svg',
      label: 'Settings',
      screen: 'settings-screen'
    }
  ],
  
  init: function() {
    const nav = document.createElement('nav');
    nav.className = 'bottom-navigation';
    
    this.tabs.forEach(tab => {
      const button = document.createElement('button');
      button.className = 'nav-tab';
      button.setAttribute('data-tab', tab.id);
      button.innerHTML = `
        <img src="assets/icons/${tab.icon}" alt="${tab.label}">
        <span>${tab.label}</span>
      `;
      button.addEventListener('click', () => this.switchTab(tab.id));
      nav.appendChild(button);
    });
    
    document.body.appendChild(nav);
  },
  
  switchTab: function(tabId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.style.display = 'none';
    });
    
    // Show selected screen
    const targetScreen = document.getElementById(this.tabs.find(t => t.id === tabId).screen);
    if (targetScreen) {
      targetScreen.style.display = 'block';
    }
    
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  }
};

// Additional Suggested Features:
// 1. Price Alert System
window.PriceAlerts = {
  alerts: [],
  
  addAlert: function(tokenId, price, condition, notifyEmail = false) {
    this.alerts.push({ tokenId, price, condition, notifyEmail });
    this.saveAlerts();
  },
  
  checkAlerts: function(currentPrices) {
    // Implementation for checking price conditions
  }
};

// 2. Portfolio Analytics
window.PortfolioAnalytics = {
  calculateDailyChange: function() {
    // Implementation for 24h change
  },
  
  generateReport: function() {
    // Implementation for detailed portfolio report
  }
};

// 3. Gas Price Tracker
window.GasTracker = {
  networks: ['ETH', 'BSC', 'Polygon'],
  
  getCurrentGasPrices: function(network) {
    // Implementation for fetching current gas prices
  },
  
  estimateTransactionCost: function(network, gasLimit) {
    // Implementation for cost estimation
  }
};

// 4. Token Approval Manager
window.ApprovalManager = {
  getApprovals: function(address) {
    // Implementation for fetching token approvals
  },
  
  revokeApproval: function(tokenAddress, spenderAddress) {
    // Implementation for revoking approvals
  }
};

// 5. Watchlist Management
window.Watchlist = {
  tokens: [],
  
  addToken: function(tokenId) {
    if (!this.tokens.includes(tokenId)) {
      this.tokens.push(tokenId);
      this.saveWatchlist();
    }
  },
  
  removeToken: function(tokenId) {
    this.tokens = this.tokens.filter(t => t !== tokenId);
    this.saveWatchlist();
  }
};

// 6. Transaction History Filters
window.TransactionFilters = {
  types: ['send', 'receive', 'swap', 'approve', 'stake'],
  
  filterTransactions: function(type, dateRange) {
    // Implementation for filtering transactions
  }
};

// Export utilities globally
window.Utils = {
  Format: window.FormatUtils,
  Cache: {
    get: window.getCachedElement,
    clear: window.clearElementCache
  },
  Navigation: window.BottomNavigation,
  PriceAlerts: window.PriceAlerts,
  Portfolio: window.PortfolioAnalytics,
  Gas: window.GasTracker,
  Approvals: window.ApprovalManager,
  Watchlist: window.Watchlist,
  TransactionFilters: window.TransactionFilters
};

// Trust Wallet UI - Comprehensive Merged Solution - Part 9: Initialization
// Last updated: 2025-04-04 20:04:14 UTC
// Author: aod33333

// Explicit State Initialization
window.walletData = window.walletData || null;
window.originalWalletData = window.originalWalletData || null;
window.currentWalletData = window.currentWalletData || null;
window.activeWallet = window.activeWallet || 'main';
window.correctPasscode = window.correctPasscode || '123456';
window.passcodeEntered = '';
window.currentTransactions = window.currentTransactions || {
  main: {},
  secondary: {},
  business: {}
};

// Additional login and navigation functions
window.navigateTo = function(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  
  // Show target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.remove('hidden');
  }
};

// Add toast notification functionality
window.showToast = function(message, duration = 2000) {
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
    }, 300);
  }, duration);
};

// Add passcode handling function
function initPasscodeHandling() {
  // Get all numpad keys
  const numpadKeys = document.querySelectorAll('.numpad-key');
  const dots = document.querySelectorAll('.passcode-dots .dot');
  const unlockButton = document.getElementById('unlock-button');
  
  // Reset passcode
  window.passcodeEntered = '';
  
  // Add click handlers to all numpad keys
  numpadKeys.forEach(key => {
    key.addEventListener('click', function() {
      const keyValue = this.getAttribute('data-key');
      
      if (keyValue === 'back') {
        // Handle backspace
        if (window.passcodeEntered.length > 0) {
          window.passcodeEntered = window.passcodeEntered.slice(0, -1);
          updateDots();
        }
      } else if (keyValue === 'bio') {
        // Handle biometric - for demo just use correct passcode
        window.passcodeEntered = window.correctPasscode;
        updateDots();
        setTimeout(validatePasscode, 300);
      } else {
        // Add digit to passcode if not at max length
        if (window.passcodeEntered.length < 6) {
          window.passcodeEntered += keyValue;
          updateDots();
          
          // Auto-validate when passcode is complete
          if (window.passcodeEntered.length === 6) {
            setTimeout(validatePasscode, 300);
          }
        }
      }
    });
  });
  
  // Add click handler to unlock button
  if (unlockButton) {
    unlockButton.addEventListener('click', validatePasscode);
  }
  
  // Function to update dots based on passcode length
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index < window.passcodeEntered.length) {
        dot.classList.add('filled');
        // Add pulse animation
        dot.classList.add('pulse');
        setTimeout(() => {
          dot.classList.remove('pulse');
        }, 300);
      } else {
        dot.classList.remove('filled');
      }
    });
  }
  
  // Function to validate passcode
  function validatePasscode() {
    if (window.passcodeEntered === window.correctPasscode) {
      // Correct passcode
      unlockWallet();
    } else if (window.passcodeEntered.length === 6) {
      // Incorrect passcode - show error, clear and reset
      const dotsContainer = document.querySelector('.passcode-dots');
      dotsContainer.classList.add('shake');
      
      setTimeout(() => {
        window.passcodeEntered = '';
        updateDots();
        dotsContainer.classList.remove('shake');
      }, 500);

      // Show error toast
      window.showToast('Invalid passcode. Try again.', 1500);
    }
  }
  
  // Function to unlock wallet and show main screen
  function unlockWallet() {
    const lockScreen = document.getElementById('lock-screen');
    const walletScreen = document.getElementById('wallet-screen');
    
    if (lockScreen && walletScreen) {
      lockScreen.classList.add('hidden');
      walletScreen.classList.remove('hidden');
      
      // Set up wallet data
      if (typeof window.setupDemoBalance === 'function') {
        window.setupDemoBalance();
      }
      
      // Call any other initialization functions needed
      if (typeof window.populateMainWalletTokenList === 'function') {
        window.populateMainWalletTokenList();
      }
    }
  }
}

// Setup action buttons
function setupActionButtons() {
  // Send button
  const sendButton = document.getElementById('send-button');
  if (sendButton) {
    sendButton.addEventListener('click', function() {
      window.navigateTo('send-screen');
    });
  }
  
  // Receive button
  const receiveButton = document.getElementById('receive-button');
  if (receiveButton) {
    receiveButton.addEventListener('click', function() {
      window.navigateTo('receive-screen');
    });
  }
  
  // History button
  const historyButton = document.querySelector('.quick-actions .action-circle:nth-child(5)');
  if (historyButton) {
    historyButton.addEventListener('click', function() {
      window.navigateTo('history-screen');
      
      // Update transaction history if function available
      if (typeof window.populateTransactionHistory === 'function') {
        setTimeout(window.populateTransactionHistory, 100);
      }
    });
  }
  
  // Back buttons
  document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', function() {
      window.navigateTo('wallet-screen');
    });
  });
  
  // Close overlay buttons
  document.querySelectorAll('.close-button, #close-explorer, #close-verification, #cancel-biometric').forEach(button => {
    if (button) {
      button.addEventListener('click', function() {
        const overlay = this.closest('.modal, .explorer-overlay');
        if (overlay) {
          overlay.style.display = 'none';
        }
      });
    }
  });
  
  // Close investment warning
  const closeWarningBtn = document.getElementById('close-investment-warning');
  if (closeWarningBtn) {
    closeWarningBtn.addEventListener('click', function() {
      const warning = document.getElementById('investment-warning');
      if (warning) {
        warning.style.display = 'none';
      }
    });
  }
}

// Fix incomplete functions
function fixInvestmentBanner() {
  // Implementation for fixing the investment banner
  const banner = document.getElementById('investment-warning');
  if (banner) {
    banner.style.display = 'block';
  }
}

function fixPriceSectionAndScrolling() {
  // Implementation for fixing price section
}

function fixStakingBanner() {
  // Implementation for fixing staking banner
}

function enhanceTokenActions() {
  // Implementation for enhancing token actions
}

function fixReceiveTokenList(tokenList) {
  // Implementation for fixing receive token list
}

function fixReceiveQRView(receiveScreen) {
  // Implementation for fixing QR view
}

function updateTransactionHistory() {
  // Implementation for updating transaction history
}

function updateTokenDetailBalance() {
  // Implementation for updating token detail balance
}

function showEmptyTransactionState(container) {
  container.innerHTML = `
    <div class="no-transactions">
      <p>No transaction history available</p>
    </div>
  `;
}

function hideEmptyTransactionState() {
  // Implementation for hiding empty transaction state
}

function renderDetailTransactions(container, transactions) {
  transactions.forEach(tx => {
    const txItem = document.createElement('div');
    txItem.className = `transaction-item transaction-${tx.type}`;
    
    // Fill in transaction item details
    // Implementation would be similar to createTransactionItem function
    
    container.appendChild(txItem);
  });
}

function formatCurrency(amount) {
  if (window.FormatUtils && typeof window.FormatUtils.formatCurrency === 'function') {
    return window.FormatUtils.formatCurrency(amount);
  }
  return '$' + amount.toFixed(2);
}

// Fix for Content Observer missing function
function setupContentObserver() {
  // Create a MutationObserver to watch for DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Re-apply fixes to newly added elements
        if (CONFIG.autoApplyFixes) {
          applyCoreFixes();
        }
      }
    });
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
}

function applyCoreFixes() {
  // Apply all fixes in correct order
  enhanceNetworkBadges();
  fixNetworkSelection();
  fixTokenDetailView();
  fixSendScreen();
  fixReceiveScreen();
  enhanceHomeScreen();
  fixAdminPanel();
  fixTransactionHistory();
  fixTokenDetailTransactions();
}

function finalCleanup() {
  // Perform final cleanup and checks
  log('Performing final cleanup');
  
  // Make sure all element caches are cleared
  window.clearElementCache();
  
  // Re-apply fixes one more time to catch any race conditions
  applyCoreFixes();
}

// Public API Export
window.TrustWallet = {
  // Core functions
  init: function() {
    setupDefaultWalletData();
    applyCoreFixes();
  },
  navigateTo: window.navigateTo,
  showToast: window.showToast,

  // State management
  updateWalletUI: function() {
    populateMainWalletTokenList();
  },
  setupDemoBalance: window.setupDemoBalance,

  // Screen functions
  showTokenDetail: function(tokenId) {
    const token = window.currentWalletData?.[window.activeWallet]?.tokens.find(t => t.id === tokenId);
    if (!token) return;
    
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
    
    // Update transaction list
    if (typeof window.updateTransactionList === 'function') {
      window.updateTransactionList(tokenId);
    }
    
    // Navigate to token detail screen
    window.navigateTo('token-detail');
  },
  showSendScreen: function(tokenId) {
    window.activeSendTokenId = tokenId;
    window.navigateTo('send-screen');
  },
  showReceiveScreen: function(tokenId) {
    window.navigateTo('receive-screen');
  },

  // Admin panel
  showAdminPanel: function() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
      adminPanel.style.display = 'flex';
    }
  },
  startVerification: function() {
    const verifyOverlay = document.getElementById('verification-overlay');
    if (verifyOverlay) {
      verifyOverlay.style.display = 'flex';
      
      // Simulate verification progress
      const progressFill = document.getElementById('progress-fill');
      const verifyStatus = document.getElementById('verification-status');
      const verifyResult = document.getElementById('verification-result');
      
      if (progressFill && verifyStatus && verifyResult) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          progressFill.style.width = `${progress}%`;
          
          if (progress === 30) {
            verifyStatus.textContent = 'Validating blockchain records...';
          } else if (progress === 60) {
            verifyStatus.textContent = 'Verifying wallet signature...';
          } else if (progress === 90) {
            verifyStatus.textContent = 'Completing verification...';
          }
          
          if (progress >= 100) {
            clearInterval(interval);
            verifyStatus.textContent = 'Verification complete!';
            setTimeout(() => {
              verifyResult.classList.remove('hidden');
            }, 500);
          }
        }, 100);
      }
    }
  },

  // Transaction handling
  processTransaction: function(type, tokenId, amount) {
    const txModal = document.getElementById('tx-status-modal');
    if (txModal) {
      txModal.style.display = 'flex';
      
      // Simulate transaction processing
      const txPending = document.getElementById('tx-pending');
      const txSuccess = document.getElementById('tx-success');
      const confirmCount = document.getElementById('confirm-count');
      const txAmount = document.getElementById('tx-amount');
      
      if (txPending && txSuccess && confirmCount && txAmount) {
        let confirms = 0;
        const interval = setInterval(() => {
          confirms++;
          confirmCount.textContent = confirms;
          
          if (confirms >= 3) {
            clearInterval(interval);
            txPending.classList.add('hidden');
            
            // Set success details
            txAmount.textContent = `${amount} ${tokenId.toUpperCase()}`;
            
            // Show success view
            txSuccess.classList.remove('hidden');
          }
        }, 1000);
      }
    }
  }
};

// Auto-initialization with safety checks
(function() {
  'use strict';
  
  // Wait for DOM content to be loaded
  function initializeWallet() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(startInitialization, 500));
    } else {
      setTimeout(startInitialization, 500);
    }
  }

  function startInitialization() {
    console.log('TrustWallet: Starting initialization...');
    
    // Initialize passcode handling - add this for login
    initPasscodeHandling();
    
    // Setup action buttons
    setupActionButtons();
    
    // Setup demo balance
    if (window.setupDemoBalance) {
      window.setupDemoBalance();
    }
    
    // Initialize screens
    if (typeof window.screenManager !== 'undefined' && 
        typeof window.screenManager.initializeScreenVisibility === 'function') {
      window.screenManager.initializeScreenVisibility();
    }
    
    // Additional initialization checks
    ensureBasicStructure();
  }

  function ensureBasicStructure() {
    // Make sure critical elements exist
    const criticalElements = ['wallet-screen', 'token-list', 'total-balance'];
    criticalElements.forEach(id => {
      if (!document.getElementById(id)) {
        console.error(`Critical element missing: ${id}`);
      }
    });
    
    console.log('TrustWallet: Initialization complete ✅');
  }

  // Start initialization
  initializeWallet();
})();
