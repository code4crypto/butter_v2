import { Zap, Shield, BarChart3, Bell, Sparkles, Activity } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Real-Time Alpha Curation',
      description: 'Never miss a call. Our bots monitor channels 24/7 and surface opportunities instantly.',
    },
    {
      icon: Shield,
      title: 'On-Chain Backed Signals',
      description: 'Every signal validated against live blockchain data: volume, liquidity, holder distribution.',
    },
    {
      icon: BarChart3,
      title: 'Backtested Strategies',
      description: 'Historical performance data shows you which signals and communities deliver consistent alpha.',
    },
    {
      icon: Bell,
      title: 'Auto-Trading & Alerts',
      description: 'Execute trades automatically or receive instant notifications when your criteria match.',
    },
    {
      icon: Sparkles,
      title: 'Rewarded Community System',
      description: 'Group owners and alpha hunters earn on-chain rewards for quality calls and engagement.',
    },
    {
      icon: Activity,
      title: 'Live Market Analytics',
      description: 'Real-time charts, sentiment analysis, and token metrics integrated into every signal.',
    },
  ];

  return (
    <section className="py-24 px-6 bg-brown-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-300">Built for</span> <span className="text-butter-400">Serious Traders</span>
          </h2>
          <p className="text-xl text-brown-200 max-w-2xl mx-auto">
            Every feature designed to give you an edge in the fast-moving crypto markets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 bg-brown-700/50 backdrop-blur-sm rounded-2xl border border-brown-600 hover:border-butter-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-butter-400/0 group-hover:from-butter-400/5 rounded-2xl transition-all duration-300" />

                <div className="relative">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-butter-400/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-butter-400" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-yellow-200">{feature.title}</h3>
                  <p className="text-brown-200 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
