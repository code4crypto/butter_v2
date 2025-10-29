import { ArrowLeft, Copy } from 'lucide-react';
import { useState } from 'react';

interface FundAccountProps {
  onBack: () => void;
  onComplete: () => void;
  walletAddress: string;
}

const QUICK_AMOUNTS = [0.1, 0.5, 1, 5];

export function FundAccount({ onBack, onComplete, walletAddress }: FundAccountProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-white">
            Fund Your Trading Wallet
          </h1>
          <p className="text-slate-400">
            Transfer funds to start trading instantly
          </p>
        </div>

        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <label className="block text-sm text-slate-400">
              Butter Wallet Address
            </label>
            <div className="flex gap-2">
              <div className="flex-1 py-3 px-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white font-mono text-sm overflow-hidden">
                {walletAddress}
              </div>
              <button
                onClick={handleCopy}
                className="px-4 bg-slate-800/50 border border-slate-700 hover:border-amber-500 rounded-xl transition-colors duration-200"
              >
                <Copy className={`w-5 h-5 ${copied ? 'text-green-400' : 'text-slate-400'}`} />
              </button>
            </div>
            {copied && (
              <p className="text-sm text-green-400">Copied to clipboard!</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm text-slate-400">
              Quick Transfer Amounts
            </label>
            <div className="grid grid-cols-4 gap-3">
              {QUICK_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-4 px-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedAmount === amount
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-lg font-semibold">{amount}</div>
                  <div className="text-xs">SOL</div>
                </button>
              ))}
            </div>
          </div>

          <button
            className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={!selectedAmount}
          >
            Transfer from Wallet
          </button>

          <button
            onClick={onComplete}
            className="w-full text-slate-400 hover:text-white transition-colors duration-200 py-2"
          >
            I'll fund later - Start Trading
          </button>
        </div>
      </div>
    </div>
  );
}
