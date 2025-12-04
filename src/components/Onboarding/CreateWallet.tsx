import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface CreateWalletProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  connectedWallet: string;
}

export function CreateWallet({ onBack, onNext, onSkip, connectedWallet }: CreateWalletProps) {
  const [walletName, setWalletName] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Your Trading Wallet
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Your Butter Wallet is a secure trading balance linked to your connected wallet
          </p>
        </div>

        <div className="space-y-6 pt-4">
          <div className="bg-brown-800/50 rounded-xl p-4 border border-slate-700">
            <p className="text-sm text-slate-400 mb-1">Connected</p>
            <p className="text-white font-mono">{connectedWallet}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-400">
              Wallet Name (Optional)
            </label>
            <input
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="My Trading Wallet"
              className="w-full py-3 px-4 bg-brown-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-butter-500 transition-colors duration-200"
            />
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 px-6 bg-butter-400 hover:bg-butter-500 text-yellow-800 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-butter-400/30 hover:shadow-butter-500/50 hover:scale-[1.02]"
          >
            Create Trading Wallet
          </button>

          <button
            onClick={onSkip}
            className="w-full text-slate-400 hover:text-white transition-colors duration-200 py-2"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
