// TrustWallet UI Fixes

(function() {
  console.log('🔧 Initializing TrustWallet UI fixes...');
  
  // Function to inject our CSS fixes
  function injectCSSFixes() {
    const existingStyles = document.getElementById('trustwallet-ui-fixes');
    if (existingStyles) return; // Avoid duplicate styles
    
    const styleElement = document.createElement('style');
    styleElement.id = 'trustwallet-ui-fixes';
    styleElement.textContent = `
      /* Fix for network selector - make it a grey box with rounded edges and adjust position */
      .networks-filter {
        padding: 0 16px 8px !important;
        text-align: left !important;
        border-bottom: 1px solid #F5F5F5 !important;
      }
      
      .networks-filter .all-networks {
        display: inline-flex !important;
        align-items: center !important;
        background: #F5F5F5 !important;
        border-radius: 16px !important;
        padding: 6px 12px !important;
        font-size: 12px !important;
        color: #5F6C75 !important;
        margin: 8px 0 !important;  /* Changed from 8px 16px to 8px 0 */
        font-weight: 500 !important;
        width: auto !important;
        cursor: pointer !important;
      }
      
      /* Token Detail page - fix for investment warning banner */
      .investment-warning {
        width: calc(100% - 32px) !important;
        margin: 16px !important;
        background-color: #FEF9E7 !important;
        color: #D4AC0D !important;
        padding: 8px !important;
        font-size: 10px !important;
        border-radius: 8px !important;
        border-left: 4px solid #D4AC0D !important;
      }
      
      .investment-warning-content {
        display: flex !important;
        align-items: flex-start !important;
        padding: 4px !important;
      }
      
      .warning-icon {
        font-size: 20px !important;
        margin-right: 8px !important;
        margin-top: 2px !important;
      }
      
      .investment-warning-text {
        flex: 1 !important;
        font-size: 10px !important;
        line-height: 1.4 !important;
      }
      
      /* Staking container styling */
      .staking-container {
        background-color: #F5F5F5 !important;
        border-radius: 16px !important;
        padding: 16px !important;
        margin: 16px !important;
        display: flex !important;
        align-items: center !important;
        position: relative !important;
      }
      
      .staking-icon {
        width: 40px !important;
        height: 40px !important;
        margin-right: 16px !important;
      }
      
      .staking-content {
        flex: 1 !important;
      }
      
      .staking-content h3 {
        font-size: 16px !important;
        font-weight: 600 !important;
        margin-bottom: 4px !important;
      }
      
      .staking-content p {
        font-size: 12px !important;
        color: #8A939D !important;
        margin: 0 !important;
      }
      
      .staking-arrow {
        position: absolute !important;
        right: 16px !important;
        color: #8A939D !important;
      }
      
      /* Fix for receive screen - replace network badge with contract address */
      .token-network-badge {
        display: inline-block !important;
        font-size: 12px !important;
        color: #8A939D !important;
        font-family: monospace !important;
      }
      
      /* Fix for send screen - remove grey box from token name */
      .token-info-column .token-fullname {
        background: none !important;
        padding: 0 !important;
        border-radius: 0 !important;
        font-size: 12px !important;
        color: #8A939D !important;
      }
      
      /* Add dollar value display under amount in send screen */
      .dollar-value-display {
        font-size: 12px !important;
        color: #8A939D !important;
        margin-top: 4px !important;
        margin-left: 2px !important;
      }
    `;
    document.head.appendChild(styleElement);
  }

  // Function to fix token detail page
  function fixTokenDetailPage() {
    const tokenDetail = document.getElementById('token-detail');
    if (!tokenDetail) return;
    
    // Check if investment warning is present
    if (!tokenDetail.querySelector('.investment-warning')) {
      const detailContent = tokenDetail.querySelector('.token-detail-content');
      if (detailContent) {
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
        
        // Insert at the beginning of token detail content
        if (detailContent.firstChild) {
          detailContent.insertBefore(warningBanner, detailContent.firstChild);
        } else {
          detailContent.appendChild(warningBanner);
        }
        
        // Add close functionality
        const closeButton = warningBanner.querySelector('.close-warning');
        if (closeButton) {
          closeButton.addEventListener('click', function() {
            warningBanner.style.display = 'none';
          });
        }
      }
    }
    
    // Check if staking container is present
    if (!tokenDetail.querySelector('.staking-container')) {
      const tokenSymbol = document.getElementById('detail-symbol')?.textContent || 'BTC';
      const detailContent = tokenDetail.querySelector('.token-detail-content');
      const transactionHeader = detailContent?.querySelector('.transaction-header');
      
      if (detailContent && transactionHeader) {
        const stakingBanner = document.createElement('div');
        stakingBanner.className = 'staking-container';
        
        // Get token logo URL
        let tokenLogoUrl = 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'; // Default
        if (window.getTokenLogoUrl && typeof window.getTokenLogoUrl === 'function') {
          tokenLogoUrl = window.getTokenLogoUrl(tokenSymbol.toLowerCase());
        }
        
        stakingBanner.innerHTML = `
          <div class="staking-icon">
            <img src="${tokenLogoUrl}" alt="${tokenSymbol}">
          </div>
          <div class="staking-content">
            <h3>Earn ${tokenSymbol}</h3>
            <p>Stake your ${tokenSymbol} to earn up to 6.5% APY</p>
          </div>
          <i class="fas fa-chevron-right staking-arrow"></i>
        `;
        
        // Insert before transaction header
        detailContent.insertBefore(stakingBanner, transactionHeader);
        
        // Add click handler
        stakingBanner.addEventListener('click', function() {
          if (window.showToast && typeof window.showToast === 'function') {
            window.showToast(`${tokenSymbol} staking coming soon`);
          } else {
            alert(`${tokenSymbol} staking coming soon`);
          }
        });
      }
    }
  }

  // Function to fix the send screen
  function fixSendScreen() {
    const sendScreen = document.getElementById('send-screen');
    if (!sendScreen) return;
    
    // Add dollar value display if not present
    const amountInput = sendScreen.querySelector('#send-amount');
    if (amountInput && !sendScreen.querySelector('.dollar-value-display')) {
      const amountContainer = amountInput.closest('.amount-input');
      if (amountContainer) {
        // Create dollar value display
        const valueDisplay = document.createElement('div');
        valueDisplay.className = 'dollar-value-display';
        valueDisplay.textContent = '$0.00';
        
        // Insert after amount input container
        amountContainer.parentNode.insertBefore(valueDisplay, amountContainer.nextSibling);
        
        // Get token price for conversion
        const tokenId = window.activeSendTokenId || 'usdt';
        const activeWallet = window.activeWallet || 'main';
        let tokenPrice = 1; // Default
        
        if (window.currentWalletData && 
            window.currentWalletData[activeWallet] && 
            window.currentWalletData[activeWallet].tokens) {
          const token = window.currentWalletData[activeWallet].tokens.find(t => t.id === tokenId);
          if (token && token.price) {
            tokenPrice = token.price;
          }
        }
        
        // Update dollar value on input
        amountInput.addEventListener('input', function() {
          const amount = parseFloat(this.value) || 0;
          const dollarValue = amount * tokenPrice;
          
          if (window.FormatUtils && typeof window.FormatUtils.formatCurrency === 'function') {
            valueDisplay.textContent = window.FormatUtils.formatCurrency(dollarValue);
          } else {
            valueDisplay.textContent = '$' + dollarValue.toFixed(2);
          }
        });
      }
    }
    
    // Fix token name in selection row - remove background styling
    const tokenFullname = sendScreen.querySelector('.token-info-column .token-fullname');
    if (tokenFullname) {
      tokenFullname.style.background = 'none';
      tokenFullname.style.padding = '0';
      tokenFullname.style.borderRadius = '0';
      tokenFullname.style.fontSize = '12px';
      tokenFullname.style.color = '#8A939D';
    }
  }

  // Function to fix the receive screen
  function fixReceiveScreen() {
    const receiveScreen = document.getElementById('receive-screen');
    if (!receiveScreen) return;
    
    // Replace network badges with contract addresses
    const tokenItems = receiveScreen.querySelectorAll('.token-item');
    tokenItems.forEach(item => {
      const tokenInfo = item.querySelector('.token-info');
      if (!tokenInfo) return;
      
      const tokenPrice = tokenInfo.querySelector('.token-price');
      if (!tokenPrice) return;
      
      // Get the network name
      const networkBadge = tokenPrice.querySelector('.token-network-badge');
      const networkName = networkBadge ? networkBadge.textContent.trim() : tokenPrice.textContent.trim();
      
      // Generate a shortened address format appropriate for the token
      const tokenId = item.getAttribute('data-token-id') || 'unknown';
      let shortAddress = '0xC65B6...E90a51'; // Default ETH-style address
      
      if (tokenId === 'btc') {
        shortAddress = 'bc1qltf...fsxp4p';
      } else if (tokenId === 'sol') {
        shortAddress = 'B8WVMQL...rCs4jB';
      } else if (tokenId === 'trx') {
        shortAddress = 'TZ3gtUo...xghKtX';
      } else if (tokenId === 'xrp') {
        shortAddress = 'rsSmpFn...hiBWxT';
      }
      
      // Create a span for the network name
      const networkSpan = document.createElement('span');
      networkSpan.className = 'token-network-pill';
      networkSpan.textContent = networkName;
      networkSpan.style.display = 'inline-block';
      networkSpan.style.fontSize = '12px';
      networkSpan.style.padding = '2px 6px';
      networkSpan.style.backgroundColor = 'rgba(138, 147, 157, 0.1)';
      networkSpan.style.borderRadius = '10px';
      networkSpan.style.marginRight = '6px';
      
      // Replace token price content
      tokenPrice.innerHTML = '';
      tokenPrice.appendChild(networkSpan);
      
      // Add address display
      const addressSpan = document.createElement('span');
      addressSpan.style.fontFamily = 'monospace';
      addressSpan.style.fontSize = '12px';
      addressSpan.style.color = '#8A939D';
      addressSpan.textContent = shortAddress;
      tokenPrice.appendChild(addressSpan);
    });
    
    // If already in QR view, fix the address display
    const tokenAddressBadge = receiveScreen.querySelector('.token-address-badge');
    if (tokenAddressBadge) {
      const contractAddress = tokenAddressBadge.querySelector('.contract-address');
      if (contractAddress) {
        contractAddress.textContent = '0xC65B6...E90a51';
        contractAddress.style.fontFamily = 'monospace';
      }
    }
  }

  // Apply fixes when screen changes (check if navigateTo function exists)
  function setupNavigationHook() {
    if (window.navigateTo && typeof window.navigateTo === 'function') {
      const originalNavigateTo = window.navigateTo;
      
      window.navigateTo = function(targetScreenId, fromScreenId) {
        // Call original navigation function
        const result = originalNavigateTo.call(this, targetScreenId, fromScreenId);
        
        // Apply appropriate fixes based on target screen
        setTimeout(() => {
          if (targetScreenId === 'token-detail') fixTokenDetailPage();
          if (targetScreenId === 'send-screen') fixSendScreen();
          if (targetScreenId === 'receive-screen') fixReceiveScreen();
        }, 100);
        
        return result;
      };
    }
  }

  // Apply all fixes
  function applyAllFixes() {
    // Inject CSS fixes
    injectCSSFixes();
    
    // Apply specific screen fixes
    fixTokenDetailPage();
    fixSendScreen();
    fixReceiveScreen();
    
    // Set up navigation hook
    setupNavigationHook();
    
    console.log('🔧 TrustWallet UI fixes applied successfully');
  }

  // Initialize fixes when the DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAllFixes);
  } else {
    // DOM already loaded, apply fixes now
    applyAllFixes();
  }
  
  // Set up a MutationObserver to detect dynamic changes and reapply fixes
  const observer = new MutationObserver(mutations => {
    let needsDetailFix = false;
    let needsSendFix = false;
    let needsReceiveFix = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            if (node.id === 'token-detail' || node.querySelector('#token-detail')) {
              needsDetailFix = true;
            }
            if (node.id === 'send-screen' || node.querySelector('#send-screen')) {
              needsSendFix = true;
            }
            if (node.id === 'receive-screen' || node.querySelector('#receive-screen')) {
              needsReceiveFix = true;
            }
          }
        });
      }
    });
    
    if (needsDetailFix) fixTokenDetailPage();
    if (needsSendFix) fixSendScreen();
    if (needsReceiveFix) fixReceiveScreen();
  });
  
  // Start observing the document
  observer.observe(document.body, { childList: true, subtree: true });
})();
