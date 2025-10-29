import { useState } from 'react';
import { Welcome } from './Onboarding/Welcome';
import { CreateWallet } from './Onboarding/CreateWallet';
import { FundAccount } from './Onboarding/FundAccount';

interface OnboardingFlowProps {
  onComplete: () => void;
}

type OnboardingStep = 'welcome' | 'create-wallet' | 'fund-account';

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [connectedWallet] = useState('0x1234...5678');
  const [butterWallet] = useState('ButterXXXXXXXXXXXXXXXXXXX');

  const handleConnect = () => {
    setStep('create-wallet');
  };

  const handleTelegram = () => {
    setStep('create-wallet');
  };

  const handleBrowse = () => {
    onComplete();
  };

  const handleCreateWallet = () => {
    setStep('fund-account');
  };

  const handleSkipWallet = () => {
    onComplete();
  };

  const handleFundComplete = () => {
    onComplete();
  };

  if (step === 'welcome') {
    return (
      <Welcome
        onConnect={handleConnect}
        onTelegram={handleTelegram}
        onBrowse={handleBrowse}
      />
    );
  }

  if (step === 'create-wallet') {
    return (
      <CreateWallet
        onBack={() => setStep('welcome')}
        onNext={handleCreateWallet}
        onSkip={handleSkipWallet}
        connectedWallet={connectedWallet}
      />
    );
  }

  return (
    <FundAccount
      onBack={() => setStep('create-wallet')}
      onComplete={handleFundComplete}
      walletAddress={butterWallet}
    />
  );
}
