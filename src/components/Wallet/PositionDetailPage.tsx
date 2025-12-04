import { ArrowLeft, TrendingUp, TrendingDown, Plus, Minus, Settings } from 'lucide-react';
import { useState } from 'react';

interface PositionDetailPageProps {
  onBack: () => void;
  position: {
    positionId: string;
    tokenMint: string;
    tokenSymbol: string;
    quantity: number;
    entryPrice: number;
    currentPrice: number;
    unrealizedPnl: number;
    realizedPnl: number;
    avgHoldTime: number; // in seconds
    autoTradeEnabled: boolean;
    entryTime: string;
  };
  onBuyMore: (positionId: string) => void;
  onSell: (positionId: string) => void;
  onSetTPSL: (positionId: string) => void;
}

export function PositionDetailPage({
  onBack,
  position,
  onBuyMore,
  onSell,
  onSetTPSL,
}: PositionDetailPageProps) {
  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const priceChange = ((position.currentPrice - position.entryPrice) / position.entryPrice) * 100;

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
              <h1 className="text-3xl font-bold text-white mb-2">{position.tokenSymbol}</h1>
              <p className="text-slate-400 font-mono text-sm">{position.tokenMint}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm mb-1">Current Price</p>
              <p className="text-white text-2xl font-bold">${position.currentPrice.toFixed(4)}</p>
              <p className={`text-sm flex items-center gap-1 mt-1 ${
                priceChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {priceChange >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-brown-900/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Quantity</p>
              <p className="text-white text-lg font-semibold">{position.quantity.toFixed(4)}</p>
            </div>
            <div className="bg-brown-900/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Entry Price</p>
              <p className="text-white text-lg font-semibold">${position.entryPrice.toFixed(4)}</p>
            </div>
            <div className="bg-brown-900/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Current Price</p>
              <p className="text-white text-lg font-semibold">${position.currentPrice.toFixed(4)}</p>
            </div>
            <div className="bg-brown-900/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Unrealized PNL</p>
              <p className={`text-lg font-semibold ${
                position.unrealizedPnl >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {position.unrealizedPnl >= 0 ? '+' : ''}{position.unrealizedPnl.toFixed(4)} SOL
              </p>
            </div>
            <div className="bg-brown-900/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Realized PNL</p>
              <p className={`text-lg font-semibold ${
                position.realizedPnl >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {position.realizedPnl >= 0 ? '+' : ''}{position.realizedPnl.toFixed(4)} SOL
              </p>
            </div>
            <div className="bg-brown-900/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Avg Hold Time</p>
              <p className="text-white text-lg font-semibold">{formatTime(position.avgHoldTime)}</p>
            </div>
          </div>

          {position.autoTradeEnabled && (
            <div className="bg-butter-400/10 border border-butter-400/30 rounded-lg p-4 mb-6">
              <p className="text-butter-400 text-sm flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Auto-Trade is enabled for this position
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onBuyMore(position.positionId)}
              className="flex-1 py-3 px-6 bg-butter-400 hover:bg-butter-500 text-yellow-800 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-butter-400/30 hover:shadow-butter-500/50 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Buy More
            </button>
            <button
              onClick={() => onSell(position.positionId)}
              className="flex-1 py-3 px-6 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Minus className="w-5 h-5" />
              Sell
            </button>
            <button
              onClick={() => onSetTPSL(position.positionId)}
              className="flex-1 py-3 px-6 bg-brown-800/50 hover:bg-brown-700/50 border border-slate-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Set TP/SL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



