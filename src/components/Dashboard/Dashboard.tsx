import { useState, useEffect } from 'react';
import { Header } from './Header';
import { CommunityTabs } from './CommunityTabs';
import { TokenCard } from './TokenCard';
import { fetchTokens, type TokenData } from '../../services/api';

const MOCK_COMMUNITIES = ['All', 'Sauce', 'Alpha DAO', 'Degen Grp', 'Crypto CT'];

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
