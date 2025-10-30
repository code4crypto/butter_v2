import { Info, Globe, TrendingUp, TrendingDown, Users, Shield, Droplet, Flame, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';
import { MiniChart } from '../Chart/MiniChart';
import type { TokenData } from '../../services/api';

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

        <div className="h-24 bg-slate-900/50 rounded-lg overflow-hidden">
          {token.chartData.length > 0 ? (
            <MiniChart
              data={token.chartData}
              color={isPositive ? '#10b981' : '#ef4444'}
              height={96}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-slate-600 text-xs">Loading chart...</div>
            </div>
          )}
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

        <div className="flex items-center justify-center">
          <button
            onClick={() => onTrade(token)}
            className="group relative w-10 h-10 bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 hover:border-amber-500 rounded-lg transition-all duration-200 flex items-center justify-center"
            title="Quick Trade"
          >
            <ArrowRightLeft className="w-4 h-4 text-amber-400 group-hover:text-slate-900 transition-colors duration-200" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 group-hover:text-amber-400 transition-colors duration-200 whitespace-nowrap">
              Trade
            </span>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-700 bg-slate-800/80 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Quick Trade</span>
            <span className="text-xs text-slate-500">Bal: 2.45 SOL</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmountSelect(amount)}
                className={`py-1 px-1.5 rounded border text-xs transition-all duration-200 ${
                  selectedQuickAmount === amount
                    ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                }`}
              >
                {amount} SOL
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button className="py-1.5 bg-green-500/20 hover:bg-green-500 border border-green-500/40 hover:border-green-500 text-green-400 hover:text-white text-xs font-semibold rounded transition-all duration-200">
              BUY
            </button>
            <button className="py-1.5 bg-red-500/20 hover:bg-red-500 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-white text-xs font-semibold rounded transition-all duration-200">
              SELL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
