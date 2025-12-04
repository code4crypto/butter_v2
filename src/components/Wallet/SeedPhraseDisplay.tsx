import { ArrowLeft, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface SeedPhraseDisplayProps {
  onBack: () => void;
  onContinue: () => void;
  seedPhrase?: string[];
  wordCount?: 12 | 24;
}

export function SeedPhraseDisplay({ 
  onBack, 
  onContinue,
  seedPhrase,
  wordCount = 12
}: SeedPhraseDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  
  // Mock seed phrase for demo - in production, this comes from the API
  const mockSeedPhrase = seedPhrase || Array.from({ length: wordCount }, (_, i) => `word${i + 1}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockSeedPhrase.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-white">
            Backup Your Wallet
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Write down these {wordCount} words in order. Keep them safe and never share them with anyone.
          </p>
        </div>

        <div className="space-y-6 pt-4">
          <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Your Recovery Phrase</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRevealed(!revealed)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  {revealed ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {revealed ? (
              <div className={`grid ${wordCount === 12 ? 'grid-cols-3' : 'grid-cols-4'} gap-3`}>
                {mockSeedPhrase.map((word, index) => (
                  <div
                    key={index}
                    className="bg-brown-900/50 border border-slate-700 rounded-lg p-3 flex items-center gap-2"
                  >
                    <span className="text-slate-500 text-sm font-mono w-6">{index + 1}.</span>
                    <span className="text-white font-medium">{word}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid ${wordCount === 12 ? 'grid-cols-3' : 'grid-cols-4'} gap-3`}>
                {mockSeedPhrase.map((_, index) => (
                  <div
                    key={index}
                    className="bg-brown-900/50 border border-slate-700 rounded-lg p-3 flex items-center gap-2"
                  >
                    <span className="text-slate-500 text-sm font-mono w-6">{index + 1}.</span>
                    <span className="text-slate-600">••••••</span>
                  </div>
                ))}
              </div>
            )}

            {copied && (
              <p className="text-sm text-green-400 mt-4 text-center">
                Copied to clipboard!
              </p>
            )}
          </div>

          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
            <p className="text-yellow-400 text-sm">
              ⚠️ <strong>Important:</strong> Store this phrase securely. If you lose it, you'll lose access to your wallet forever.
            </p>
          </div>

          <button
            onClick={onContinue}
            className="w-full py-4 px-6 bg-butter-400 hover:bg-butter-500 text-yellow-800 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-butter-400/30 hover:shadow-butter-500/50 hover:scale-[1.02]"
          >
            I Wrote It Down
          </button>
        </div>
      </div>
    </div>
  );
}



