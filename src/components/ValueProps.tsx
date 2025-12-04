import { Users, Target } from 'lucide-react';

interface ValuePropsProps {
  onInstallBot?: () => void;
  onLaunchApp?: () => void;
}

export function ValueProps({ onInstallBot, onLaunchApp }: ValuePropsProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-brown-900 to-brown-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-300">Built for</span> <span className="text-butter-400">Two Audiences</span>
          </h2>
          <p className="text-xl text-brown-200">
            Whether you create alpha or trade it, Butter has you covered
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-butter-400/20 to-butter-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-10 bg-brown-700/80 backdrop-blur-sm rounded-3xl border border-brown-600 hover:border-butter-400/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-butter-400/20">
                  <Users className="w-8 h-8 text-butter-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-200">Group Owners</h3>
                  <p className="text-sm text-butter-400">Alpha Creators</p>
                </div>
              </div>

              <p className="text-brown-200 mb-6 leading-relaxed">
                Turn your community insights into on-chain rewards. Butter helps you monetize your alpha while growing engagement.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-butter-400 mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-yellow-200">Monetize Your Alpha</h4>
                    <p className="text-sm text-brown-300">Earn rewards for quality calls that drive community value</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-butter-400 mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-yellow-200">Grow Your Community</h4>
                    <p className="text-sm text-brown-300">Transparent attribution brings credibility and new members</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-butter-400 mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-yellow-200">Track Performance</h4>
                    <p className="text-sm text-brown-300">Analytics dashboard shows your community's impact and earnings</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={onInstallBot}
                className="w-full mt-8 px-6 py-4 bg-butter-400 hover:bg-butter-500 text-yellow-800 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Install Butter Bot
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-butter-300/20 to-butter-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-10 bg-brown-700/80 backdrop-blur-sm rounded-3xl border border-brown-600 hover:border-butter-400/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-butter-300/20">
                  <Target className="w-8 h-8 text-butter-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-200">Traders</h3>
                  <p className="text-sm text-butter-300">Community Members</p>
                </div>
              </div>

              <p className="text-brown-200 mb-6 leading-relaxed">
                Stop missing alpha. Get reliable, data-backed signals from trusted communities all in one place.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-butter-300 mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-yellow-200">Never Miss a Call</h4>
                    <p className="text-sm text-brown-300">Real-time feed aggregates alpha from all your trusted sources</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-butter-300 mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-yellow-200">Trade with Confidence</h4>
                    <p className="text-sm text-brown-300">Every signal backed by on-chain data and historical performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-butter-300 mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-yellow-200">Execute Instantly</h4>
                    <p className="text-sm text-brown-300">Manual or auto-trading with real-time charts and analytics</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={onLaunchApp}
                className="w-full mt-8 px-6 py-4 bg-brown-600 hover:bg-brown-500 border-2 border-butter-400/30 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Launch Terminal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
