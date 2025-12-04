import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  WalletOnboarding,
  SecurityOption,
  SeedPhraseDisplay,
  FundWallet,
  WalletDashboard,
  HistoryPage,
  RoyaltyWallet,
  LinkAccounts,
  AutoTradeSettings,
  Withdraw,
  Deposit,
  WalletSelector,
  PositionDetailPage,
} from './index';

type DemoView = 
  | 'menu'
  | 'wallet-onboarding'
  | 'security-option'
  | 'seed-phrase'
  | 'fund-wallet'
  | 'wallet-dashboard'
  | 'history-page'
  | 'royalty-wallet'
  | 'link-accounts'
  | 'auto-trade-settings'
  | 'withdraw'
  | 'deposit'
  | 'wallet-selector'
  | 'position-detail';

interface WalletDemoProps {
  onBack: () => void;
}

export function WalletDemo({ onBack }: WalletDemoProps) {
  const [currentView, setCurrentView] = useState<DemoView>('menu');

  // Mock data
  const mockWalletAddress = 'ButterXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  const mockSeedPhrase = ['word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9', 'word10', 'word11', 'word12'];
  const mockActivePositions = [
    {
      positionId: '1',
      tokenMint: 'So11111111111111111111111111111111111111112',
      tokenSymbol: 'SOL',
      quantity: 10.5,
      entryPrice: 150.25,
      currentPrice: 165.50,
      unrealizedPnl: 5.25,
    },
    {
      positionId: '2',
      tokenMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      tokenSymbol: 'USDC',
      quantity: 1000,
      entryPrice: 1.0,
      currentPrice: 1.0,
      unrealizedPnl: 0,
    },
  ];
  const mockTransactions = [
    {
      transactionId: '1',
      type: 'trade' as const,
      tokenMint: 'So11111111111111111111111111111111111111112',
      tokenSymbol: 'SOL',
      amount: 5.5,
      pnl: 2.25,
      fee: 0.001,
      txHash: '5KJvsngHeM...',
      timestamp: new Date().toISOString(),
    },
    {
      transactionId: '2',
      type: 'deposit' as const,
      amount: 10.0,
      fee: 0,
      txHash: '7MNvsngHeM...',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to App
          </button>

          <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
            <h1 className="text-3xl font-bold text-white mb-2">Wallet Components Demo</h1>
            <p className="text-slate-400 mb-6">Click on any component to view it</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentView('wallet-onboarding')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Wallet Onboarding</h3>
                <p className="text-slate-400 text-sm">Create/Import wallet selection</p>
              </button>

              <button
                onClick={() => setCurrentView('security-option')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Security Option</h3>
                <p className="text-slate-400 text-sm">Seed phrase or Email+Passkey</p>
              </button>

              <button
                onClick={() => setCurrentView('seed-phrase')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Seed Phrase Display</h3>
                <p className="text-slate-400 text-sm">12/24 word backup</p>
              </button>

              <button
                onClick={() => setCurrentView('fund-wallet')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Fund Wallet</h3>
                <p className="text-slate-400 text-sm">Deposit options</p>
              </button>

              <button
                onClick={() => setCurrentView('wallet-dashboard')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Wallet Dashboard</h3>
                <p className="text-slate-400 text-sm">Portfolio & positions</p>
              </button>

              <button
                onClick={() => setCurrentView('history-page')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">History Page</h3>
                <p className="text-slate-400 text-sm">Transaction history</p>
              </button>

              <button
                onClick={() => setCurrentView('royalty-wallet')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Royalty Wallet</h3>
                <p className="text-slate-400 text-sm">Group owner earnings</p>
              </button>

              <button
                onClick={() => setCurrentView('link-accounts')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Link Accounts</h3>
                <p className="text-slate-400 text-sm">Telegram/Discord</p>
              </button>

              <button
                onClick={() => setCurrentView('auto-trade-settings')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Auto-Trade Settings</h3>
                <p className="text-slate-400 text-sm">Trading configuration</p>
              </button>

              <button
                onClick={() => setCurrentView('withdraw')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Withdraw</h3>
                <p className="text-slate-400 text-sm">Withdraw funds</p>
              </button>

              <button
                onClick={() => setCurrentView('deposit')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Deposit</h3>
                <p className="text-slate-400 text-sm">Deposit address & QR</p>
              </button>

              <button
                onClick={() => setCurrentView('wallet-selector')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Wallet Selector</h3>
                <p className="text-slate-400 text-sm">Multi-wallet selection</p>
              </button>

              <button
                onClick={() => setCurrentView('position-detail')}
                className="p-4 bg-brown-900/50 border border-slate-700 rounded-lg hover:border-butter-500 transition-colors text-left"
              >
                <h3 className="text-white font-semibold mb-1">Position Detail</h3>
                <p className="text-slate-400 text-sm">Token position details</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the selected component
  switch (currentView) {
    case 'wallet-onboarding':
      return (
        <WalletOnboarding
          onBack={() => setCurrentView('menu')}
          onCreateNew={() => setCurrentView('security-option')}
          onImportExisting={() => setCurrentView('seed-phrase')}
        />
      );
    case 'security-option':
      return (
        <SecurityOption
          onBack={() => setCurrentView('wallet-onboarding')}
          onContinue={(type) => {
            if (type === 'seed_phrase') {
              setCurrentView('seed-phrase');
            } else {
              setCurrentView('fund-wallet');
            }
          }}
        />
      );
    case 'seed-phrase':
      return (
        <SeedPhraseDisplay
          onBack={() => setCurrentView('security-option')}
          onContinue={() => setCurrentView('fund-wallet')}
          seedPhrase={mockSeedPhrase}
        />
      );
    case 'fund-wallet':
      return (
        <FundWallet
          onBack={() => setCurrentView('seed-phrase')}
          onSkip={() => setCurrentView('wallet-dashboard')}
          walletAddress={mockWalletAddress}
        />
      );
    case 'wallet-dashboard':
      return (
        <WalletDashboard
          walletAddress={mockWalletAddress}
          totalBalance={100.5}
          availableBalance={95.25}
          unrealizedPnl={5.25}
          realizedPnl={12.5}
          winRate={65.5}
          totalTrades={42}
          activePositions={mockActivePositions}
          onViewPosition={(id) => {
            setCurrentView('position-detail');
          }}
          onViewHistory={() => setCurrentView('history-page')}
          onViewTop100={() => setCurrentView('menu')}
        />
      );
    case 'history-page':
      return (
        <HistoryPage
          onBack={() => setCurrentView('wallet-dashboard')}
          transactions={mockTransactions}
        />
      );
    case 'royalty-wallet':
      return (
        <RoyaltyWallet
          onBack={() => setCurrentView('menu')}
          walletAddress={mockWalletAddress}
          balance={25.5}
          totalEarnings={50.0}
          latestEarnings={[
            { source: 'Alpha Group', amount: 5.5, timestamp: new Date().toISOString() },
            { source: 'Moon Signals', amount: 3.2, timestamp: new Date(Date.now() - 86400000).toISOString() },
          ]}
          autoTransferEnabled={false}
          onWithdrawToTrading={() => setCurrentView('menu')}
          onWithdrawToExternal={() => setCurrentView('menu')}
          onToggleAutoTransfer={(enabled) => console.log('Auto-transfer:', enabled)}
        />
      );
    case 'link-accounts':
      return (
        <LinkAccounts
          onBack={() => setCurrentView('menu')}
          telegramLinked={false}
          discordLinked={false}
          onLinkTelegram={() => console.log('Link Telegram')}
          onLinkDiscord={() => console.log('Link Discord')}
        />
      );
    case 'auto-trade-settings':
      return (
        <AutoTradeSettings
          onBack={() => setCurrentView('menu')}
          onSave={(settings) => {
            console.log('Settings saved:', settings);
            setCurrentView('menu');
          }}
        />
      );
    case 'withdraw':
      return (
        <Withdraw
          onBack={() => setCurrentView('menu')}
          availableBalance={95.25}
          onConfirm={(address, amount) => {
            console.log('Withdraw:', address, amount);
            setCurrentView('menu');
          }}
        />
      );
    case 'deposit':
      return (
        <Deposit
          onBack={() => setCurrentView('menu')}
          walletAddress={mockWalletAddress}
        />
      );
    case 'wallet-selector':
      return (
        <WalletSelector
          wallets={[
            {
              walletId: '1',
              walletAddress: mockWalletAddress,
              walletName: 'Trading Wallet',
              type: 'trading',
              balance: 100.5,
            },
            {
              walletId: '2',
              walletAddress: 'RoyaltyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
              walletName: 'Royalty Wallet',
              type: 'royalty',
              balance: 25.5,
            },
            {
              walletId: '3',
              walletAddress: 'PhantomXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
              walletName: 'Phantom',
              type: 'external',
              balance: 50.0,
              walletType: 'phantom',
            },
          ]}
          selectedWalletId="1"
          onSelect={(id) => {
            console.log('Selected wallet:', id);
            setCurrentView('menu');
          }}
          onClose={() => setCurrentView('menu')}
        />
      );
    case 'position-detail':
      return (
        <PositionDetailPage
          onBack={() => setCurrentView('wallet-dashboard')}
          position={{
            positionId: '1',
            tokenMint: 'So11111111111111111111111111111111111111112',
            tokenSymbol: 'SOL',
            quantity: 10.5,
            entryPrice: 150.25,
            currentPrice: 165.50,
            unrealizedPnl: 5.25,
            realizedPnl: 0,
            avgHoldTime: 86400 * 3, // 3 days
            autoTradeEnabled: true,
            entryTime: new Date(Date.now() - 86400000 * 3).toISOString(),
          }}
          onBuyMore={(id) => console.log('Buy more:', id)}
          onSell={(id) => console.log('Sell:', id)}
          onSetTPSL={(id) => console.log('Set TP/SL:', id)}
        />
      );
    default:
      return null;
  }
}



