import { useState, useEffect } from 'react';
import { TrendingUp, Bot, Rocket } from 'lucide-react';

interface HeroProps {
  onInstallBot?: () => void;
  onLaunchApp?: () => void;
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Countdown starts from October 31, 2025 07:00 UTC, runs for 72 hours
    const startTime = new Date('2025-10-31T07:00:00Z').getTime();
    const endTime = startTime + (72 * 60 * 60 * 1000); // 72 hours later
    
    const updateTimer = () => {
      const now = Date.now();
      
      // If before countdown starts, show time until it starts
      if (now < startTime) {
        const diff = startTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
        setIsActive(true);
        return;
      }
      
      // Countdown is active, show remaining 72 hours
      const diff = endTime - now;
      
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setIsActive(false);
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
      setIsActive(true);
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return { timeLeft, isActive };
}

function CountdownTimer({ timeLeft }: { timeLeft: { hours: number; minutes: number; seconds: number } }) {
  return (
    <div className="text-butter-400 font-bold text-sm mb-1">Launching in: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</div>
  );
}

export function Hero({ onInstallBot, onLaunchApp }: HeroProps) {
  const [showInstallTimer, setShowInstallTimer] = useState(false);
  const [showLaunchTimer, setShowLaunchTimer] = useState(false);
  const { timeLeft, isActive } = useCountdown();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-butter-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-butter-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-butter-400/10 border border-butter-400/30 mb-8 animate-fade-in">
          <TrendingUp className="w-4 h-4 text-butter-400" />
          <span className="text-sm text-butter-400 font-medium">Real-Time Alpha Discovery</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-yellow-300">Convert Community Chatter</span>
          <br />
          <span className="bg-gradient-to-r from-butter-300 to-butter-500 bg-clip-text text-transparent">
            Into Quant Signals
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-brown-200 mb-12 max-w-3xl mx-auto">
          Butter crawls Telegram & Discord alpha in real time — surfacing the next mooner before it moons.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className={`group px-8 py-4 bg-butter-400 hover:bg-butter-500 text-yellow-800 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-butter-400/30 flex flex-col items-center gap-1 min-w-[240px] ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
            onMouseEnter={() => isActive && setShowInstallTimer(true)}
            onMouseLeave={() => isActive && setShowInstallTimer(false)}
            onTouchStart={() => isActive && setShowInstallTimer(!showInstallTimer)}
            onClick={isActive ? undefined : onInstallBot}
          >
            {isActive && showInstallTimer ? (
              <CountdownTimer timeLeft={timeLeft} />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Install Bot
                </div>
                <span className="text-xs opacity-75">For Group Owners</span>
              </>
            )}
          </button>

          <button 
            className={`group px-8 py-4 bg-brown-700 hover:bg-brown-600 border-2 border-butter-400/30 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-butter-400/20 flex flex-col items-center gap-1 text-white min-w-[240px] ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
            onMouseEnter={() => isActive && setShowLaunchTimer(true)}
            onMouseLeave={() => isActive && setShowLaunchTimer(false)}
            onTouchStart={() => isActive && setShowLaunchTimer(!showLaunchTimer)}
            onClick={isActive ? undefined : onLaunchApp}
          >
            {isActive && showLaunchTimer ? (
              <CountdownTimer timeLeft={timeLeft} />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Launch App
                </div>
                <span className="text-xs opacity-75 text-white">For Traders</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-brown-700">
          <div>
            <div className="text-3xl font-bold text-butter-400 mb-2">24/7</div>
            <div className="text-sm text-brown-400">Alpha Monitoring</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-butter-400 mb-2">Real-Time</div>
            <div className="text-sm text-brown-400">Signal Processing</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-butter-400 mb-2">On-Chain</div>
            <div className="text-sm text-brown-400">Data Validation</div>
          </div>
        </div>
      </div>
    </section>
  );
}
