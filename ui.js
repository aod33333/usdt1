// Comprehensive UI Fixes for Trust Wallet
(function() {
  console.log('Applying comprehensive UI fixes for Trust Wallet...');
  
  // Run fixes after a slight delay to ensure DOM is loaded
  setTimeout(function() {
    // Fix 1: Improve network filter styling and position
    fixNetworkFilters();
    
    // Fix 2: Add investment warning and staking details to token detail page
    enhanceTokenDetailPage();
    
    // Fix 3: Fix receive screen token display (shorten address)
    fixReceiveScreen();
    
    // Fix 4: Fix send screen token display formatting
    fixSendScreen();
    
    // Fix 5: Fix admin panel error
    fixAdminPanel();
    
    // Set up observer to watch for screen changes and reapply fixes
    setupObserver();
    
    console.log('All UI fixes applied successfully');
  }, 500);
  
  // Fix 1: Improve network filter styling and position
  function fixNetworkFilters() {
    console.log('Fixing network filters');
    
    // Find all network filter elements
    const networkFilters = document.querySelectorAll('.networks-filter .all-networks');
    
    networkFilters.forEach(filter => {
      // Apply consistent styling to match app design
      filter.style.display = 'inline-flex';
      filter.style.alignItems = 'center';
      filter.style.backgroundColor = '#F5F5F5';
      filter.style.borderRadius = '16px';
      filter.style.padding = '6px 12px';
      filter.style.fontSize = '12px';
      filter.style.color = '#5F6C75';
      filter.style.margin = '8px 20px'; // Increased left margin to move away from edge
      filter.style.fontWeight = '500';
      
      // Fix the chevron alignment
      const chevron = filter.querySelector('i.fa-chevron-down');
      if (chevron) {
        chevron.style.marginLeft = '6px';
        chevron.style.fontSize = '10px';
      }
    });
    
    // Fix container styles with consistent padding
    const filterContainers = document.querySelectorAll('.networks-filter');
    filterContainers.forEach(container => {
      container.style.textAlign = 'left';
      container.style.borderBottom = '1px solid #F5F5F5';
      container.style.paddingBottom = '8px';
      container.style.paddingLeft = '4px'; // Add left padding to move away from edge
    });
  }
  
  // Fix 2: Add investment warning and staking details to token detail page
  function enhanceTokenDetailPage() {
    console.log('Enhancing token detail page');
    
    const tokenDetailPage = document.getElementById('token-detail');
    if (!tokenDetailPage) return;
    
    const tokenDetailContent = tokenDetailPage.querySelector('.token-detail-content');
    if (!tokenDetailContent) return;
    
    // Check if elements already exist to avoid duplicates
    if (!tokenDetailContent.querySelector('.investment-warning')) {
      addInvestmentWarning(tokenDetailContent);
    }
    
    if (!tokenDetailContent.querySelector('.staking-container')) {
      addStakingBanner(tokenDetailContent);
    }
  }
  
  // Add investment warning to token detail page
  function addInvestmentWarning(detailContent) {
    // Find insertion point - after balance display
    const balanceDisplay = detailContent.querySelector('.token-detail-balance');
    if (!balanceDisplay) return;
    
    // Create warning banner
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
    
    // Insert after balance display
    if (balanceDisplay.nextSibling) {
      detailContent.insertBefore(warningBanner, balanceDisplay.nextSibling);
    } else {
      detailContent.appendChild(warningBanner);
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
      warningText.style.lineHeight = '1.4';
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
  
  // Add staking banner to token detail page
  function addStakingBanner(detailContent) {
    // Get token symbol from the page
    const symbolElement = document.getElementById('detail-symbol');
    const tokenSymbol = symbolElement ? symbolElement.textContent : 'BTC';
    
    // Create staking banner
    const stakingBanner = document.createElement('div');
    stakingBanner.className = 'staking-container';
    stakingBanner.innerHTML = `
      <div class="staking-icon">
        <img src="${getTokenLogoUrl(tokenSymbol.toLowerCase())}" alt="${tokenSymbol}">
      </div>
      <div class="staking-content">
        <h3>Start earning</h3>
        <p>Start earning on your ${tokenSymbol}</p>
      </div>
      <i class="fas fa-chevron-right staking-arrow"></i>
    `;
    
    // Find appropriate insertion point - after action buttons or investment warning
    const actionButtons = detailContent.querySelector('.token-detail-actions');
    const investmentWarning = detailContent.querySelector('.investment-warning');
    
    if (actionButtons) {
      actionButtons.insertAdjacentElement('afterend', stakingBanner);
    } else if (investmentWarning) {
      investmentWarning.insertAdjacentElement('afterend', stakingBanner);
    } else {
      // Insert after balance if neither exists
      const balanceDisplay = detailContent.querySelector('.token-detail-balance');
      if (balanceDisplay) {
        balanceDisplay.insertAdjacentElement('afterend', stakingBanner);
      } else {
        detailContent.appendChild(stakingBanner);
      }
    }
    
    // Style the staking banner
    stakingBanner.style.backgroundColor = '#F5F5F5';
    stakingBanner.style.borderRadius = '16px';
    stakingBanner.style.padding = '16px';
    stakingBanner.style.margin = '0 16px 24px';
    stakingBanner.style.display = 'flex';
    stakingBanner.style.alignItems = 'center';
    stakingBanner.style.position = 'relative';
    stakingBanner.style.cursor = 'pointer';
    
    const stakingIcon = stakingBanner.querySelector('.staking-icon');
    if (stakingIcon) {
      stakingIcon.style.width = '50px';
      stakingIcon.style.height = '50px';
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
    
    // Add click handler for showing toast
    stakingBanner.addEventListener('click', function() {
      showToast(`${tokenSymbol} staking coming soon`);
    });
  }
  
  // Fix 3: Fix receive screen token display
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
      
      // Generate shortened address for this token (simulating wallet address)
      const tokenAddress = generateShortAddress(tokenId);
      
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
  
  // Fix 4: Fix send screen token display formatting
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
            // Remove background from full name
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
  
  // Fix 5: Fix admin panel error
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
            const oldAmount = token.amount;
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
  
  // Set up observer to reapply fixes when screens change
  function setupObserver() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Check if a screen's display property changed
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'style' &&
            mutation.target.classList.contains('screen')) {
          
          // Only update if the screen is now visible
          if (mutation.target.style.display !== 'none') {
            // Apply specific fixes based on which screen changed
            if (mutation.target.id === 'token-detail') {
              enhanceTokenDetailPage();
            } else if (mutation.target.id === 'receive-screen') {
              fixReceiveScreen();
            } else if (mutation.target.id === 'send-screen') {
              fixSendScreen();
            } else if (mutation.target.id === 'admin-panel') {
              fixAdminPanel();
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
  
  // ----- Helper Functions -----
  
  // Helper to generate a shortened wallet address for tokens
  function generateShortAddress(tokenId) {
    // Generate a deterministic address based on token ID
    const prefix = '0x';
    const middle = Array.from(tokenId).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('').substring(0, 8);
    const suffix = '...E90a51';
    
    return prefix + middle + suffix;
  }
  
  // Helper to get token logo URL
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
      'pol': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      'uni': 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
      'xrp': 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
    };
    
    return logoUrls[tokenId] || 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
  }
  
  // Helper to format currency
  function formatCurrency(amount) {
    if (typeof window.FormatUtils === 'object' && 
        typeof window.FormatUtils.formatCurrency === 'function') {
      return window.FormatUtils.formatCurrency(amount);
    }
    
    // Fallback implementation
    return '$' + amount.toFixed(2);
  }
  
  // Helper to show toast notifications
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
    
    // Create new toast
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
})();
