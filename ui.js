// Comprehensive Trust Wallet UI Enhancement and Bug Fix Solution
(function() {
  console.log('Initializing comprehensive Trust Wallet UI enhancement solution...');
  
  // Configuration constants
  const CONFIG = {
    debug: false,                // Enable/disable debug logging
    initDelay: 500,              // Delay before starting initialization (ms)
    screenLoadDelay: 300,        // Delay after loading screens (ms)
    useAnimations: true,         // Use smooth animations for transitions
    badgeRemovalInterval: 500,   // Interval to remove unwanted badges (ms)
    autoApplyFixes: true         // Automatically re-apply fixes when screens change
  };
  
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initFixes, CONFIG.initDelay));
  } else {
    // DOM already loaded, run with a delay
    setTimeout(initFixes, CONFIG.initDelay);
  }
  
  // Main initialization function
  function initFixes() {
    console.log('Applying comprehensive Trust Wallet UI fixes...');
    
    try {
      // Global fixes
      fixStatusBarPadding();
      fixNetworkFilters();
      centerHeaderTitles();
      enhanceNetworkBadges();
      fixBottomTabs();
      
      // Screen-specific fixes
      fixHomeScreen();
      fixTokenDetailView();
      fixReceiveScreen();
      fixSendScreen();
      fixAdminPanel();
      fixTransactionHistory();
      
      // Setup observers to keep fixing dynamic content
      setupDynamicContentObserver();
      
      console.log('All Trust Wallet UI fixes applied successfully!');
    } catch (error) {
      console.error('Error applying Trust Wallet UI fixes:', error);
    }
  }
  
  // Previous fixes from the first file (status bar, network filters, etc.) remain the same...
  
  // 6. Fix Receive Screen - Improve token display
  function fixReceiveScreen() {
    console.log('Fixing receive screen');
    
    const receiveScreen = document.getElementById('receive-screen');
    if (!receiveScreen) return;
    
    // Check if we're on token list view
    const tokenList = receiveScreen.querySelector('#receive-token-list');
    if (!tokenList) return;
    
    // Process all token items to replace network badge with shortened address
    const tokenItems = tokenList.querySelectorAll('.token-item');
    tokenItems.forEach(item => {
      const tokenId = item.getAttribute('data-token-id');
      if (!tokenId) return;
      
      const tokenInfo = item.querySelector('.token-info');
      if (!tokenInfo) return;
      
      // Find network badge/element that needs to be replaced
      const networkBadge = tokenInfo.querySelector('.token-network-badge, .token-price');
      if (!networkBadge) return;
      
      // Generate shortened address for this token
      const tokenAddress = generateTokenAddress(tokenId);
      
      // Replace network badge with shortened address
      networkBadge.textContent = tokenAddress;
      networkBadge.classList.add('token-address');
      networkBadge.style.fontFamily = 'monospace';
      networkBadge.style.fontSize = '11px';
      networkBadge.style.color = '#8A939D';
      networkBadge.style.background = 'none';
      networkBadge.style.padding = '0';
    });
  }
  
  // 7. Fix Send Screen - Improve token display and formatting
  function fixSendScreen() {
    console.log('Fixing send screen');
    
    const sendScreen = document.getElementById('send-screen');
    if (!sendScreen) return;
    
    // Fix token selection row
    const tokenSelectionRow = sendScreen.querySelector('.token-selection-row');
    if (tokenSelectionRow) {
      // Get token information
      const activeWallet = window.activeWallet || 'main';
      const tokenId = window.activeSendTokenId || 'usdt';
      let token = null;
      
      // Try to get token data from wallet state
      if (window.currentWalletData && 
          window.currentWalletData[activeWallet] && 
          window.currentWalletData[activeWallet].tokens) {
        token = window.currentWalletData[activeWallet].tokens.find(t => t.id === tokenId);
      }
      
      // Only proceed if we have token data
      if (token) {
        // Get token info column
        const tokenInfoColumn = tokenSelectionRow.querySelector('.token-info-column');
        if (tokenInfoColumn) {
          // Replace with correctly styled content
          tokenInfoColumn.innerHTML = `
            <div class="token-name-row">
              <span class="selected-token-name">${token.symbol}</span>
              <span class="network-badge-pill">${token.network || 'Network'}</span>
            </div>
            <div class="token-fullname">${token.name}</div>
          `;
          
          // Style network badge
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
          
          // Style token name
          const tokenFullname = tokenInfoColumn.querySelector('.token-fullname');
          if (tokenFullname) {
            tokenFullname.style.fontSize = '12px';
            tokenFullname.style.color = '#8A939D';
            tokenFullname.style.background = 'none';
            tokenFullname.style.padding = '0';
          }
        }
        
        // Add dollar value in the available balance section
        const availableBalance = sendScreen.querySelector('#available-balance');
        if (availableBalance) {
          const maxAmount = availableBalance.querySelector('#max-amount');
          const maxSymbol = availableBalance.querySelector('#max-symbol');
          
          if (maxAmount && maxSymbol) {
            // Calculate dollar value
            const amountValue = parseFloat(maxAmount.textContent) * token.price;
            const formattedValue = formatCurrency(amountValue);
            
            // Add dollar value if not already present
            if (!availableBalance.querySelector('.balance-dollar-value')) {
              const dollarValue = document.createElement('span');
              dollarValue.className = 'balance-dollar-value';
              dollarValue.textContent = ` (${formattedValue})`;
              dollarValue.style.fontSize = '12px';
              dollarValue.style.color = '#8A939D';
              
              // Append after symbol
              maxSymbol.insertAdjacentElement('afterend', dollarValue);
            }
          }
        }
      }
    }
  }
  
  // 8. Fix Admin Panel - Improve functionality and error handling
  function fixAdminPanel() {
    console.log('Fixing admin panel');
    
    const adminPanel = document.getElementById('admin-panel');
    if (!adminPanel) return;
    
    // Fix apply button functionality
    const applyFakeButton = document.getElementById('apply-fake');
    if (applyFakeButton) {
      // Create a fresh handler by cloning and replacing
      const newApplyButton = applyFakeButton.cloneNode(true);
      applyFakeButton.parentNode.replaceChild(newApplyButton, applyFakeButton);
      
      // Add proper handler
      newApplyButton.addEventListener('click', function() {
        const walletSelect = document.getElementById('admin-wallet-select');
        const tokenSelect = document.getElementById('admin-token-select');
        const balanceInput = document.getElementById('fake-balance');
        
        // Validate inputs
        if (!walletSelect || !tokenSelect || !balanceInput) {
          showToast('Error: Missing form elements');
          return;
        }
        
        const walletId = walletSelect.value || 'main';
        const tokenId = tokenSelect.value || 'usdt';
        const amount = parseFloat(balanceInput.value);
        
        if (isNaN(amount)) {
          showToast('Please enter a valid balance amount');
          return;
        }
        
        // Update wallet data
        if (window.currentWalletData && window.currentWalletData[walletId]) {
          const token = window.currentWalletData[walletId].tokens.find(t => t.id === tokenId);
          
          if (token) {
            // Update token amount
            const price = token.price || 1;
            
            // Calculate new token amount based on USD value
            token.amount = amount / price;
            token.value = amount;
            
            // Recalculate total balance
            window.currentWalletData[walletId].totalBalance = 
              window.currentWalletData[walletId].tokens.reduce((sum, t) => sum + t.value, 0);
            
            // Update UI
            if (window.updateWalletUI) {
              window.updateWalletUI(walletId);
            }
            
            // Refresh token list
            if (typeof window.populateMainWalletTokenList === 'function') {
              window.populateMainWalletTokenList();
            }
            
            showToast('Balance updated successfully');
          } else {
            showToast('Token not found');
          }
        } else {
          showToast('Wallet not found');
        }
      });
    }
    
    // Fix reset wallet button 
    const resetWalletButton = document.getElementById('reset-wallet');
    if (resetWalletButton) {
      // Create a fresh handler by cloning and replacing
      const newResetButton = resetWalletButton.cloneNode(true);
      resetWalletButton.parentNode.replaceChild(newResetButton, resetWalletButton);
      
      // Add proper handler
      newResetButton.addEventListener('click', function() {
        const walletSelect = document.getElementById('admin-wallet-select');
        if (!walletSelect) return;
        
        const walletId = walletSelect.value;
        
        // Reset wallet to original state
        if (window.originalWalletData && window.originalWalletData[walletId]) {
          window.currentWalletData[walletId] = JSON.parse(
            JSON.stringify(window.originalWalletData[walletId])
          );
          
          // Update UI
          if (window.updateWalletUI) {
            window.updateWalletUI(walletId);
          }
          
          // Refresh token list
          if (typeof window.populateMainWalletTokenList === 'function') {
            window.populateMainWalletTokenList();
          }
          
          showToast('Wallet reset successfully');
        }
      });
    }
  }
  
  // 9. Fix Transaction History
  function fixTransactionHistory() {
    console.log('Fixing transaction history');
    
    const transactionList = document.getElementById('transaction-list');
    if (!transactionList) return;
    
    const transactions = transactionList.querySelectorAll('.transaction-item');
    
    transactions.forEach(transaction => {
      // Improve transaction item styling
      transaction.style.display = 'flex';
      transaction.style.alignItems = 'center';
      transaction.style.padding = '12px 16px';
      transaction.style.borderBottom = '1px solid #F5F5F5';
      
      // Style transaction icon
      const icon = transaction.querySelector('.transaction-icon');
      if (icon) {
        icon.style.marginRight = '12px';
        
        // Color-code transaction types
        const type = transaction.getAttribute('data-type');
        switch(type) {
          case 'receive':
            icon.style.color = '#3375BB'; // Blue for receive
            break;
          case 'send':
            icon.style.color = '#FF6B6B'; // Red for send
            break;
          case 'swap':
            icon.style.color = '#4CAF50'; // Green for swap
            break;
          default:
            icon.style.color = '#8A939D'; // Neutral gray
        }
      }
      
      // Improve transaction details styling
      const details = transaction.querySelector('.transaction-details');
      if (details) {
        details.style.flex = '1';
        
        const title = details.querySelector('.transaction-title');
        if (title) {
          title.style.fontSize = '14px';
          title.style.fontWeight = '500';
          title.style.marginBottom = '4px';
        }
        
        const subtitle = details.querySelector('.transaction-subtitle');
        if (subtitle) {
          subtitle.style.fontSize = '12px';
          subtitle.style.color = '#8A939D';
        }
      }
      
      // Style transaction amount
      const amount = transaction.querySelector('.transaction-amount');
      if (amount) {
        amount.style.fontSize = '14px';
        amount.style.fontWeight = '500';
        
        // Color-code amounts
        const amountValue = parseFloat(amount.textContent.replace(/[^\d.-]/g, ''));
        amount.style.color = amountValue >= 0 ? '#4CAF50' : '#FF6B6B';
      }
    });
  }
  
  // 10. Setup Dynamic Content Observer
  function setupDynamicContentObserver() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Check if a screen's display property changed
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'style' &&
            mutation.target.classList.contains('screen')) {
          
          // Only update if the screen is now visible
          if (mutation.target.style.display !== 'none') {
            // Apply specific fixes based on which screen changed
            switch(mutation.target.id) {
              case 'token-detail':
                enhanceTokenDetailPage();
                break;
              case 'receive-screen':
                fixReceiveScreen();
                break;
              case 'send-screen':
                fixSendScreen();
                break;
              case 'admin-panel':
                fixAdminPanel();
                break;
              case 'transaction-history':
                fixTransactionHistory();
                break;
            }
            
            // Always fix network filters on all screens
            fixNetworkFilters();
          }
        }
      });
    });
    
    // Observe the whole app container
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      observer.observe(appContainer, {
        attributes: true,
        subtree: true,
        attributeFilter: ['style']
      });
    }
  }
  
  // Helper Functions
  
  // Generate token address for display
  function generateTokenAddress(tokenId) {
    const prefix = '0x';
    const middle = Array.from(tokenId)
      .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 8);
    const suffix = '...E90a51';
    
    return prefix + middle + suffix;
  }
  
  // Get token logo URL
  function getTokenLogoUrl(tokenId) {
    // Use existing function if available
    if (typeof window.getTokenLogoUrl === 'function') {
      return window.getTokenLogoUrl(tokenId);
    }
    
    // Fallback implementation with expanded token logo mapping
    const logoUrls = {
      'btc': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      'eth': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      'bnb': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      'usdt': 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      'trx': 'https://cryptologos.cc/logos/tron-trx-logo.png',
      'sol': 'https://cryptologos.cc/logos/solana-sol-logo.png',
      'pol': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      'uni': 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
      'xrp': 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
      'doge': 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
      'ada': 'https://cryptologos.cc/logos/cardano-ada-logo.png',
      'link': 'https://cryptologos.cc/logos/chainlink-link-logo.png',
      'dot': 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
      'ltc': 'https://cryptologos.cc/logos/litecoin-ltc-logo.png'
    };
    
    return logoUrls[tokenId.toLowerCase()] || 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
  }
  
  // Format currency with proper localization
  function formatCurrency(amount) {
    // Use existing formatting function if available
    if (typeof window.FormatUtils === 'object' && 
        typeof window.FormatUtils.formatCurrency === 'function') {
      return window.FormatUtils.formatCurrency(amount);
    }
    
    // Fallback implementation with localized formatting
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }
  
  // Show toast notification with improved styling
  function showToast(message, duration = 2000) {
    // Use existing function if available
    if (typeof window.showToast === 'function') {
      return window.showToast(message, duration);
    }
    
    // Remove any existing toast
    const existingToast = document.querySelector('.tw-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create new toast with enhanced styling
    const toast = document.createElement('div');
    toast.className = 'tw-toast';
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-info-circle toast-icon"></i>
        <span class="toast-message">${message}</span>
      </div>
    `;
    
    // Apply comprehensive styling
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      zIndex: '10000',
      opacity: '0',
      transition: 'opacity 0.3s ease-in-out',
      maxWidth: '80%',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    });
    
    // Style toast content
    const toastContent = toast.querySelector('.toast-content');
    if (toastContent) {
      toastContent.style.display = 'flex';
      toastContent.style.alignItems = 'center';
    }
    
    // Style toast icon
    const toastIcon = toast.querySelector('.toast-icon');
    if (toastIcon) {
      toastIcon.style.marginRight = '10px';
      toastIcon.style.fontSize = '18px';
    }
    
    // Style toast message
    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) {
      toastMessage.style.fontSize = '14px';
    }
    
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
  
  // Expose key functions to window for potential external use
  window.TrustWalletUIFixes = {
    getTokenLogoUrl,
    formatCurrency,
    showToast
  };
  
  // Initialize fixes
  initFixes();
})();
