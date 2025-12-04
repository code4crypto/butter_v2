import { useState } from 'react';
import { Copy, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface WalletDashboardProps {
  walletAddress: string;
  totalBalance: number;
  availableBalance: number;
  unrealizedPnl: number;
  realizedPnl: number;
  winRate: number;
  totalTrades: number;
  activePositions: Array<{
    positionId: string;
    tokenMint: string;
    tokenSymbol: string;
    quantity: number;
    entryPrice: number;
    currentPrice: number;
    unrealizedPnl: number;
  }>;
  onViewPosition: (positionId: string) => void;
  onViewHistory: () => void;
  onViewTop100: () => void;
}

export function WalletDashboard({
  walletAddress,
  totalBalance,
  availableBalance,
  unrealizedPnl,
  realizedPnl,
  winRate,
  totalTrades,
  activePositions,
  onViewPosition,
  onViewHistory,
  onViewTop100,
}: WalletDashboardProps) {
  const [timeframe, setTimeframe] = useState<'1D' | '7D' | '30D' | 'MAX'>('7D');
  const [activeTab, setActiveTab] = useState<'positions' | 'history' | 'top100'>('positions');

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Wallet Address</p>
              <div className="flex items-center gap-2">
                <p className="text-white font-mono text-sm">{walletAddress}</p>
                <button className="text-slate-400 hover:text-white">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Balance</p>
              <p className="text-white text-2xl font-bold">{totalBalance.toFixed(4)} SOL</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Available Balance</p>
              <p className="text-white text-2xl font-bold">{availableBalance.toFixed(4)} SOL</p>
            </div>
          </div>
        </div>

        {/* Performance Section */}
        <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xl font-semibold">Performance</h2>
            <div className="flex gap-2">
              {(['1D', '7D', '30D', 'MAX'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    timeframe === tf
                      ? 'bg-butter-400 text-yellow-800 font-semibold'
                      : 'bg-brown-700/50 text-slate-300 hover:bg-brown-700'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Unrealized PNL</p>
              <p className={`text-lg font-semibold flex items-center gap-1 ${
                unrealizedPnl >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {unrealizedPnl >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {unrealizedPnl >= 0 ? '+' : ''}{unrealizedPnl.toFixed(4)} SOL
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Realized PNL</p>
              <p className={`text-lg font-semibold flex items-center gap-1 ${
                realizedPnl >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {realizedPnl >= 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {realizedPnl >= 0 ? '+' : ''}{realizedPnl.toFixed(4)} SOL
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Win Rate</p>
              <p className="text-white text-lg font-semibold">{winRate.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Trades</p>
              <p className="text-white text-lg font-semibold">{totalTrades}</p>
            </div>
          </div>
        </div>

        {/* Active Positions */}
        <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xl font-semibold">Active Positions</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('positions')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'positions'
                    ? 'bg-butter-400 text-yellow-800 font-semibold'
                    : 'bg-brown-700/50 text-slate-300 hover:bg-brown-700'
                }`}
              >
                Active Positions
              </button>
              <button
                onClick={() => {
                  setActiveTab('history');
                  onViewHistory();
                }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'bg-butter-400 text-yellow-800 font-semibold'
                    : 'bg-brown-700/50 text-slate-300 hover:bg-brown-700'
                }`}
              >
                History
              </button>
              <button
                onClick={() => {
                  setActiveTab('top100');
                  onViewTop100();
                }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'top100'
                    ? 'bg-butter-400 text-yellow-800 font-semibold'
                    : 'bg-brown-700/50 text-slate-300 hover:bg-brown-700'
                }`}
              >
                Top 100
              </button>
            </div>
          </div>

          {activeTab === 'positions' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Token</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Qty</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Entry</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Current</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">PNL</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activePositions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">
                        No active positions
                      </td>
                    </tr>
                  ) : (
                    activePositions.map((position) => (
                      <tr
                        key={position.positionId}
                        className="border-b border-slate-700/50 hover:bg-brown-700/30 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="text-white font-medium">{position.tokenSymbol}</span>
                        </td>
                        <td className="py-3 px-4 text-right text-white">
                          {position.quantity.toFixed(4)}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-300">
                          ${position.entryPrice.toFixed(4)}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-300">
                          ${position.currentPrice.toFixed(4)}
                        </td>
                        <td className={`py-3 px-4 text-right font-semibold ${
                          position.unrealizedPnl >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {position.unrealizedPnl >= 0 ? '+' : ''}{position.unrealizedPnl.toFixed(4)} SOL
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onViewPosition(position.positionId)}
                            className="text-butter-400 hover:text-butter-300 text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



