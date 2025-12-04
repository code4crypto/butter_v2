import { ArrowLeft, TrendingUp, ArrowUpRight, ArrowDownRight, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';

interface RoyaltyWalletProps {
  onBack: () => void;
  walletAddress: string;
  balance: number;
  totalEarnings: number;
  latestEarnings: Array<{
    source: string;
    amount: number;
    timestamp: string;
  }>;
  autoTransferEnabled: boolean;
  onWithdrawToTrading: () => void;
  onWithdrawToExternal: () => void;
  onToggleAutoTransfer: (enabled: boolean) => void;
}

export function RoyaltyWallet({
  onBack,
  walletAddress,
  balance,
  totalEarnings,
  latestEarnings,
  autoTransferEnabled,
  onWithdrawToTrading,
  onWithdrawToExternal,
  onToggleAutoTransfer,
}: RoyaltyWalletProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Royalty Wallet</h1>
              <p className="text-slate-400 font-mono text-sm">{walletAddress}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm mb-1">Balance</p>
              <p className="text-butter-400 text-3xl font-bold">{balance.toFixed(4)} SOL</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-brown-900/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Total Earnings</p>
              <p className="text-white text-2xl font-bold">{totalEarnings.toFixed(4)} SOL</p>
            </div>
            <div className="bg-brown-900/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Auto-Transfer</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => onToggleAutoTransfer(!autoTransferEnabled)}
                  className="flex items-center gap-2"
                >
                  {autoTransferEnabled ? (
                    <ToggleRight className="w-8 h-8 text-butter-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-600" />
                  )}
                </button>
                <span className="text-white font-medium">
                  {autoTransferEnabled ? 'Enabled (Weekly)' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h2 className="text-white text-xl font-semibold">Latest Earnings</h2>
            {latestEarnings.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                No earnings yet
              </div>
            ) : (
              <div className="space-y-3">
                {latestEarnings.map((earning, index) => (
                  <div
                    key={index}
                    className="bg-brown-900/50 border border-slate-700 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white font-medium">{earning.source}</p>
                      <p className="text-slate-400 text-sm">{formatDate(earning.timestamp)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">+{earning.amount.toFixed(4)} SOL</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onWithdrawToTrading}
              className="flex-1 py-3 px-6 bg-butter-400 hover:bg-butter-500 text-yellow-800 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-butter-400/30 hover:shadow-butter-500/50 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-5 h-5" />
              Withdraw to Butter Trading Wallet
            </button>
            <button
              onClick={onWithdrawToExternal}
              className="flex-1 py-3 px-6 bg-brown-800/50 hover:bg-brown-700/50 border border-slate-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowDownRight className="w-5 h-5" />
              Withdraw to External Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



