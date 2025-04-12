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
            <img src="data:image/png;base64,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" alt="QR Code" id="qr-code">
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
