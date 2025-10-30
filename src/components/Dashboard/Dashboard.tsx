import { useState, useEffect } from 'react';
import { Header } from './Header';
import { CommunityTabs } from './CommunityTabs';
import { TokenCard } from './TokenCard';
import { fetchTokens, type TokenData } from '../../services/api';
import { useWebSocket } from '../../hooks/useWebSocket';

const MOCK_COMMUNITIES = ['All', 'Sauce', 'Alpha DAO', 'Degen Grp', 'Crypto CT'];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);

  const contracts = tokens.map(t => t.contract);
  console.log('🎯 Dashboard has', contracts.length, 'contracts:', contracts.slice(0, 2));
  const { data: wsData, isConnected } = useWebSocket(contracts, '1m');
  console.log('📊 WebSocket connected:', isConnected, 'data entries:', wsData.size);

  useEffect(() => {
    const loadTokens = async () => {
      setLoading(true);
      const data = await fetchTokens(activeTab);
      setTokens(data);
      setLoading(false);
    };

    loadTokens();
  }, [activeTab]);

  useEffect(() => {
    if (wsData.size === 0) return;

    setTokens(prevTokens =>
      prevTokens.map(token => {
        const ohlcvArray = wsData.get(token.contract);
        if (!ohlcvArray || ohlcvArray.length === 0) return token;

        const chartData = ohlcvArray.map(candle => ({
          time: candle.time,
          value: candle.close,
        }));

        const latestCandle = ohlcvArray[ohlcvArray.length - 1];
        const firstCandle = ohlcvArray[0];
        const priceChange = firstCandle.close > 0
          ? ((latestCandle.close - firstCandle.close) / firstCandle.close) * 100
          : 0;

        return {
          ...token,
          priceChange,
          volume: `$${(latestCandle.volume.dollar / 1000).toFixed(1)}K`,
          marketCap: latestCandle.marketCap ? `$${(latestCandle.marketCap / 1000).toFixed(1)}K` : token.marketCap,
          chartData: chartData.length > 0 ? chartData : token.chartData,
        };
      })
    );
  }, [wsData]);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
