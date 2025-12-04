// Wrapper components for wallet views to integrate with App routing

import { WalletDashboard } from './WalletDashboard';
import { HistoryPage } from './HistoryPage';
import { Deposit } from './Deposit';
import { Withdraw } from './Withdraw';
import { AutoTradeSettings } from './AutoTradeSettings';
import { PositionDetailPage } from './PositionDetailPage';
import { WalletLayout } from './WalletLayout';

// Mock data
const mockWalletAddress = 'ButterXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
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

interface WalletDashboardViewProps {
  onBack: () => void;
  onViewWallet: () => void;
  onViewHistory: () => void;
  onViewDeposit: () => void;
  onViewWithdraw: () => void;
  onViewSettings: () => void;
  onViewPosition: (id: string) => void;
}

export function WalletDashboardView({
  onBack,
  onViewWallet,
  onViewHistory,
  onViewDeposit,
  onViewWithdraw,
  onViewSettings,
  onViewPosition,
}: WalletDashboardViewProps) {
  return (
    <WalletLayout
      onBackToDashboard={onBack}
      onViewWallet={onViewWallet}
      onViewHistory={onViewHistory}
      onViewDeposit={onViewDeposit}
      onViewWithdraw={onViewWithdraw}
      onViewSettings={onViewSettings}
    >
      <div className="pt-4">
        <WalletDashboard
          walletAddress={mockWalletAddress}
          totalBalance={100.5}
          availableBalance={95.25}
          unrealizedPnl={5.25}
          realizedPnl={12.5}
          winRate={65.5}
          totalTrades={42}
          activePositions={mockActivePositions}
          onViewPosition={onViewPosition}
          onViewHistory={onViewHistory}
          onViewTop100={() => {}}
        />
      </div>
    </WalletLayout>
  );
}

interface WalletHistoryViewProps {
  onBack: () => void;
  onViewWallet: () => void;
  onViewHistory: () => void;
  onViewDeposit: () => void;
  onViewWithdraw: () => void;
  onViewSettings: () => void;
}

export function WalletHistoryView({ 
  onBack,
  onViewWallet,
  onViewHistory,
  onViewDeposit,
  onViewWithdraw,
  onViewSettings,
}: WalletHistoryViewProps) {
  return (
    <WalletLayout
      onBackToDashboard={onBack}
      onViewWallet={onViewWallet}
      onViewHistory={onViewHistory}
      onViewDeposit={onViewDeposit}
      onViewWithdraw={onViewWithdraw}
      onViewSettings={onViewSettings}
    >
      <div className="pt-4">
        <HistoryPage
          onBack={onBack}
          transactions={mockTransactions}
        />
      </div>
    </WalletLayout>
  );
}

interface WalletDepositViewProps {
  onBack: () => void;
  onViewWallet: () => void;
  onViewHistory: () => void;
  onViewDeposit: () => void;
  onViewWithdraw: () => void;
  onViewSettings: () => void;
}

export function WalletDepositView({ 
  onBack,
  onViewWallet,
  onViewHistory,
  onViewDeposit,
  onViewWithdraw,
  onViewSettings,
}: WalletDepositViewProps) {
  return (
    <WalletLayout
      onBackToDashboard={onBack}
      onViewWallet={onViewWallet}
      onViewHistory={onViewHistory}
      onViewDeposit={onViewDeposit}
      onViewWithdraw={onViewWithdraw}
      onViewSettings={onViewSettings}
    >
      <Deposit
        onBack={onBack}
        walletAddress={mockWalletAddress}
      />
    </WalletLayout>
  );
}

interface WalletWithdrawViewProps {
  onBack: () => void;
  onViewWallet: () => void;
  onViewHistory: () => void;
  onViewDeposit: () => void;
  onViewWithdraw: () => void;
  onViewSettings: () => void;
}

export function WalletWithdrawView({ 
  onBack,
  onViewWallet,
  onViewHistory,
  onViewDeposit,
  onViewWithdraw,
  onViewSettings,
}: WalletWithdrawViewProps) {
  return (
    <WalletLayout
      onBackToDashboard={onBack}
      onViewWallet={onViewWallet}
      onViewHistory={onViewHistory}
      onViewDeposit={onViewDeposit}
      onViewWithdraw={onViewWithdraw}
      onViewSettings={onViewSettings}
    >
      <Withdraw
        onBack={onBack}
        availableBalance={95.25}
        onConfirm={(address, amount) => {
          console.log('Withdraw:', address, amount);
          // In production, this would call the API
        }}
      />
    </WalletLayout>
  );
}

interface WalletSettingsViewProps {
  onBack: () => void;
  onViewWallet: () => void;
  onViewHistory: () => void;
  onViewDeposit: () => void;
  onViewWithdraw: () => void;
  onViewSettings: () => void;
}

export function WalletSettingsView({ 
  onBack,
  onViewWallet,
  onViewHistory,
  onViewDeposit,
  onViewWithdraw,
  onViewSettings,
}: WalletSettingsViewProps) {
  return (
    <WalletLayout
      onBackToDashboard={onBack}
      onViewWallet={onViewWallet}
      onViewHistory={onViewHistory}
      onViewDeposit={onViewDeposit}
      onViewWithdraw={onViewWithdraw}
      onViewSettings={onViewSettings}
    >
      <AutoTradeSettings
        onBack={onBack}
        onSave={(settings) => {
          console.log('Settings saved:', settings);
          // In production, this would call the API
        }}
      />
    </WalletLayout>
  );
}

interface WalletPositionDetailViewProps {
  onBack: () => void;
  onViewWallet: () => void;
  onViewHistory: () => void;
  onViewDeposit: () => void;
  onViewWithdraw: () => void;
  onViewSettings: () => void;
}

export function WalletPositionDetailView({ 
  onBack,
  onViewWallet,
  onViewHistory,
  onViewDeposit,
  onViewWithdraw,
  onViewSettings,
}: WalletPositionDetailViewProps) {
  return (
    <WalletLayout
      onBackToDashboard={onBack}
      onViewWallet={onViewWallet}
      onViewHistory={onViewHistory}
      onViewDeposit={onViewDeposit}
      onViewWithdraw={onViewWithdraw}
      onViewSettings={onViewSettings}
    >
      <div className="pt-4">
        <PositionDetailPage
          onBack={onBack}
          position={{
            positionId: '1',
            tokenMint: 'So11111111111111111111111111111111111111112',
            tokenSymbol: 'SOL',
            quantity: 10.5,
            entryPrice: 150.25,
            currentPrice: 165.50,
            unrealizedPnl: 5.25,
            realizedPnl: 0,
            avgHoldTime: 86400 * 3,
            autoTradeEnabled: true,
            entryTime: new Date(Date.now() - 86400000 * 3).toISOString(),
          }}
          onBuyMore={(id) => console.log('Buy more:', id)}
          onSell={(id) => console.log('Sell:', id)}
          onSetTPSL={(id) => console.log('Set TP/SL:', id)}
        />
      </div>
    </WalletLayout>
  );
}

