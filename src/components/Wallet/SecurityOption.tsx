import { ArrowLeft, Key, Mail } from 'lucide-react';
import { useState } from 'react';

interface SecurityOptionProps {
  onBack: () => void;
  onContinue: (securityType: 'seed_phrase' | 'email_passkey') => void;
}

export function SecurityOption({ onBack, onContinue }: SecurityOptionProps) {
  const [selectedOption, setSelectedOption] = useState<'seed_phrase' | 'email_passkey' | null>(null);

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
            How do you want to secure your wallet?
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Choose your preferred security method
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <button
            onClick={() => setSelectedOption('seed_phrase')}
            className={`w-full py-6 px-6 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedOption === 'seed_phrase'
                ? 'border-butter-500 bg-butter-500/10 text-white'
                : 'border-slate-700 bg-brown-800/50 text-slate-300 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                selectedOption === 'seed_phrase' 
                  ? 'bg-butter-500/20' 
                  : 'bg-slate-700/50'
              }`}>
                <Key className={`w-6 h-6 ${
                  selectedOption === 'seed_phrase' 
                    ? 'text-butter-400' 
                    : 'text-slate-400'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Seed Phrase</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Traditional 12 or 24 word recovery phrase
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedOption('email_passkey')}
            className={`w-full py-6 px-6 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedOption === 'email_passkey'
                ? 'border-butter-500 bg-butter-500/10 text-white'
                : 'border-slate-700 bg-brown-800/50 text-slate-300 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                selectedOption === 'email_passkey' 
                  ? 'bg-butter-500/20' 
                  : 'bg-slate-700/50'
              }`}>
                <Mail className={`w-6 h-6 ${
                  selectedOption === 'email_passkey' 
                    ? 'text-butter-400' 
                    : 'text-slate-400'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Email + Passkey</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Modern passwordless authentication
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => selectedOption && onContinue(selectedOption)}
            disabled={!selectedOption}
            className="w-full py-4 px-6 bg-butter-400 hover:bg-butter-500 text-yellow-800 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-butter-400/30 hover:shadow-butter-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}



