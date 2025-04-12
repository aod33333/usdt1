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
