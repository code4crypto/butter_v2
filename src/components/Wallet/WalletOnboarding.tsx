import { ArrowLeft, Wallet, Download } from 'lucide-react';
import { useState } from 'react';

interface WalletOnboardingProps {
  onBack?: () => void;
  onCreateNew: () => void;
  onImportExisting: () => void;
  onSkip?: () => void;
}

export function WalletOnboarding({ 
  onBack, 
  onCreateNew, 
  onImportExisting,
  onSkip 
}: WalletOnboardingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}

        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Your Butter Wallet
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Optional – connect external wallet later for funding.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <button
            onClick={onCreateNew}
            className="w-full py-4 px-6 bg-butter-400 hover:bg-butter-500 text-yellow-800 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-butter-400/30 hover:shadow-butter-500/50 hover:scale-[1.02] flex items-center justify-center gap-3"
          >
            <Wallet className="w-5 h-5" />
            Create New Wallet
          </button>

          <button
            onClick={onImportExisting}
            className="w-full py-4 px-6 bg-brown-800/50 hover:bg-brown-700/50 border border-slate-700 hover:border-slate-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            Import Existing Wallet
          </button>

          {onSkip && (
            <button
              onClick={onSkip}
              className="w-full text-slate-400 hover:text-white transition-colors duration-200 py-2"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



