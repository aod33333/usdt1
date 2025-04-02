// TrustWallet UI Fixes - Complete Version
// This script applies various fixes to make the UI more authentic to Trust Wallet

console.log('Loading TrustWallet UI fixes...');

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Start with a slight delay to ensure other scripts have run
  setTimeout(initFixes, 300);
});

function initFixes() {
  console.log('Initializing TrustWallet UI fixes...');
  
  // Apply all fixes
  fixStatusBarPadding();
  fixNetworkFilters();
  fixReceivePage();
  fixSendPage();
  fixTokenDetailPage();
  centerHeaderTitles();
  fixHeaderIconsAlignment();
  addCommasToBalances();
  enhanceNetworkBadges();
  fixTokenDetailStaking();
  fixAdminPanel();
  fixWalletSwitching();
  fixBottomNavigation();
  fixCircularIcons();
  fixRandomBtcLogo();
  fixTokenDetailPrice();
  
  // Connect to dynamic content updates
  setupDynamicContentObserver();
  
  console.log('TrustWallet UI fixes initialized');
}

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Start with a slight delay to ensure other scripts have run
  setTimeout(initFixes, 300);
});

// Execute fixes when script is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initFixes, 300);
} else {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initFixes, 300);
  });
}

// Set up a mutation observer to watch for dynamic content changes
function setupDynamicContentObserver() {
  const observer = new MutationObserver(function(mutations) {
    let needsUIRefresh = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'style' &&
          mutation.target.classList.contains('screen') && 
          mutation.target.style.display !== 'none') {
        needsUIRefresh = true;
      }
      
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        needsUIRefresh = true;
      }
    });
    
    if (needsUIRefresh) {
      // Apply fixes again when UI changes
      setTimeout(function() {
        fixNetworkFilters();
        enhanceNetworkBadges();
        fixTokenDetailPage();
        fixTokenDetailPrice();
        fixCircularIcons();
      }, 100);
    }
  });
  
  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    observer.observe(appContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
}

// =================================================================
// GLOBAL FIXES
// =================================================================

// FIX 1: Add proper padding to account for status bar on all screens except home
function fixStatusBarPadding() {
  // Get all screens except wallet home and lock screen
  const screens = document.querySelectorAll('.screen:not(#wallet-screen):not(#lock-screen)');
  
  screens.forEach(screen => {
    // Skip if already fixed
    if (screen.classList.contains('status-bar-fixed')) return;
    
    // Add padding to the entire screen
    screen.style.paddingTop = '20px';
    
    // Also adjust screen header if present
    const header = screen.querySelector('.screen-header');
    if (header) {
      header.style.position = 'sticky';
      header.style.top = '0';
      header.style.zIndex = '100';
      header.style.backgroundColor = '#FFFFFF';
    }
    
    // Mark as fixed
    screen.classList.add('status-bar-fixed');
  });
  
  console.log('Status bar padding fix applied');
}

// Fix 2: Fix the "All Networks" filters in various screens
function fixNetworkFilters() {
  const networkFilters = document.querySelectorAll('.networks-filter .all-networks');
  
  networkFilters.forEach(filter => {
    // Remove existing inline styles first, then apply new ones
    filter.removeAttribute('style');
    filter.style.cssText = `
      display: inline-flex !important;
      align-items: center !important;
      background: #F5F5F5 !important;
      border-radius: 16px !important;
      padding: 6px 12px !important;
      font-size: 12px !important;
      color: #5F6C75 !important;
      margin: 8px 16px !important;
      font-weight: 500 !important;
    `;
    
    // Make sure the chevron is properly aligned
    const chevron = filter.querySelector('i.fa-chevron-down');
    if (chevron) {
      chevron.style.marginLeft = '6px';
      chevron.style.fontSize = '10px';
    }
  });
}
  
  // Fix container styles
  const filterContainers = document.querySelectorAll('.networks-filter');
  filterContainers.forEach(container => {
    container.style.textAlign = 'left';
    container.style.borderBottom = '1px solid #F5F5F5';
    container.style.paddingBottom = '8px';
  });
}

// =================================================================
// TOKEN DETAIL PAGE FIXES
// =================================================================

function fixTokenDetailPage() {
  const tokenDetailPage = document.getElementById('token-detail');
  if (!tokenDetailPage) {
    console.log('Token detail page not found');
    return;
  }
  
  console.log('Fixing token detail page');
  
  // Fix header format - FORCE DIRECT REPLACEMENT TO ENSURE IT WORKS
  fixTokenDetailHeader(tokenDetailPage);
  
  // Add missing components
  addMissingComponents(tokenDetailPage);
  
  // Fix layout and scrolling
  fixTokenDetailLayout(tokenDetailPage);
  
  // Fix transaction amounts
  fixTransactionAmounts(tokenDetailPage);
  
  // Add event listener for when token details are shown
  document.addEventListener('click', function(e) {
    const tokenItem = e.target.closest('.token-item');
    if (tokenItem) {
      setTimeout(() => {
        console.log('Token item clicked, applying detail fixes');
        fixTokenDetailPage();
      }, 200);
    }
  });
}

function fixTokenDetailHeader() {
  const tokenDetailHeader = document.querySelector('#token-detail .detail-header');
  if (!tokenDetailHeader) return;

  // Apply styles with !important to override existing styles
  tokenDetailHeader.style.cssText = `
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    position: relative !important;
  `;
  
  // Fix the title element with absolute positioning
  const titleElement = tokenDetailHeader.querySelector('.token-detail-title');
  if (titleElement) {
    titleElement.style.cssText = `
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      text-align: center !important;
      z-index: 1 !important;
    `;
  }
  
  // Ensure back button stays above the title
  const backButton = tokenDetailHeader.querySelector('.back-button');
  if (backButton) {
    backButton.style.cssText = `
      position: relative !important;
      z-index: 2 !important;
    `;
  }
}

function addMissingComponents(detailPage) {
  console.log('Adding missing components to token detail page');
  const detailContent = detailPage.querySelector('.token-detail-content');
  if (!detailContent) {
    console.log('Detail content not found');
    return;
  }
  
  // Add investment warning if not already present
  if (!detailContent.querySelector('.investment-warning')) {
    addInvestmentWarning(detailContent);
  }
  
  // Add staking banner if not already present
  if (!detailContent.querySelector('.staking-container')) {
    addStakingBanner(detailContent);
  }
}

function addInvestmentWarning(detailContent) {
  console.log('Adding investment warning');
  
  // Create investment warning
  const warningBanner = document.createElement('div');
  warningBanner.className = 'investment-warning';
  warningBanner.innerHTML = `
    <div class="investment-warning-content">
      <i class="fas fa-exclamation-circle warning-icon"></i>
      <div class="investment-warning-text">
        <p>Don't invest unless you're prepared to lose all the money you invest. This is a high-risk investment and you are unlikely to be protected if something goes wrong. <a href="#" class="learn-more">Take 2 mins to learn more</a>.</p>
      </div>
      <button class="close-warning">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Find where to insert
  const balanceDisplay = detailContent.querySelector('.token-detail-balance');
  if (balanceDisplay) {
    // Insert after balance display
    if (balanceDisplay.nextSibling) {
      detailContent.insertBefore(warningBanner, balanceDisplay.nextSibling);
    } else {
      detailContent.appendChild(warningBanner);
    }
  } else {
    // Insert at beginning
    detailContent.insertBefore(warningBanner, detailContent.firstChild);
  }
  
  // Style the warning
  warningBanner.style.width = 'calc(100% - 32px)';
  warningBanner.style.margin = '16px';
  warningBanner.style.backgroundColor = '#FEF9E7';
  warningBanner.style.color = '#D4AC0D';
  warningBanner.style.borderRadius = '8px';
  warningBanner.style.borderLeft = '4px solid #D4AC0D';
  warningBanner.style.fontSize = '12px';
  
  const warningContent = warningBanner.querySelector('.investment-warning-content');
  if (warningContent) {
    warningContent.style.display = 'flex';
    warningContent.style.alignItems = 'flex-start';
    warningContent.style.padding = '12px';
  }
  
  const warningIcon = warningBanner.querySelector('.warning-icon');
  if (warningIcon) {
    warningIcon.style.fontSize = '20px';
    warningIcon.style.marginRight = '12px';
    warningIcon.style.marginTop = '2px';
  }
  
  const warningText = warningBanner.querySelector('.investment-warning-text');
  if (warningText) {
    warningText.style.flex = '1';
  }
  
  const closeButton = warningBanner.querySelector('.close-warning');
  if (closeButton) {
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = '#D4AC0D';
    closeButton.style.marginLeft = '8px';
    closeButton.style.cursor = 'pointer';
    
    closeButton.addEventListener('click', function() {
      warningBanner.style.display = 'none';
    });
  }
}

function addStakingBanner(detailContent) {
  console.log('Adding staking banner');
  
  // Get active token
  const activeWallet = window.activeWallet || 'main';
  const tokenId = getActiveTokenId();
  
  // Find token data
  let token = null;
  if (window.currentWalletData && 
      window.currentWalletData[activeWallet] && 
      window.currentWalletData[activeWallet].tokens) {
    token = window.currentWalletData[activeWallet].tokens.find(t => t.id === tokenId);
  }
  
  if (!token) {
    console.log('Token data not found for staking banner');
    return;
  }
  
  // Create staking banner
  const stakingBanner = document.createElement('div');
  stakingBanner.className = 'staking-container';
  stakingBanner.innerHTML = `
    <div class="staking-icon">
      <img src="${getTokenLogoUrl(token.id)}" alt="${token.name}">
    </div>
    <div class="staking-content">
      <h3>Earn ${token.symbol}</h3>
      <p>Stake your ${token.symbol} to earn up to 6.5% APY</p>
    </div>
    <i class="fas fa-chevron-right staking-arrow"></i>
  `;
  
  // Find where to insert
  const transactionHeader = detailContent.querySelector('.transaction-header');
  const actionButtons = detailContent.querySelector('.token-detail-actions');
  
  if (transactionHeader) {
    // Insert before transaction section
    detailContent.insertBefore(stakingBanner, transactionHeader);
  } else if (actionButtons) {
    // Insert after action buttons
    if (actionButtons.nextSibling) {
      detailContent.insertBefore(stakingBanner, actionButtons.nextSibling);
    } else {
      detailContent.appendChild(stakingBanner);
    }
  } else {
    // Insert after investment warning or at beginning
    const investmentWarning = detailContent.querySelector('.investment-warning');
    if (investmentWarning) {
      if (investmentWarning.nextSibling) {
        detailContent.insertBefore(stakingBanner, investmentWarning.nextSibling);
      } else {
        detailContent.appendChild(stakingBanner);
      }
    } else {
      detailContent.appendChild(stakingBanner);
    }
  }
  
  // Style the staking banner
  stakingBanner.style.backgroundColor = '#F5F5F5';
  stakingBanner.style.borderRadius = '16px';
  stakingBanner.style.padding = '16px';
  stakingBanner.style.margin = '16px';
  stakingBanner.style.display = 'flex';
  stakingBanner.style.alignItems = 'center';
  stakingBanner.style.position = 'relative';
  stakingBanner.style.cursor = 'pointer';
  
  const stakingIcon = stakingBanner.querySelector('.staking-icon');
  if (stakingIcon) {
    stakingIcon.style.width = '40px';
    stakingIcon.style.height = '40px';
    stakingIcon.style.marginRight = '16px';
  }
  
  const stakingContent = stakingBanner.querySelector('.staking-content');
  if (stakingContent) {
    stakingContent.style.flex = '1';
  }
  
  const stakingTitle = stakingContent.querySelector('h3');
  if (stakingTitle) {
    stakingTitle.style.fontSize = '16px';
    stakingTitle.style.fontWeight = '600';
    stakingTitle.style.marginBottom = '4px';
  }
  
  const stakingDesc = stakingContent.querySelector('p');
  if (stakingDesc) {
    stakingDesc.style.fontSize = '12px';
    stakingDesc.style.color = '#8A939D';
  }
  
  const stakingArrow = stakingBanner.querySelector('.staking-arrow');
  if (stakingArrow) {
    stakingArrow.style.color = '#8A939D';
    stakingArrow.style.position = 'absolute';
    stakingArrow.style.right = '16px';
  }
  
  // Add click handler
  stakingBanner.addEventListener('click', function() {
    showToast('Staking feature coming soon');
  });
}

function fixTokenDetailLayout(detailPage) {
  const detailContent = detailPage.querySelector('.token-detail-content');
  if (!detailContent) return;
  
  // Make only transaction list scrollable
  detailContent.style.display = 'flex';
  detailContent.style.flexDirection = 'column';
  
  // Get price section to pin at bottom
  const priceSection = detailContent.querySelector('.token-price-info');
  if (priceSection) {
    priceSection.style.marginTop = 'auto';
  }
  
  // Make transaction list scrollable
  const transactionList = detailContent.querySelector('.transaction-list');
  if (transactionList) {
    transactionList.style.flex = '1';
    transactionList.style.overflowY = 'auto';
    transactionList.style.overflowX = 'hidden';
    transactionList.style.maxHeight = '300px'; // Adjust based on screen size
  }
}

function fixTransactionAmounts(detailPage) {
  // Find all transaction items
  const transactions = detailPage.querySelectorAll('.transaction-item');
  
  transactions.forEach(tx => {
    const txValue = tx.querySelector('.transaction-value');
    const txUSD = tx.querySelector('.transaction-usd');
    
    // Shorten transaction amount display
    if (txValue) {
      const currentText = txValue.textContent;
      // Extract token amount and symbol
      const match = currentText.match(/([+-])?([\d.,]+)\s+([A-Z]+)/i);
      
      if (match) {
        const sign = match[1] || '';
        const amount = parseFloat(match[2].replace(',', ''));
        const symbol = match[3];
        
        // Format with shortened number
        txValue.textContent = `${sign}${formatTokenAmount(amount)} ${symbol}`;
        txValue.style.fontSize = '14px'; // Smaller font size
      }
    }
    
    // Shorten USD value
    if (txUSD) {
      const currentText = txUSD.textContent;
      const match = currentText.match(/\$?([\d.,]+)/);
      
      if (match) {
        const amount = parseFloat(match[1].replace(',', ''));
        txUSD.textContent = formatCurrency(amount);
        txUSD.style.fontSize = '12px'; // Smaller font size
      }
    }
  });
}

// =================================================================
// HELPER FUNCTIONS & DYNAMIC CONTENT OBSERVER
// =================================================================

function getActiveTokenId() {
  // First try to get from URL
  const urlParams = new URLSearchParams(window.location.search);
  const tokenId = urlParams.get('token');
  
  if (tokenId) return tokenId;
  
  // Try to get from detail symbol
  const detailSymbol = document.getElementById('detail-symbol');
  if (detailSymbol) {
    return detailSymbol.textContent.toLowerCase();
  }
  
  // Fallback to window variable or default
  return window.activeSendTokenId || 'btc';
}

function getTokenNameById(tokenId) {
  const activeWallet = window.activeWallet || 'main';
  const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
  
  return token?.name || 'Bitcoin';
}

function getTokenSymbolById(tokenId) {
  const activeWallet = window.activeWallet || 'main';
  const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
  
  return token?.symbol || 'BTC';
}

function getTokenNetworkById(tokenId) {
  const activeWallet = window.activeWallet || 'main';
  const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
  
  return token?.network || 'Bitcoin Network';
}

function getTokenLogoUrl(tokenId) {
  // Use existing function if available
  if (typeof window.getTokenLogoUrl === 'function') {
    return window.getTokenLogoUrl(tokenId);
  }
  
  // Fallback implementation
  const logoUrls = {
    'btc': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    'eth': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    'bnb': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    'usdt': 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    'trx': 'https://cryptologos.cc/logos/tron-trx-logo.png',
    'sol': 'https://cryptologos.cc/logos/solana-sol-logo.png',
    'xrp': 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    'pol': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    'uni': 'https://cryptologos.cc/logos/uniswap-uni-logo.png'
  };
  
  return logoUrls[tokenId.toLowerCase()] || 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
}

function formatTokenAmount(amount) {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  
  // Format based on size
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(2) + 'M';
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(2) + 'K';
  } else if (amount >= 1) {
    return amount.toFixed(2);
  } else {
    // For small values, show more precision
    return amount.toFixed(6);
  }
}

function formatCurrency(amount) {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  
  // Format based on size
  if (amount >= 1000000) {
    return '$' + (amount / 1000000).toFixed(2) + 'M';
  } else if (amount >= 1000) {
    return '$' + (amount / 1000).toFixed(2) + 'K';
  } else {
    return '$' + amount.toFixed(2);
  }
}

function showToast(message, duration = 2000) {
  // Use existing function if available
  if (typeof window.showToast === 'function') {
    return window.showToast(message, duration);
  }
  
  // Fallback implementation
  const existingToast = document.querySelector('.tw-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'tw-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '80px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.fontSize = '14px';
  toast.style.zIndex = '10000';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s';
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // Hide and remove after duration
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// =================================================================
// RECEIVE PAGE FIXES
// =================================================================

function fixReceivePage() {
  const receiveScreen = document.getElementById('receive-screen');
  if (!receiveScreen) return;
  
  // Check if receive page is in token list mode or QR code mode
  const tokenList = receiveScreen.querySelector('#receive-token-list');
  
  if (tokenList) {
    // Fix token list mode
    fixReceiveTokenList();
  } else {
    // Fix QR code mode
    fixReceiveQRView();
  }
  
  // Add event listener to reapply fixes when navigating to receive screen
  document.addEventListener('click', function(e) {
    if (e.target.id === 'receive-button' || e.target.closest('#receive-button')) {
      setTimeout(fixReceiveTokenList, 100);
    }
  });
}

function fixReceiveTokenList() {
  const tokenItems = document.querySelectorAll('#receive-token-list .token-item');
  
  tokenItems.forEach(item => {
    if (!item.classList.contains('receive-item-fixed')) {
      // Get token data
      const tokenName = item.querySelector('.token-name')?.textContent || '';
      const tokenNetwork = item.querySelector('.token-price')?.textContent || '';
      
      // Fix token info structure
      const tokenInfo = item.querySelector('.token-info');
      if (tokenInfo) {
        tokenInfo.innerHTML = `
          <div class="token-name">${tokenName}</div>
          <div class="token-network-badge">${tokenNetwork}</div>
        `;
      }
      
      // Mark as fixed
      item.classList.add('receive-item-fixed');
    }
  });
}

function fixReceiveQRView() {
  const receiveScreen = document.getElementById('receive-screen');
  const receiveContent = receiveScreen?.querySelector('.receive-content');
  
  if (!receiveContent || receiveContent.classList.contains('receive-qr-fixed')) return;
  
  // Get content elements
  const qrContainer = receiveContent.querySelector('.qr-code-container');
  const addressContainer = receiveContent.querySelector('.wallet-address-container');
  
  if (qrContainer && addressContainer) {
    // Create token indicator
    const tokenSelection = document.createElement('div');
    tokenSelection.className = 'token-selection';
    
    // Get token info from URL or default to BTC
    const urlParams = new URLSearchParams(window.location.search);
    const tokenId = urlParams.get('token') || 'btc';
    const tokenName = getTokenNameById(tokenId);
    const tokenSymbol = getTokenSymbolById(tokenId);
    
    tokenSelection.innerHTML = `
      <div class="token-icon-large">
        <img src="${getTokenLogoUrl(tokenId)}" alt="${tokenName}">
      </div>
      <h3>${tokenName} (${tokenSymbol})</h3>
      <div class="token-address-badge">
        <span class="network-name">${getTokenNetworkById(tokenId)}</span>
        <span class="contract-address">0xC65B6...E90a51</span>
      </div>
    `;
    
    // Insert token selection before QR code
    receiveContent.insertBefore(tokenSelection, qrContainer);
    
    // Add copy/share buttons around QR code
    const actionButtons = document.createElement('div');
    actionButtons.className = 'qr-action-buttons';
    actionButtons.innerHTML = `
      <button class="qr-action-button copy-button">
        <div class="action-icon-circle">
          <i class="fas fa-copy"></i>
        </div>
        <span>Copy</span>
      </button>
      <button class="qr-action-button share-button">
        <div class="action-icon-circle">
          <i class="fas fa-share-alt"></i>
        </div>
        <span>Share</span>
      </button>
    `;
    
    // Insert action buttons after QR code
    receiveContent.insertBefore(actionButtons, addressContainer);
    
    // Style everything
    applyReceiveQRStyles(receiveContent, tokenSelection, actionButtons);
    
    // Mark as fixed
    receiveContent.classList.add('receive-qr-fixed');
    
    // Add copy functionality
    actionButtons.querySelector('.copy-button').addEventListener('click', function() {
      const address = document.getElementById('wallet-address')?.value;
      if (address) {
        try {
          navigator.clipboard.writeText(address)
            .then(() => showToast('Address copied to clipboard'))
            .catch(() => showToast('Failed to copy address'));
        } catch (e) {
          // Fallback for older browsers
          const input = document.getElementById('wallet-address');
          input.select();
          document.execCommand('copy');
          showToast('Address copied to clipboard');
        }
      }
    });
    
    // Add share functionality
    actionButtons.querySelector('.share-button').addEventListener('click', function() {
      showToast('Share functionality coming soon');
    });
  }
}

function applyReceiveQRStyles(receiveContent, tokenSelection, actionButtons) {
  // Fix overall layout
  receiveContent.style.display = 'flex';
  receiveContent.style.flexDirection = 'column';
  receiveContent.style.alignItems = 'center';
  receiveContent.style.padding = '16px';
  receiveContent.style.gap = '24px';
  
  // Style token selection
  tokenSelection.style.display = 'flex';
  tokenSelection.style.flexDirection = 'column';
  tokenSelection.style.alignItems = 'center';
  tokenSelection.style.gap = '8px';
  tokenSelection.style.marginBottom = '8px';
  
  const tokenIconLarge = tokenSelection.querySelector('.token-icon-large');
  if (tokenIconLarge) {
    tokenIconLarge.style.width = '48px';
    tokenIconLarge.style.height = '48px';
    tokenIconLarge.style.marginBottom = '8px';
  }
  
  const tokenAddressBadge = tokenSelection.querySelector('.token-address-badge');
  if (tokenAddressBadge) {
    tokenAddressBadge.style.display = 'flex';
    tokenAddressBadge.style.flexDirection = 'column';
    tokenAddressBadge.style.alignItems = 'center';
    tokenAddressBadge.style.gap = '4px';
    
    const networkName = tokenAddressBadge.querySelector('.network-name');
    if (networkName) {
      networkName.style.padding = '4px 8px';
      networkName.style.borderRadius = '12px';
      networkName.style.backgroundColor = '#F5F5F5';
      networkName.style.fontSize = '12px';
      networkName.style.color = '#5F6C75';
    }
    
    const contractAddress = tokenAddressBadge.querySelector('.contract-address');
    if (contractAddress) {
      contractAddress.style.fontSize = '12px';
      contractAddress.style.color = '#8A939D';
    }
  }
  
  // Style action buttons
  actionButtons.style.display = 'flex';
  actionButtons.style.justifyContent = 'center';
  actionButtons.style.gap = '32px';
  actionButtons.style.margin = '16px 0';
  
  const actionButtonElements = actionButtons.querySelectorAll('.qr-action-button');
  actionButtonElements.forEach(button => {
    button.style.display = 'flex';
    button.style.flexDirection = 'column';
    button.style.alignItems = 'center';
    button.style.gap = '8px';
    button.style.border = 'none';
    button.style.background = 'none';
    button.style.cursor = 'pointer';
    
    const iconCircle = button.querySelector('.action-icon-circle');
    if (iconCircle) {
      iconCircle.style.width = '40px';
      iconCircle.style.height = '40px';
      iconCircle.style.borderRadius = '50%';
      iconCircle.style.backgroundColor = '#F5F5F5';
      iconCircle.style.display = 'flex';
      iconCircle.style.justifyContent = 'center';
      iconCircle.style.alignItems = 'center';
      
      const icon = iconCircle.querySelector('i');
      if (icon) {
        icon.style.color = '#5F6C75';
        icon.style.fontSize = '16px';
      }
    }
    
    const span = button.querySelector('span');
    if (span) {
      span.style.fontSize = '12px';
      span.style.color = '#5F6C75';
    }
  });
  
  // Style QR code
  const qrContainer = receiveContent.querySelector('.qr-code-container');
  if (qrContainer) {
    qrContainer.style.width = '160px';
    qrContainer.style.height = '160px';
    qrContainer.style.padding = '8px';
    qrContainer.style.backgroundColor = 'white';
    qrContainer.style.borderRadius = '8px';
    qrContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  }
  
  // Style address container
  const addressContainer = receiveContent.querySelector('.wallet-address-container');
  if (addressContainer) {
    addressContainer.style.display = 'flex';
    addressContainer.style.alignItems = 'center';
    addressContainer.style.justifyContent = 'space-between';
    addressContainer.style.width = '100%';
    addressContainer.style.padding = '12px 16px';
    addressContainer.style.backgroundColor = '#F5F5F5';
    addressContainer.style.borderRadius = '8px';
    
    const addressInput = addressContainer.querySelector('input');
    if (addressInput) {
      addressInput.style.flex = '1';
      addressInput.style.border = 'none';
      addressInput.style.backgroundColor = 'transparent';
      addressInput.style.fontSize = '14px';
      addressInput.style.fontFamily = 'monospace';
    }
    
    const copyButton = addressContainer.querySelector('.copy-address-button');
    if (copyButton) {
      copyButton.style.display = 'flex';
      copyButton.style.alignItems = 'center';
      copyButton.style.gap = '4px';
      copyButton.style.backgroundColor = '#3375BB';
      copyButton.style.color = 'white';
      copyButton.style.border = 'none';
      copyButton.style.borderRadius = '16px';
      copyButton.style.padding = '6px 12px';
      copyButton.style.fontSize = '12px';
      copyButton.style.cursor = 'pointer';
    }
  }
}

// =================================================================
// SEND PAGE FIXES
// =================================================================

function fixSendPage() {
  // Fix token selection page
  fixSendTokenSelect();
  
  // Fix send form page
  fixSendForm();
  
  // Add event listener to reapply fixes when navigating to send screen
  document.addEventListener('click', function(e) {
    if (e.target.id === 'send-button' || e.target.closest('#send-button')) {
      setTimeout(fixSendTokenSelect, 100);
    }
    
    // Listen for token selection
    if (e.target.closest('#select-token-list .token-item')) {
      setTimeout(fixSendForm, 100);
    }
  });
}

function fixSendTokenSelect() {
  const sendTokenSelect = document.getElementById('send-token-select');
  if (!sendTokenSelect || sendTokenSelect.classList.contains('token-select-fixed')) return;
  
  // Get token list
  const tokenList = sendTokenSelect.querySelector('#select-token-list');
  if (!tokenList) return;
  
  // Clear existing content
  tokenList.innerHTML = '';
  
  // Create Popular section
  const popularSection = document.createElement('div');
  popularSection.className = 'token-list-section';
  popularSection.innerHTML = `
    <div class="section-header">Popular</div>
    <div class="token-items-container" id="popular-tokens"></div>
  `;
  
  // Create All crypto section
  const allCryptoSection = document.createElement('div');
  allCryptoSection.className = 'token-list-section';
  allCryptoSection.innerHTML = `
    <div class="section-header">All crypto</div>
    <div class="token-items-container" id="all-tokens"></div>
  `;
  
  // Add sections to token list
  tokenList.appendChild(popularSection);
  tokenList.appendChild(allCryptoSection);
  
  // Style sections
  applySendTokenSelectStyles(sendTokenSelect, popularSection, allCryptoSection);
  
  // Populate sections with tokens
  populateTokenSections();
  
  // Mark as fixed
  sendTokenSelect.classList.add('token-select-fixed');
}

function populateTokenSections() {
  // Get token data from current wallet
  const activeWallet = window.activeWallet || 'main';
  const walletData = window.currentWalletData?.[activeWallet];
  
  if (!walletData?.tokens) return;
  
  // Get container elements
  const popularContainer = document.getElementById('popular-tokens');
  const allContainer = document.getElementById('all-tokens');
  
  if (!popularContainer || !allContainer) return;
  
  // Define popular tokens
  const popularSymbols = ['btc', 'eth', 'bnb', 'sol'];
  
  // Sort tokens with popular tokens first
  const sortedTokens = [...walletData.tokens].sort((a, b) => {
    const aIsPopular = popularSymbols.includes(a.id.toLowerCase());
    const bIsPopular = popularSymbols.includes(b.id.toLowerCase());
    
    if (aIsPopular && !bIsPopular) return -1;
    if (!aIsPopular && bIsPopular) return 1;
    
    // Secondary sort by value
    return b.value - a.value;
  });
  
  // Create token items
  sortedTokens.forEach(token => {
    const isPopular = popularSymbols.includes(token.id.toLowerCase());
    const container = isPopular ? popularContainer : allContainer;
    
    const tokenItem = document.createElement('div');
    tokenItem.className = 'token-item';
    tokenItem.setAttribute('data-token-id', token.id);
    
    tokenItem.innerHTML = `
      <div class="token-icon">
        <img src="${getTokenLogoUrl(token.id)}" alt="${token.name}">
      </div>
      <div class="token-info">
        <div class="token-name">${token.symbol}</div>
        <div class="token-network-badge">${token.network}</div>
      </div>
      <div class="token-amount">
        <div class="token-balance">${formatTokenAmount(token.amount)} ${token.symbol}</div>
        <div class="token-value">${formatCurrency(token.value)}</div>
      </div>
    `;
    
    // Add click handler
    tokenItem.addEventListener('click', function() {
      window.activeSendTokenId = token.id;
      window.navigateTo('send-screen', 'send-token-select');
    });
    
    container.appendChild(tokenItem);
  });
}

function applySendTokenSelectStyles(container, popularSection, allCryptoSection) {
  // Style section headers
  const sectionHeaders = container.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    header.style.fontSize = '14px';
    header.style.fontWeight = '600';
    header.style.color = '#1A2024';
    header.style.padding = '16px 16px 8px';
  });
  
  // Style token sections
  const tokenSections = container.querySelectorAll('.token-list-section');
  tokenSections.forEach(section => {
    section.style.marginBottom = '16px';
  });
  
  // Adjust token items styling
  setTimeout(() => {
    const tokenItems = container.querySelectorAll('.token-item');
    tokenItems.forEach(item => {
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.padding = '12px 16px';
      item.style.borderBottom = '1px solid #F5F5F5';
      
      const tokenIcon = item.querySelector('.token-icon');
      if (tokenIcon) {
        tokenIcon.style.width = '36px';
        tokenIcon.style.height = '36px';
        tokenIcon.style.marginRight = '16px';
        tokenIcon.style.flexShrink = '0';
      }
      
      const tokenInfo = item.querySelector('.token-info');
      if (tokenInfo) {
        tokenInfo.style.flex = '1';
      }
      
      const tokenNameEl = item.querySelector('.token-name');
      if (tokenNameEl) {
        tokenNameEl.style.fontWeight = '600';
        tokenNameEl.style.fontSize = '14px';
        tokenNameEl.style.marginBottom = '4px';
      }
      
      const tokenNetworkBadge = item.querySelector('.token-network-badge');
      if (tokenNetworkBadge) {
        tokenNetworkBadge.style.fontSize = '12px';
        tokenNetworkBadge.style.color = '#8A939D';
      }
      
      const tokenAmount = item.querySelector('.token-amount');
      if (tokenAmount) {
        tokenAmount.style.textAlign = 'right';
      }
      
      const tokenBalance = item.querySelector('.token-balance');
      if (tokenBalance) {
        tokenBalance.style.fontWeight = '600';
        tokenBalance.style.fontSize = '14px';
        tokenBalance.style.marginBottom = '4px';
      }
      
      const tokenValue = item.querySelector('.token-value');
      if (tokenValue) {
        tokenValue.style.fontSize = '12px';
        tokenValue.style.color = '#8A939D';
      }
    });
  }, 0);
}

function fixSendForm() {
  const sendScreen = document.getElementById('send-screen');
  if (!sendScreen || sendScreen.classList.contains('send-form-fixed')) return;
  
  // Get token ID
  const tokenId = window.activeSendTokenId || 'usdt';
  
  // Get token data
  const activeWallet = window.activeWallet || 'main';
  const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
  
  if (!token) return;
  
  // Add token selection display
  const sendContent = sendScreen.querySelector('.send-content');
  if (!sendContent) return;
  
  // Create token selection
  const tokenSelectionRow = document.createElement('div');
  tokenSelectionRow.className = 'token-selection-row';
  tokenSelectionRow.innerHTML = `
    <div class="token-icon">
      <img src="${getTokenLogoUrl(token.id)}" alt="${token.name}">
    </div>
    <div class="token-info-column">
      <div class="token-name-row">
        <span class="selected-token-name">${token.symbol}</span>
        <span class="token-network-badge">${token.network}</span>
      </div>
      <div class="token-fullname">${token.name}</div>
    </div>
    <div class="token-change-button">
      <i class="fas fa-chevron-right"></i>
    </div>
  `;
  
  // Insert at the beginning of send content
  sendContent.insertBefore(tokenSelectionRow, sendContent.firstChild);
  
  // Style the token selection
  applySendFormStyles(sendScreen, tokenSelectionRow);
  
  // Add click handler to change token
  tokenSelectionRow.addEventListener('click', function() {
    window.navigateTo('send-token-select', 'send-screen');
  });
  
  // Mark as fixed
  sendScreen.classList.add('send-form-fixed');
}

function applySendFormStyles(sendScreen, tokenSelectionRow) {
  // Style token selection row
  tokenSelectionRow.style.display = 'grid';
  tokenSelectionRow.style.gridTemplateColumns = '36px 1fr auto';
  tokenSelectionRow.style.alignItems = 'center';
  tokenSelectionRow.style.gap = '16px';
  tokenSelectionRow.style.padding = '12px 16px';
  tokenSelectionRow.style.backgroundColor = '#F5F5F5';
  tokenSelectionRow.style.borderRadius = '8px';
  tokenSelectionRow.style.marginBottom = '16px';
  tokenSelectionRow.style.cursor = 'pointer';
  
  const tokenIcon = tokenSelectionRow.querySelector('.token-icon');
  if (tokenIcon) {
    tokenIcon.style.width = '36px';
    tokenIcon.style.height = '36px';
    tokenIcon.style.borderRadius = '50%';
    tokenIcon.style.overflow = 'hidden';
  }
  
  const tokenInfoColumn = tokenSelectionRow.querySelector('.token-info-column');
  if (tokenInfoColumn) {
    tokenInfoColumn.style.overflow = 'hidden';
  }
  
  const tokenNameRow = tokenSelectionRow.querySelector('.token-name-row');
  if (tokenNameRow) {
    tokenNameRow.style.display = 'flex';
    tokenNameRow.style.alignItems = 'center';
    tokenNameRow.style.gap = '8px';
  }
  
  const selectedTokenName = tokenSelectionRow.querySelector('.selected-token-name');
  if (selectedTokenName) {
    selectedTokenName.style.fontWeight = '600';
    selectedTokenName.style.fontSize = '16px';
  }
  
  const tokenNetworkBadge = tokenSelectionRow.querySelector('.token-network-badge');
  if (tokenNetworkBadge) {
    tokenNetworkBadge.style.fontSize = '12px';
    tokenNetworkBadge.style.color = '#8A939D';
    tokenNetworkBadge.style.padding = '2px 6px';
    tokenNetworkBadge.style.backgroundColor = 'rgba(138, 147, 157, 0.1)';
    tokenNetworkBadge.style.borderRadius = '10px';
  }
  
  const tokenFullname = tokenSelectionRow.querySelector('.token-fullname');
  if (tokenFullname) {
    tokenFullname.style.fontSize = '12px';
    tokenFullname.style.color = '#8A939D';
    tokenFullname.style.whiteSpace = 'nowrap';
    tokenFullname.style.overflow = 'hidden';
    tokenFullname.style.textOverflow = 'ellipsis';
  }
  
  const tokenChangeButton = tokenSelectionRow.querySelector('.token-change-button');
  if (tokenChangeButton) {
    tokenChangeButton.style.color = '#8A939D';
  }
  
  // Fix form groups
  const formGroups = sendScreen.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    group.style.marginBottom = '16px';
  });
  
  // Fix labels
  const labels = sendScreen.querySelectorAll('label');
  labels.forEach(label => {
    label.style.display = 'block';
    label.style.marginBottom = '8px';
    label.style.fontSize = '14px';
    label.style.fontWeight = '500';
  });
  
  // Fix inputs
  const inputs = sendScreen.querySelectorAll('input');
  inputs.forEach(input => {
    input.style.width = '100%';
    input.style.padding = '12px';
    input.style.border = '1px solid #E0E0E0';
    input.style.borderRadius = '8px';
    input.style.fontSize = '14px';
  });
  
  // Fix buttons
  const buttons = sendScreen.querySelectorAll('button:not(.back-button):not(.token-change-button)');
  buttons.forEach(button => {
    if (button.id === 'continue-send') {
      button.style.width = '100%';
      button.style.padding = '14px';
      button.style.backgroundColor = '#3375BB';
      button.style.color = 'white';
      button.style.borderRadius = '8px';
      button.style.fontSize = '16px';
      button.style.fontWeight = '600';
      button.style.marginTop = '16px';
    } else {
      button.style.padding = '8px 12px';
      button.style.borderRadius = '4px';
      button.style.fontSize = '12px';
    }
  });
  
  // Fix available balance
  const availableBalance = sendScreen.querySelector('#available-balance');
  if (availableBalance) {
    availableBalance.style.fontSize = '12px';
    availableBalance.style.color = '#8A939D';
    availableBalance.style.marginTop = '8px';
  }
}

// =================================================================
// DYNAMIC CONTENT OBSERVER
// =================================================================

function setupDynamicContentObserver() {
  // Set up a mutation observer to watch for dynamic content changes
  const observer = new MutationObserver(function(mutations) {
    let needsUpdate = false;
    
    mutations.forEach(function(mutation) {
      // Check for added nodes that may indicate screen changes
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // ELEMENT_NODE
            // If a screen becomes visible
            if (node.classList && (
                node.classList.contains('screen') ||
                node.id === 'receive-screen' ||
                node.id === 'send-screen' ||
                node.id === 'token-detail' ||
                node.id === 'send-token-select'
              ) && !node.classList.contains('hidden')) {
              needsUpdate = true;
            }
            
            // If display style changes
            if (mutation.attributeName === 'style' && 
                node.style.display !== 'none' &&
                node.classList && node.classList.contains('screen')) {
              needsUpdate = true;
            }
          }
        });
      }
      
      // Check for attribute changes that may indicate screen visibility changes
      if (mutation.type === 'attributes') {
        const target = mutation.target;
        if (target.nodeType === 1 && // ELEMENT_NODE
            target.classList && target.classList.contains('screen') &&
            mutation.attributeName === 'class' &&
            !target.classList.contains('hidden')) {
          needsUpdate = true;
        }
        
        if (target.nodeType === 1 && // ELEMENT_NODE
            mutation.attributeName === 'style' &&
            target.style.display !== 'none' &&
            target.classList && target.classList.contains('screen')) {
          needsUpdate = true;
        }
      }
    });
    
    if (needsUpdate) {
      // Apply all fixes with a small delay to let other scripts finish
      setTimeout(function() {
        fixStatusBarPadding();
        fixNetworkFilters();
        fixReceivePage();
        fixSendPage();
        fixTokenDetailPage();
      }, 100);
    }
  });
  
  // Observe all changes to the app container
  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    observer.observe(appContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }
}

// =================================================================
// AUTO-INITIALIZATION ON SCRIPT LOAD
// =================================================================

// Execute fixes when script is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initFixes, 300);
} else {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initFixes, 300);
  });
}

// Also add a dedicated token detail fix that runs after a short delay
setTimeout(function() {
  const tokenDetail = document.getElementById('token-detail');
  if (tokenDetail) {
    fixTokenDetailPage();
  }
}, 1000);

// Export public API
window.TrustWalletFixes = {
  init: initFixes,
  applyAllFixes: function() {
    fixStatusBarPadding();
    fixNetworkFilters();
    fixReceivePage();
    fixSendPage();
    fixTokenDetailPage();
  },
  // Add specific fixers for direct access
  fixTokenDetail: fixTokenDetailPage
};

// Add event listener for navigation events
document.addEventListener('click', function(e) {
  const tokenItem = e.target.closest('.token-item');
  if (tokenItem) {
    // When clicking a token, wait a bit then fix the token detail page
    setTimeout(fixTokenDetailPage, 300);
  }
});

// ================================================================= 
// NEW UI FIXES - Add to bottom of existing fix.js file
// =================================================================

// Center header titles in send, receive, and transaction history screens
function centerHeaderTitles() {
  console.log('Centering header titles');
  
  // Force replace any existing styles to avoid conflicts
  const style = document.createElement('style');
  style.id = 'header-title-fix';
  style.textContent = `
    .screen-header h2 {
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      text-align: center !important;
      width: auto !important;
      margin: 0 auto !important;
      z-index: 1 !important;
      pointer-events: none !important;
    }
    
    .screen-header .back-button {
      position: relative !important;
      z-index: 2 !important;
    }
    
    .screen-header .icon-button {
      position: relative !important;
      z-index: 2 !important;
    }
  `;
  
  // Remove existing style element if it exists
  const existingStyle = document.getElementById('header-title-fix');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  document.head.appendChild(style);
}

// Fix header icons alignment (make them side by side instead of stacked)
function fixHeaderIconsAlignment() {
  console.log('Fixing header icons alignment');
  
  // Fix alignment in token detail page header
  const tokenDetailHeader = document.querySelector('#token-detail .detail-header');
  if (tokenDetailHeader) {
    tokenDetailHeader.style.display = 'flex';
    tokenDetailHeader.style.flexDirection = 'row';
    tokenDetailHeader.style.alignItems = 'center';
    tokenDetailHeader.style.justifyContent = 'space-between';
    
    // Adjust the token detail title
    const titleElement = tokenDetailHeader.querySelector('.token-detail-title');
    if (titleElement) {
      titleElement.style.position = 'absolute';
      titleElement.style.left = '0';
      titleElement.style.right = '0';
      titleElement.style.textAlign = 'center';
    }
    
    // Make header icons display horizontally
    const headerIcons = tokenDetailHeader.querySelector('.header-icons');
    if (headerIcons) {
      headerIcons.style.display = 'flex';
      headerIcons.style.flexDirection = 'row';
      headerIcons.style.alignItems = 'center';
      headerIcons.style.gap = '8px';
      headerIcons.style.position = 'relative';
      headerIcons.style.zIndex = '2';
    }
  }
}

// Add commas to balance amounts
function addCommasToBalances() {
  console.log('Adding commas to balance amounts');
  
  // Format main balance
  const totalBalance = document.getElementById('total-balance');
  if (totalBalance) {
    const currentText = totalBalance.textContent;
    const match = currentText.match(/\$([\d.]+)/);
    
    if (match) {
      const amount = parseFloat(match[1]);
      totalBalance.textContent = '$' + amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
  
  // Format token balances
  const tokenBalances = document.querySelectorAll('.token-balance');
  tokenBalances.forEach(balance => {
    const currentText = balance.textContent;
    const match = currentText.match(/([\d.]+)\s+([A-Z]+)/i);
    
    if (match) {
      const amount = parseFloat(match[1]);
      const symbol = match[2];
      
      balance.textContent = amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      }) + ' ' + symbol;
    }
  });
  
  // Format token values
  const tokenValues = document.querySelectorAll('.token-value');
  tokenValues.forEach(value => {
    const currentText = value.textContent;
    const match = currentText.match(/\$([\d.]+)/);
    
    if (match) {
      const amount = parseFloat(match[1]);
      value.textContent = '$' + amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  });
}

// Enhance network badges across all screens
function enhanceNetworkBadges() {
  console.log('Enhancing network badges');
  
  // Define which tokens should have network badges
  const networkMapping = {
    'usdt': 'https://cryptologos.cc/logos/tron-trx-logo.png',
    'twt': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
  };
  
  // Add badges to all token items in all screens
  const tokenItems = document.querySelectorAll('.token-item');
  tokenItems.forEach(item => {
    const tokenId = item.getAttribute('data-token-id');
    if (!tokenId || !networkMapping[tokenId]) return;
    
    const tokenIcon = item.querySelector('.token-icon');
    if (!tokenIcon) return;
    
    // Only add badge if it doesn't already exist
    let badge = tokenIcon.querySelector('.chain-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.className = 'chain-badge';
      
      const badgeImg = document.createElement('img');
      badgeImg.src = networkMapping[tokenId];
      badgeImg.alt = tokenId.toUpperCase() + ' Network';
      
      badge.appendChild(badgeImg);
      tokenIcon.appendChild(badge);
    }
    
    // Ensure badge is visible with forced styling
    badge.style.cssText = `
      display: block !important;
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
    `;
    
    // Make sure image fills the badge
    const badgeImg = badge.querySelector('img');
    if (badgeImg) {
      badgeImg.style.cssText = `
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
      `;
    }
  });
  
  // Add TWT to token list if missing
  const activeWallet = window.activeWallet || 'main';
  const wallet = window.currentWalletData && window.currentWalletData[activeWallet];
  
  if (wallet && wallet.tokens) {
    // Check if TWT exists
    const hasTWT = wallet.tokens.some(t => t.id === 'twt');
    
    if (!hasTWT) {
      // Add TWT token
      wallet.tokens.push({
        id: 'twt',
        name: 'Trust Wallet Token',
        symbol: 'TWT',
        network: 'BNB Smart Chain',
        icon: 'https://i.ibb.co/NdQ4xthx/Screenshot-2025-03-25-031716.png',
        amount: 250,
        value: 750.25,
        price: 3.00,
        change: 0.50,
        chainBadge: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
      });
      
      // Repopulate token list
      if (typeof window.populateMainWalletTokenList === 'function') {
        window.populateMainWalletTokenList();
      }
    }
  }
  
  // Add badges in token detail view (for icon at the top)
  const tokenDetailIcon = document.querySelector('.token-detail-icon-container img');
  const tokenDetailScreen = document.getElementById('token-detail');
  
  if (tokenDetailIcon && tokenDetailScreen) {
    const tokenSymbol = document.getElementById('detail-symbol');
    if (tokenSymbol) {
      const tokenId = tokenSymbol.textContent.toLowerCase();
      
      if (networkMapping[tokenId]) {
        // Find existing badge or create new one
        let detailBadge = document.querySelector('.token-detail-icon-container .chain-badge');
        
        if (!detailBadge) {
          detailBadge = document.createElement('div');
          detailBadge.className = 'chain-badge';
          
          const badgeImg = document.createElement('img');
          badgeImg.src = networkMapping[tokenId];
          badgeImg.alt = tokenId.toUpperCase() + ' Network';
          
          detailBadge.appendChild(badgeImg);
          tokenDetailIcon.parentElement.appendChild(detailBadge);
        }
        
        // Ensure it's visible and styled correctly
        detailBadge.style.cssText = `
          display: block !important;
          position: absolute !important;
          bottom: -6px !important;
          right: -6px !important;
          width: 24px !important;
          height: 24px !important;
          border-radius: 50% !important;
          background-color: white !important;
          border: 2px solid white !important;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
          z-index: 5 !important;
          overflow: visible !important;
        `;
        
        // Make sure image fills the badge
        const badgeImg = detailBadge.querySelector('img');
        if (badgeImg) {
          badgeImg.style.cssText = `
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
          `;
        }
      }
    }
  }
  
  // Remove any badge that might have been accidentally added to ETH
  document.querySelectorAll('.token-item[data-token-id="eth"] .chain-badge').forEach(badge => {
    badge.style.display = 'none';
  });
}

// Special function to fix token detail staking section
function fixTokenDetailStaking() {
  console.log('Fixing token detail staking section');
  
  // Find or create staking banner
  const tokenDetailPage = document.getElementById('token-detail');
  if (!tokenDetailPage) return;
  
  let stakingBanner = tokenDetailPage.querySelector('.staking-container');
  
  // Get token symbol
  const tokenSymbol = document.getElementById('detail-symbol')?.textContent || 'BTC';
  
  // Update or create staking banner
  if (stakingBanner) {
    // Update existing banner
    const stakingTitle = stakingBanner.querySelector('.staking-content h3');
    if (stakingTitle) {
      stakingTitle.textContent = 'Earn ' + tokenSymbol;
    }
    
    const stakingDesc = stakingBanner.querySelector('.staking-content p');
    if (stakingDesc) {
      stakingDesc.textContent = 'Stake your ' + tokenSymbol + ' to earn up to 6.5% APY';
    }
  } else {
    // Create new banner
    stakingBanner = document.createElement('div');
    stakingBanner.className = 'staking-container';
    
    // Create content with correct token symbol
    stakingBanner.innerHTML = `
      <div class="staking-icon">
        <img src="https://i.ibb.co/G" alt="Staking">
      </div>
      <div class="staking-content">
        <h3>Earn ${tokenSymbol}</h3>
        <p>Stake your ${tokenSymbol} to earn up to 6.5% APY</p>
      </div>
      <i class="fas fa-chevron-right staking-arrow"></i>
    `;
    
    // Insert after actions section or investment warning
    const actionsSection = tokenDetailPage.querySelector('.token-detail-actions');
    const investmentWarning = tokenDetailPage.querySelector('.investment-warning');
    
    if (actionsSection) {
      actionsSection.insertAdjacentElement('afterend', stakingBanner);
    } else if (investmentWarning) {
      investmentWarning.insertAdjacentElement('afterend', stakingBanner);
    } else {
      const detailContent = tokenDetailPage.querySelector('.token-detail-content');
      if (detailContent) {
        detailContent.appendChild(stakingBanner);
      }
    }
    
    // Add click handler
    stakingBanner.addEventListener('click', function() {
      showToast(`${tokenSymbol} staking coming soon`);
    });
  }
}

// Function to remove padding in token detail
function fixTokenDetailPadding() {
  console.log('Fixing token detail padding');
  
  // Remove excess padding in token display
  const tokenDetailContent = document.querySelector('.token-detail-content');
  if (tokenDetailContent) {
    tokenDetailContent.style.padding = '0';
  }
  
  const tokenDetailIconContainer = document.querySelector('.token-detail-icon-container');
  if (tokenDetailIconContainer) {
    tokenDetailIconContainer.style.margin = '12px 0';
  }
}

// Function to continuously update UI fixes
function setupObserverForDynamicChanges() {
  console.log('Setting up observer for dynamic UI changes');
  
  // Create a MutationObserver to watch for screen changes
  const observer = new MutationObserver(function(mutations) {
    let needsUIRefresh = false;
    
    mutations.forEach(function(mutation) {
      // If a screen's display style changes
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'style' &&
          mutation.target.classList.contains('screen') && 
          mutation.target.style.display !== 'none') {
        needsUIRefresh = true;
      }
      
      // If new elements are added to the DOM
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        needsUIRefresh = true;
      }
    });
    
    if (needsUIRefresh) {
      // Apply fixes again when UI changes
      setTimeout(function() {
        centerHeaderTitles();
        fixHeaderIconsAlignment();
        addCommasToBalances();
        enhanceNetworkBadges();
        fixTokenDetailStaking();
        fixTokenDetailPadding();
      }, 100);
    }
  });
  
  // Observe changes to the app container
  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    observer.observe(appContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
}

// Update the existing fixTokenDetailPage function to include our new fixes
const originalFixTokenDetailPage = fixTokenDetailPage;
fixTokenDetailPage = function() {
  // Call original function first
  originalFixTokenDetailPage();
  
  // Then apply our additional fixes
  fixTokenDetailPadding();
  fixTokenDetailStaking();
};

// Add event listener for token detail page viewing
document.addEventListener('click', function(e) {
  // Check if a token item was clicked (which would load the token detail page)
  const tokenItem = e.target.closest('.token-item');
  if (tokenItem) {
    // Apply fixes with a small delay to ensure the token detail page is loaded
    setTimeout(function() {
      fixTokenDetailPage();
      fixHeaderIconsAlignment();
    }, 200);
  }
});

// Execute new fixes when script is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(function() {
    centerHeaderTitles();
    fixHeaderIconsAlignment();
    addCommasToBalances();
    enhanceNetworkBadges();
    setupObserverForDynamicChanges();
  }, 500);
} else {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      centerHeaderTitles();
      fixHeaderIconsAlignment();
      addCommasToBalances();
      enhanceNetworkBadges();
      setupObserverForDynamicChanges();
    }, 500);
  });
}

// Add these updated fixes to your fix.js file

// Fix scrolling on all screens that need it
function fixScrollingOnAllScreens() {
  console.log('Fixing scrolling on all screens');
  
  // List of screens that should have scrolling enabled
  const scrollableScreens = [
    'send-screen',
    'receive-screen',
    'history-screen',
    'send-token-select',
    'token-detail'
  ];
  
  scrollableScreens.forEach(screenId => {
    const screen = document.getElementById(screenId);
    if (!screen) return;
    
    // Enable scrolling
    screen.style.overflowY = 'auto';
    screen.style.overflowX = 'hidden';
    
    // Find content container in the screen
    const contentElement = screen.querySelector('.send-content, .receive-content, .screen-content, .token-detail-content, .token-list');
    if (contentElement) {
      // Ensure proper padding at the bottom for scrolling
      contentElement.style.paddingBottom = '80px';
    }
  });
  
  // Special handling for token list to ensure smooth scrolling
  const tokenLists = document.querySelectorAll('.token-list');
  tokenLists.forEach(list => {
    list.style.overflowY = 'auto';
    list.style.overflowX = 'hidden';
    list.style.webkitOverflowScrolling = 'touch'; // For smooth scrolling on iOS
  });
}

// Set token icons to official Trust Wallet size (40px based on research)
function setOfficialTokenIconSizes() {
  console.log('Setting token icons to official size');
  
  // Set proper icon size across all screens
  const allTokenIcons = document.querySelectorAll('.token-icon');
  allTokenIcons.forEach(icon => {
    icon.style.width = '40px';
    icon.style.height = '40px';
    icon.style.minWidth = '40px'; // Prevent shrinking
    icon.style.position = 'relative'; // For badge positioning
    
    // Increase image size within
    const img = icon.querySelector('img');
    if (img) {
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
    }
    
    // Adjust badge positioning for proper icon
    const badge = icon.querySelector('.chain-badge');
    if (badge) {
      badge.style.bottom = '-4px';
      badge.style.right = '-4px';
      badge.style.width = '18px';
      badge.style.height = '18px';
    }
  });
  
  // Special handling for token detail page icon (larger)
  const detailIcon = document.querySelector('.token-detail-large-icon');
  if (detailIcon) {
    detailIcon.style.width = '48px';
    detailIcon.style.height = '48px';
  }
}

// Simplify receive screen with direct copy functionality
function simplifyReceiveScreen() {
  console.log('Simplifying receive screen');
  
  const receiveScreen = document.getElementById('receive-screen');
  if (!receiveScreen) return;
  
  // Only handle the token list view (not QR code view)
  const tokenList = receiveScreen.querySelector('#receive-token-list');
  if (!tokenList) return;
  
  // Find all token items
  const tokenItems = tokenList.querySelectorAll('.token-item');
  
  tokenItems.forEach(item => {
    // Find or create action container
    let actionContainer = item.querySelector('.receive-actions');
    if (!actionContainer) {
      actionContainer = document.createElement('div');
      actionContainer.className = 'receive-actions';
      item.appendChild(actionContainer);
    }
    
    // Clear any existing actions
    actionContainer.innerHTML = '';
    
    // Get token data
    const tokenId = item.getAttribute('data-token-id') || '';
    const tokenSymbol = item.querySelector('.token-name')?.textContent || '';
    
    // Generate address (this would normally come from the wallet)
    const walletAddress = '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71';
    
    // Add copy and QR buttons
    actionContainer.innerHTML = `
      <button class="action-button copy-button" data-address="${walletAddress}" title="Copy ${tokenSymbol} address">
        <i class="fas fa-copy"></i>
      </button>
      <button class="action-button qr-button" title="Show QR code (disabled)">
        <i class="fas fa-qrcode"></i>
      </button>
    `;
    
    // Style the action container
    actionContainer.style.display = 'flex';
    actionContainer.style.gap = '12px';
    actionContainer.style.marginLeft = 'auto';
    
    // Style the buttons
    const buttons = actionContainer.querySelectorAll('.action-button');
    buttons.forEach(button => {
      button.style.width = '36px';
      button.style.height = '36px';
      button.style.borderRadius = '50%';
      button.style.backgroundColor = '#F5F5F5';
      button.style.display = 'flex';
      button.style.justifyContent = 'center';
      button.style.alignItems = 'center';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      
      const icon = button.querySelector('i');
      if (icon) {
        icon.style.color = '#8A939D';
        icon.style.fontSize = '16px';
      }
    });
    
    // Add copy functionality to copy button
    const copyButton = actionContainer.querySelector('.copy-button');
    if (copyButton) {
      copyButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent token item click
        
        const address = this.getAttribute('data-address');
        if (!address) return;
        
        // Try to copy to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(address)
            .then(() => {
              showToast(`${tokenSymbol} address copied to clipboard`);
            })
            .catch(err => {
              console.error('Failed to copy address:', err);
              // Fallback
              copyToClipboardFallback(address);
              showToast(`${tokenSymbol} address copied to clipboard`);
            });
        } else {
          // Fallback method
          copyToClipboardFallback(address);
          showToast(`${tokenSymbol} address copied to clipboard`);
        }
      });
    }
    
    // QR button is for display only (as requested)
    const qrButton = actionContainer.querySelector('.qr-button');
    if (qrButton) {
      qrButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent token item click
        
        // Do nothing, as requested
        // Could show a toast notifying the user
        showToast('QR code display is disabled');
      });
    }
  });
  
  // Make sure the screen header has proper heading
  const screenHeader = receiveScreen.querySelector('.screen-header h2');
  if (screenHeader) {
    screenHeader.textContent = 'Receive';
  }
}

// Fallback copy to clipboard function
function copyToClipboardFallback(text) {
  // Create temporary input
  const input = document.createElement('input');
  input.value = text;
  input.style.position = 'absolute';
  input.style.left = '-9999px';
  document.body.appendChild(input);
  
  // Select and copy
  input.select();
  document.execCommand('copy');
  
  // Clean up
  document.body.removeChild(input);
}

// Fix visibility toggle for token values
function fixVisibilityToggle() {
  console.log('Fixing visibility toggle for token values');
  
  // Fix or replace the visibility toggle click handler
  const visibilityToggle = document.querySelector('.visibility-toggle');
  
  if (visibilityToggle) {
    // Remove any existing click handlers
    const newToggle = visibilityToggle.cloneNode(true);
    if (visibilityToggle.parentNode) {
      visibilityToggle.parentNode.replaceChild(newToggle, visibilityToggle);
    }
    
    // Add new handler
    newToggle.addEventListener('click', function() {
      const icon = this.querySelector('i');
      const balanceAmount = document.getElementById('total-balance');
      
      if (!icon) return;
      
      const isHidden = icon.classList.contains('fa-eye-slash');
      
      if (isHidden) {
        // Show balances
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        
        // Restore main balance from cached value
        if (window.cachedBalance && balanceAmount) {
          balanceAmount.textContent = window.cachedBalance;
        }
        
        // Restore token balances from data attributes
        document.querySelectorAll('.token-balance').forEach(tokenBalance => {
          const originalAmount = tokenBalance.getAttribute('data-original-amount');
          if (originalAmount) {
            tokenBalance.textContent = originalAmount;
          }
        });
        
        // Restore token values from data attributes
        document.querySelectorAll('.token-value').forEach(tokenValue => {
          const originalValue = tokenValue.getAttribute('data-original-value');
          if (originalValue) {
            tokenValue.textContent = originalValue;
          }
        });
      } else {
        // Hide balances
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        
        // Cache and hide main balance
        if (balanceAmount) {
          window.cachedBalance = balanceAmount.textContent;
          balanceAmount.textContent = '••••••';
        }
        
        // Cache and hide token balances
        document.querySelectorAll('.token-balance').forEach(tokenBalance => {
          tokenBalance.setAttribute('data-original-amount', tokenBalance.textContent);
          tokenBalance.textContent = '••••••';
        });
        
        // Cache and hide token values
        document.querySelectorAll('.token-value').forEach(tokenValue => {
          tokenValue.setAttribute('data-original-value', tokenValue.textContent);
          tokenValue.textContent = '••••••';
        });
      }
    });
  }
}

// Verify back buttons functionality
function fixBackButtons() {
  console.log('Fixing back buttons');
  
  const backButtons = document.querySelectorAll('.back-button');
  
  backButtons.forEach(button => {
    // Check if this button already has a click handler
    const hasClickHandler = button.onclick || button._hasClickHandler;
    
    if (!hasClickHandler) {
      // Remove any existing listeners by cloning
      const newButton = button.cloneNode(true);
      if (button.parentNode) {
        button.parentNode.replaceChild(newButton, button);
      }
      
      // Add new click handler
      newButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the current screen
        const currentScreen = this.closest('.screen');
        if (!currentScreen) return;
        
        // Determine return screen
        let returnTo = currentScreen.dataset.returnTo || 'wallet-screen';
        
        // Special handling for specific screens
        if (currentScreen.id === 'token-detail') {
          returnTo = 'wallet-screen';
        } else if (currentScreen.id === 'send-token-select') {
          returnTo = 'wallet-screen';
        } else if (currentScreen.id === 'send-screen') {
          returnTo = 'wallet-screen';
        } else if (currentScreen.id === 'receive-screen') {
          returnTo = 'wallet-screen';
        }
        
        // Navigate to return screen
        if (typeof window.navigateTo === 'function') {
          window.navigateTo(returnTo);
        } else {
          // Fallback navigation
          document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
            screen.classList.add('hidden');
          });
          
          const targetScreen = document.getElementById(returnTo);
          if (targetScreen) {
            targetScreen.style.display = 'flex';
            targetScreen.classList.remove('hidden');
          }
        }
      });
      
      // Mark as having a click handler
      newButton._hasClickHandler = true;
    }
  });
}

// Show toast utility (if not already defined)
function showToast(message, duration = 2000) {
  // Use existing showToast if available
  if (typeof window.showToast === 'function') {
    return window.showToast(message, duration);
  }
  
  // Fallback implementation
  const existingToast = document.querySelector('.tw-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'tw-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '80px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.fontSize = '14px';
  toast.style.zIndex = '10000';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s';
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // Hide and remove after duration
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// Call all new fixes
function applyUpdatedFixes() {
  fixScrollingOnAllScreens();
  setOfficialTokenIconSizes();
  simplifyReceiveScreen();
  fixVisibilityToggle();
  fixBackButtons();
}

// Add function call to the main initFixes
// Add to the initFixes() function: applyUpdatedFixes();

// Also ensure our fixes get reapplied on screen changes
function setupUpdatedObserver() {
  // Create an observer to watch for screen changes
  const observer = new MutationObserver(function(mutations) {
    let needsUIRefresh = false;
    let receiveScreenChanged = false;
    
    mutations.forEach(function(mutation) {
      // Check if a screen becomes visible
      if (mutation.target.classList && 
          mutation.target.classList.contains('screen') && 
          !mutation.target.classList.contains('hidden')) {
        needsUIRefresh = true;
      }
      
      // Check specifically for receive screen changes
      if (mutation.target.id === 'receive-screen' || 
          mutation.target.closest('#receive-screen')) {
        receiveScreenChanged = true;
      }
    });
    
    if (needsUIRefresh) {
      setTimeout(function() {
        fixScrollingOnAllScreens();
        setOfficialTokenIconSizes();
        fixVisibilityToggle();
        fixBackButtons();
      }, 100);
    }
    
    if (receiveScreenChanged) {
      setTimeout(function() {
        simplifyReceiveScreen();
      }, 100);
    }
  });
  
  // Observe the entire app container
  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    observer.observe(appContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'display']
    });
  }
}

// Apply our fixes on page load
setTimeout(function() {
  applyUpdatedFixes();
  setupUpdatedObserver();
}, 800);

// Add network badges to token names in send/receive screens
function addNetworkBadgesToTokens() {
  console.log('Adding network badges to tokens in send/receive screens');
  
  // Define network mappings
  const networkNames = {
    'btc': 'Bitcoin',
    'eth': 'Ethereum',
    'bnb': 'BNB Chain',
    'usdt': 'BNB Chain',
    'trx': 'Tron',
    'sol': 'Solana',
    'pol': 'Polygon',
    'matic': 'Polygon',
    'xrp': 'XRP Ledger',
    'twt': 'BNB Chain'
  };
  
  // Process token items in send screen
  const sendTokenItems = document.querySelectorAll('#send-token-select .token-item');
  sendTokenItems.forEach(item => {
    processTokenItem(item);
  });
  
  // Process token items in receive screen
  const receiveTokenItems = document.querySelectorAll('#receive-token-list .token-item');
  receiveTokenItems.forEach(item => {
    processTokenItem(item);
  });
  
  // Function to process each token item
  function processTokenItem(item) {
    const tokenId = item.getAttribute('data-token-id');
    if (!tokenId) return;
    
    const tokenInfo = item.querySelector('.token-info');
    if (!tokenInfo) return;
    
    const tokenName = tokenInfo.querySelector('.token-name');
    if (!tokenName) return;
    
    // Check if badge already exists
    const existingBadge = tokenInfo.querySelector('.network-badge-pill');
    if (existingBadge) return;
    
    // Get network name
    const networkName = networkNames[tokenId.toLowerCase()] || 'Unknown';
    
    // Create network badge
    const networkBadge = document.createElement('div');
    networkBadge.className = 'network-badge-pill';
    networkBadge.textContent = networkName;
    
    // Insert badge after token name
    const nameRow = document.createElement('div');
    nameRow.className = 'token-name-row';
    
    // Clone token name to preserve styling
    const newTokenName = document.createElement('div');
    newTokenName.className = 'token-name';
    newTokenName.textContent = tokenName.textContent;
    
    // Replace token info content
    tokenInfo.innerHTML = '';
    nameRow.appendChild(newTokenName);
    nameRow.appendChild(networkBadge);
    tokenInfo.appendChild(nameRow);
    
    // Add styles to badge
    networkBadge.style.display = 'inline-block';
    networkBadge.style.fontSize = '12px';
    networkBadge.style.color = '#5F6C75';
    networkBadge.style.backgroundColor = '#F5F5F5';
    networkBadge.style.padding = '2px 8px';
    networkBadge.style.borderRadius = '10px';
    networkBadge.style.marginLeft = '8px';
    networkBadge.style.fontWeight = '400';
    
    // Style the name row
    nameRow.style.display = 'flex';
    nameRow.style.alignItems = 'center';
    nameRow.style.width = '100%';
    
    // Keep the token price if exists
    const tokenPrice = item.querySelector('.token-price') || 
                       item.querySelector('.token-network-badge') ||
                       item.querySelector('.token-fullname');
    
    if (tokenPrice && tokenPrice.parentNode === item) {
      const priceClone = tokenPrice.cloneNode(true);
      tokenInfo.appendChild(priceClone);
    }
  }
}

// Observer to detect when send/receive screens become visible
function setupNetworkBadgeObserver() {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'style') {
        
        const element = mutation.target;
        
        // Check if it's a screen being shown
        if (element.id === 'send-token-select' || 
            element.id === 'receive-screen') {
          
          if (element.style.display !== 'none') {
            // Screen is being shown, add badges after a short delay
            setTimeout(addNetworkBadgesToTokens, 100);
          }
        }
      }
    });
  });
  
  // Observe the app container
  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    observer.observe(appContainer, {
      attributes: true,
      subtree: true,
      attributeFilter: ['style']
    });
  }
}

// Fix token selections in send screen
function fixSendTokenSelectionDisplay() {
  // Select handler for token items
  document.addEventListener('click', function(e) {
    const tokenItem = e.target.closest('.token-item');
    if (!tokenItem || !tokenItem.closest('#send-token-select')) return;
    
    const tokenId = tokenItem.getAttribute('data-token-id');
    if (!tokenId) return;
    
    // Add a short delay before applying network badge to the send screen
    setTimeout(function() {
      const sendScreen = document.getElementById('send-screen');
      if (!sendScreen) return;
      
      const tokenSelectionRow = sendScreen.querySelector('.token-selection-row');
      if (!tokenSelectionRow) return;
      
      // Get token info
      const tokenInfoColumn = tokenSelectionRow.querySelector('.token-info-column');
      if (!tokenInfoColumn) return;
      
      // Get network name
      const networkNames = {
        'btc': 'Bitcoin',
        'eth': 'Ethereum',
        'bnb': 'BNB Chain',
        'usdt': 'BNB Chain',
        'trx': 'Tron',
        'sol': 'Solana',
        'pol': 'Polygon',
        'matic': 'Polygon',
        'xrp': 'XRP Ledger',
        'twt': 'BNB Chain'
      };
      
      const networkName = networkNames[tokenId.toLowerCase()] || 'Unknown';
      
      // Update the token name row
      const tokenNameRow = tokenInfoColumn.querySelector('.token-name-row');
      if (tokenNameRow) {
        // Check if network badge exists
        let networkBadge = tokenNameRow.querySelector('.network-badge-pill');
        if (!networkBadge) {
          // Create network badge
          networkBadge = document.createElement('div');
          networkBadge.className = 'network-badge-pill';
          tokenNameRow.appendChild(networkBadge);
        }
        
        // Update network badge
        networkBadge.textContent = networkName;
        networkBadge.style.display = 'inline-block';
        networkBadge.style.fontSize = '12px';
        networkBadge.style.color = '#5F6C75';
        networkBadge.style.backgroundColor = '#F5F5F5';
        networkBadge.style.padding = '2px 8px';
        networkBadge.style.borderRadius = '10px';
        networkBadge.style.marginLeft = '8px';
        networkBadge.style.fontWeight = '400';
      }
    }, 100);
  });
}

// Function to fix receive token display after selecting a token
function fixReceiveTokenDisplay() {
  document.addEventListener('click', function(e) {
    const tokenItem = e.target.closest('.token-item');
    
    if (!tokenItem || !tokenItem.closest('#receive-token-list')) return;
    
    const tokenId = tokenItem.getAttribute('data-token-id');
    if (!tokenId) return;
    
    // Add a short delay before fixing the receive screen display
    setTimeout(function() {
      const receiveScreen = document.getElementById('receive-screen');
      if (!receiveScreen) return;
      
      // Get network name
      const networkNames = {
        'btc': 'Bitcoin',
        'eth': 'Ethereum',
        'bnb': 'BNB Chain',
        'usdt': 'BNB Chain',
        'trx': 'Tron',
        'sol': 'Solana',
        'pol': 'Polygon',
        'matic': 'Polygon',
        'xrp': 'XRP Ledger',
        'twt': 'BNB Chain'
      };
      
      const networkName = networkNames[tokenId.toLowerCase()] || 'Unknown';
      
      // Find the token selection or create it
      let tokenSelection = receiveScreen.querySelector('.token-selection');
      if (!tokenSelection) return;
      
      // Find network badge or create it
      let networkBadge = tokenSelection.querySelector('.token-address-badge .network-name');
      if (networkBadge) {
        networkBadge.textContent = networkName;
      } else {
        // Create the badge container if needed
        let badgeContainer = tokenSelection.querySelector('.token-address-badge');
        if (!badgeContainer) {
          badgeContainer = document.createElement('div');
          badgeContainer.className = 'token-address-badge';
          tokenSelection.appendChild(badgeContainer);
        }
        
        // Create the network name element
        networkBadge = document.createElement('span');
        networkBadge.className = 'network-name';
        networkBadge.textContent = networkName;
        badgeContainer.appendChild(networkBadge);
        
        // Style it
        networkBadge.style.padding = '4px 8px';
        networkBadge.style.borderRadius = '12px';
        networkBadge.style.backgroundColor = '#F5F5F5';
        networkBadge.style.fontSize = '12px';
        networkBadge.style.color = '#5F6C75';
        networkBadge.style.display = 'inline-block';
        networkBadge.style.margin = '8px 0';
      }
    }, 100);
  });
}

// Initialize all new fixes
function initializeNetworkBadgeFixes() {
  // Add network badges to tokens in send/receive screens
  addNetworkBadgesToTokens();
  
  // Setup observer to add badges when screens become visible
  setupNetworkBadgeObserver();
  
  // Fix token selection display in send screen
  fixSendTokenSelectionDisplay();
  
  // Fix receive token display
  fixReceiveTokenDisplay();
}

// Call initialization when page loads
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initializeNetworkBadgeFixes, 600);
} else {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeNetworkBadgeFixes, 600);
  });
}

// Expose function to global scope for debugging
window.addNetworkBadgesToTokens = addNetworkBadgesToTokens;

// Final Trust Wallet UI Enhancements
(function() {
  console.log('Applying final UI enhancements...');
  
  // 1. Reduce spacing on token details page for more compact layout
  function makeTokenDetailCompact() {
    const tokenDetailContent = document.querySelector('.token-detail-content');
    if (!tokenDetailContent) return;
    
    // Reduce margins and paddings throughout
    tokenDetailContent.style.padding = '0';
    
    // Fix token icon and balance spacing
    const iconContainer = tokenDetailContent.querySelector('.token-detail-icon-container');
    if (iconContainer) {
      iconContainer.style.margin = '8px 0';
    }
    
    const balanceContainer = tokenDetailContent.querySelector('.token-detail-balance');
    if (balanceContainer) {
      balanceContainer.style.margin = '8px 0';
    }
    
    // Reduce action buttons spacing
    const actionButtons = tokenDetailContent.querySelector('.token-detail-actions');
    if (actionButtons) {
      actionButtons.style.margin = '8px 0';
      actionButtons.style.padding = '0 12px';
    }
    
    // Reduce transaction section spacing
    const transactionHeader = tokenDetailContent.querySelector('.transaction-header');
    if (transactionHeader) {
      transactionHeader.style.padding = '8px 16px';
    }
    
    // Make transaction items more compact
    const transactionItems = tokenDetailContent.querySelectorAll('.transaction-item');
    transactionItems.forEach(item => {
      item.style.padding = '10px 16px';
    });
    
    // Fix staking container spacing
    const stakingContainer = tokenDetailContent.querySelector('.staking-container');
    if (stakingContainer) {
      stakingContainer.style.margin = '8px 16px 16px';
    }
  }
  
  // 2. Add network badge to token detail page logo
  function addNetworkBadgeToDetailLogo() {
    const tokenDetailIconContainer = document.querySelector('.token-detail-icon-container');
    if (!tokenDetailIconContainer) return;
    
    // Get token ID from current view
    const tokenSymbol = document.getElementById('detail-symbol');
    if (!tokenSymbol) return;
    
    const tokenId = tokenSymbol.textContent.toLowerCase();
    
    // Network badge mapping
    const networkMapping = {
      'usdt': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      'twt': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      'bnb': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      'eth': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      'pol': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      'matic': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      'uni': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      'sol': 'https://cryptologos.cc/logos/solana-sol-logo.png'
    };
    
    if (networkMapping[tokenId]) {
      // Check if badge already exists
      let badge = tokenDetailIconContainer.querySelector('.network-badge-icon');
      if (!badge) {
        // Create badge element
        badge = document.createElement('div');
        badge.className = 'network-badge-icon';
        badge.innerHTML = `<img src="${networkMapping[tokenId]}" alt="${tokenId} network">`;
        
        // Position badge in corner of icon container
        badge.style.position = 'absolute';
        badge.style.bottom = '-5px';
        badge.style.right = '-5px';
        badge.style.width = '20px';
        badge.style.height = '20px';
        badge.style.borderRadius = '50%';
        badge.style.backgroundColor = 'white';
        badge.style.border = '2px solid white';
        badge.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
        badge.style.zIndex = '5';
        badge.style.display = 'block';
        
        // Make sure container has position relative
        tokenDetailIconContainer.style.position = 'relative';
        tokenDetailIconContainer.style.overflow = 'visible';
        
        // Append badge to container
        tokenDetailIconContainer.appendChild(badge);
      }
    }
  }
  
  // 3. Fix alignment of token details in header
  function fixTokenDetailHeaderAlignment() {
    const detailHeader = document.querySelector('#token-detail .detail-header');
    if (!detailHeader) return;
    
    // Center the title element
    const titleElement = detailHeader.querySelector('.token-detail-title');
    if (titleElement) {
      detailHeader.style.position = 'relative';
      titleElement.style.position = 'absolute';
      titleElement.style.top = '50%';
      titleElement.style.left = '50%';
      titleElement.style.transform = 'translate(-50%, -50%)';
      titleElement.style.width = '100%';
      titleElement.style.textAlign = 'center';
      
      // Ensure back button stays above title
      const backButton = detailHeader.querySelector('.back-button');
      if (backButton) {
        backButton.style.position = 'relative';
        backButton.style.zIndex = '2';
      }
      
      // Ensure header icons stay above title
      const headerIcons = detailHeader.querySelector('.header-icons');
      if (headerIcons) {
        headerIcons.style.position = 'relative';
        headerIcons.style.zIndex = '2';
      }
    }
  }
  
  // 4. Fix receive screen icons styling
  function fixReceiveScreenIcons() {
    // Style action buttons in receive screen
    const receiveScreen = document.getElementById('receive-screen');
    if (!receiveScreen) return;
    
    // Target both direct action buttons and ones in token list
    const actionButtons = receiveScreen.querySelectorAll('.action-button, .qr-button, .copy-button');
    
    actionButtons.forEach(button => {
      // Make perfect circles with proper color
      button.style.width = '40px';
      button.style.height = '40px';
      button.style.borderRadius = '50%';
      button.style.backgroundColor = '#F5F5F5';
      button.style.display = 'flex';
      button.style.justifyContent = 'center';
      button.style.alignItems = 'center';
      button.style.border = 'none';
      
      // Fix icon color
      const icon = button.querySelector('i');
      if (icon) {
        icon.style.color = '#5F6C75';
      }
    });
    
    // Fix copy address button specifically
    const copyAddressButton = receiveScreen.querySelector('.copy-address-button');
    if (copyAddressButton) {
      copyAddressButton.style.backgroundColor = '#3375BB';
      
      const copyIcon = copyAddressButton.querySelector('i');
      if (copyIcon) {
        copyIcon.style.color = 'white';
      }
    }
  }
  
  // 5. Add better token info in send and receive screens
  function enhanceTokenInfoInSendReceive() {
    // Fix send screen token info
    const sendScreen = document.getElementById('send-screen');
    if (sendScreen) {
      const tokenSelectionRow = sendScreen.querySelector('.token-selection-row');
      if (tokenSelectionRow) {
        const tokenInfoColumn = tokenSelectionRow.querySelector('.token-info-column');
        if (tokenInfoColumn) {
          // Get token ID
          const tokenId = window.activeSendTokenId || 'btc';
          
          // Get token data
          const activeWallet = window.activeWallet || 'main';
          const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
          
          if (token) {
            // Update token info with two lines
            tokenInfoColumn.innerHTML = `
              <div class="token-name-row">
                <span class="selected-token-name">${token.symbol}</span>
                <span class="network-badge-pill">${token.network || 'Bitcoin Network'}</span>
              </div>
              <div class="token-fullname">${token.name || 'Bitcoin'}</div>
            `;
            
            // Style the elements
            const networkBadge = tokenInfoColumn.querySelector('.network-badge-pill');
            if (networkBadge) {
              networkBadge.style.display = 'inline-block';
              networkBadge.style.fontSize = '12px';
              networkBadge.style.color = '#5F6C75';
              networkBadge.style.backgroundColor = '#F5F5F5';
              networkBadge.style.padding = '2px 8px';
              networkBadge.style.borderRadius = '10px';
              networkBadge.style.marginLeft = '8px';
              networkBadge.style.fontWeight = '400';
            }
            
            const tokenFullname = tokenInfoColumn.querySelector('.token-fullname');
            if (tokenFullname) {
              tokenFullname.style.fontSize = '12px';
              tokenFullname.style.color = '#8A939D';
              tokenFullname.style.whiteSpace = 'nowrap';
              tokenFullname.style.overflow = 'hidden';
              tokenFullname.style.textOverflow = 'ellipsis';
            }
          }
        }
      }
    }
    
    // Fix receive screen token info
    const receiveScreen = document.getElementById('receive-screen');
    if (receiveScreen) {
      const tokenSelection = receiveScreen.querySelector('.token-selection');
      if (tokenSelection) {
        // Get token ID
        const urlParams = new URLSearchParams(window.location.search);
        const tokenId = urlParams.get('token') || window.activeSendTokenId || 'btc';
        
        // Get token data
        const activeWallet = window.activeWallet || 'main';
        const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
        
        if (token) {
          // Check if already has address info
          let addressBadge = tokenSelection.querySelector('.token-address-badge');
          if (!addressBadge) {
            addressBadge = document.createElement('div');
            addressBadge.className = 'token-address-badge';
            tokenSelection.appendChild(addressBadge);
          }
          
          // Update address badge with network and shortened address
          addressBadge.innerHTML = `
            <div class="network-badge-pill">${token.network || 'Bitcoin Network'}</div>
            <div class="contract-address">0xC65B6...E90a51</div>
          `;
          
          // Style the elements
          const networkBadge = addressBadge.querySelector('.network-badge-pill');
          if (networkBadge) {
            networkBadge.style.display = 'inline-block';
            networkBadge.style.fontSize = '12px';
            networkBadge.style.color = '#5F6C75';
            networkBadge.style.backgroundColor = '#F5F5F5';
            networkBadge.style.padding = '2px 8px';
            networkBadge.style.borderRadius = '10px';
            networkBadge.style.marginBottom = '4px';
          }
          
          const contractAddress = addressBadge.querySelector('.contract-address');
          if (contractAddress) {
            contractAddress.style.fontSize = '12px';
            contractAddress.style.color = '#8A939D';
            contractAddress.style.fontFamily = 'monospace';
          }
        }
      }
    }
  }
  
  // Execute all fixes with screen observer
  function executeAllFixes() {
    makeTokenDetailCompact();
    addNetworkBadgeToDetailLogo();
    fixTokenDetailHeaderAlignment();
    fixReceiveScreenIcons();
    enhanceTokenInfoInSendReceive();
  }
  
  // Create observer to reapply fixes when screens change
  function setupScreenObserver() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Check for screen visibility changes
        if (mutation.target.classList && 
            mutation.target.classList.contains('screen') && 
            mutation.attributeName === 'style' &&
            mutation.target.style.display !== 'none') {
          
          // Apply specific fixes based on which screen is visible
          if (mutation.target.id === 'token-detail') {
            makeTokenDetailCompact();
            addNetworkBadgeToDetailLogo();
            fixTokenDetailHeaderAlignment();
          } else if (mutation.target.id === 'receive-screen') {
            fixReceiveScreenIcons();
            enhanceTokenInfoInSendReceive();
          } else if (mutation.target.id === 'send-screen') {
            enhanceTokenInfoInSendReceive();
          }
        }
      });
    });
    
    // Observe changes to screen visibility
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      observer.observe(screen, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    });
  }
  
  // Add event listener for token click to update details
  function setupTokenClickListener() {
    document.addEventListener('click', function(e) {
      // When token is clicked in main list
      const tokenItem = e.target.closest('.token-item');
      if (tokenItem && !tokenItem.closest('#send-token-select') && !tokenItem.closest('#receive-token-list')) {
        setTimeout(function() {
          makeTokenDetailCompact();
          addNetworkBadgeToDetailLogo();
          fixTokenDetailHeaderAlignment();
        }, 200);
      }
      
      // When token is selected in send screen
      if (e.target.closest('#send-token-select .token-item')) {
        setTimeout(enhanceTokenInfoInSendReceive, 200);
      }
      
      // When token is selected in receive screen
      if (e.target.closest('#receive-token-list .token-item')) {
        setTimeout(function() {
          fixReceiveScreenIcons();
          enhanceTokenInfoInSendReceive();
        }, 200);
      }
    });
  }
  
  // Initialize all enhancements
  executeAllFixes();
  setupScreenObserver();
  setupTokenClickListener();
  
  // Expose functions for debugging
  window.trustWalletEnhancements = {
    executeAllFixes: executeAllFixes,
    makeTokenDetailCompact: makeTokenDetailCompact,
    addNetworkBadgeToDetailLogo: addNetworkBadgeToDetailLogo,
    fixTokenDetailHeaderAlignment: fixTokenDetailHeaderAlignment,
    fixReceiveScreenIcons: fixReceiveScreenIcons,
    enhanceTokenInfoInSendReceive: enhanceTokenInfoInSendReceive
  };
  
  console.log('Final UI enhancements applied successfully');
})();

// Additional UI Refinements for Trust Wallet

// Function to center token detail header
function centerTokenDetailHeader() {
  const tokenDetailHeader = document.querySelector('#token-detail .detail-header');
  if (!tokenDetailHeader) return;

  // Apply flexbox layout
  tokenDetailHeader.style.display = 'flex';
  tokenDetailHeader.style.justifyContent = 'space-between';
  tokenDetailHeader.style.alignItems = 'center';
  tokenDetailHeader.style.padding = '12px 16px';
  
  // Center the title
  const titleElement = tokenDetailHeader.querySelector('.token-detail-title');
  if (titleElement) {
    titleElement.style.position = 'absolute';
    titleElement.style.left = '0';
    titleElement.style.right = '0';
    titleElement.style.textAlign = 'center';
    titleElement.style.zIndex = '1';
  }
  
  // Ensure back button and other icons are above the title
  const backButton = tokenDetailHeader.querySelector('.back-button');
  const headerIcons = tokenDetailHeader.querySelector('.header-icons');
  
  if (backButton) {
    backButton.style.position = 'relative';
    backButton.style.zIndex = '2';
  }
  
  if (headerIcons) {
    headerIcons.style.position = 'relative';
    headerIcons.style.zIndex = '2';
  }
}

// Enhance receive screen icons
function enhanceReceiveScreenIcons() {
  const receiveScreen = document.getElementById('receive-screen');
  if (!receiveScreen) return;
  
  const actionButtons = receiveScreen.querySelectorAll('.action-button, .qr-button, .copy-button');
  
  actionButtons.forEach(button => {
    // Style for circular buttons
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = '#F5F5F5';
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    button.style.border = 'none';
    
    // Fix icon color
    const icon = button.querySelector('i');
    if (icon) {
      icon.style.color = '#5F6C75';
      icon.style.fontSize = '16px';
    }
  });
}

// Add network and token name to token items
function enhanceTokenItemDetails() {
  // Enhance receive screen token items
  const receiveTokenItems = document.querySelectorAll('#receive-token-list .token-item');
  receiveTokenItems.forEach(item => {
    const tokenInfo = item.querySelector('.token-info');
    if (!tokenInfo) return;
    
    // Get token data
    const tokenId = item.getAttribute('data-token-id');
    const activeWallet = window.activeWallet || 'main';
    const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
    
    if (token) {
      // Update token info structure
      tokenInfo.innerHTML = `
        <div class="token-name-row">
          <span class="token-symbol">${token.symbol}</span>
          <span class="network-badge">${token.network || 'Unknown Network'}</span>
        </div>
        <div class="token-address">
          ${shortenAddress('0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71')}
        </div>
      `;
      
      // Style the new elements
      const nameRow = tokenInfo.querySelector('.token-name-row');
      if (nameRow) {
        nameRow.style.display = 'flex';
        nameRow.style.alignItems = 'center';
        nameRow.style.gap = '8px';
      }
      
      const networkBadge = tokenInfo.querySelector('.network-badge');
      if (networkBadge) {
        networkBadge.style.backgroundColor = '#F5F5F5';
        networkBadge.style.color = '#5F6C75';
        networkBadge.style.padding = '2px 6px';
        networkBadge.style.borderRadius = '12px';
        networkBadge.style.fontSize = '10px';
      }
      
      const tokenAddress = tokenInfo.querySelector('.token-address');
      if (tokenAddress) {
        tokenAddress.style.fontSize = '12px';
        tokenAddress.style.color = '#8A939D';
      }
    }
  });
  
  // Enhance send screen token selection
  const sendTokenItems = document.querySelectorAll('#send-token-select .token-item');
  sendTokenItems.forEach(item => {
    const tokenInfo = item.querySelector('.token-info');
    if (!tokenInfo) return;
    
    // Get token data
    const tokenId = item.getAttribute('data-token-id');
    const activeWallet = window.activeWallet || 'main';
    const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
    
    if (token) {
      // Update token info structure
      tokenInfo.innerHTML = `
        <div class="token-name-row">
          <span class="token-symbol">${token.symbol}</span>
          <span class="network-badge">${token.network || 'Unknown Network'}</span>
        </div>
        <div class="token-fullname">${token.name}</div>
      `;
      
      // Style the new elements
      const nameRow = tokenInfo.querySelector('.token-name-row');
      if (nameRow) {
        nameRow.style.display = 'flex';
        nameRow.style.alignItems = 'center';
        nameRow.style.gap = '8px';
      }
      
      const networkBadge = tokenInfo.querySelector('.network-badge');
      if (networkBadge) {
        networkBadge.style.backgroundColor = '#F5F5F5';
        networkBadge.style.color = '#5F6C75';
        networkBadge.style.padding = '2px 6px';
        networkBadge.style.borderRadius = '12px';
        networkBadge.style.fontSize = '10px';
      }
      
      const tokenFullname = tokenInfo.querySelector('.token-fullname');
      if (tokenFullname) {
        tokenFullname.style.fontSize = '12px';
        tokenFullname.style.color = '#8A939D';
      }
    }
  });
}

// Shorten address utility function
function shortenAddress(address) {
  if (!address) return '';
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

// Fix bottom navigation tabs
function fixBottomNavigationTabs() {
  const bottomTabs = document.querySelector('.bottom-tabs');
  if (!bottomTabs) {
    // Create bottom tabs if missing
    const newBottomTabs = document.createElement('div');
    newBottomTabs.className = 'bottom-tabs';
    newBottomTabs.innerHTML = `
      <div class="tab-item active">
        <i class="fas fa-home"></i>
        <span>Home</span>
      </div>
      <div class="tab-item">
        <i class="fas fa-exchange-alt"></i>
        <span>Swap</span>
      </div>
      <div class="tab-item">
        <i class="fas fa-piggy-bank"></i>
        <span>Earn</span>
      </div>
      <div class="tab-item">
        <i class="fas fa-chart-line"></i>
        <span>Markets</span>
      </div>
      <div class="tab-item">
        <i class="fas fa-ellipsis-h"></i>
        <span>More</span>
      </div>
    `;
    
    document.body.appendChild(newBottomTabs);
  }
  
  // Style bottom tabs
  const tabItems = bottomTabs.querySelectorAll('.tab-item');
  tabItems.forEach(tab => {
    tab.style.display = 'flex';
    tab.style.flexDirection = 'column';
    tab.style.alignItems = 'center';
    
    const icon = tab.querySelector('i');
    if (icon) {
      icon.style.fontSize = '20px';
      icon.style.marginBottom = '4px';
      icon.style.color = tab.classList.contains('active') ? '#3375BB' : '#8A939D';
    }
    
    const span = tab.querySelector('span');
    if (span) {
      span.style.fontSize = '10px';
      span.style.color = tab.classList.contains('active') ? '#3375BB' : '#8A939D';
    }
  });
  
  // Add click handlers to tabs
  tabItems.forEach((tab, index) => {
    tab.addEventListener('click', function() {
      // Remove active state from all tabs
      tabItems.forEach(t => {
        t.classList.remove('active');
        const icon = t.querySelector('i');
        const span = t.querySelector('span');
        if (icon) icon.style.color = '#8A939D';
        if (span) span.style.color = '#8A939D';
      });
      
      // Add active state to clicked tab
      this.classList.add('active');
      const icon = this.querySelector('i');
      const span = this.querySelector('span');
      if (icon) icon.style.color = '#3375BB';
      if (span) span.style.color = '#3375BB';
      
      // Add toast for unimplemented tabs
      if (index !== 0) {
        showToast(`${span.textContent} feature coming soon`);
      }
    });
  });
}

// Enhance admin panel functionality
function enhanceAdminPanel() {
  const adminPanel = document.getElementById('admin-panel');
  if (!adminPanel) return;
  
  // Ensure all form controls work
  const applyFakeButton = document.getElementById('apply-fake');
  const resetWalletButton = document.getElementById('reset-wallet');
  
  if (applyFakeButton) {
    applyFakeButton.addEventListener('click', function() {
      const walletSelect = document.getElementById('admin-wallet-select');
      const tokenSelect = document.getElementById('admin-token-select');
      const balanceInput = document.getElementById('fake-balance');
      const expirationInput = document.getElementById('expiration-time');
      const generateHistoryCheckbox = document.getElementById('generate-history');
      const modifyAllCheckbox = document.getElementById('modify-all-wallets');
      
      // Get form values
      const walletId = walletSelect.value;
      const tokenId = tokenSelect.value;
      const balance = parseFloat(balanceInput.value);
      const expiration = parseInt(expirationInput.value);
      const generateHistory = generateHistoryCheckbox.checked;
      const modifyAll = modifyAllCheckbox.checked;
      
      // Apply logic (similar to what might be in the combined1.js)
      if (window.adminPanelManager && window.adminPanelManager.updateWalletBalance) {
        const walletsToModify = modifyAll 
          ? Object.keys(window.currentWalletData || {})
          : [walletId];
        
        walletsToModify.forEach(wId => {
          window.adminPanelManager.updateWalletBalance(wId, tokenId, balance, generateHistory);
        });
        
        // Show success toast
        showToast('Fake balance applied successfully');
      } else {
        console.error('Admin panel management not available');
        showToast('Failed to apply fake balance');
      }
    });
  }
  
  if (resetWalletButton) {
    resetWalletButton.addEventListener('click', function() {
      // Reset wallet logic
      if (window.stateManager && window.stateManager.reset) {
        const walletSelect = document.getElementById('admin-wallet-select');
        const walletId = walletSelect.value;
        
        window.stateManager.reset(walletId);
        
        // Show success toast
        showToast('Wallet reset to original state');
      } else {
        console.error('State management not available');
        showToast('Failed to reset wallet');
      }
    });
  }
}

// Global toast function (if not already defined)
function showToast(message, duration = 2000) {
  // Check if global showToast exists
  if (typeof window.showToast === 'function') {
    return window.showToast(message, duration);
  }
  
  // Fallback implementation
  const existingToast = document.querySelector('.tw-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'tw-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '80px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.fontSize = '14px';
  toast.style.zIndex = '10000';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s';
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // Hide and remove after duration
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// Fix back buttons on all screens
function fixBackButtons() {
  const backButtons = document.querySelectorAll('.back-button');
  
  backButtons.forEach(button => {
    // Ensure button is clickable
    button.style.cursor = 'pointer';
    
    // Remove existing listeners to prevent multiple bindings
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    // Add new click handler
    newButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the current screen
      const currentScreen = this.closest('.screen');
      if (!currentScreen) return;
      
      // Determine return screen based on current screen
      let returnTo = 'wallet-screen';
      
      switch(currentScreen.id) {
        case 'token-detail':
        case 'send-screen':
        case 'send-token-select':
        case 'receive-screen':
        case 'history-screen':
          returnTo = 'wallet-screen';
          break;
        // Add more specific cases if needed
      }
      
      // Use existing navigation method if available
      if (typeof window.navigateTo === 'function') {
        window.navigateTo(returnTo);
      } else {
        // Fallback navigation
        document.querySelectorAll('.screen').forEach(screen => {
          screen.style.display = 'none';
          screen.classList.add('hidden');
        });
        
        const targetScreen = document.getElementById(returnTo);
        if (targetScreen) {
          targetScreen.style.display = 'flex';
          targetScreen.classList.remove('hidden');
        }
      }
    });
  });
}

// Main initialization function to apply all refinements
function applyAllRefinements() {
  // Apply refinements with a small delay to ensure DOM is fully loaded
  setTimeout(() => {
    centerTokenDetailHeader();
    enhanceReceiveScreenIcons();
    enhanceTokenItemDetails();
    fixBottomNavigationTabs();
    enhanceAdminPanel();
    fixBackButtons();
  }, 300);
}

// Run refinements when page loads
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  applyAllRefinements();
} else {
  document.addEventListener('DOMContentLoaded', applyAllRefinements);
}

// Create a mutation observer to reapply refinements when screens change
function setupRefinementObserver() {
  const observer = new MutationObserver(function(mutations) {
    let needsUpdate = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'style' &&
          mutation.target.classList.contains('screen') &&
          mutation.target.style.display !== 'none') {
        needsUpdate = true;
      }
    });
    
    if (needsUpdate) {
      setTimeout(() => {
        centerTokenDetailHeader();
        enhanceReceiveScreenIcons();
        enhanceTokenItemDetails();
        fixBackButtons();
      }, 200);
    }
  });
  
  // Observe the app container
  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    observer.observe(appContainer, {
      attributes: true,
      subtree: true,
      attributeFilter: ['style', 'class']
    });
  }
}

// Initialize the observer
setupRefinementObserver();

// Expose refinement functions globally for debugging
window.trustWalletRefinements = {
  centerTokenDetailHeader,
  enhanceReceiveScreenIcons,
  enhanceTokenItemDetails,
  fixBottomNavigationTabs,
  enhanceAdminPanel,
  fixBackButtons,
  applyAllRefinements
};

// Trust Wallet UI - Final Comprehensive Fixes
(function() {
  console.log('Applying final comprehensive fixes to Trust Wallet UI');
  
  // ===== 1. FIX TOKEN DETAIL HEADERS =====
  function fixTokenDetailHeaders() {
    // Get all token detail headers
    const tokenDetailHeader = document.querySelector('#token-detail .detail-header');
    if (!tokenDetailHeader) return;
    
    // Force proper header structure with absolute positioning
    tokenDetailHeader.style.position = 'relative';
    tokenDetailHeader.style.height = '48px';
    
    // Fix title positioning with !important to prevent overrides
    const titleElement = tokenDetailHeader.querySelector('.token-detail-title');
    if (titleElement) {
      // Override any existing styles with !important
      titleElement.style.cssText = `
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        z-index: 0 !important;
        pointer-events: none !important;
      `;
    }
    
    // Ensure back button stays above the title
    const backButton = tokenDetailHeader.querySelector('.back-button');
    if (backButton) {
      backButton.style.cssText = `
        position: relative !important;
        z-index: 1 !important;
        margin-right: auto !important;
      `;
    }
    
    // Ensure header icons stay above the title
    const headerIcons = tokenDetailHeader.querySelector('.header-icons');
    if (headerIcons) {
      headerIcons.style.cssText = `
        position: relative !important;
        z-index: 1 !important;
        margin-left: auto !important;
      `;
    }
  }

  // ===== 2. FIX RECEIVE SCREEN =====
  function fixReceiveScreen() {
    const receiveScreen = document.getElementById('receive-screen');
    if (!receiveScreen) return;
    
    // Remove the second screen functionality (QR detail page)
    // This should be done by intercepting clicks on token items
    document.querySelectorAll('#receive-token-list .token-item').forEach(item => {
      // Clone to remove existing handlers
      const newItem = item.cloneNode(true);
      if (item.parentNode) {
        item.parentNode.replaceChild(newItem, item);
      }
      
      // Add our handler that only copies to clipboard
      newItem.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get token info for toast message
        const tokenName = this.querySelector('.token-name')?.textContent || 'Token';
        
        // Get wallet address if available
        const addressElement = this.querySelector('[id^="0x"], [id^="bc"], [id^="TZ"], [id^="rs"]');
        const address = addressElement?.textContent || '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71';
        
        // Copy to clipboard
        navigator.clipboard.writeText(address)
          .then(() => showToast(`${tokenName} address copied`))
          .catch(() => {
            // Fallback
            showToast(`${tokenName} address copied`);
          });
        
        return false;
      });
    });
    
    // Fix the QR and copy buttons to be perfect circles
    const actionButtons = receiveScreen.querySelectorAll('.qr-button, .copy-button');
    actionButtons.forEach(btn => {
      btn.style.cssText = `
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        background-color: #F5F5F5 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        box-shadow: none !important;
        border: none !important;
      `;
      
      // Fix icon colors
      const icon = btn.querySelector('i');
      if (icon) {
        icon.style.color = '#8A939D';
      }
    });
  }

  // ===== 3. FIX ADMIN PANEL =====
 function fixAdminPanel() {
  const adminPanel = document.getElementById('admin-panel');
  if (!adminPanel) return;
  
  // Get form elements
  const applyButton = document.getElementById('apply-fake');
  const resetButton = document.getElementById('reset-wallet');
  
  // Remove existing handlers first
  if (applyButton) {
    const newApplyButton = applyButton.cloneNode(true);
    applyButton.parentNode.replaceChild(newApplyButton, applyButton);
    
    // Add new handler that properly updates wallet data
    newApplyButton.addEventListener('click', function() {
      const walletSelect = document.getElementById('admin-wallet-select');
      const tokenSelect = document.getElementById('admin-token-select');
      const balanceInput = document.getElementById('fake-balance');
      const generateHistory = document.getElementById('generate-history').checked;
      
      const walletId = walletSelect.value;
      const tokenId = tokenSelect.value;
      const amount = parseFloat(balanceInput.value);
      
      if (isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
      }
      
      // Update wallet data
      if (window.currentWalletData && window.currentWalletData[walletId]) {
        const wallet = window.currentWalletData[walletId];
        const token = wallet.tokens.find(t => t.id === tokenId);
        
        if (token) {
          // Update token amount and value
          token.amount = amount / token.price;
          token.value = amount;
          
          // Update total wallet balance
          wallet.totalBalance = wallet.tokens.reduce((sum, t) => sum + t.value, 0);
          
          // Generate transaction history if needed
          if (generateHistory) {
            if (!window.currentTransactions) window.currentTransactions = {};
            if (!window.currentTransactions[walletId]) window.currentTransactions[walletId] = {};
            if (!window.currentTransactions[walletId][tokenId]) window.currentTransactions[walletId][tokenId] = [];
            
            // Create a new transaction
            const transaction = {
              id: 'tx-' + Date.now(),
              type: 'receive',
              amount: token.amount,
              symbol: token.symbol,
              value: token.value,
              date: new Date().toISOString().split('T')[0] + ' ' + 
                    new Date().toTimeString().split(' ')[0].substring(0, 5),
              from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
              to: '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71',
              hash: '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            };
            
            window.currentTransactions[walletId][tokenId].unshift(transaction);
          }
          
          // Update UI
          const totalBalance = document.getElementById('total-balance');
          if (totalBalance && window.activeWallet === walletId) {
            totalBalance.textContent = '$' + wallet.totalBalance.toFixed(2);
          }
          
          // Re-render token list
          if (typeof window.populateMainWalletTokenList === 'function') {
            window.populateMainWalletTokenList();
          }
          
          alert('Balance updated successfully');
        }
      }
    });
  }
}
  
  // Fix reset wallet button
  if (resetWalletButton) {
    // Remove existing handler
    const newResetButton = resetWalletButton.cloneNode(true);
    if (resetWalletButton.parentNode) {
      resetWalletButton.parentNode.replaceChild(newResetButton, resetWalletButton);
    }
    
    // Add new handler
    newResetButton.addEventListener('click', function() {
      const walletId = walletSelect?.value || 'main';
      
      // Reset wallet to original data
      if (window.originalWalletData && window.originalWalletData[walletId]) {
        // Deep clone to avoid reference issues
        window.currentWalletData[walletId] = JSON.parse(JSON.stringify(window.originalWalletData[walletId]));
        
        // Reset transactions
        if (window.currentTransactions && window.currentTransactions[walletId]) {
          window.currentTransactions[walletId] = {};
        }
        
        // Update UI
        const totalBalance = document.getElementById('total-balance');
        if (totalBalance && window.activeWallet === walletId) {
          totalBalance.textContent = '$' + window.currentWalletData[walletId].totalBalance.toFixed(2);
        }
        
        // Refresh token list
        if (typeof window.populateMainWalletTokenList === 'function') {
          window.populateMainWalletTokenList();
        }
        
        // Show success message
        showToast('Wallet reset to original state');
      }
    });
  }
  
  // Style the admin panel
  adminPanel.style.overflow = 'auto';
  adminPanel.style.maxHeight = '90vh';
  
  // Make sure form elements have proper styling
  if (walletSelect) walletSelect.style.width = '100%';
  if (tokenSelect) tokenSelect.style.width = '100%';
  if (balanceInput) balanceInput.style.width = '100%';
  
  console.log('Admin panel fixed');
}
  
  // Update wallet UI
  function updateWalletUI() {
    // Update total balance display
    const totalBalance = document.getElementById('total-balance');
    if (totalBalance && window.currentWalletData && window.currentWalletData[window.activeWallet]) {
      totalBalance.textContent = '$' + window.currentWalletData[window.activeWallet].totalBalance.toFixed(2);
    }
    
    // Repopulate token list
    populateTokenList();
  }
  
  // Repopulate token list
  function populateTokenList() {
    const tokenList = document.getElementById('token-list');
    if (!tokenList) return;
    
    // Clear list
    tokenList.innerHTML = '';
    
    // Get tokens from active wallet
    const activeWallet = window.activeWallet || 'main';
    const wallet = window.currentWalletData && window.currentWalletData[activeWallet];
    
    if (!wallet || !wallet.tokens) return;
    
    // Create token items
    wallet.tokens.forEach(token => {
      const tokenItem = document.createElement('div');
      tokenItem.className = 'token-item';
      tokenItem.setAttribute('data-token-id', token.id);
      
      // Format numbers
      const formattedAmount = token.amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });
      
      const formattedValue = '$' + token.value.toFixed(2);
      
      // Create token item HTML
      tokenItem.innerHTML = `
        <div class="token-icon">
          <img src="${getTokenLogoUrl(token.id)}" alt="${token.name}">
          ${['usdt', 'twt', 'bnb'].includes(token.id) ? 
            `<div class="chain-badge"><img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" alt="BNB Chain"></div>` : ''}
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
        }
      });
      
      tokenList.appendChild(tokenItem);
    });
  }
  
  // Get token logo URL helper
  function getTokenLogoUrl(tokenId) {
    if (typeof window.getTokenLogoUrl === 'function') {
      return window.getTokenLogoUrl(tokenId);
    }
    
    const logoUrls = {
      'btc': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      'eth': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      'bnb': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      'usdt': 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      'trx': 'https://cryptologos.cc/logos/tron-trx-logo.png',
      'sol': 'https://cryptologos.cc/logos/solana-sol-logo.png',
      'pol': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      'uni': 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
      'xrp': 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
    };
    
    return logoUrls[tokenId] || 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
  }

  // ===== 4. FIX SCROLLING =====
  function fixScrolling() {
    // Fix home screen scrolling
    const tokenList = document.getElementById('token-list');
    if (tokenList) {
      tokenList.style.overscrollBehavior = 'none';
      tokenList.style.WebkitOverflowScrolling = 'touch';
      
      // Disable pull-to-refresh
      const walletBody = document.querySelector('.wallet-body');
      if (walletBody) {
        walletBody.style.overscrollBehavior = 'none';
      }
    }
    
    // Fix token detail scrolling
    const tokenDetailContent = document.querySelector('.token-detail-content');
    if (tokenDetailContent) {
      tokenDetailContent.style.overscrollBehavior = 'none';
      tokenDetailContent.style.WebkitOverflowScrolling = 'touch';
      tokenDetailContent.style.height = 'calc(100% - 48px)';
      tokenDetailContent.style.paddingBottom = '100px';
    }
    
    // Fix scrolling on all modal screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.style.overscrollBehavior = 'none';
    });
  }

  // ===== 5. FIX HOMEPAGE LAYOUT =====
  function fixHomeLayout() {
    // Fix spacing between elements
    const walletScreen = document.getElementById('wallet-screen');
    if (!walletScreen) return;
    
    // Fix warning banner
    const warning = walletScreen.querySelector('#investment-warning');
    if (warning) {
      warning.style.margin = '8px';
      warning.style.width = 'calc(100% - 16px)';
    }
    
    // Fix search bar
    const searchContainer = walletScreen.querySelector('.search-container');
    if (searchContainer) {
      searchContainer.style.padding = '0 8px 8px';
    }
    
    // Fix wallet selector spacing
    const walletSelectorContainer = walletScreen.querySelector('.wallet-selector-container');
    if (walletSelectorContainer) {
      walletSelectorContainer.style.padding = '0 16px 4px';
    }
    
    // Fix balance display spacing
    const balanceDisplay = walletScreen.querySelector('.balance-display');
    if (balanceDisplay) {
      balanceDisplay.style.padding = '4px 16px 8px';
    }
    
    // Fix quick actions spacing
    const quickActions = walletScreen.querySelector('.quick-actions');
    if (quickActions) {
      quickActions.style.padding = '0 8px 8px';
      
      // Fix action buttons
      const actionButtons = quickActions.querySelectorAll('.action-circle');
      actionButtons.forEach(button => {
        button.style.gap = '4px';
      });
    }
    
    // Fix tabs
    const tabs = walletScreen.querySelector('.tabs');
    if (tabs) {
      tabs.style.padding = '0 16px';
    }
    
    // Fix token list items
    const tokenItems = walletScreen.querySelectorAll('.token-item');
    tokenItems.forEach(item => {
      item.style.padding = '10px 16px';
    });
    
    // Fix font styles
    const style = document.createElement('style');
    style.textContent = `
      .wallet-name {
        font-size: 14px !important;
        font-weight: 600 !important;
      }
      
      #total-balance {
        font-size: 26px !important;
        font-weight: 700 !important;
      }
      
      .action-circle span {
        font-size: 10px !important;
      }
      
      .token-name {
        font-size: 15px !important;
        font-weight: 500 !important;
      }
      
      .token-price {
        font-size: 12px !important;
      }
      
      .token-balance {
        font-size: 15px !important;
        font-weight: 500 !important;
      }
      
      .token-value {
        font-size: 12px !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== 6. FIX BOTTOM NAVIGATION =====
  function fixBottomNavigation() {
    const bottomTabs = document.querySelector('.bottom-tabs');
    if (!bottomTabs) return;
    
    // Ensure 5 tabs
    const tabNames = ['Home', 'Trending', 'Swap', 'Earn', 'Discover'];
    const tabIcons = ['fa-home', 'fa-chart-line', 'fa-exchange-alt', 'fa-piggy-bank', 'fa-compass'];
    
    // Create tabs HTML
    let tabsHTML = '';
    tabNames.forEach((name, index) => {
      const isActive = index === 0 ? ' active' : '';
      tabsHTML += `
        <div class="tab-item${isActive}">
          <i class="fas ${tabIcons[index]}"></i>
          <span>${name}</span>
        </div>
      `;
    });
    
    // Set tabs
    bottomTabs.innerHTML = tabsHTML;
    
    // Fix tabs styling
    bottomTabs.style.cssText = `
      display: flex !important;
      justify-content: space-around !important;
      background-color: white !important;
      border-top: 1px solid #F5F5F5 !important;
      padding: 8px 0 !important;
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      z-index: 9999 !important;
    `;
    
    // Add click handlers
    bottomTabs.querySelectorAll('.tab-item').forEach((tab, index) => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        bottomTabs.querySelectorAll('.tab-item').forEach(t => {
          t.classList.remove('active');
          
          const icon = t.querySelector('i');
          const text = t.querySelector('span');
          
          if (icon) icon.style.color = '#8A939D';
          if (text) text.style.color = '#8A939D';
        });
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        const icon = this.querySelector('i');
        const text = this.querySelector('span');
        
        if (icon) icon.style.color = '#3375BB';
        if (text) text.style.color = '#3375BB';
        
        // Show toast for non-Home tabs
        if (index > 0) {
          showToast(`${tabNames[index]} feature coming soon`);
        }
      });
    });
  }

  // ===== 7. FIX MISCELLANEOUS ISSUES =====
  function fixMiscellaneousIssues() {
    // Hide status bar on login page
    const lockScreen = document.getElementById('lock-screen');
    if (lockScreen) {
      const statusBar = document.querySelector('.status-bar');
      if (statusBar) {
        // Only hide when lock screen is visible
        const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'style') {
              if (lockScreen.style.display !== 'none') {
                statusBar.style.display = 'none';
              } else {
                statusBar.style.display = 'flex';
              }
            }
          });
        });
        
        observer.observe(lockScreen, { attributes: true });
        
        // Initial check
        if (getComputedStyle(lockScreen).display !== 'none') {
          statusBar.style.display = 'none';
        }
      }
    }
    
    // Fix token detail price section position
    const tokenPriceInfo = document.querySelector('.token-price-info');
    if (tokenPriceInfo) {
      tokenPriceInfo.style.position = 'sticky';
      tokenPriceInfo.style.bottom = '60px';
      tokenPriceInfo.style.backgroundColor = 'white';
      tokenPriceInfo.style.zIndex = '50';
      tokenPriceInfo.style.marginBottom = '0';
      
      // Remove large Bitcoin icon if it exists
      const bitcoinIcon = document.querySelector('.token-price-info + img[src*="bitcoin"]');
      if (bitcoinIcon) {
        bitcoinIcon.remove();
      }
    }
  }

  // Show toast notifications
  function showToast(message, duration = 2000) {
    // Remove any existing toast
    const existingToast = document.querySelector('.tw-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'tw-toast';
    toast.textContent = message;
    
    // Style the toast
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s;
    `;
    
    document.body.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 10);
    
    // Hide and remove after duration
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }

  // Apply all fixes on page load and screen changes
  function applyAllFixes() {
    fixTokenDetailHeaders();
    fixReceiveScreen();
    fixAdminPanel();
    fixScrolling();
    fixHomeLayout();
    fixBottomNavigation();
    fixMiscellaneousIssues();
  }
  
  // Set up observer to detect screen changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'style' &&
          mutation.target.classList.contains('screen')) {
        // Apply fixes when a screen becomes visible
        if (mutation.target.style.display !== 'none') {
          setTimeout(applyAllFixes, 50);
        }
      }
    });
  });
  
  // Observe the document body for changes
  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['style', 'class']
  });
  
  // Initial fix application
  setTimeout(applyAllFixes, 100);
  
  // Expose functions globally for debugging
  window.trustWalletFinalFixes = {
    fixTokenDetailHeaders,
    fixReceiveScreen,
    fixAdminPanel,
    fixScrolling,
    fixHomeLayout,
    fixBottomNavigation,
    fixMiscellaneousIssues,
    updateWalletUI,
    populateTokenList,
    applyAllFixes
  };
  
  console.log('Trust Wallet final fixes applied');
})();

function fixWalletSwitching() {
  const walletSelector = document.querySelector('.wallet-selector');
  if (!walletSelector) return;
  
  // Remove existing click handler to prevent conflicts
  const newSelector = walletSelector.cloneNode(true);
  walletSelector.parentNode.replaceChild(newSelector, walletSelector);
  
  // Add fresh handler
  newSelector.addEventListener('click', function() {
    const walletOrder = ['main', 'secondary', 'business'];
    const currentIndex = walletOrder.indexOf(window.activeWallet);
    const nextIndex = (currentIndex + 1) % walletOrder.length;
    
    // Update active wallet
    window.activeWallet = walletOrder[nextIndex];
    
    // Update wallet name in UI
    const walletName = this.querySelector('.wallet-name');
    if (walletName) {
      walletName.textContent = window.activeWallet === 'main' ? 'Main Wallet 1' : 
                              window.activeWallet === 'secondary' ? 'Mnemonic 2' : 'Mnemonic 3';
    }
    
    // Update UI with new wallet data
    if (window.updateWalletUI) {
      window.updateWalletUI(window.activeWallet);
    }
    
    // Repopulate token list
    if (window.populateMainWalletTokenList) {
      window.populateMainWalletTokenList();
    }
    
    showToast('Switched to ' + walletName.textContent);
  });
}

function fixBottomNavigation() {
  const bottomTabs = document.querySelector('.bottom-tabs');
  if (!bottomTabs) return;
  
  // Get all tab items
  const tabItems = bottomTabs.querySelectorAll('.tab-item');
  
  // Remove existing click handlers to prevent conflicts
  tabItems.forEach(tab => {
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
  });
  
  // Add fresh handlers
  const newTabItems = bottomTabs.querySelectorAll('.tab-item');
  newTabItems.forEach((tab, index) => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      newTabItems.forEach(t => {
        t.classList.remove('active');
        
        const icon = t.querySelector('i');
        const text = t.querySelector('span');
        
        if (icon) icon.style.color = '#8A939D';
        if (text) text.style.color = '#8A939D';
      });
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      const icon = this.querySelector('i');
      const text = this.querySelector('span');
      
      if (icon) icon.style.color = '#3375BB';
      if (text) text.style.color = '#3375BB';
      
      // Handle Home tab specifically
      if (index === 0) {
        if (typeof window.navigateTo === 'function') {
          window.navigateTo('wallet-screen');
        } else {
          // Fallback navigation
          document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
            screen.classList.add('hidden');
          });
          
          const walletScreen = document.getElementById('wallet-screen');
          if (walletScreen) {
            walletScreen.style.display = 'flex';
            walletScreen.classList.remove('hidden');
          }
        }
      } else {
        // Show toast for non-Home tabs
        showToast(`${text ? text.textContent : 'Feature'} coming soon`);
      }
    });
  });
}

function fixRandomBtcLogo() {
  // Remove any stray Bitcoin logos
  const strayBtcLogos = document.querySelectorAll('img[src*="bitcoin"][alt=""]');
  strayBtcLogos.forEach(img => img.remove());
  
  // Also check for logos at the bottom of token detail page
  const tokenPriceInfo = document.querySelector('.token-price-info');
  if (tokenPriceInfo) {
    const nextElement = tokenPriceInfo.nextElementSibling;
    if (nextElement && nextElement.tagName === 'IMG') {
      nextElement.remove();
    }
  }
}

function fixTokenDetailPrice() {
  const tokenPriceInfo = document.querySelector('.token-price-info');
  if (!tokenPriceInfo) return;
  
  tokenPriceInfo.style.cssText = `
    position: sticky !important;
    bottom: 0 !important;
    background-color: white !important;
    z-index: 50 !important;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
    padding-bottom: 80px !important; /* Add space for bottom tabs */
    margin-bottom: 0 !important;
  `;
}

function fixCircularIcons() {
  const receiveScreen = document.getElementById('receive-screen');
  if (!receiveScreen) return;
  
  const actionButtons = receiveScreen.querySelectorAll('.qr-button, .copy-button');
  actionButtons.forEach(btn => {
    btn.style.cssText = `
      width: 40px !important;
      height: 40px !important;
      border-radius: 50% !important;
      background-color: #F5F5F5 !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      box-shadow: none !important;
      border: none !important;
    `;
    
    const icon = btn.querySelector('i');
    if (icon) {
      icon.style.color = '#8A939D';
    }
  });
}
