import { useState, useEffect } from 'react';
import { Bot, Rocket, ArrowRight } from 'lucide-react';

interface CTAProps {
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
    <div className="text-butter-400 font-bold text-sm">Launching in: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</div>
  );
}

export function CTA({ onInstallBot, onLaunchApp }: CTAProps) {
  const [showInstallTimer, setShowInstallTimer] = useState(false);
  const [showLaunchTimer, setShowLaunchTimer] = useState(false);
  const { timeLeft, isActive } = useCountdown();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-brown-800 to-brown-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-butter-400/20 via-butter-500/20 to-butter-400/20 rounded-3xl blur-3xl" />

          <div className="relative p-12 md:p-16 bg-brown-700/80 backdrop-blur-sm rounded-3xl border border-brown-600">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-yellow-300">Ready to Transform Your</span>
                <br />
                <span className="bg-gradient-to-r from-butter-300 to-butter-500 bg-clip-text text-transparent">
                  Trading Experience?
                </span>
              </h2>

              <p className="text-xl text-brown-200 mb-12">
                Join the next generation of crypto traders leveraging community intelligence
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button 
                  className={`group px-8 py-4 bg-butter-400 hover:bg-butter-500 text-yellow-800 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-butter-400/30 flex items-center gap-2 min-w-[240px] justify-center ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                  onMouseEnter={() => isActive && setShowInstallTimer(true)}
                  onMouseLeave={() => isActive && setShowInstallTimer(false)}
                  onTouchStart={() => isActive && setShowInstallTimer(!showInstallTimer)}
                  onClick={isActive ? undefined : onInstallBot}
                >
                  {isActive && showInstallTimer ? (
                    <CountdownTimer timeLeft={timeLeft} />
                  ) : (
                    <>
                      <Bot className="w-5 h-5" />
                      Install Bot
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <button 
                  className={`group px-8 py-4 bg-brown-600 hover:bg-brown-500 border-2 border-butter-400/30 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-butter-400/20 flex items-center gap-2 min-w-[240px] justify-center text-white ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                  onMouseEnter={() => isActive && setShowLaunchTimer(true)}
                  onMouseLeave={() => isActive && setShowLaunchTimer(false)}
                  onTouchStart={() => isActive && setShowLaunchTimer(!showLaunchTimer)}
                  onClick={isActive ? undefined : onLaunchApp}
                >
                  {isActive && showLaunchTimer ? (
                    <CountdownTimer timeLeft={timeLeft} />
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Launch App
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
