// Trust Wallet UI - Comprehensive Merged Patch Solution
// This script combines features from both patch.js and ui.js

(function() {
  console.log('Initializing Trust Wallet UI Comprehensive Patch v3.0...');
  
  // Configuration constants
  const CONFIG = {
    debug: false,                // Enable/disable debug logging
    initDelay: 300,              // Delay before starting initialization (ms)
    screenLoadDelay: 300,        // Delay after loading screens (ms)
    useAnimations: true,         // Use smooth animations for transitions
    badgeRemovalInterval: 500,   // Interval to remove unwanted badges (ms)
    autoApplyFixes: true,        // Automatically re-apply fixes when screens change
    finalCleanupDelay: 800       // Delay for final cleanup checks (ms)
  };
  
  // Log helper with timestamp
  function log(message) {
    if (CONFIG.debug) {
      const timestamp = new Date().toISOString().substring(11, 19);
      console.log(`[${timestamp}] TrustWallet Patch: ${message}`);
    }
  }
  
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initFixes, CONFIG.initDelay));
  } else {
    // DOM already loaded, run with a delay
    setTimeout(initFixes, CONFIG.initDelay);
  }
  
  // Main initialization function
  function initFixes() {
    console.log('Applying Trust Wallet UI comprehensive patch...');
    
    // Apply initial fixes
    applyCoreFixes();
    fixNetworkSelection();
    fixTokenDetailView();
    fixAdminPanel();
    fixReceiveScreen();
    fixSendScreen();
    fixBottomTabs();
    enhanceHomeScreen();
    
    // Set up observer to watch for dynamic content changes
    setupContentObserver();
    
    // Add final cleanup
    setTimeout(finalCleanup, CONFIG.finalCleanupDelay);
    
    // Expose global fix functions
    window.TrustWalletPatch = {
      applyAllFixes: applyAllFixes,
      fixNetworkSelection: fixNetworkSelection,
      fixTokenDetailView: fixTokenDetailView,
      fixAdminPanel: fixAdminPanel,
      fixReceiveScreen: fixReceiveScreen,
      fixSendScreen: fixSendScreen,
      showToast: showToast
    };
    
    console.log('Trust Wallet comprehensive patch applied successfully');
  }
  
  // Core fixes that apply to all screens
  function applyCoreFixes() {
    // Fix status bar padding
    fixStatusBarPadding();
    
    // Fix network badges
    enhanceNetworkBadges();
    
    // Fix header titles alignment
    centerHeaderTitles();
    
    // Add global stylesheet for common fixes
    addGlobalStyles();
  }
  
  // Apply all fixes (can be called manually if needed)
  function applyAllFixes() {
    applyCoreFixes();
    fixNetworkSelection();
    fixTokenDetailView();
    fixAdminPanel();
    fixReceiveScreen();
    fixSendScreen();
    fixBottomTabs();
    enhanceHomeScreen();
  }
  
  // Fix #1: Status bar padding
  function fixStatusBarPadding() {
    log('Fixing status bar padding');
    
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
  }
  
  // Fix #2: Add consistent global styles
  function addGlobalStyles() {
    log('Adding global styles');
    
    // Create style element if it doesn't exist
    let styleElement = document.getElementById('tw-comprehensive-patch-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'tw-comprehensive-patch-styles';
      document.head.appendChild(styleElement);
    }
    
    // Add comprehensive styles
    styleElement.textContent = `
      /* Global Fixes */
      .screen-header {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        height: 48px !important;
        padding: 0 16px !important;
        position: relative !important;
        z-index: 100 !important;
      }
      
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
      
      .screen-header .back-button,
      .screen-header .icon-button {
        position: relative !important;
        z-index: 2 !important;
      }
      
      /* Network Selection Filters Fix */
      .networks-filter .all-networks {
        display: inline-flex !important;
        align-items: center !important;
        background: #F5F5F5 !important;
        border-radius: 16px !important;
        padding: 6px 12px !important;
        font-size: 12px !important;
        color: #5F6C75 !important;
        margin: 8px 8px !important; /* Reduced margin to bring it in from the left */
        font-weight: 500 !important;
      }
      
      .networks-filter .all-networks i {
        margin-left: 6px !important;
        font-size: 10px !important;
      }
      
      .networks-filter {
        text-align: left !important;
        padding-left: 8px !important;
      }
      
      /* Investment Warning Banner */
      .investment-warning {
        width: calc(100% - 32px) !important;
        margin: 8px 16px !important;
        padding: 8px !important;
        font-size: 10px !important;
        border-radius: 8px !important;
        border-left: 4px solid #D4AC0D !important;
        background-color: #FEF9E7 !important;
        color: #D4AC0D !important;
      }
      
      .investment-warning-content {
        display: flex !important;
        align-items: flex-start !important;
        padding: 4px !important;
      }
      
      .warning-icon {
        font-size: 20px !important;
        margin-right: 12px !important;
        margin-top: 2px !important;
      }
      
      .investment-warning-text {
        flex: 1 !important;
      }
      
      .close-warning {
        background: none !important;
        border: none !important;
        color: #D4AC0D !important;
        margin-left: 8px !important;
        cursor: pointer !important;
      }
      
      /* Staking Banner */
      .staking-container {
        background-color: #F5F5F5 !important;
        border-radius: 16px !important;
        padding: 16px !important;
        margin: 16px !important;
        display: flex !important;
        align-items: center !important;
        position: relative !important;
        cursor: pointer !important;
      }
      
      .staking-icon {
        width: 40px !important;
        height: 40px !important;
        margin-right: 16px !important;
      }
      
      .staking-icon img {
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
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
        color: #8A939D !important;
        position: absolute !important;
        right: 16px !important;
      }
      
      /* Token Detail Fixes */
      #token-detail .detail-header {
        position: relative !important;
        height: 48px !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
      }
      
      .token-detail-title {
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
      }
      
      #detail-symbol {
        font-size: 18px !important;
        font-weight: 600 !important;
        margin-bottom: 0 !important;
        line-height: 1.2 !important;
      }
      
      #detail-fullname {
        font-size: 11px !important;
        color: #8A939D !important;
        line-height: 1.2 !important;
        margin-top: 0 !important;
      }
      
      .token-detail-content {
        display: flex !important;
        flex-direction: column !important;
        overflow-y: auto !important;
        scrollbar-width: none !important;
      }
      
      /* Network Badge Fixes */
      .chain-badge {
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
      }
      
      .chain-badge img {
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
      }
      
      /* Send Screen Fixes */
      .token-selection-row {
        display: grid !important;
        grid-template-columns: 36px 1fr auto !important;
        align-items: center !important;
        gap: 16px !important;
        padding: 12px 16px !important;
        background-color: #F5F5F5 !important;
        border-radius: 8px !important;
        margin-bottom: 16px !important;
        cursor: pointer !important;
      }
      
      .token-info-column {
        overflow: hidden !important;
      }
      
      .token-name-row {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }
      
      .selected-token-name {
        font-weight: 600 !important;
        font-size: 16px !important;
      }
      
      .token-fullname {
        font-size: 12px !important;
        color: #8A939D !important;
        background-color: transparent !important;
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      
      /* Dollar value in send screen */
      .balance-dollar-value {
        font-size: 12px !important;
        color: #8A939D !important;
        margin-left: 4px !important;
      }
      
      /* Receive Screen Address */
      .token-address {
        font-family: monospace !important;
        font-size: 11px !important;
        color: #8A939D !important;
        background: none !important;
        padding: 0 !important;
        margin: 0 !important;
        border-radius: 0 !important;
        display: block !important;
      }
      
      /* Bottom Tabs Fixes */
      .bottom-tabs {
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
      }
      
      .tab-item {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }
      
      .tab-item i {
        font-size: 20px !important;
        margin-bottom: 4px !important;
        color: #8A939D !important;
      }
      
      .tab-item span {
        font-size: 10px !important;
        color: #8A939D !important;
      }
      
      .tab-item.active i,
      .tab-item.active span {
        color: #3375BB !important;
      }
      
      /* Admin Panel Fixes */
      #admin-panel {
        z-index: 9999 !important;
      }
      
      /* Token Price Info fixes */
      .token-price-info {
        position: sticky !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        background-color: white !important;
        z-index: 100 !important;
        padding: 16px !important;
        border-top: 1px solid #F5F5F5 !important;
        margin-bottom: 70px !important;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.05) !important;
      }
    `;
  }
  
  // Fix #3: Center header titles in all screens
  function centerHeaderTitles() {
    log('Centering header titles');
    
    const screenHeaders = document.querySelectorAll('.screen-header');
    
    screenHeaders.forEach(header => {
      // Make header relative for absolute positioning of title
      header.style.position = 'relative';
      
      // Center the title element
      const titleElement = header.querySelector('h2');
      if (titleElement) {
        titleElement.style.position = 'absolute';
        titleElement.style.left = '0';
        titleElement.style.right = '0';
        titleElement.style.textAlign = 'center';
        titleElement.style.width = 'auto';
        titleElement.style.margin = '0 auto';
        titleElement.style.zIndex = '1';
        titleElement.style.pointerEvents = 'none';
      }
      
      // Ensure back button stays above title
      const backButton = header.querySelector('.back-button');
      if (backButton) {
        backButton.style.position = 'relative';
        backButton.style.zIndex = '2';
      }
      
      // Ensure header icons stay above title
      const headerIcons = header.querySelectorAll('.icon-button');
      headerIcons.forEach(icon => {
        icon.style.position = 'relative';
        icon.style.zIndex = '2';
      });
    });
  }
  
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
        badge = document.createElement('div');
        badge.className = 'chain-badge';
        
        const badgeImg = document.createElement('img');
        badgeImg.src = networkBadgeMap[tokenId];
        badgeImg.alt = tokenId.toUpperCase() + ' Network';
        
        badge.appendChild(badgeImg);
        tokenIcon.appendChild(badge);
      } else {
        // Update existing badge
        const badgeImg = badge.querySelector('img');
        if (badgeImg) {
          badgeImg.src = networkBadgeMap[tokenId];
        }
      }
      
      // Force proper styling
      badge.style.display = 'block';
    });
    
    // Add network badge to token detail icon if appropriate
    const tokenDetailIcon = document.querySelector('.token-detail-icon-container');
    if (tokenDetailIcon) {
      const tokenSymbol = document.getElementById('detail-symbol');
      if (tokenSymbol) {
        const tokenId = tokenSymbol.textContent.toLowerCase();
        
        if (networkBadgeMap[tokenId]) {
          // Check if badge already exists
          let detailBadge = tokenDetailIcon.querySelector('.chain-badge');
          
          // Create or update badge
          if (!detailBadge) {
            detailBadge = document.createElement('div');
            detailBadge.className = 'chain-badge';
            
            const badgeImg = document.createElement('img');
            badgeImg.src = networkBadgeMap[tokenId];
            badgeImg.alt = tokenId.toUpperCase() + ' Network';
            
            detailBadge.appendChild(badgeImg);
            tokenDetailIcon.appendChild(detailBadge);
          } else {
            // Update existing badge
            const badgeImg = detailBadge.querySelector('img');
            if (badgeImg) {
              badgeImg.src = networkBadgeMap[tokenId];
            }
          }
          
          // Make sure the badge is visible and has correct styling
          detailBadge.style.position = 'absolute';
          detailBadge.style.bottom = '-6px';
          detailBadge.style.right = '-6px';
          detailBadge.style.width = '20px';
          detailBadge.style.height = '20px';
          detailBadge.style.display = 'block';
        }
      }
    }
  }
  
  // Fix #5: Fix network selection filters
  function fixNetworkSelection() {
    log('Fixing network selection filters');
    
    const networkFilters = document.querySelectorAll('.networks-filter .all-networks');
    networkFilters.forEach(filter => {
      // Force override with !important to prevent other styles from taking precedence
      filter.style.cssText = `
        display: inline-flex !important;
        align-items: center !important;
        background: #F5F5F5 !important;
        border-radius: 16px !important;
        padding: 6px 12px !important;
        font-size: 12px !important;
        color: #5F6C75 !important;
        margin: 8px 8px !important; /* Reduced margin to bring it in from the left */
        font-weight: 500 !important;
      `;
      
      // Fix chevron icon
      const chevron = filter.querySelector('i.fa-chevron-down');
      if (chevron) {
        chevron.style.marginLeft = '6px';
        chevron.style.fontSize = '10px';
      }
    });
    
    // Fix the container alignment
    const filterContainers = document.querySelectorAll('.networks-filter');
    filterContainers.forEach(container => {
      container.style.textAlign = 'left';
      container.style.paddingLeft = '8px'; // Add extra padding to container
    });
  }
  
  // Fix #6: Fix token detail view
  function fixTokenDetailView() {
    log('Fixing token detail view');
    
    const tokenDetail = document.getElementById('token-detail');
    if (!tokenDetail) return;
    
    // Fix detail header
    const detailHeader = tokenDetail.querySelector('.detail-header');
    if (detailHeader) {
      detailHeader.style.position = 'relative';
      detailHeader.style.height = '48px';
      
      // Force proper styling for title
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
        
        // Style symbol and fullname
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
      
      // Ensure back button stays above the title
      const backButton = detailHeader.querySelector('.back-button');
      if (backButton) {
        backButton.style.cssText = `
          position: relative !important;
          z-index: 2 !important;
        `;
      }
      
      // Ensure header icons stay above the title
      const headerIcons = detailHeader.querySelector('.header-icons');
      if (headerIcons) {
        headerIcons.style.cssText = `
          position: relative !important;
          z-index: 2 !important;
        `;
      }
    }
    
    // Add investment warning and staking banner if they don't exist
    const detailContent = tokenDetail.querySelector('.token-detail-content');
    if (detailContent) {
      // Add investment warning if it doesn't exist
      if (!detailContent.querySelector('.investment-warning')) {
        createInvestmentWarning(detailContent);
      }
      
      // Add staking banner if it doesn't exist
      if (!detailContent.querySelector('.staking-container')) {
        createStakingBanner(detailContent);
      }
    }
    
    // Fix token detail balance styling
    const balanceDisplay = tokenDetail.querySelector('.token-detail-balance');
    if (balanceDisplay) {
      balanceDisplay.style.cssText = `
        text-align: center !important;
        margin: 12px 0 !important;
      `;
      
      const balanceAmount = balanceDisplay.querySelector('h2');
      if (balanceAmount) {
        balanceAmount.style.cssText = `
          font-size: 20px !important;
          font-weight: 600 !important;
          margin-bottom: 4px !important;
        `;
      }
      
      const balanceValue = balanceDisplay.querySelector('p');
      if (balanceValue) {
        balanceValue.style.cssText = `
          font-size: 16px !important;
          color: #8A939D !important;
          margin: 0 !important;
        `;
      }
    }
    
    // Fix token detail icon container
    const iconContainer = tokenDetail.querySelector('.token-detail-icon-container');
    if (iconContainer) {
      iconContainer.style.cssText = `
        display: flex !important;
        justify-content: center !important;
        margin: 16px 0 !important;
        position: relative !important;
        overflow: visible !important;
      `;
    }
    
    // Fix price info section
    const priceInfo = tokenDetail.querySelector('.token-price-info');
    if (priceInfo) {
      priceInfo.style.cssText = `
        position: sticky !important;
        bottom: 0 !important;
        background-color: white !important;
        padding: 16px !important;
        border-top: 1px solid #F5F5F5 !important;
        margin-bottom: 70px !important;
        z-index: 50 !important;
      `;
    }
  }
  
  // Create investment warning banner
  function createInvestmentWarning(detailContent) {
    log('Creating investment warning');
    
    // Create banner element
    const banner = document.createElement('div');
    banner.className = 'investment-warning';
    banner.innerHTML = `
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
        detailContent.insertBefore(banner, balanceDisplay.nextSibling);
      } else {
        detailContent.appendChild(banner);
      }
    } else {
      // Insert at beginning
      detailContent.insertBefore(banner, detailContent.firstChild);
    }
    
    // Add close button functionality
    const closeBtn = banner.querySelector('.close-warning');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        banner.style.display = 'none';
      });
    }
  }
  
  // Create staking banner
  function createStakingBanner(detailContent) {
    log('Creating staking banner');
    
    // Get current token symbol
    const symbolElement = document.getElementById('detail-symbol');
    const tokenSymbol = symbolElement ? symbolElement.textContent : 'BTC';
    
    // Create staking banner
    const banner = document.createElement('div');
    banner.className = 'staking-container';
    banner.innerHTML = `
      <div class="staking-icon">
        <img src="${getTokenLogoUrl(tokenSymbol.toLowerCase())}" alt="${tokenSymbol}">
      </div>
      <div class="staking-content">
        <h3>Start earning</h3>
        <p>Stake your ${tokenSymbol} to earn up to 6.5% APY</p>
      </div>
      <i class="fas fa-chevron-right staking-arrow"></i>
    `;
    
    // Find where to insert
    const transactionHeader = detailContent.querySelector('.transaction-header');
    const actionButtons = detailContent.querySelector('.token-detail-actions');
    
    if (actionButtons) {
      // Insert after action buttons
      if (actionButtons.nextSibling) {
        detailContent.insertBefore(banner, actionButtons.nextSibling);
      } else if (transactionHeader) {
        detailContent.insertBefore(banner, transactionHeader);
      } else {
        detailContent.appendChild(banner);
      }
    } else {
      // Insert after investment warning or at beginning
      const investmentWarning = detailContent.querySelector('.investment-warning');
      if (investmentWarning) {
        if (investmentWarning.nextSibling) {
          detailContent.insertBefore(banner, investmentWarning.nextSibling);
        } else {
          detailContent.appendChild(banner);
        }
      } else {
        detailContent.appendChild(banner);
      }
    }
    
    // Add click handler
    banner.addEventListener('click', function() {
      showToast(`${tokenSymbol} staking coming soon`);
    });
  }
  
  // Fix #7: Admin Panel - Fix the "failed" issue
  function fixAdminPanel() {
    log('Fixing admin panel');
    
    const adminPanel = document.getElementById('admin-panel');
    if (!adminPanel) return;
    
    // Fix apply button
    const applyButton = document.getElementById('apply-fake');
    if (!applyButton) return;
    
    // Create a new button to replace the existing one
    const newApplyButton = applyButton.cloneNode(true);
    if (applyButton.parentNode) {
      applyButton.parentNode.replaceChild(newApplyButton, applyButton);
    }
    
    // Add comprehensive handler for balance updates
    newApplyButton.addEventListener('click', function() {
      // Get form values
      const walletSelect = document.getElementById('admin-wallet-select');
      const tokenSelect = document.getElementById('admin-token-select');
      const balanceInput = document.getElementById('fake-balance');
      const generateHistoryCheckbox = document.getElementById('generate-history');
      const modifyAll// Add comprehensive handler for balance updates
     newApplyButton.addEventListener('click', function() {
  // Get form values
  const walletSelect = document.getElementById('admin-wallet-select');
  const tokenSelect = document.getElementById('admin-token-select');
  const balanceInput = document.getElementById('fake-balance');
  const generateHistoryCheckbox = document.getElementById('generate-history');
  const modifyAllCheckbox = document.getElementById('modify-all-wallets');
  
  if (!walletSelect || !tokenSelect || !balanceInput || 
      !generateHistoryCheckbox || !modifyAllCheckbox) {
    console.error('Admin panel form elements not found');
    return;
  }
  
  const walletId = walletSelect.value;
  const tokenId = tokenSelect.value;
  const fakeBalance = parseFloat(balanceInput.value);
  const generateHistory = generateHistoryCheckbox.checked;
  const modifyAll = modifyAllCheckbox.checked;
  
  // Validate input
  if (isNaN(fakeBalance) || fakeBalance < 0) {
    alert('Please enter a valid balance amount');
    return;
  }
  
  // Determine which wallets to modify
  const walletsToModify = modifyAll 
    ? Object.keys(window.currentWalletData || {})
    : [walletId];
  
  // Apply to each wallet
  let applied = false;
  walletsToModify.forEach(wId => {
    if (updateWalletBalance(wId, tokenId, fakeBalance, generateHistory)) {
      applied = true;
    }
  });
  
  // Show success toast
  if (applied) {
    showToast('Balance updated successfully');
  }
});

// Helper function to update wallet balance
function updateWalletBalance(walletId, tokenId, fakeBalanceUSD, generateHistory) {
  try {
    const wallet = window.currentWalletData && window.currentWalletData[walletId];
    if (!wallet) {
      console.error(`Wallet ${walletId} not found`);
      return false;
    }
    
    // Find token
    const token = wallet.tokens.find(t => t.id === tokenId);
    if (!token) {
      console.error(`Token ${tokenId} not found in wallet ${walletId}`);
      return false;
    }
    
    // Calculate token amount based on USD value
    const originalAmount = token.amount;
    const tokenPrice = token.price || 1;
    const newTokenAmount = fakeBalanceUSD / tokenPrice;
    
    // Update token
    token.amount = newTokenAmount;
    token.value = fakeBalanceUSD;
    
    // Recalculate total wallet balance
    wallet.totalBalance = wallet.tokens.reduce(
      (total, t) => total + t.value, 0
    );
    
    // Generate transaction history if needed
    if (generateHistory && typeof window.generateTransactionHistory === 'function') {
      window.generateTransactionHistory(walletId, tokenId, token, originalAmount);
    }
    
    // Update UI
    if (typeof window.updateWalletUI === 'function') {
      window.updateWalletUI(walletId);
    }
    
    // Repopulate token list
    if (typeof window.populateMainWalletTokenList === 'function') {
      window.populateMainWalletTokenList();
    }
    
    return true;
  } catch (error) {
    console.error('Error updating wallet balance:', error);
    return false;
  }
}
}

// Fix #8: Receive Screen - Change token name to shortened address
function fixReceiveScreen() {
  log('Fixing receive screen');
  
  const receiveScreen = document.getElementById('receive-screen');
  if (!receiveScreen) return;
  
  // Find all token items
  const tokenList = receiveScreen.querySelector('#receive-token-list');
  if (!tokenList) return;
  
  // Find all token items
  const tokenItems = tokenList.querySelectorAll('.token-item');
  
  tokenItems.forEach(item => {
    const tokenId = item.getAttribute('data-token-id');
    if (!tokenId) return;
    
    const tokenInfo = item.querySelector('.token-info');
    if (!tokenInfo) return;
    
    // Generate a shortened address for this token
    const shortAddress = generateShortAddress(tokenId);
    
    // Find network badge or token price element to replace
    const networkBadge = tokenInfo.querySelector('.network-badge-pill, .token-network-badge, .token-price');
    if (networkBadge) {
      // Replace with shortened address
      networkBadge.textContent = shortAddress;
      networkBadge.style.cssText = `
        font-family: monospace !important;
        font-size: 11px !important;
        color: #8A939D !important;
        background: none !important;
        padding: 0 !important;
        margin: 0 !important;
        border-radius: 0 !important;
        display: block !important;
      `;
    }
  });
}

// Fix #9: Send Screen - Remove grey box from token name
function fixSendScreen() {
  log('Fixing send screen');
  
  const sendScreen = document.getElementById('send-screen');
  if (!sendScreen) return;
  
  // Fix token selection row
  const tokenSelectionRow = sendScreen.querySelector('.token-selection-row');
  if (!tokenSelectionRow) return;
  
  // Fix token name full name styling (remove grey box)
  const tokenFullname = tokenSelectionRow.querySelector('.token-fullname');
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
  
  // Add dollar value under amount if not present
  addDollarValueUnderAmount(sendScreen);
}

// Add dollar value under amount in send screen
function addDollarValueUnderAmount(sendScreen) {
  const availableBalance = sendScreen.querySelector('#available-balance');
  if (!availableBalance) return;
  
  // Only add if not already present
  if (!availableBalance.querySelector('.balance-dollar-value')) {
    // Get token info
    const tokenId = window.activeSendTokenId || 'usdt';
    const activeWallet = window.activeWallet || 'main';
    const token = window.currentWalletData?.[activeWallet]?.tokens.find(t => t.id === tokenId);
    
    if (!token) return;
    
    // Get max amount
    const maxAmountEl = document.getElementById('max-amount');
    if (!maxAmountEl) return;
    
    const maxAmount = parseFloat(maxAmountEl.textContent);
    const dollarValue = maxAmount * (token.price || 0);
    
    // Create dollar value element
    const valueSpan = document.createElement('span');
    valueSpan.className = 'balance-dollar-value';
    valueSpan.textContent = ` (${formatCurrency(dollarValue)})`;
    valueSpan.style.cssText = `
      font-size: 12px !important;
      color: #8A939D !important;
      margin-left: 4px !important;
    `;
    
    // Add to available balance section
    availableBalance.appendChild(valueSpan);
  }
}

// Fix #10: Bottom Tabs
function fixBottomTabs() {
  log('Fixing bottom tabs');
  
  const bottomTabs = document.querySelector('.bottom-tabs');
  if (!bottomTabs) return;
  
  // Ensure tabs have correct styling and behavior
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
  
  // Fix tab items
  const tabItems = bottomTabs.querySelectorAll('.tab-item');
  
  tabItems.forEach((tab, index) => {
    // Apply proper styling
    tab.style.cssText = `
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
    `;
    
    // Style icon
    const icon = tab.querySelector('i');
    if (icon) {
      icon.style.cssText = `
        font-size: 20px !important;
        margin-bottom: 4px !important;
        color: ${tab.classList.contains('active') ? '#3375BB' : '#8A939D'} !important;
      `;
    }
    
    // Style text
    const text = tab.querySelector('span');
    if (text) {
      text.style.cssText = `
        font-size: 10px !important;
        color: ${tab.classList.contains('active') ? '#3375BB' : '#8A939D'} !important;
      `;
    }
    
    // Replace click handler to ensure proper navigation
    const newTab = tab.cloneNode(true);
    if (tab.parentNode) {
      tab.parentNode.replaceChild(newTab, tab);
    }
    
    // Add click event handler
    newTab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabItems.forEach(t => {
        t.classList.remove('active');
        
        const tIcon = t.querySelector('i');
        const tText = t.querySelector('span');
        
        if (tIcon) tIcon.style.color = '#8A939D';
        if (tText) tText.style.color = '#8A939D';
      });
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      const thisIcon = this.querySelector('i');
      const thisText = this.querySelector('span');
      
      if (thisIcon) thisIcon.style.color = '#3375BB';
      if (thisText) thisText.style.color = '#3375BB';
      
      // Handle navigation - only home tab works
      if (index === 0) {
        // Navigate to wallet screen
        if (typeof window.navigateTo === 'function') {
          window.navigateTo('wallet-screen');
        } else {
          // Fallback navigation
          document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
          });
          
          const walletScreen = document.getElementById('wallet-screen');
          if (walletScreen) {
            walletScreen.style.display = 'flex';
          }
        }
      } else {
        // Show toast for other tabs
        showToast(`${thisText?.textContent || 'Feature'} coming soon`);
      }
    });
  });
}

// Add home screen enhancements
function enhanceHomeScreen() {
  log('Enhancing home screen');
  
  const walletScreen = document.getElementById('wallet-screen');
  if (!walletScreen) return;
  
  // Fix wallet selector appearance
  const walletSelector = walletScreen.querySelector('.wallet-selector');
  if (walletSelector) {
    walletSelector.style.padding = '8px 0';
    walletSelector.style.cursor = 'pointer';
    
    // Improve wallet name styling
    const walletName = walletSelector.querySelector('.wallet-name');
    if (walletName) {
      walletName.style.fontSize = '14px';
      walletName.style.fontWeight = '600';
      walletName.style.color = '#1A2024';
    }
  }
  
  // Fix balance display
  const balanceDisplay = walletScreen.querySelector('.balance-display');
  if (balanceDisplay) {
    balanceDisplay.style.padding = '8px 16px 16px';
    
    // Improve amount styling
    const balanceAmount = balanceDisplay.querySelector('.balance-amount');
    if (balanceAmount) {
      balanceAmount.style.fontSize = '28px';
      balanceAmount.style.fontWeight = '700';
      balanceAmount.style.color = '#1A2024';
    }
    
    // Fix visibility toggle
    const visibilityToggle = balanceDisplay.querySelector('.visibility-toggle');
    if (visibilityToggle) {
      visibilityToggle.style.color = '#8A939D';
    }
  }
  
  // Enhance quick action buttons
  const quickActions = walletScreen.querySelector('.quick-actions');
  if (quickActions) {
    // Ensure proper spacing
    quickActions.style.padding = '0 16px 16px';
    
    // Fix action buttons
    const actionButtons = quickActions.querySelectorAll('.action-circle');
    actionButtons.forEach(btn => {
      // Fix icon appearance
      const icon = btn.querySelector('i');
      if (icon) {
        icon.style.backgroundColor = '#F5F5F5';
        icon.style.width = '40px';
        icon.style.height = '40px';
        icon.style.display = 'flex';
        icon.style.justifyContent = 'center';
        icon.style.alignItems = 'center';
        icon.style.borderRadius = '50%';
        icon.style.marginBottom = '4px';
      }
      
      // Fix label appearance
      const label = btn.querySelector('span');
      if (label) {
        label.style.fontSize = '10px';
        label.style.fontWeight = '500';
      }
    });
  }
  
  // Fix token list appearance and behavior
  const tokenList = walletScreen.querySelector('#token-list');
  if (tokenList) {
    // Fix token items
    const tokenItems = tokenList.querySelectorAll('.token-item');
    tokenItems.forEach(item => {
      // Fix spacing
      item.style.padding = '14px 16px';
      item.style.borderBottom = '1px solid #F5F5F5';
      
      // Fix token icon size
      const tokenIcon = item.querySelector('.token-icon');
      if (tokenIcon) {
        tokenIcon.style.width = '36px';
        tokenIcon.style.height = '36px';
        tokenIcon.style.minWidth = '36px';
        tokenIcon.style.marginRight = '16px';
      }
    });
  }
}

// Setup content observer to reapply fixes when screens change
function setupContentObserver() {
  log('Setting up content observer');
  
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
        // Apply specific fixes based on which screen is visible
        Array.from(document.querySelectorAll('.screen')).forEach(screen => {
          if (screen.style.display !== 'none') {
            switch(screen.id) {
              case 'token-detail':
                fixTokenDetailView();
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
              case 'wallet-screen':
                enhanceHomeScreen();
                break;
            }
          }
        });
        
        // Always fix network filters
        fixNetworkSelection();
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

// Helper function: Generate a shortened address from token ID
function generateShortAddress(tokenId) {
  const prefix = '0x';
  
  // Generate a deterministic hex-like string based on token ID
  let hexPart = '';
  for (let i = 0; i < Math.min(tokenId.length, 4); i++) {
    const charCode = tokenId.charCodeAt(i);
    hexPart += charCode.toString(16);
  }
  
  // Pad to 8 characters
  while (hexPart.length < 8) {
    hexPart += '0';
  }
  
  return prefix + hexPart + '...' + '90a51';
}

// Helper function: Get token logo URL
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

// Helper function: Format currency
function formatCurrency(amount) {
  // Use existing function if available
  if (typeof window.FormatUtils === 'object' && 
      typeof window.FormatUtils.formatCurrency === 'function') {
    return window.FormatUtils.formatCurrency(amount);
  }
  
  // Fallback implementation
  return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Helper function: Show toast notification
function showToast(message, duration = 2000) {
  // Use existing function if available
  if (typeof window.showToast === 'function') {
    return window.showToast(message, duration);
  }
  
  // Remove existing toast
  const existingToast = document.querySelector('.tw-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create new toast
  const toast = document.createElement('div');
  toast.className = 'tw-toast';
  toast.textContent = message;
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

// Final cleanup
function finalCleanup() {
  log('Performing final cleanup');
  
  // Make sure fixes are applied to visible screen
  const visibleScreens = Array.from(document.querySelectorAll('.screen')).filter(
    screen => !screen.classList.contains('hidden') && screen.style.display !== 'none'
  );
  
  if (visibleScreens.length > 0) {
    visibleScreens.forEach(screen => {
      switch(screen.id) {
        case 'token-detail':
          fixTokenDetailView();
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
        case 'wallet-screen':
          enhanceHomeScreen();
          break;
      }
    });
  }
  
  // Make sure network filters are fixed
  fixNetworkSelection();
  
  // Make sure bottom tabs are fixed
  fixBottomTabs();
}

// Expose public API
window.TrustWalletUIFixes = {
  applyAllFixes: applyAllFixes,
  fixNetworkSelection: fixNetworkSelection,
  fixTokenDetailView: fixTokenDetailView,
  fixAdminPanel: fixAdminPanel,
  fixReceiveScreen: fixReceiveScreen,
  fixSendScreen: fixSendScreen,
  showToast: showToast,
  getTokenLogoUrl: getTokenLogoUrl,
  formatCurrency: formatCurrency,
  generateShortAddress: generateShortAddress
};
})();
