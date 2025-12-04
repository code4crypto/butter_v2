import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard/Dashboard';
import { InstallBotFlow } from './components/InstallBotFlow';
import { WalletDemo } from './components/Wallet/WalletDemo';
import {
  WalletDashboardView,
  WalletHistoryView,
  WalletDepositView,
  WalletWithdrawView,
  WalletSettingsView,
  WalletPositionDetailView,
} from './components/Wallet/WalletViews';

type AppView = 
  | 'landing' 
  | 'onboarding' 
  | 'dashboard' 
  | 'wallet-demo'
  | 'wallet-dashboard'
  | 'wallet-history'
  | 'wallet-deposit'
  | 'wallet-withdraw'
  | 'wallet-settings'
  | 'wallet-position-detail';

function App() {
  const [view, setView] = useState<AppView>('landing');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showInstallBot, setShowInstallBot] = useState(false);

  const handleInstallBot = () => {
    setShowInstallBot(true);
  };

  const handleLaunchApp = () => {
    // Navigate to onboarding/dashboard
    setView('onboarding');
  };

  return (
    <>
      {view === 'landing' && (
        <LandingPage 
          onInstallBot={handleInstallBot}
          onLaunchApp={handleLaunchApp}
          onViewWalletDemo={() => setView('wallet-demo')}
        />
      )}

      {view === 'onboarding' && (
        <OnboardingFlow 
          onComplete={() => {
            setShowOnboarding(false);
            setView('dashboard');
          }} 
        />
      )}

      {view === 'dashboard' && (
        <Dashboard 
          onViewWallet={() => setView('wallet-dashboard')}
          onViewHistory={() => setView('wallet-history')}
          onViewDeposit={() => setView('wallet-deposit')}
          onViewWithdraw={() => setView('wallet-withdraw')}
          onViewSettings={() => setView('wallet-settings')}
        />
      )}

      {view === 'wallet-dashboard' && (
        <WalletDashboardView 
          onBack={() => setView('dashboard')}
          onViewWallet={() => setView('wallet-dashboard')}
          onViewHistory={() => setView('wallet-history')}
          onViewDeposit={() => setView('wallet-deposit')}
          onViewWithdraw={() => setView('wallet-withdraw')}
          onViewSettings={() => setView('wallet-settings')}
          onViewPosition={(id) => setView('wallet-position-detail')}
        />
      )}

      {view === 'wallet-history' && (
        <WalletHistoryView 
          onBack={() => setView('dashboard')}
          onViewWallet={() => setView('wallet-dashboard')}
          onViewHistory={() => setView('wallet-history')}
          onViewDeposit={() => setView('wallet-deposit')}
          onViewWithdraw={() => setView('wallet-withdraw')}
          onViewSettings={() => setView('wallet-settings')}
        />
      )}

      {view === 'wallet-deposit' && (
        <WalletDepositView 
          onBack={() => setView('dashboard')}
          onViewWallet={() => setView('wallet-dashboard')}
          onViewHistory={() => setView('wallet-history')}
          onViewDeposit={() => setView('wallet-deposit')}
          onViewWithdraw={() => setView('wallet-withdraw')}
          onViewSettings={() => setView('wallet-settings')}
        />
      )}

      {view === 'wallet-withdraw' && (
        <WalletWithdrawView 
          onBack={() => setView('dashboard')}
          onViewWallet={() => setView('wallet-dashboard')}
          onViewHistory={() => setView('wallet-history')}
          onViewDeposit={() => setView('wallet-deposit')}
          onViewWithdraw={() => setView('wallet-withdraw')}
          onViewSettings={() => setView('wallet-settings')}
        />
      )}

      {view === 'wallet-settings' && (
        <WalletSettingsView 
          onBack={() => setView('dashboard')}
          onViewWallet={() => setView('wallet-dashboard')}
          onViewHistory={() => setView('wallet-history')}
          onViewDeposit={() => setView('wallet-deposit')}
          onViewWithdraw={() => setView('wallet-withdraw')}
          onViewSettings={() => setView('wallet-settings')}
        />
      )}

      {view === 'wallet-position-detail' && (
        <WalletPositionDetailView 
          onBack={() => setView('wallet-dashboard')}
          onViewWallet={() => setView('wallet-dashboard')}
          onViewHistory={() => setView('wallet-history')}
          onViewDeposit={() => setView('wallet-deposit')}
          onViewWithdraw={() => setView('wallet-withdraw')}
          onViewSettings={() => setView('wallet-settings')}
        />
      )}

      {view === 'wallet-demo' && (
        <WalletDemo onBack={() => setView('landing')} />
      )}

      <InstallBotFlow
        isOpen={showInstallBot}
        onClose={() => setShowInstallBot(false)}
        onComplete={() => setShowInstallBot(false)}
      />
    </>
  );
}

export default App;
