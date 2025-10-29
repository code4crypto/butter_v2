import { Info, Globe, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface TokenData {
  name: string;
  symbol: string;
  marketCap: string;
  volume: string;
  priceChange: number;
  chartData: number[];
}

interface TokenCardProps {
  token: TokenData;
  onTrade: (token: TokenData) => void;
}

export function TokenCard({ token, onTrade }: TokenCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  const [slippage, setSlippage] = useState(1);

  const isPositive = token.priceChange > 0;
  const quickAmounts = [0.1, 0.5, 1];

  const handleQuickAmountSelect = (amount: number) => {
    setSelectedQuickAmount(amount);
    setTradeAmount(amount.toString());
  };

  return (
    <div
      className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-200"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white">{token.name}</h3>
          <button className="text-slate-400 hover:text-white transition-colors duration-200">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="text-slate-300 font-medium">{token.symbol}</span>
          <span className="text-slate-500 text-sm">1m</span>
          <Globe className="w-4 h-4 text-slate-400" />
        </div>

        <div className="h-32 bg-slate-900/50 rounded-lg flex items-center justify-center">
          <div className="text-slate-600 text-sm">Chart Area</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">MCap:</span>
            <span className="text-white font-medium">{token.marketCap}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Vol($):</span>
            <span className="text-white font-medium">{token.volume}</span>
          </div>
        </div>

        <div className={`flex items-center gap-2 text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          {isPositive ? '+' : ''}{token.priceChange.toFixed(2)}%
        </div>

        {!isExpanded && (
          <button
            onClick={() => onTrade(token)}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02]"
          >
            Trade
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="border-t border-slate-700 bg-slate-800/80 p-6 space-y-4">
          <h4 className="text-center text-white font-semibold">QUICK TRADE</h4>

          <div className="space-y-2">
            <label className="block text-sm text-slate-400">Amount:</label>
            <input
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
              placeholder="Enter SOL amount"
              className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors duration-200"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmountSelect(amount)}
                className={`py-2 px-3 rounded-lg border transition-all duration-200 ${
                  selectedQuickAmount === amount
                    ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="font-semibold">{amount}</div>
                <div className="text-xs">SOL</div>
              </button>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>You'll receive:</span>
              <span className="text-white">~1,234 {token.symbol}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Price Impact:</span>
              <span className="text-white">0.5%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Fee:</span>
              <span className="text-white">0.001 SOL</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-400">Slippage:</label>
            <div className="flex gap-2">
              {[1, 2, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={`flex-1 py-2 rounded-lg border transition-all duration-200 ${
                    slippage === value
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {value}%
                </button>
              ))}
              <button className="px-4 py-2 border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 rounded-lg transition-colors duration-200">
                Custom
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02]">
              BUY
            </button>
            <button className="py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02]">
              SELL
            </button>
          </div>

          <div className="text-center text-sm text-slate-400">
            Balance: 2.45 SOL
          </div>
        </div>
      )}
    </div>
  );
}
