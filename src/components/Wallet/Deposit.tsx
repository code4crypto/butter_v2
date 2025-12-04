import { ArrowLeft, Copy, QrCode, Check } from 'lucide-react';
import { useState } from 'react';

interface DepositProps {
  onBack: () => void;
  walletAddress: string;
  qrCode?: string; // Base64 encoded QR code
}

export function Deposit({ onBack, walletAddress, qrCode }: DepositProps) {
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
            Deposit Funds Into Butter Wallet
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Funds will appear once confirmed on-chain
          </p>
        </div>

        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <label className="block text-sm text-slate-400">
              Deposit Address
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

          <button
            onClick={() => setShowQR(!showQR)}
            className="w-full py-4 px-6 bg-brown-800/50 hover:bg-brown-700/50 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-white font-medium"
          >
            <QrCode className="w-5 h-5" />
            {showQR ? 'Hide QR Code' : 'Show QR Code'}
          </button>

          {showQR && (
            <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6 flex items-center justify-center">
              {qrCode ? (
                <img 
                  src={`data:image/png;base64,${qrCode}`} 
                  alt="Deposit QR Code" 
                  className="w-64 h-64"
                />
              ) : (
                <div className="bg-white p-4 rounded-lg">
                  <div className="w-64 h-64 bg-slate-200 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-slate-400" />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-4">
            <p className="text-blue-400 text-sm">
              💡 Send only SOL to this address. Sending other tokens may result in permanent loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



