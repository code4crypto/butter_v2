import { useState } from 'react';
import { Header } from './Header';
import { CommunityTabs } from './CommunityTabs';
import { TokenCard } from './TokenCard';

const MOCK_COMMUNITIES = ['All', 'Sauce', 'Alpha DAO', 'Degen Grp', 'Crypto CT'];

const MOCK_TOKENS = [
  {
    name: "Don't Even Trip Dawg",
    symbol: 'TRIP',
    marketCap: '$82,936',
    volume: '$10,504',
    priceChange: 66.14,
    chartData: [],
  },
  {
    name: 'CORTEX',
    symbol: 'CORTEX',
    marketCap: '$82,656',
    volume: '$4,750',
    priceChange: -6.76,
    chartData: [],
  },
  {
    name: 'PayNet Protocol',
    symbol: 'PAYNET',
    marketCap: '$53,532',
    volume: '$622.99',
    priceChange: -21.60,
    chartData: [],
  },
  {
    name: 'LOOTFI',
    symbol: 'LOOTFI',
    marketCap: '$91,835',
    volume: '$487.71',
    priceChange: -10.89,
    chartData: [],
  },
  {
    name: 'PAPEG',
    symbol: 'PAPEG',
    marketCap: '$276,341',
    volume: '$211.63',
    priceChange: 199.05,
    chartData: [],
  },
  {
    name: 'Zerox Society',
    symbol: 'ZEROXS',
    marketCap: '$31,008',
    volume: '$35.7',
    priceChange: -89.14,
    chartData: [],
  },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = MOCK_TOKENS.filter((token) =>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTokens.map((token) => (
            <TokenCard
              key={token.symbol}
              token={token}
              onTrade={(token) => console.log('Trade', token)}
            />
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No tokens found matching your search</p>
          </div>
        )}
      </main>
    </div>
  );
}
