// ----------------
// Authentication & Admin
// ----------------

// Fix function references - ensuring all required functions are available globally
if (!window.log) {
  window.log = function(message, type = 'info') {
    console.log(`[${type}] TrustWallet: ${message}`);
  };
}

if (!window.formatCurrency) {
  window.formatCurrency = function(amount, currency = 'USD') {
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
  };
}

if (!window.enhanceTokenDetailBadge) {
  window.enhanceTokenDetailBadge = function() {
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
      // Create badge
      detailBadge = document.createElement('div');
      detailBadge.className = 'chain-badge';
      
      const badgeImg = document.createElement('img');
      badgeImg.src = token.chainBadge;
      badgeImg.alt = token.network || (token.id.toUpperCase() + ' Network');
      
      detailBadge.appendChild(badgeImg);
      detailBadge.style.cssText = `
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
      
      tokenDetailIcon.appendChild(detailBadge);
    }
  };
}

if (!window.fixStakingBanner) {
  window.fixStakingBanner = function() {
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
  };
}

if (!window.updateTransactionList) {
  window.updateTransactionList = function(tokenId) {
    const transactionList = document.getElementById('transaction-list');
    if (!transactionList) return;
    
    // Clear existing content
    transactionList.innerHTML = '';
    
    const activeWallet = window.activeWallet || 'main';
    const transactions = window.currentTransactions?.[activeWallet]?.[tokenId] || [];
    
    if (transactions.length === 0) {
      // Show empty state
      transactionList.innerHTML = `
        <div class="no-transactions">
          <p>No transaction history available</p>
          <div class="explorer-link">
            <a href="#" id="view-on-explorer">View on Block Explorer</a>
          </div>
        </div>
      `;
      
      // Add explorer link handler
      const explorerLink = transactionList.querySelector('#view-on-explorer');
      if (explorerLink) {
        explorerLink.addEventListener('click', function(e) {
          e.preventDefault();
          const explorerOverlay = document.getElementById('explorer-overlay');
          if (explorerOverlay) {
            explorerOverlay.style.display = 'flex';
          }
        });
      }
      
      return;
    }
    
    // Use similar rendering logic from populateTransactionHistory
    transactions.forEach(tx => {
      const txItem = document.createElement('div');
      txItem.className = `transaction-item transaction-${tx.type}`;
      
      // Format values similar to populateTransactionHistory
      const formattedAmount = tx.amount.toFixed(6);
      const formattedValue = window.formatCurrency(tx.value);
      
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
  };
}

function initPasscodeHandling() {
    window.log('Initializing passcode handling');
    
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
    
    // Find dots before using them
    const dots = document.querySelectorAll('.passcode-dots .dot');
    
    // Make sure to only add event listeners once
    if (!window.passcodInitialized) {
        const numpadKeys = document.querySelectorAll('.numpad-key');
        numpadKeys.forEach(key => {
            key.addEventListener('click', function() {
                const keyValue = this.getAttribute('data-key');
                
                if (keyValue === 'back') {
                    if (window.passcodeEntered.length > 0) {
                        window.passcodeEntered = window.passcodeEntered.slice(0, -1);
                        updateDotsUI(dots);
                    }
                } else if (keyValue === 'bio') {
                    unlockWallet();
                } else {
                    if (window.passcodeEntered.length < 6) {
                        window.passcodeEntered += keyValue;
                        updateDotsUI(dots);
                        
                        if (window.passcodeEntered.length === 6) {
                            setTimeout(function() { validatePasscode(dots); }, 300);
                        }
                    }
                }
            });
        });
        window.passcodInitialized = true;
    }
    
    // Detailed function definitions with error handling
    function updateDotsUI(dots) {
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
    
    function validatePasscode(dots) {
        try {
            if (window.passcodeEntered === window.correctPasscode) {
                unlockWallet();
            } else if (window.passcodeEntered.length === 6) {
                const dotsContainer = document.querySelector('.passcode-dots');
                dotsContainer.classList.add('shake');
                
                setTimeout(() => {
                    window.passcodeEntered = '';
                    updateDotsUI(dots);
                    dotsContainer.classList.remove('shake');
                }, 500);

                if (typeof window.showToast === 'function') {
                    window.showToast('Invalid passcode. Try again.', 1500);
                } else {
                    console.log('Invalid passcode. Try again.');
                }
            }
        } catch (error) {
            console.error('Passcode validation error:', error);
            if (typeof window.showToast === 'function') {
                window.showToast('Validation failed');
            }
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
                
                // Trigger screen transition
                if (typeof window.screenTransitionHandler === 'function') {
                    window.screenTransitionHandler('wallet-screen');
                }
            }
        } catch (error) {
            console.error('Unlock wallet error:', error);
            if (typeof window.showToast === 'function') {
                window.showToast('Unlock failed');
            }
        }
    }
}

// Ensure the function is globally available
window.initPasscodeHandling = initPasscodeHandling;

// Demo balance setup function
window.setupDemoBalance = function() {
    if (typeof window.log === 'function') {
        window.log('Setting up demo balance');
    } else {
        console.log('Setting up demo balance');
    }
    
    // Make sure wallet data is initialized
    if (!window.currentWalletData) {
        if (typeof window.setupDefaultWalletData === 'function') {
            window.setupDefaultWalletData();
        }
    }
    
    // Update total balance display
    if (typeof window.updateBalanceDisplay === 'function') {
        window.updateBalanceDisplay();
    }
    
    // Populate token list
    if (typeof window.populateMainWalletTokenList === 'function') {
        window.populateMainWalletTokenList();
    }
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
  if (typeof window.navigateTo === 'function') {
    window.navigateTo('send-screen');
  } else {
    // Fallback navigation
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      if (screen.id === 'send-screen') {
        screen.classList.remove('hidden');
      } else {
        screen.classList.add('hidden');
      }
    });
  }
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
    if (typeof window.navigateTo === 'function') {
      window.navigateTo('receive-screen');
    } else {
      // Fallback navigation
      const screens = document.querySelectorAll('.screen');
      screens.forEach(screen => {
        if (screen.id === 'receive-screen') {
          screen.classList.remove('hidden');
        } else {
          screen.classList.add('hidden');
        }
      });
    }
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
      if (typeof window.formatCurrency === 'function') {
        balanceValue.textContent = window.formatCurrency(token.value);
      } else if (typeof window.FormatUtils?.formatCurrency === 'function') {
        balanceValue.textContent = window.FormatUtils.formatCurrency(token.value);
      } else {
        balanceValue.textContent = '$' + token.value.toFixed(2);
      }
    }
    
    // Update price info
    const currentPrice = document.getElementById('token-current-price');
    const priceChange = document.getElementById('token-price-change');
    
    if (currentPrice) {
      if (typeof window.formatCurrency === 'function') {
        currentPrice.textContent = window.formatCurrency(token.price);
      } else if (typeof window.FormatUtils?.formatCurrency === 'function') {
        currentPrice.textContent = window.FormatUtils.formatCurrency(token.price);
      } else {
        currentPrice.textContent = '$' + token.price.toFixed(2);
      }
    }
    
    if (priceChange) {
      priceChange.textContent = `${token.change >= 0 ? '+' : ''}${token.change}%`;
      priceChange.className = token.change >= 0 ? 'positive' : 'negative';
    }
    
    // Update network badge
    if (typeof window.enhanceTokenDetailBadge === 'function') {
      window.enhanceTokenDetailBadge();
    }
    
    // Clear and update transaction list
    if (typeof window.updateTransactionList === 'function') {
      window.updateTransactionList(tokenId);
    }
    
    // Show staking option if available
    if (typeof window.fixStakingBanner === 'function') {
      window.fixStakingBanner();
    }
    
    // Navigate to token detail screen
    if (typeof window.navigateTo === 'function') {
      window.navigateTo('token-detail');
    } else {
      // Fallback navigation
      const screens = document.querySelectorAll('.screen');
      screens.forEach(screen => {
        if (screen.id === 'token-detail') {
          screen.classList.remove('hidden');
        } else {
          screen.classList.add('hidden');
        }
      });
    }
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
    if (typeof window.log === 'function') {
      window.log('Fixing admin panel');
    } else {
      console.log('Fixing admin panel');
    }
    
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
        if (typeof window.showToast === 'function') {
          window.showToast('Balance updated successfully');
        }
      } catch (error) {
        console.error(`Admin panel error: ${error.message}`);
        if (typeof window.showToast === 'function') {
          window.showToast('Failed to update balance');
        }
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
      if (typeof window.showToast === 'function') {
        window.showToast('Please enter a valid balance amount');
      }
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
      console.error(`Failed to update wallet balance: ${error.message}`);
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
      if (typeof window.showToast === 'function') {
        window.showToast('Fake balances have expired and been reset');
      }
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
        // Simple deep clone
        window.currentWalletData[walletId] = JSON.parse(JSON.stringify(window.originalWalletData[walletId]));
      }

      // Reset transactions
      if (window.currentTransactions?.[walletId]) {
        window.currentTransactions[walletId] = {};
      }

      // Update UI
      updateUIAfterBalanceChange(walletId);

      if (typeof window.showToast === 'function') {
        window.showToast(`${walletId} wallet reset to original state`);
      }
    } catch (error) {
      console.error(`Failed to reset wallet: ${error.message}`);
      if (typeof window.showToast === 'function') {
        window.showToast('Failed to reset wallet');
      }
    }
  }

  function resetAllWallets() {
    try {
      // Reset all wallet data using direct object cloning
      if (window.originalWalletData) {
        window.currentWalletData = JSON.parse(JSON.stringify(window.originalWalletData));
      }

      // Reset all transactions with a clean object
      window.currentTransactions = {};

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
      console.error(`Failed to reset all wallets: ${error.message}`);
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
    if (debugOutput.parentNode) {
      debugOutput.parentNode.insertBefore(clearButton, debugOutput);
    }
  }

  function setupAdminPanelActivation() {
    if (typeof window.log === 'function') {
      window.log('Setting up admin panel access');
    } else {
      console.log('Setting up admin panel access');
    }
    
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

  window.showAdminPanel = function() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
      adminPanel.style.display = 'flex';
      
      // Make sure the form is populated with current wallet info
      updateAdminFormWithCurrentWallet();
    }
  };

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
    if (walletId === window.activeWallet) {
      const totalBalance = document.getElementById('total-balance');
      if (totalBalance && window.currentWalletData[walletId]) {
        if (typeof window.formatCurrency === 'function') {
          totalBalance.textContent = window.formatCurrency(window.currentWalletData[walletId].totalBalance);
        } else if (window.FormatUtils && typeof window.FormatUtils.formatCurrency === 'function') {
          totalBalance.textContent = window.FormatUtils.formatCurrency(window.currentWalletData[walletId].totalBalance);
        } else {
          totalBalance.textContent = '$' + window.currentWalletData[walletId].totalBalance.toFixed(2);
        }
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
      if (typeof window.formatCurrency === 'function') {
        balanceValue.textContent = window.formatCurrency(token.value);
      } else if (window.FormatUtils && typeof window.FormatUtils.formatCurrency === 'function') {
        balanceValue.textContent = window.FormatUtils.formatCurrency(token.value);
      } else {
        balanceValue.textContent = '$' + token.value.toFixed(2);
      }
    }
    
    // Update price info
    const currentPrice = document.getElementById('token-current-price');
    const priceChange = document.getElementById('token-price-change');
    
    if (currentPrice) {
      if (typeof window.formatCurrency === 'function') {
        currentPrice.textContent = window.formatCurrency(token.price);
      } else if (window.FormatUtils && typeof window.FormatUtils.formatCurrency === 'function') {
        currentPrice.textContent = window.FormatUtils.formatCurrency(token.price);
      } else {
        currentPrice.textContent = '$' + token.price.toFixed(2);
      }
    }
    
    if (priceChange) {
      priceChange.textContent = `${token.change >= 0 ? '+' : ''}${token.change}%`;
      priceChange.className = token.change >= 0 ? 'positive' : 'negative';
    }
    
    // Update transaction list
    if (typeof window.updateTransactionList === 'function') {
      window.updateTransactionList(tokenId);
    }
  }

  function updateTransactionHistory() {
    // Update transaction history if visible
    const historyScreen = document.getElementById('history-screen');
    if (historyScreen && getComputedStyle(historyScreen).display !== 'none') {
      if (typeof window.populateTransactionHistory === 'function') {
        window.populateTransactionHistory();
      }
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

  // Handle image loading errors
  function setupImageErrorHandlers() {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = function() {
        console.log('Image failed to load:', this.src);
        
        // Extract token ID from path if possible
        const pathParts = this.src.split('/');
        const filename = pathParts[pathParts.length - 1];
        
        if (filename.includes('logo')) {
          // Try fallback pattern for cryptologos
          const tokenSymbol = this.alt?.toLowerCase() || 'token';
          this.src = `https://cryptologos.cc/logos/${tokenSymbol.toLowerCase()}-${tokenSymbol.toLowerCase()}-logo.png`;
        } else {
          // Use generic fallback
          this.src = 'https://i.ibb.co/xPTTcgd/Trust-Wallet-Core-Logo-Blue.png';
        }
        
        // Prevent infinite loop
        this.onerror = null;
      };
    });
  }

  // Core setup function
  function setupActionButtonsEventListeners() {
    console.log('Setting up global event listeners');
    
    // Setup send and receive buttons on main screen
    const sendButton = document.getElementById('send-button');
    if (sendButton) {
      sendButton.addEventListener('click', function() {
        if (typeof window.showSendScreen === 'function') {
          window.showSendScreen();
        } else {
          console.error('showSendScreen function not available');
        }
      });
    }
    
    const receiveButton = document.getElementById('receive-button');
    if (receiveButton) {
      receiveButton.addEventListener('click', function() {
        if (typeof window.showReceiveScreen === 'function') {
          window.showReceiveScreen();
        } else {
          console.error('showReceiveScreen function not available');
        }
      });
    }
    
    // Setup history button
    const historyButton = document.querySelector('.quick-actions .action-circle:nth-child(5)');
    if (historyButton) {
      historyButton.addEventListener('click', function() {
        if (typeof window.navigateTo === 'function') {
          window.navigateTo('history-screen');
        } else {
          // Fallback navigation
          const screens = document.querySelectorAll('.screen');
          screens.forEach(screen => {
            screen.classList.add('hidden');
          });
          const historyScreen = document.getElementById('history-screen');
          if (historyScreen) historyScreen.classList.remove('hidden');
        }
      });
    }
    
    // Setup back buttons
    document.querySelectorAll('.back-button').forEach(button => {
      button.addEventListener('click', function() {
        const screen = this.closest('.screen');
        if (screen) {
          if (typeof window.navigateTo === 'function') {
            window.navigateTo('wallet-screen');
          } else {
            // Fallback navigation
            const screens = document.querySelectorAll('.screen');
            screens.forEach(s => s.classList.add('hidden'));
            const walletScreen = document.getElementById('wallet-screen');
            if (walletScreen) walletScreen.classList.remove('hidden');
          }
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
    
    console.log('Global event listeners setup complete');
  }

  // Initialize everything when document is ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - initializing Trust Wallet UI');
    
    // Hide network error if showing
    const networkError = document.getElementById('network-error');
    if (networkError) {
        networkError.classList.add('hidden');
    }
    
    // Initialize passcode handling
    initPasscodeHandling();
    
    // Setup error recovery
    window.addEventListener('error', function(event) {
      console.error(`Global error: ${event.message} at ${event.filename}:${event.lineno}`);
      event.preventDefault();
    });
    
    // Setup wallet data
    if (typeof window.setupDefaultWalletData === 'function') {
        window.setupDefaultWalletData();
    }
    
    // Setup admin panel
    setupAdminPanelActivation();
    
    // Set up token list click handlers
    setTimeout(function() {
      const tokenItems = document.querySelectorAll('.token-item');
      tokenItems.forEach(item => {
        item.addEventListener('click', function() {
          const tokenId = this.getAttribute('data-token-id');
          if (tokenId && typeof window.showTokenDetail === 'function') {
            window.showTokenDetail(tokenId);
          }
        });
      });
      
      // Setup action buttons
      setupActionButtonsEventListeners();
      
      // Setup image error handlers
      setupImageErrorHandlers();
      
      // Explicitly populate token list if not already done
      if (typeof window.populateMainWalletTokenList === 'function') {
        window.populateMainWalletTokenList();
      }
      
      // Fix admin panel
      fixAdminPanel();
    }, 500);
  });

// Ensure these variables are defined globally
window.formatCurrency = window.formatCurrency || function(amount) {
  return '$' + parseFloat(amount).toFixed(2);
};

window.showTransactionDetails = showTransactionDetails;

// Ensure functions are globally available
window.fixTokenDetailView = window.fixTokenDetailView || function() {
    console.log('Fixing token detail view');
    // Add fallback implementation if not defined elsewhere
};

window.updateNetworkBadge = window.updateNetworkBadge || function(badge, tokenId, badgeUrl, network) {
    console.log('Updating network badge');
    // Fallback implementation
    if (badge && badgeUrl) {
        const badgeImg = badge.querySelector('img');
        if (badgeImg) {
            badgeImg.src = badgeUrl;
            badgeImg.alt = network || (tokenId.toUpperCase() + ' Network');
        }
    }
};
})();
