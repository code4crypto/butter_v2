import { useState, useEffect } from 'react';
import { Header } from './Header';
import { CommunityTabs } from './CommunityTabs';
import { TokenCard } from './TokenCard';
import { fetchTokens, type TokenData } from '../../services/api';

const MOCK_COMMUNITIES = ['All', 'Sauce', 'Alpha DAO', 'Degen Grp', 'Crypto CT'];

const MOCK_TOKENS = [
  {
    name: "Don't Even Trip Dawg",
    symbol: 'TRIP',
    marketCap: '$82.9K',
    liquidity: '$45.2K',
    volume: '$10.5K',
    volume5m: '$165K',
    buys: 721,
    buyVolume: '$85.6K',
    sells: 576,
    sellVolume: '$79.5K',
    netVolume: '+$6.01K',
    priceChange: 66.14,
    top10Holders: '13.33%',
    devHoldings: '0%',
    snipersHoldings: '0%',
    insiders: '6.31%',
    bundlers: '0.12%',
    lpBurned: '100%',
    holders: 1050,
    proTraders: 500,
    dexPaid: 'Unpaid',
    txns: 12,
    buyTxns: 7,
    sellTxns: 5,
    chartData: [],
  },
  {
    name: 'CORTEX',
    symbol: 'CORTEX',
    marketCap: '$82.7K',
    liquidity: '$38.1K',
    volume: '$4.75K',
    volume5m: '$142K',
    buys: 615,
    buyVolume: '$72.3K',
    sells: 503,
    sellVolume: '$69.8K',
    netVolume: '+$2.50K',
    priceChange: -6.76,
    top10Holders: '15.20%',
    devHoldings: '2%',
    snipersHoldings: '1%',
    insiders: '7.10%',
    bundlers: '0.15%',
    lpBurned: '100%',
    holders: 890,
    proTraders: 420,
    dexPaid: 'Paid',
    txns: 10,
    buyTxns: 4,
    sellTxns: 6,
    chartData: [],
  },
  {
    name: 'PayNet Protocol',
    symbol: 'PAYNET',
    marketCap: '$53.5K',
    liquidity: '$23.3K',
    volume: '$623',
    volume5m: '$98.5K',
    buys: 412,
    buyVolume: '$50.2K',
    sells: 389,
    sellVolume: '$48.3K',
    netVolume: '+$1.90K',
    priceChange: -21.60,
    top10Holders: '18.45%',
    devHoldings: '5%',
    snipersHoldings: '2%',
    insiders: '8.50%',
    bundlers: '0.20%',
    lpBurned: '95%',
    holders: 720,
    proTraders: 310,
    dexPaid: 'Unpaid',
    txns: 8,
    buyTxns: 3,
    sellTxns: 5,
    chartData: [],
  },
  {
    name: 'LOOTFI',
    symbol: 'LOOTFI',
    marketCap: '$91.8K',
    liquidity: '$52.7K',
    volume: '$488',
    volume5m: '$125K',
    buys: 530,
    buyVolume: '$65.8K',
    sells: 467,
    sellVolume: '$59.2K',
    netVolume: '+$6.60K',
    priceChange: -10.89,
    top10Holders: '12.80%',
    devHoldings: '1%',
    snipersHoldings: '0%',
    insiders: '5.90%',
    bundlers: '0.08%',
    lpBurned: '100%',
    holders: 1180,
    proTraders: 580,
    dexPaid: 'Paid',
    txns: 15,
    buyTxns: 9,
    sellTxns: 6,
    chartData: [],
  },
  {
    name: 'PAPEG',
    symbol: 'PAPEG',
    marketCap: '$276K',
    liquidity: '$158K',
    volume: '$212',
    volume5m: '$320K',
    buys: 892,
    buyVolume: '$168K',
    sells: 653,
    sellVolume: '$152K',
    netVolume: '+$16K',
    priceChange: 199.05,
    top10Holders: '10.25%',
    devHoldings: '0%',
    snipersHoldings: '0%',
    insiders: '4.15%',
    bundlers: '0.05%',
    lpBurned: '100%',
    holders: 1520,
    proTraders: 710,
    dexPaid: 'Paid',
    txns: 20,
    buyTxns: 14,
    sellTxns: 6,
    chartData: [],
  },
  {
    name: 'Zerox Society',
    symbol: 'ZEROXS',
    marketCap: '$31.0K',
    liquidity: '$15.8K',
    volume: '$35.7',
    volume5m: '$52.3K',
    buys: 245,
    buyVolume: '$28.1K',
    sells: 312,
    sellVolume: '$24.2K',
    netVolume: '+$3.90K',
    priceChange: -89.14,
    top10Holders: '22.50%',
    devHoldings: '8%',
    snipersHoldings: '5%',
    insiders: '12.80%',
    bundlers: '0.35%',
    lpBurned: '80%',
    holders: 450,
    proTraders: 180,
    dexPaid: 'Unpaid',
    txns: 6,
    buyTxns: 2,
    sellTxns: 4,
    chartData: [],
  },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTokens = async () => {
      setLoading(true);
      const data = await fetchTokens(activeTab);
      setTokens(data);
      setLoading(false);
    };

    loadTokens();

    const interval = setInterval(loadTokens, 30000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header
        balance="$1,234.56"
        walletAddress="0x1234...5678"
        onSearch={setSearchQuery}
      />

      <CommunityTabs
        communities={MOCK_COMMUNITIES}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddCommunity={() => console.log('Add community')}
      />

      <main className="max-w-[1920px] mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">Loading tokens...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTokens.map((token) => (
                <TokenCard
                  key={token.symbol}
                  token={token}
                  onTrade={(token) => console.log('Trade', token)}
                />
              ))}
            </div>

            {filteredTokens.length === 0 && !loading && (
              <div className="text-center py-16">
                <p className="text-slate-400 text-lg">No tokens found matching your search</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
