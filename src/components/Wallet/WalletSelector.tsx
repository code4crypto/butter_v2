import { Wallet, Crown, ExternalLink, Check } from 'lucide-react';
import { useState } from 'react';

interface WalletOption {
  walletId: string;
  walletAddress: string;
  walletName: string;
  type: 'trading' | 'royalty' | 'external';
  balance: number;
  walletType?: 'phantom' | 'solflare';
}

interface WalletSelectorProps {
  wallets: WalletOption[];
  selectedWalletId?: string;
  onSelect: (walletId: string) => void;
  onClose?: () => void;
}

export function WalletSelector({ 
  wallets, 
  selectedWalletId,
  onSelect,
  onClose 
}: WalletSelectorProps) {
  const getWalletIcon = (type: string, walletType?: string) => {
    if (type === 'royalty') {
      return <Crown className="w-5 h-5 text-butter-400" />;
    }
    if (type === 'external') {
      return <ExternalLink className="w-5 h-5 text-blue-400" />;
    }
    return <Wallet className="w-5 h-5 text-butter-400" />;
  };

  const getWalletLabel = (wallet: WalletOption) => {
    if (wallet.type === 'royalty') return 'Royalty Wallet';
    if (wallet.type === 'external') {
      return wallet.walletType ? `${wallet.walletType.charAt(0).toUpperCase() + wallet.walletType.slice(1)} Wallet` : 'External Wallet';
    }
    return wallet.walletName || 'Trading Wallet';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
          >
            Close
          </button>
        )}

        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-white">
            Choose Wallet
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Select a wallet to manage
          </p>
        </div>

        <div className="space-y-3 pt-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.walletId}
              onClick={() => onSelect(wallet.walletId)}
              className={`w-full py-4 px-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedWalletId === wallet.walletId
                  ? 'border-butter-500 bg-butter-500/10'
                  : 'border-slate-700 bg-brown-800/50 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    selectedWalletId === wallet.walletId
                      ? 'bg-butter-500/20'
                      : 'bg-slate-700/50'
                  }`}>
                    {getWalletIcon(wallet.type, wallet.walletType)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{getWalletLabel(wallet)}</h3>
                    <p className="text-slate-400 text-sm font-mono">{wallet.walletAddress.slice(0, 8)}...{wallet.walletAddress.slice(-6)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{wallet.balance.toFixed(4)} SOL</p>
                  {selectedWalletId === wallet.walletId && (
                    <Check className="w-5 h-5 text-butter-400 mt-1 ml-auto" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}



