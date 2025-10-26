import { MessageSquare, Search, Database, TrendingUp } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Bot Crawls Chats',
      description: 'Our bots monitor Telegram & Discord channels 24/7, capturing every message in real-time.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Search,
      title: 'Parse Token Mentions',
      description: 'Advanced NLP algorithms identify token mentions and extract actionable trading signals.',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Database,
      title: 'On-Chain Validation',
      description: 'Cross-reference mentions with live on-chain data: volume, holders, liquidity, and more.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: TrendingUp,
      title: 'Ranked Feed',
      description: 'Proprietary algorithms rank signals and display them in a Netflix-style trading terminal.',
      color: 'from-blue-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-brown-800 to-brown-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-butter-400">Works</span>
          </h2>
          <p className="text-xl text-brown-200">
            From community chatter to actionable trades in milliseconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />

                <div className="relative p-8 bg-brown-700/50 backdrop-blur-sm rounded-2xl border border-brown-600 hover:border-butter-400/50 transition-all duration-300 h-full">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-butter-400/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-butter-400" />
                  </div>

                  <div className="absolute top-4 right-4 text-5xl font-bold text-brown-600/30">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-brown-200 text-sm leading-relaxed">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-butter-400/50 to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 bg-butter-400/10 rounded-2xl border border-butter-400/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">See It In Action</h3>
              <p className="text-brown-200">Watch how Butter Terminal transforms raw chat data into profitable signals</p>
            </div>
            <button className="px-6 py-3 bg-butter-400 hover:bg-butter-500 text-brown-900 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
