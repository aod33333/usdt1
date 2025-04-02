// Trust Wallet - Comprehensive Patch 
// This patch resolves all known issues and improves UI consistency

(function() {
    // Log initialization
    console.log('Initializing Trust Wallet comprehensive patch v2.0...');
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeComprehensivePatch);
    } else {
        setTimeout(initializeComprehensivePatch, 300); // Slight delay to ensure other scripts have run
    }
    
    // Main initialization function
    function initializeComprehensivePatch() {
        console.log('Applying Trust Wallet comprehensive patch...');
        
        // Apply initial fixes
        applyCoreFixes();
        fixAdminPanel();
        fixReceiveScreen();
        fixBottomTabs();
        fixTransactionHistory();
        fixTokenDetailView();
        
        // Set up observer to watch for dynamic content changes
        setupContentObserver();
        
        // Expose global fix functions
        window.TrustWalletPatch = {
            applyAllFixes: applyAllFixes,
            fixAdminPanel: fixAdminPanel,
            fixReceiveScreen: fixReceiveScreen,
            fixBottomTabs: fixBottomTabs,
            fixTransactionHistory: fixTransactionHistory,
            fixTokenDetailView: fixTokenDetailView
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
        fixAdminPanel();
        fixReceiveScreen();
        fixBottomTabs();
        fixTransactionHistory();
        fixTokenDetailView();
    }
    
    // Fix #1: Status bar padding
    function fixStatusBarPadding() {
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
            
            /* Receive Screen Icon Fixes */
            .action-button, 
            .qr-button, 
            .copy-button {
                width: 40px !important;
                height: 40px !important;
                border-radius: 50% !important;
                background-color: #F5F5F5 !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                border: none !important;
                box-shadow: none !important;
            }
            
            .action-button i, 
            .qr-button i, 
            .copy-button i {
                color: #5F6C75 !important;
                font-size: 16px !important;
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
            
            /* Investment Warning Fixes */
            .investment-warning {
                width: calc(100% - 16px) !important;
                margin: 8px !important;
                padding: 8px !important;
                font-size: 10px !important;
                border-radius: 8px !important;
                border-left: 4px solid #D4AC0D !important;
                background-color: #FEF9E7 !important;
                color: #D4AC0D !important;
            }
            
            /* Staking Banner Fixes */
            .staking-container {
                background-color: #F5F5F5 !important;
                border-radius: 16px !important;
                padding: 12px 16px !important;
                margin: 8px 16px 16px !important;
                display: flex !important;
                align-items: center !important;
                position: relative !important;
                cursor: pointer !important;
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
                flex: 1 !important;
                overflow-y: auto !important;
                padding: 0 !important;
                scrollbar-width: none !important;
            }
            
            .token-detail-content::-webkit-scrollbar {
                display: none;
            }
            
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
    
    // Fix #5: Admin Panel - Fix balance updating issues
    function fixAdminPanel() {
        const adminPanel = document.getElementById('admin-panel');
        if (!adminPanel) return;
        
        // Fix or replace Apply Fake Balance button
        const applyFakeButton = document.getElementById('apply-fake');
        if (!applyFakeButton) return;
        
        // Create a new button to replace the existing one to ensure clean event handlers
        const newApplyButton = applyFakeButton.cloneNode(true);
        if (applyFakeButton.parentNode) {
            applyFakeButton.parentNode.replaceChild(newApplyButton, applyFakeButton);
        }
        
        // Add comprehensive handler for balance updates
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
            walletsToModify.forEach(wId => {
                updateWalletBalance(wId, tokenId, fakeBalance, generateHistory);
            });
            
            // Show success toast
            showToast('Balance updated successfully');
        });
        
        // Fix Reset Wallet button
        const resetWalletButton = document.getElementById('reset-wallet');
        if (resetWalletButton) {
            // Create a new button to replace the existing one
            const newResetButton = resetWalletButton.cloneNode(true);
            if (resetWalletButton.parentNode) {
                resetWalletButton.parentNode.replaceChild(newResetButton, resetWalletButton);
            }
            
            // Add comprehensive handler for wallet reset
            newResetButton.addEventListener('click', function() {
                const walletSelect = document.getElementById('admin-wallet-select');
                if (!walletSelect) return;
                
                const walletId = walletSelect.value;
                
                // Confirm reset
                if (confirm(`Are you sure you want to reset ${walletId} wallet to original state?`)) {
                    resetWallet(walletId);
                }
            });
        }
        
        // Helper function to update wallet balance
        function updateWalletBalance(walletId, tokenId, fakeBalanceUSD, generateHistory) {
            const wallet = window.currentWalletData && window.currentWalletData[walletId];
            if (!wallet) {
                console.error(`Wallet ${walletId} not found`);
                return;
            }
            
            // Find token
            const token = wallet.tokens.find(t => t.id === tokenId);
            if (!token) {
                console.error(`Token ${tokenId} not found in wallet ${walletId}`);
                return;
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
            if (generateHistory) {
                generateTransactionHistory(walletId, tokenId, token, originalAmount);
            }
            
            // Update UI in all places
            updateUIAfterBalanceChange(walletId);
        }
        
        // Generate transaction history records
        function generateTransactionHistory(walletId, tokenId, token, originalAmount) {
            // Ensure transaction object exists
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
            
            // Create timestamp (current date/time)
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
            const timestamp = `${dateStr} ${timeStr}`;
            
            // Generate random addresses
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
            
            // Generate a random address
            function generateRandomAddress() {
                return '0x' + Array.from({length: 40}, () => 
                    '0123456789abcdef'[Math.floor(Math.random() * 16)]
                ).join('');
            }
            
            // Generate a random transaction hash
            function generateRandomTxHash() {
                return '0x' + Array.from({length: 64}, () => 
                    '0123456789abcdef'[Math.floor(Math.random() * 16)]
                ).join('');
            }
        }
        
        // Update UI in all places after balance change
        function updateUIAfterBalanceChange(walletId) {
            // Update total balance displayed on main screen if it's the active wallet
            if (walletId === window.activeWallet && window.FormatUtils) {
                const totalBalance = document.getElementById('total-balance');
                if (totalBalance && window.currentWalletData[walletId]) {
                    totalBalance.textContent = window.FormatUtils.formatCurrency(
                        window.currentWalletData[walletId].totalBalance
                    );
                }
            }
            
            // Repopulate wallet token list
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
        
        // Update token detail balance
        function updateTokenDetailBalance() {
            const activeWallet = window.activeWallet || 'main';
            const tokenSymbol = document.getElementById('detail-symbol');
            if (!tokenSymbol) return;
            
            const tokenId = tokenSymbol.textContent.toLowerCase();
            
            // Find token
            const wallet = window.currentWalletData[activeWallet];
            if (!wallet) return;
            
            const token = wallet.tokens.find(t => t.id === tokenId);
            if (!token) return;
            
            // Update balance display
            const balanceAmount = document.getElementById('token-balance-amount');
            const balanceValue = document.getElementById('token-balance-value');
            
            if (balanceAmount) {
                balanceAmount.textContent = `${token.amount.toFixed(6)} ${token.symbol}`;
            }
            
            if (balanceValue && window.FormatUtils) {
                balanceValue.textContent = window.FormatUtils.formatCurrency(token.value);
            }
        }
        
        // Reset wallet to original state
        function resetWallet(walletId) {
            // Reset wallet data
            if (window.originalWalletData && window.originalWalletData[walletId]) {
                window.currentWalletData[walletId] = JSON.parse(
                    JSON.stringify(window.originalWalletData[walletId])
                );
            }
            
            // Reset transactions
            if (window.currentTransactions && window.currentTransactions[walletId]) {
                window.currentTransactions[walletId] = {};
            }
            
            // Update UI
            updateUIAfterBalanceChange(walletId);
            
            // Show success toast
            showToast(`${walletId} wallet reset to original state`);
        }
    }
    
    // Fix #6: Receive Screen - Fix circular icons and network badges
    function fixReceiveScreen() {
        const receiveScreen = document.getElementById('receive-screen');
        if (!receiveScreen) return;
        
        // Check if we need to fix token list or QR code view
        const tokenList = receiveScreen.querySelector('#receive-token-list');
        if (tokenList) {
            fixReceiveTokenList(tokenList);
        } else {
            fixReceiveQRView(receiveScreen);
        }
    }
    
    // Fix receive token list
    function fixReceiveTokenList(tokenList) {
        // Define which tokens should have network badges
        const networkBadgeMap = {
            'usdt': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
            'twt': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
            'bnb': 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
        };
        
        // Apply fixes to each token item
        const tokenItems = tokenList.querySelectorAll('.token-item');
        
        tokenItems.forEach(item => {
            // Fix token info structure
            fixTokenInfo(item);
            
            // Fix action buttons
            fixActionButtons(item);
            
            // Add network badges
            addNetworkBadges(item, networkBadgeMap);
        });
        
        // Fix token info structure
        function fixTokenInfo(item) {
            const tokenId = item.getAttribute('data-token-id');
            if (!tokenId) return;
            
            const tokenInfo = item.querySelector('.token-info');
            if (!tokenInfo) return;
            
            const tokenName = tokenInfo.querySelector('.token-name')?.textContent;
            const tokenNetworkText = tokenInfo.querySelector('.token-price')?.textContent;
            
            // Only update if the structure isn't already fixed
            const hasNameRow = !!tokenInfo.querySelector('.token-name-row');
            if (!hasNameRow && tokenName) {
                // Get token data
                const activeWallet = window.activeWallet || 'main';
                const wallet = window.currentWalletData?.[activeWallet];
                const token = wallet?.tokens.find(t => t.id === tokenId);
                
                // Create improved structure
                tokenInfo.innerHTML = `
                    <div class="token-name-row">
                        <span class="token-name">${tokenName}</span>
                        <span class="network-badge-pill">${token?.network || tokenNetworkText || 'Unknown Network'}</span>
                    </div>
                    <div class="token-network">${token?.name || 'Token'}</div>
                `;
                
                // Style the badge
                const networkBadge = tokenInfo.querySelector('.network-badge-pill');
                if (networkBadge) {
                    networkBadge.style.display = 'inline-block';
                    networkBadge.style.fontSize = '10px';
                    networkBadge.style.color = '#5F6C75';
                    networkBadge.style.backgroundColor = '#F5F5F5';
                    networkBadge.style.padding = '2px 6px';
                    networkBadge.style.borderRadius = '10px';
                    networkBadge.style.marginLeft = '8px';
                }
            }
        }
        
        // Fix action buttons
        function fixActionButtons(item) {
            // Find or create actions container
            let actionContainer = item.querySelector('.receive-actions');
            if (!actionContainer) {
                actionContainer = document.createElement('div');
                actionContainer.className = 'receive-actions';
                item.appendChild(actionContainer);
                
                // Style the container
                actionContainer.style.display = 'flex';
                actionContainer.style.alignItems = 'center';
                actionContainer.style.gap = '12px';
                actionContainer.style.marginLeft = 'auto';
            }
            
            // Clear any existing actions
            actionContainer.innerHTML = '';
            
            // Get token data
            const tokenId = item.getAttribute('data-token-id');
            const tokenName = item.querySelector('.token-name')?.textContent || '';
            
            // Generate wallet address (would come from the wallet in a real app)
            const walletAddress = '0x9B3a54D092f6B4b3d2eC676cd589f124E9921E71';
            
            // Add copy and QR buttons
            actionContainer.innerHTML = `
                <button class="action-button copy-button" data-address="${walletAddress}" title="Copy ${tokenName} address">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="action-button qr-button" title="Show QR code">
                    <i class="fas fa-qrcode"></i>
                </button>
            `;
            
            // Style the buttons
            const buttons = actionContainer.querySelectorAll('.action-button');
            buttons.forEach(button => {
                button.style.width = '40px';
                button.style.height = '40px';
                button.style.borderRadius = '50%';
                button.style.backgroundColor = '#F5F5F5';
                button.style.display = 'flex';
                button.style.justifyContent = 'center';
                button.style.alignItems = 'center';
                button.style.border = 'none';
                
                const icon = button.querySelector('i');
                if (icon) {
                    icon.style.color = '#5F6C75';
                }});
            
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
                                showToast(`${tokenName} address copied to clipboard`);
                            })
                            .catch(err => {
                                console.error('Failed to copy address:', err);
                                showToast(`${tokenName} address copied to clipboard`);
                            });
                    } else {
                        // Fallback method
                        const input = document.createElement('input');
                        input.value = address;
                        document.body.appendChild(input);
                        input.select();
                        document.execCommand('copy');
                        document.body.removeChild(input);
                        showToast(`${tokenName} address copied to clipboard`);
                    }
                });
            }
            
            // Add QR code view handler
            const qrButton = actionContainer.querySelector('.qr-button');
            if (qrButton) {
                qrButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent token item click
                    
                    const tokenName = item.querySelector('.token-name')?.textContent || '';
                    showToast(`${tokenName} QR code view`);
                    
                    // This would normally navigate to the QR code view
                    // but for this fix we'll just show a toast
                });
            }
        }
        
        // Add network badges
        function addNetworkBadges(item, networkBadgeMap) {
            const tokenId = item.getAttribute('data-token-id');
            if (!tokenId || !networkBadgeMap[tokenId]) return;
            
            const tokenIcon = item.querySelector('.token-icon');
            if (!tokenIcon) return;
            
            // Check if badge already exists
            let badge = tokenIcon.querySelector('.chain-badge');
            
            // Create badge if it doesn't exist
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'chain-badge';
                
                const badgeImg = document.createElement('img');
                badgeImg.src = networkBadgeMap[tokenId];
                badgeImg.alt = tokenId.toUpperCase() + ' Network';
                
                badge.appendChild(badgeImg);
                tokenIcon.appendChild(badge);
            }
            
            // Force proper styling
            badge.style.position = 'absolute';
            badge.style.bottom = '-6px';
            badge.style.right = '-6px';
            badge.style.width = '20px';
            badge.style.height = '20px';
            badge.style.borderRadius = '50%';
            badge.style.backgroundColor = 'white';
            badge.style.border = '2px solid white';
            badge.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
            badge.style.zIndex = '5';
        }
    }
    
    // Fix QR code receive view
    function fixReceiveQRView(receiveScreen) {
        // Get token data from URL or detail page
        let tokenId = 'btc'; // Default
        let tokenSymbol = 'BTC';
        let tokenName = 'Bitcoin';
        let networkName = 'Bitcoin Network';
        
        // Try to get from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const urlTokenId = urlParams.get('token');
        
        if (urlTokenId) {
            tokenId = urlTokenId;
            
            // Try to get token data from current wallet
            const activeWallet = window.activeWallet || 'main';
            const wallet = window.currentWalletData?.[activeWallet];
            const token = wallet?.tokens.find(t => t.id === tokenId);
            
            if (token) {
                tokenSymbol = token.symbol;
                tokenName = token.name;
                networkName = token.network || networkName;
            }
        }
        
        // Fix wallet address container
        const addressContainer = receiveScreen.querySelector('.wallet-address-container');
        if (addressContainer) {
            // Style the container
            addressContainer.style.display = 'flex';
            addressContainer.style.alignItems = 'center';
            addressContainer.style.justifyContent = 'space-between';
            addressContainer.style.width = '100%';
            addressContainer.style.padding = '12px 16px';
            addressContainer.style.backgroundColor = '#F5F5F5';
            addressContainer.style.borderRadius = '8px';
            
            // Style address input
            const addressInput = addressContainer.querySelector('input');
            if (addressInput) {
                addressInput.style.flex = '1';
                addressInput.style.border = 'none';
                addressInput.style.backgroundColor = 'transparent';
                addressInput.style.fontSize = '14px';
                addressInput.style.fontFamily = 'monospace';
            }
            
            // Fix copy button
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
                
                // Fix copy icon color
                const copyIcon = copyButton.querySelector('i');
                if (copyIcon) {
                    copyIcon.style.color = 'white';
                }
            }
        }
        
        // Add network badge to QR code
        const qrContainer = receiveScreen.querySelector('.qr-code-container');
        const tokenSelection = receiveScreen.querySelector('.token-selection');
        
        if (tokenSelection) {
            // Add network badge if none exists
            let networkBadge = tokenSelection.querySelector('.network-badge');
            if (!networkBadge) {
                const networkBadgeContainer = document.createElement('div');
                networkBadgeContainer.className = 'network-badge-container';
                networkBadgeContainer.style.marginTop = '8px';
                
                networkBadgeContainer.innerHTML = `
                    <span class="network-badge">${networkName}</span>
                `;
                
                tokenSelection.appendChild(networkBadgeContainer);
                
                // Style network badge
                networkBadge = networkBadgeContainer.querySelector('.network-badge');
                if (networkBadge) {
                    networkBadge.style.display = 'inline-block';
                    networkBadge.style.backgroundColor = '#F5F5F5';
                    networkBadge.style.color = '#5F6C75';
                    networkBadge.style.padding = '4px 10px';
                    networkBadge.style.borderRadius = '12px';
                    networkBadge.style.fontSize = '12px';
                }
            } else {
                // Update existing network badge
                networkBadge.textContent = networkName;
            }
        }
    }
    
    // Fix #7: Bottom Tabs - Make home tab work correctly
    function fixBottomTabs() {
        const bottomTabs = document.querySelector('.bottom-tabs');
        if (!bottomTabs) return;
        
        // Get all tab items
        const tabItems = bottomTabs.querySelectorAll('.tab-item');
        
        // Create new tabs to replace the existing ones
        tabItems.forEach((tab, index) => {
            const newTab = tab.cloneNode(true);
            
            // Keep text content and icon
            const icon = tab.querySelector('i')?.className;
            const text = tab.querySelector('span')?.textContent;
            
            // Set new HTML with correct styling
            newTab.innerHTML = `
                <i class="${icon}"></i>
                <span>${text}</span>
            `;
            
            // Add active class to home tab (first tab)
            if (index === 0) {
                newTab.classList.add('active');
                
                // Set blue color for active tab
                const tabIcon = newTab.querySelector('i');
                const tabText = newTab.querySelector('span');
                
                if (tabIcon) tabIcon.style.color = '#3375BB';
                if (tabText) tabText.style.color = '#3375BB';
            }
            
            // Add click event listener
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
                
                // Handle tab click - only home tab works
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
                    showToast(`${thisText ? thisText.textContent : 'Feature'} coming soon`);
                }
            });
            
            // Replace old tab with new one
            if (tab.parentNode) {
                tab.parentNode.replaceChild(newTab, tab);
            }
        });
        
        // Force bottom tabs to stay on top
        bottomTabs.style.zIndex = '9999';
    }
    
    // Fix #8: Transaction History - Link to admin panel changes
    function fixTransactionHistory() {
        // Find the history screen
        const historyScreen = document.getElementById('history-screen');
        if (!historyScreen) return;
        
        // Find transaction list
        const txList = historyScreen.querySelector('#history-transaction-list');
        if (!txList) return;
        
        // Create new populateTransactionHistory function
        function populateTransactionHistory() {
            // Clear transaction list
            txList.innerHTML = '';
            
            // Get active wallet
            const activeWallet = window.activeWallet || 'main';
            
            // Get all transactions for active wallet
            const walletTransactions = window.currentTransactions?.[activeWallet] || {};
            let allTransactions = [];
            
            // Flatten token transactions
            Object.keys(walletTransactions).forEach(tokenId => {
                const tokenTxs = walletTransactions[tokenId] || [];
                
                // Get token info
                const wallet = window.currentWalletData?.[activeWallet];
                const token = wallet?.tokens.find(t => t.id === tokenId);
                
                // Add token info to each transaction
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
                // Convert dates to timestamps
                const dateA = new Date(a.date.replace(' ', 'T'));
                const dateB = new Date(b.date.replace(' ', 'T'));
                return dateB - dateA;
            });
            
            // Display transactions
            if (allTransactions.length === 0) {
                // Show empty state
                txList.innerHTML = `
                    <div class="no-transactions">
                        <p>No transaction history available</p>
                    </div>
                `;
            } else {
                // Create transaction items
                allTransactions.forEach(tx => {
                    const txItem = document.createElement('div');
                    txItem.className = `transaction-item transaction-${tx.type}`;
                    
                    // Format amounts and values
                    const formattedAmount = tx.amount.toFixed(6);
                    const formattedValue = window.FormatUtils 
                        ? window.FormatUtils.formatCurrency(tx.value)
                        : '$' + tx.value.toFixed(2);
                    
                    // Create HTML for transaction item
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
                    
                    // Add click handler to show transaction details
                    txItem.addEventListener('click', function() {
                        showTransactionDetails(tx);
                    });
                    
                    // Add to list
                    txList.appendChild(txItem);
                });
            }
        }
        
        // Show transaction details in explorer
        function showTransactionDetails(tx) {
            const explorerOverlay = document.getElementById('explorer-overlay');
            if (!explorerOverlay) return;
            
            // Update explorer with transaction details
            const txHash = document.getElementById('explorer-tx-hash');
            const txFrom = document.getElementById('explorer-from');
            const txTo = document.getElementById('explorer-to');
            const txTimestamp = document.getElementById('explorer-timestamp');
            const txAmount = document.getElementById('explorer-token-amount');
            const tokenIcon = explorerOverlay.querySelector('.explorer-token-icon img');
            
            if (txHash) txHash.textContent = tx.hash.substring(0, 18) + '...';
            if (txFrom) txFrom.textContent = tx.from;
            if (txTo) txTo.textContent = tx.to;
            if (txTimestamp) txTimestamp.textContent = tx.date;
            if (txAmount) txAmount.textContent = `${tx.amount.toFixed(6)} ${tx.symbol}`;
            
            // Update token icon
            if (tokenIcon) {
                const logoUrl = tx.tokenId 
                    ? `https://cryptologos.cc/logos/${tx.tokenId}-${tx.tokenId}-logo.png`
                    : `https://cryptologos.cc/logos/${tx.symbol.toLowerCase()}-${tx.symbol.toLowerCase()}-logo.png`;
                tokenIcon.src = logoUrl;
            }
            
            // Show explorer overlay
            explorerOverlay.style.display = 'flex';
            
            // Fix back button
            const backButton = explorerOverlay.querySelector('.explorer-back-button');
            if (backButton) {
                backButton.addEventListener('click', function() {
                    explorerOverlay.style.display = 'none';
                });
            }
        }
        
        // Override global function to ensure it's used everywhere
        window.populateTransactionHistory = populateTransactionHistory;
        window.showTransactionDetails = showTransactionDetails;
        
        // Populate immediately if history screen is visible
        if (getComputedStyle(historyScreen).display !== 'none') {
            populateTransactionHistory();
        }
        
        // Re-populate when history button is clicked
        const historyButton = document.querySelector('.quick-actions .action-circle:nth-child(5)');
        if (historyButton) {
            historyButton.addEventListener('click', function() {
                setTimeout(populateTransactionHistory, 100);
            });
        }
        
        // Update transaction list in token detail view too
        fixTokenDetailTransactions();
    }
    
    // Fix token detail transaction list
    function fixTokenDetailTransactions() {
        const updateTransactionList = function(tokenId) {
            const transactionList = document.getElementById('transaction-list');
            if (!transactionList) return;
            
            // Clear existing transactions
            transactionList.innerHTML = '';
            
            // Get active wallet
            const activeWallet = window.activeWallet || 'main';
            
            // Get transactions for this token
            const transactions = window.currentTransactions?.[activeWallet]?.[tokenId] || [];
            
            if (transactions.length === 0) {
                // Show no transactions message
                const noTransactionsEl = document.querySelector('.no-transactions');
                if (noTransactionsEl) {
                    noTransactionsEl.style.display = 'flex';
                }
                return;
            }
            
            // Hide no transactions message
            const noTransactionsEl = document.querySelector('.no-transactions');
            if (noTransactionsEl) {
                noTransactionsEl.style.display = 'none';
            }
            
            // Add transactions to list
            transactions.forEach(tx => {
                const txItem = document.createElement('div');
                txItem.className = `transaction-item transaction-${tx.type}`;
                
                // Format values
                const formattedAmount = tx.amount.toFixed(6);
                const formattedValue = window.FormatUtils 
                    ? window.FormatUtils.formatCurrency(tx.value)
                    : '$' + tx.value.toFixed(2);
                
                // Create transaction item HTML
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
                
                // Add click handler
                txItem.addEventListener('click', function() {
                    if (typeof window.showTransactionDetails === 'function') {
                        window.showTransactionDetails(tx);
                    }
                });
                
                // Add to list
                transactionList.appendChild(txItem);
            });
        };
        
        // Override global function
        window.updateTransactionList = updateTransactionList;
    }

 // Fix #9: Token Detail View - Enhanced implementation using the dedicated code
    function fixTokenDetailView() {
        console.log('Applying token detail page fixes');
        
        // Call all the specialized token detail fixes
        fixTokenDetailHeader();
        fixTokenDetailLayout();
        fixInvestmentBanner();
        fixPriceSectionAndScrolling();
        fixStakingBanner();
    }
    
    // 1. Fix header token details alignment and styling
    function fixTokenDetailHeader() {
        const detailHeader = document.querySelector('#token-detail .detail-header');
        if (!detailHeader) return;
        
        // Force proper header structure with absolute positioning for title
        detailHeader.style.display = 'flex';
        detailHeader.style.justifyContent = 'space-between';
        detailHeader.style.alignItems = 'center';
        detailHeader.style.height = '48px';
        detailHeader.style.position = 'relative';
        detailHeader.style.padding = '8px 16px';
        
        // Center the title element properly
        const titleElement = detailHeader.querySelector('.token-detail-title');
        if (titleElement) {
            // Overriding any conflicting styles with !important
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
            
            // Make token symbol and name text smaller
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
                padding: 0 !important;
                margin: 0 !important;
                width: 32px !important;
                height: 32px !important;
            `;
        }
        
        // Ensure header icons stay above the title
        const headerIcons = detailHeader.querySelector('.header-icons');
        if (headerIcons) {
            headerIcons.style.cssText = `
                position: relative !important;
                z-index: 2 !important;
                display: flex !important;
                gap: 8px !important;
            `;
            
            // Fix icon buttons
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
    
    // 2. Fix general token display styling and spacing
    function fixTokenDetailLayout() {
        const tokenDetailContent = document.querySelector('.token-detail-content');
        if (!tokenDetailContent) return;
        
        // Make the entire content area scrollable
        tokenDetailContent.style.cssText = `
            flex: 1 !important;
            overflow-y: auto !important;
            padding: 0 !important;
            scrollbar-width: none !important;
        `;
        
        // Hide scrollbar for Chrome/Safari
        tokenDetailContent.style.webkitScrollbarWidth = 'none';
        tokenDetailContent.style.msOverflowStyle = 'none';
        
        // Add a small rule to hide scrollbar
        const style = document.createElement('style');
        style.textContent = `
            .token-detail-content::-webkit-scrollbar {
                display: none;
            }
        `;
        document.head.appendChild(style);
        
        // Fix token icon and balance spacing
        const iconContainer = tokenDetailContent.querySelector('.token-detail-icon-container');
        if (iconContainer) {
            iconContainer.style.cssText = `
                margin: 8px 0 4px !important;
                position: relative !important;
                overflow: visible !important;
            `;
        }
        
        // Fix balance display
        const balanceContainer = tokenDetailContent.querySelector('.token-detail-balance');
        if (balanceContainer) {
            balanceContainer.style.cssText = `
                margin: 4px 0 8px !important;
                text-align: center !important;
            `;
            
            // Reduce size of balance text
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
        
        // Fix action buttons spacing
        const actionButtons = tokenDetailContent.querySelector('.token-detail-actions');
        if (actionButtons) {
            actionButtons.style.cssText = `
                margin: 8px 0 !important;
                padding: 0 16px !important;
                display: flex !important;
                justify-content: space-between !important;
            `;
            
            // Fix each action button
            const actions = actionButtons.querySelectorAll('.detail-action');
            actions.forEach(action => {
                action.style.cssText = `
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                `;
                
                // Fix icon
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
                
                // Fix label
                const label = action.querySelector('span');
                if (label) {
                    label.style.cssText = `
                        font-size: 11px !important;
                        color: #5F6C75 !important;
                    `;
                }
            });
        }
        
        // Fix transaction section
        const transactionHeader = tokenDetailContent.querySelector('.transaction-header');
        if (transactionHeader) {
            transactionHeader.style.cssText = `
                padding: 8px 16px !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
            `;
            
            // Fix header text
            const headerTitle = transactionHeader.querySelector('h3');
            if (headerTitle) {
                headerTitle.style.cssText = `
                    font-size: 14px !important;
                    font-weight: 600 !important;
                    margin: 0 !important;
                `;
            }
        }
        
        // Fix transaction list
        const transactionList = tokenDetailContent.querySelector('.transaction-list');
        if (transactionList) {
            transactionList.style.cssText = `
                margin-bottom: 16px !important;
            `;
            
            // Fix transaction items
            const transactions = transactionList.querySelectorAll('.transaction-item');
            transactions.forEach(tx => {
                tx.style.cssText = `
                    padding: 12px 16px !important;
                    display: flex !important;
                    align-items: center !important;
                    border-bottom: 1px solid #F5F5F5 !important;
                `;
            });
        }
        
        // Fix "No transactions" text
        const noTransactions = tokenDetailContent.querySelector('.no-transactions');
        if (noTransactions) {
            noTransactions.style.cssText = `
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                padding: 40px 20px !important;
                text-align: center !important;
            `;
            
            // Fix text styling
            const noTxText = noTransactions.querySelector('p');
            if (noTxText) {
                noTxText.style.cssText = `
                    font-size: 12px !important;
                    color: #8A939D !important;
                    margin-bottom: 4px !important;
                `;
            }
            
            // Fix explorer link
            const explorerLink = noTransactions.querySelector('.explorer-link');
            if (explorerLink) {
                explorerLink.style.cssText = `
                    font-size: 11px !important;
                    color: #8A939D !important;
                `;
                
                const linkElement = explorerLink.querySelector('a');
                if (linkElement) {
                    linkElement.style.cssText = `
                        color: #3375BB !important;
                        text-decoration: none !important;
                    `;
                }
            }
        }
    }
    
   // 3. Fix investment banner styling
    function fixInvestmentBanner() {
        const investmentWarning = document.querySelector('#token-detail .investment-warning');
        if (!investmentWarning) return;
        
        // Slim down the banner to match home page
        investmentWarning.style.cssText = `
            width: calc(100% - 16px) !important;
            margin: 8px !important;
            padding: 8px !important;
            font-size: 10px !important;
            border-radius: 8px !important;
            border-left: 4px solid #D4AC0D !important;
            background-color: #FEF9E7 !important;
            color: #D4AC0D !important;
        `;
        
        // Fix warning content layout
        const warningContent = investmentWarning.querySelector('.investment-warning-content');
        if (warningContent) {
            warningContent.style.cssText = `
                display: flex !important;
                align-items: flex-start !important;
            `;
        }
        
        // Fix warning icon
        const warningIcon = investmentWarning.querySelector('.warning-icon');
        if (warningIcon) {
            warningIcon.style.cssText = `
                font-size: 18px !important;
                margin-right: 8px !important;
                margin-top: 2px !important;
                flex-shrink: 0 !important;
            `;
        }
        
        // Fix warning text
        const warningText = investmentWarning.querySelector('.investment-warning-text');
        if (warningText) {
            warningText.style.cssText = `
                flex: 1 !important;
                font-size: 10px !important;
                line-height: 1.4 !important;
            `;
            
            // Fix paragraph
            const paragraph = warningText.querySelector('p');
            if (paragraph) {
                paragraph.style.cssText = `
                    margin-bottom: 0 !important;
                    line-height: 1.4 !important;
                    font-size: 10px !important;
                `;
            }
        }
        
        // Fix close button
        const closeButton = investmentWarning.querySelector('.close-warning');
        if (closeButton) {
            closeButton.style.cssText = `
                background: none !important;
                border: none !important;
                color: #D4AC0D !important;
                padding: 0 !important;
                margin-left: 8px !important;
                font-size: 12px !important;
                flex-shrink: 0 !important;
            `;
        }
    }
    
    // 4. Fix price section positioning and scrolling behavior
    function fixPriceSectionAndScrolling() {
        const tokenDetailContent = document.querySelector('.token-detail-content');
        const tokenPriceInfo = document.querySelector('.token-price-info');
        
        if (!tokenDetailContent || !tokenPriceInfo) return;
        
        // Fix the price section to the bottom of the screen
        tokenPriceInfo.style.cssText = `
            position: sticky !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 100% !important;
            background-color: white !important;
            z-index: 100 !important;
            padding: 16px !important;
            border-top: 1px solid #F5F5F5 !important;
            margin-bottom: 70px !important; /* Space for bottom tabs */
            box-shadow: 0 -2px 10px rgba(0,0,0,0.05) !important;
        `;
        
        // Make sure content scrolls properly
        tokenDetailContent.style.cssText += `
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            padding-bottom: 0 !important;
        `;
        
        // Remove separate scrolling on transaction list
        const transactionList = tokenDetailContent.querySelector('.transaction-list');
        if (transactionList) {
            transactionList.style.cssText += `
                max-height: none !important;
                overflow-y: visible !important;
            `;
        }
        
        // Fix price section inner elements
        const currentPrice = tokenPriceInfo.querySelector('.current-price');
        if (currentPrice) {
            // Fix title
            const priceTitle = currentPrice.querySelector('h3');
            if (priceTitle) {
                priceTitle.style.cssText = `
                    font-size: 13px !important;
                    color: #8A939D !important;
                    margin-bottom: 4px !important;
                    font-weight: 500 !important;
                `;
            }
            
            // Fix price and change display
            const priceWithChange = currentPrice.querySelector('.price-with-change');
            if (priceWithChange) {
                priceWithChange.style.cssText = `
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    margin-bottom: 2px !important;
                `;
                
                // Fix price itself
                const currentPriceValue = priceWithChange.querySelector('#token-current-price');
                if (currentPriceValue) {
                    currentPriceValue.style.cssText = `
                        font-size: 16px !important;
                        font-weight: 600 !important;
                    `;
                }
                
                // Fix price change
                const priceChange = priceWithChange.querySelector('#token-price-change');
                if (priceChange) {
                    priceChange.style.cssText = `
                        font-size: 13px !important;
                        font-weight: 500 !important;
                        padding: 2px 4px !important;
                        border-radius: 4px !important;
                    `;
                    
                    // Different styling based on positive or negative
                    if (priceChange.classList.contains('positive')) {
                        priceChange.style.color = '#3375BB !important';
                    } else if (priceChange.classList.contains('negative')) {
                        priceChange.style.color = '#EB5757 !important';
                    }
                }
            }
            
            // Fix timeframe text
            const timeframe = currentPrice.querySelector('.price-timeframe');
            if (timeframe) {
                timeframe.style.cssText = `
                    font-size: 11px !important;
                    color: #8A939D !important;
                `;
            }
        }
    }
    
    // 5. Fix staking banner text
    function fixStakingBanner() {
        const stakingBanner = document.querySelector('#token-detail .staking-container');
        if (!stakingBanner) return;
        
        // Get current token symbol
        const symbolElement = document.getElementById('detail-symbol');
        const tokenSymbol = symbolElement ? symbolElement.textContent : 'BTC';
        
        // Update the content
        const stakingContent = stakingBanner.querySelector('.staking-content');
        if (stakingContent) {
            // Update title
            const title = stakingContent.querySelector('h3');
            if (title) {
                title.textContent = `Start earning`;
                title.style.cssText = `
                    font-size: 16px !important;
                    font-weight: 600 !important;
                    margin-bottom: 2px !important;
                `;
            }
            
            // Update description to match requirements
            const description = stakingContent.querySelector('p');
            if (description) {
                description.textContent = `Start earning on your ${tokenSymbol}`;
                description.style.cssText = `
                    font-size: 12px !important;
                    color: #8A939D !important;
                    margin: 0 !important;
                `;
            }
        }
        
        // Fix general banner styling
        stakingBanner.style.cssText = `
            background-color: #F5F5F5 !important;
            border-radius: 16px !important;
            padding: 12px 16px !important;
            margin: 8px 16px 16px !important;
            display: flex !important;
            align-items: center !important;
            position: relative !important;
            cursor: pointer !important;
        `;
        
        // Fix icon
        const stakingIcon = stakingBanner.querySelector('.staking-icon');
        if (stakingIcon) {
            stakingIcon.style.cssText = `
                width: 40px !important;
                height: 40px !important;
                margin-right: 12px !important;
                flex-shrink: 0 !important;
            `;
            
            // Fix image
            const iconImage = stakingIcon.querySelector('img');
            if (iconImage) {
                iconImage.style.cssText = `
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: contain !important;
                `;
            }
        }
        
        // Fix arrow
        const arrow = stakingBanner.querySelector('.staking-arrow');
        if (arrow) {
            arrow.style.cssText = `
                position: absolute !important;
                right: 16px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                color: #8A939D !important;
                font-size: 12px !important;
            `;
        }
        
        // Add click handler for staking banner if not already present
        if (!stakingBanner._hasClickHandler) {
            stakingBanner.addEventListener('click', function() {
                showToast(`${tokenSymbol} staking coming soon`);
            });
            stakingBanner._hasClickHandler = true;
        }
    }
    
    // Setup content observer to reapply fixes when screens change
    function setupContentObserver() {
        const observer = new MutationObserver(function(mutations) {
            let needsUpdate = false;
            let screenChanged = null;
            
            mutations.forEach(function(mutation) {
                // Check if a screen's display property changed
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'style' &&
                    mutation.target.classList.contains('screen')) {
                    
                    if (mutation.target.style.display !== 'none') {
                        needsUpdate = true;
                        screenChanged = mutation.target.id;
                    }
                }
            });
            
            if (needsUpdate) {
                // Apply specific fixes based on which screen changed
                if (screenChanged === 'token-detail') {
                    fixTokenDetailView();
                } else if (screenChanged === 'receive-screen') {
                    fixReceiveScreen();
                } else if (screenChanged === 'history-screen') {
                    fixTransactionHistory();
                } else if (screenChanged === 'wallet-screen') {
                    fixBottomTabs();
                } else if (screenChanged === 'admin-panel') {
                    fixAdminPanel();
                } else {
                    // Apply all fixes for other screens
                    applyCoreFixes();
                }
            }
        });
        
        // Observe the app container
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            observer.observe(appContainer, {
                attributes: true,
                subtree: true,
                attributeFilter: ['style', 'class'],
                childList: true
            });
        }
        
        // Also set up token detail specific observer
        setupTokenDetailObserver();
    }
    
    // Set up observer to apply fixes when token detail page becomes visible
    function setupTokenDetailObserver() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'style' &&
                    mutation.target.id === 'token-detail' &&
                    mutation.target.style.display !== 'none') {
                    // Token detail page has become visible
                    setTimeout(fixTokenDetailView, 50);
                }
            });
        });
        
        // Observe token detail screen
        const tokenDetailScreen = document.getElementById('token-detail');
        if (tokenDetailScreen) {
            observer.observe(tokenDetailScreen, {
                attributes: true,
                attributeFilter: ['style']
            });
        }
        
        // Also observe when token items are clicked
        document.addEventListener('click', function(e) {
            const tokenItem = e.target.closest('.token-item');
            if (tokenItem && tokenItem.hasAttribute('data-token-id')) {
                // Token item was clicked, apply fixes after navigation
                setTimeout(fixTokenDetailView, 300);
            }
        });
    }
    
    // Utility function to show toast notification
    function showToast(message, duration = 2000) {
        // Use existing showToast if available
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
    
    // Update transaction history when wallet balance changes
    function updateTransactionHistory() {
        // Update history list if history screen is visible
        const historyScreen = document.getElementById('history-screen');
        if (historyScreen && getComputedStyle(historyScreen).display !== 'none') {
            if (typeof window.populateTransactionHistory === 'function') {
                window.populateTransactionHistory();
            }
        }
        
        // Update transaction list on token detail page if visible
        const tokenDetail = document.getElementById('token-detail');
        if (tokenDetail && getComputedStyle(tokenDetail).display !== 'none') {
            const symbolElement = document.getElementById('detail-symbol');
            if (symbolElement) {
                const tokenId = symbolElement.textContent.toLowerCase();
                
                if (typeof window.updateTransactionList === 'function') {
                    window.updateTransactionList(tokenId);
                }
            }
        }
    }
    
    // Apply fixes immediately and on each load
    window.addEventListener('load', applyAllFixes);
    
    // Expose fix functions globally
    window.fixTokenDetailPage = fixTokenDetailView;
})();
