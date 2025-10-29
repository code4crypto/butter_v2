import { Droplet } from 'lucide-react';

interface WelcomeProps {
  onConnect: () => void;
  onTelegram: () => void;
  onBrowse: () => void;
}

export function Welcome({ onConnect, onTelegram, onBrowse }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/50">
            <Droplet className="w-12 h-12 text-slate-900" fill="currentColor" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-white">
            Welcome to Butter Terminal
          </h1>
          <p className="text-lg text-slate-400">
            Trade crypto based on community intelligence
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <button
            onClick={onConnect}
            className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02]"
          >
            Connect External Wallet
          </button>

          <button
            onClick={onTelegram}
            className="w-full py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]"
          >
            Connect via Telegram
          </button>

          <button
            onClick={onBrowse}
            className="text-slate-400 hover:text-white transition-colors duration-200 py-2"
          >
            Browse feeds without connecting
          </button>
        </div>
      </div>
    </div>
  );
}
