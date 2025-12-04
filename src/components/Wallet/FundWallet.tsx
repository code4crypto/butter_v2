import { ArrowLeft, Copy, QrCode, ExternalLink, Check } from 'lucide-react';
import { useState } from 'react';

interface FundWalletProps {
  onBack: () => void;
  onSkip: () => void;
  walletAddress: string;
}

export function FundWallet({ onBack, onSkip, walletAddress }: FundWalletProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 flex items-center justify-center px-4">
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
            Add Funds to Start Trading
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Transfer SOL to your Butter Wallet to begin trading
          </p>
        </div>

        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Deposit Options</h3>
            
            <button className="w-full py-4 px-6 bg-brown-800/50 hover:bg-brown-700/50 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 font-bold">P</span>
                </div>
                <span className="text-white font-medium">Deposit from Phantom</span>
              </div>
              <ExternalLink className="w-5 h-5 text-slate-400" />
            </button>

            <button className="w-full py-4 px-6 bg-brown-800/50 hover:bg-brown-700/50 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 font-bold">S</span>
                </div>
                <span className="text-white font-medium">Deposit from Solflare</span>
              </div>
              <ExternalLink className="w-5 h-5 text-slate-400" />
            </button>

            <button className="w-full py-4 px-6 bg-brown-800/50 hover:bg-brown-700/50 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 font-bold">C</span>
                </div>
                <span className="text-white font-medium">Deposit from CEX</span>
              </div>
              <ExternalLink className="w-5 h-5 text-slate-400" />
            </button>

            <button 
              onClick={() => setShowQR(!showQR)}
              className="w-full py-4 px-6 bg-brown-800/50 hover:bg-brown-700/50 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-slate-400" />
                <span className="text-white font-medium">Request Deposit Link (QR)</span>
              </div>
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-sm text-slate-400">
              Wallet Address
            </label>
            <div className="flex gap-2">
              <div className="flex-1 py-3 px-4 bg-brown-800/50 border border-slate-700 rounded-xl text-white font-mono text-sm overflow-hidden">
                {walletAddress}
              </div>
              <button
                onClick={handleCopy}
                className="px-4 bg-brown-800/50 border border-slate-700 hover:border-butter-500 rounded-xl transition-colors duration-200"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-slate-400" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-sm text-green-400">Copied to clipboard!</p>
            )}
          </div>

          {showQR && (
            <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                {/* QR Code placeholder - in production, use a QR code library */}
                <div className="w-48 h-48 bg-slate-200 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-400" />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={onSkip}
            className="w-full text-slate-400 hover:text-white transition-colors duration-200 py-2"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

