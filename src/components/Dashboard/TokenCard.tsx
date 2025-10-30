import { Info, Globe, TrendingUp, TrendingDown, Users, Shield, Droplet, Flame } from 'lucide-react';
import { useState } from 'react';

interface TokenData {
  name: string;
  symbol: string;
  marketCap: string;
  liquidity: string;
  volume: string;
  volume5m: string;
  buys: number;
  buyVolume: string;
  sells: number;
  sellVolume: string;
  netVolume: string;
  priceChange: number;
  top10Holders: string;
  devHoldings: string;
  snipersHoldings: string;
  insiders: string;
  bundlers: string;
  lpBurned: string;
  holders: number;
  proTraders: number;
  dexPaid: string;
  txns: number;
  buyTxns: number;
  sellTxns: number;
  imageUrl?: string;
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
  const [showTokenInfo, setShowTokenInfo] = useState(false);

  const isPositive = token.priceChange > 0;
  const isNetVolumePositive = token.netVolume.startsWith('+');
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
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {token.imageUrl ? (
              <img src={token.imageUrl} alt={token.name} className="w-10 h-10 rounded-lg" />
            ) : (
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-slate-400 text-xs font-bold">{token.symbol.slice(0, 2)}</span>
              </div>
            )}
            <div>
              <h3 className="text-base font-semibold text-white">{token.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-slate-400 text-xs font-medium">{token.symbol}</span>
                <span className="text-slate-500 text-xs">1m</span>
                <Globe className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowTokenInfo(!showTokenInfo)}
            className="text-slate-400 hover:text-white transition-colors duration-200"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="h-24 bg-slate-900/50 rounded-lg flex items-center justify-center">
          <div className="text-slate-600 text-xs">Chart Area</div>
        </div>

        <div className="space-y-2">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="grid grid-cols-4 gap-2 text-xs mb-2">
              <div className="text-slate-500">5m Vol</div>
              <div className="text-slate-500">Buys</div>
              <div className="text-slate-500">Sells</div>
              <div className="text-slate-500">Net Vol.</div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs font-semibold mb-2">
              <div className="text-white">{token.volume5m}</div>
              <div className="text-green-400">{token.buys}/{token.buyVolume}</div>
              <div className="text-red-400">{token.sells}/{token.sellVolume}</div>
              <div className={isNetVolumePositive ? 'text-green-400' : 'text-red-400'}>{token.netVolume}</div>
            </div>
            <div className="grid grid-cols-4 gap-1">
              <div className="col-span-2 h-1 bg-green-500 rounded-full"></div>
              <div className="col-span-2 h-1 bg-red-500 rounded-full"></div>
            </div>
          </div>

          {showTokenInfo && (
            <div className="bg-slate-900/50 rounded-lg p-3 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-sm font-semibold">{token.top10Holders}</span>
                  </div>
                  <div className="text-slate-500 text-xs">Top 10 H.</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Shield className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-300 text-sm font-semibold">{token.devHoldings}</span>
                  </div>
                  <div className="text-slate-500 text-xs">Dev H.</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-slate-300 text-sm font-semibold">{token.snipersHoldings}</span>
                  </div>
                  <div className="text-slate-500 text-xs">Snipers H.</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-red-400 text-sm font-semibold">{token.insiders}</span>
                  </div>
                  <div className="text-slate-500 text-xs">Insiders</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-green-400 text-sm font-semibold">{token.bundlers}</span>
                  </div>
                  <div className="text-slate-500 text-xs">Bundlers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Droplet className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-sm font-semibold">{token.lpBurned}</span>
                  </div>
                  <div className="text-slate-500 text-xs">LP Burned</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span className="text-white text-sm font-semibold">{token.holders}</span>
                  </div>
                  <div className="text-slate-500 text-xs">Holders</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-white text-sm font-semibold">{token.proTraders}</span>
                  </div>
                  <div className="text-slate-500 text-xs">Pro Traders</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className={`text-sm font-semibold ${token.dexPaid === 'Unpaid' ? 'text-red-400' : 'text-white'}`}>
                      {token.dexPaid}
                    </span>
                  </div>
                  <div className="text-slate-500 text-xs">Dex Paid</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2 text-xs">
            <div>
              <div className="text-slate-500 mb-1">Market Cap</div>
              <div className="text-white font-semibold">{token.marketCap}</div>
              <div className={`${isPositive ? 'text-green-400' : 'text-red-400'} text-xs`}>
                {isPositive ? '+' : ''}{token.priceChange.toFixed(3)}%
              </div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Liquidity</div>
              <div className="text-white font-semibold">{token.liquidity}</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Volume</div>
              <div className="text-white font-semibold">{token.volume}</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">TXNS</div>
              <div className="text-white font-semibold">{token.txns}</div>
              <div className="text-xs">
                <span className="text-green-400">{token.buyTxns}</span>
                <span className="text-slate-500"> / </span>
                <span className="text-red-400">{token.sellTxns}</span>
              </div>
            </div>
          </div>
        </div>

        {!isExpanded && (
          <button
            onClick={() => onTrade(token)}
            className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 text-sm font-semibold rounded-lg transition-all duration-200"
          >
            Trade
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="border-t border-slate-700 bg-slate-800/80 p-4 space-y-3">
          <h4 className="text-center text-white text-sm font-semibold">QUICK TRADE</h4>

          <div className="space-y-2">
            <label className="block text-xs text-slate-400">Amount:</label>
            <input
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
              placeholder="Enter SOL amount"
              className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors duration-200"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmountSelect(amount)}
                className={`py-1.5 px-2 rounded-lg border transition-all duration-200 ${
                  selectedQuickAmount === amount
                    ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="text-sm font-semibold">{amount}</div>
                <div className="text-xs">SOL</div>
              </button>
            ))}
          </div>

          <div className="space-y-1 text-xs">
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
            <label className="block text-xs text-slate-400">Slippage:</label>
            <div className="flex gap-2">
              {[1, 2, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={`flex-1 py-1.5 text-xs rounded-lg border transition-all duration-200 ${
                    slippage === value
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {value}%
                </button>
              ))}
              <button className="px-3 py-1.5 text-xs border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 rounded-lg transition-colors duration-200">
                Custom
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-all duration-200">
              BUY
            </button>
            <button className="py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-all duration-200">
              SELL
            </button>
          </div>

          <div className="text-center text-xs text-slate-400">
            Balance: 2.45 SOL
          </div>
        </div>
      )}
    </div>
  );
}
