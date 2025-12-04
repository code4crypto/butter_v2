import { useState } from 'react';
import { ArrowLeft, ExternalLink, Copy, Check } from 'lucide-react';

interface HistoryPageProps {
  onBack: () => void;
  transactions: Array<{
    transactionId: string;
    type: 'trade' | 'deposit' | 'withdrawal' | 'royalty';
    tokenMint?: string;
    tokenSymbol?: string;
    amount: number;
    pnl?: number;
    fee: number;
    txHash: string;
    timestamp: string;
  }>;
}

export function HistoryPage({ onBack, transactions }: HistoryPageProps) {
  const [filter, setFilter] = useState<'all' | 'trades' | 'deposits' | 'withdrawals' | 'royalties'>('all');
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.type === filter);

  const handleCopyTx = (txHash: string) => {
    navigator.clipboard.writeText(txHash);
    setCopiedTx(txHash);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trade':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/30';
      case 'deposit':
        return 'bg-green-400/10 text-green-400 border-green-400/30';
      case 'withdrawal':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30';
      case 'royalty':
        return 'bg-purple-400/10 text-purple-400 border-purple-400/30';
      default:
        return 'bg-slate-400/10 text-slate-400 border-slate-400/30';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-white">Transaction History</h1>
        </div>

        {/* Filters */}
        <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex flex-wrap gap-2">
            {(['all', 'trades', 'deposits', 'withdrawals', 'royalties'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filter === f
                    ? 'bg-butter-400 text-yellow-800'
                    : 'bg-brown-700/50 text-slate-300 hover:bg-brown-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No transactions found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((tx) => (
                <div
                  key={tx.transactionId}
                  className="bg-brown-900/50 border border-slate-700 rounded-lg p-4 hover:bg-brown-900/70 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`px-3 py-1 rounded-lg border text-sm font-medium capitalize ${getTypeColor(tx.type)}`}>
                        {tx.type}
                      </div>
                      
                      <div className="flex-1">
                        {tx.tokenSymbol && (
                          <p className="text-white font-medium">{tx.tokenSymbol}</p>
                        )}
                        <p className="text-slate-400 text-sm">{formatDate(tx.timestamp)}</p>
                      </div>

                      <div className="text-right">
                        <p className={`font-semibold ${
                          tx.type === 'deposit' || (tx.pnl && tx.pnl > 0)
                            ? 'text-green-400'
                            : tx.type === 'withdrawal' || (tx.pnl && tx.pnl < 0)
                            ? 'text-red-400'
                            : 'text-white'
                        }`}>
                          {tx.type === 'withdrawal' ? '-' : '+'}{tx.amount.toFixed(4)} SOL
                        </p>
                        {tx.pnl !== undefined && (
                          <p className={`text-sm ${
                            tx.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            PNL: {tx.pnl >= 0 ? '+' : ''}{tx.pnl.toFixed(4)} SOL
                          </p>
                        )}
                        {tx.fee > 0 && (
                          <p className="text-slate-500 text-sm">Fee: {tx.fee.toFixed(4)} SOL</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleCopyTx(tx.txHash)}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                        title="Copy transaction hash"
                      >
                        {copiedTx === tx.txHash ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={`https://solscan.io/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                        title="View on Solscan"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



