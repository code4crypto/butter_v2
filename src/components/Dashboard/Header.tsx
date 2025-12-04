import { Search, Bell, Settings, ChevronDown, Wallet } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  balance: string;
  walletAddress: string;
  onSearch: (query: string) => void;
  onViewWallet?: () => void;
  onViewHistory?: () => void;
  onViewDeposit?: () => void;
  onViewWithdraw?: () => void;
  onViewSettings?: () => void;
  onBackToDashboard?: () => void;
  showBackToDashboard?: boolean;
}

export function Header({ 
  balance, 
  walletAddress, 
  onSearch,
  onViewWallet,
  onViewHistory,
  onViewDeposit,
  onViewWithdraw,
  onViewSettings,
  onBackToDashboard,
  showBackToDashboard = false,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBalanceMenu, setShowBalanceMenu] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {showBackToDashboard && onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors duration-200"
              >
                ← Trading
              </button>
            )}
            <h1 className="text-xl font-bold text-white hidden md:block">Butter Terminal</h1>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-400 hidden sm:inline">Live</span>
              <span className="text-slate-500 text-xs hidden lg:inline">
                Price Data Updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search tokens..."
                className="w-64 pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors duration-200"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <span className="text-white text-sm hidden sm:inline">{walletAddress}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => {
                        setShowAccountMenu(false);
                        onViewWallet?.();
                      }}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-700 rounded flex items-center gap-2"
                    >
                      <Wallet className="w-4 h-4" />
                      Portfolio
                    </button>
                    <button 
                      onClick={() => {
                        setShowAccountMenu(false);
                        onViewHistory?.();
                      }}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-700 rounded flex items-center gap-2"
                    >
                      📝 Order History
                    </button>
                    <button 
                      onClick={() => {
                        setShowAccountMenu(false);
                        onViewSettings?.();
                      }}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-700 rounded flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-700 rounded flex items-center gap-2">
                      🚪 Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowBalanceMenu(!showBalanceMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors duration-200"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-sm">{balance}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showBalanceMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl">
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-slate-400 text-sm">Butter Wallet</p>
                      <p className="text-white text-xl font-bold">{balance}</p>
                    </div>
                    <div className="space-y-2">
                      <button 
                        onClick={() => {
                          setShowBalanceMenu(false);
                          onViewDeposit?.();
                        }}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors duration-200"
                      >
                        Add Funds
                      </button>
                      <button 
                        onClick={() => {
                          setShowBalanceMenu(false);
                          onViewWithdraw?.();
                        }}
                        className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
                      >
                        Withdraw
                      </button>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Recent Transactions:</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-slate-300">
                          <span>+0.5 SOL</span>
                          <span className="text-slate-500">2h ago</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>-0.1 SOL</span>
                          <span className="text-slate-500">5h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 text-slate-400 hover:text-white transition-colors duration-200">
              <Settings className="w-5 h-5" />
            </button>

            <button className="p-2 text-slate-400 hover:text-white transition-colors duration-200">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
