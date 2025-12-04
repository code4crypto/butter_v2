import { Header } from '../Dashboard/Header';

interface WalletLayoutProps {
  children: React.ReactNode;
  onBackToDashboard: () => void;
  onViewWallet?: () => void;
  onViewHistory?: () => void;
  onViewDeposit?: () => void;
  onViewWithdraw?: () => void;
  onViewSettings?: () => void;
}

export function WalletLayout({
  children,
  onBackToDashboard,
  onViewWallet,
  onViewHistory,
  onViewDeposit,
  onViewWithdraw,
  onViewSettings,
}: WalletLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900">
      <Header
        balance="100.5 SOL"
        walletAddress="ButterXXXXXXXXXXXXXXXXXXX"
        onSearch={() => {}}
        onViewWallet={onViewWallet}
        onViewHistory={onViewHistory}
        onViewDeposit={onViewDeposit}
        onViewWithdraw={onViewWithdraw}
        onViewSettings={onViewSettings}
        onBackToDashboard={onBackToDashboard}
        showBackToDashboard={true}
      />
      {children}
    </div>
  );
}

