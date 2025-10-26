import { Server, Zap, Lock } from 'lucide-react';

export function TechStack() {
  const technologies = [
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis', category: 'Cache' },
    { name: 'Web3.js', category: 'Blockchain' },
    { name: 'TimescaleDB', category: 'Time-Series' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'TypeScript', category: 'Language' },
  ];

  return (
    <section className="py-24 px-6 bg-brown-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built on <span className="text-butter-400">Enterprise Infrastructure</span>
          </h2>
          <p className="text-xl text-brown-200">
            Powered by our in-house on-chain infrastructure
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group p-6 bg-brown-700/50 rounded-2xl border border-brown-600 hover:border-butter-400/50 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-lg font-bold mb-1 group-hover:text-butter-400 transition-colors">
                {tech.name}
              </div>
              <div className="text-xs text-brown-400">{tech.category}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-brown-700/50 rounded-2xl border border-brown-600">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-butter-400/20 mb-4">
              <Zap className="w-6 h-6 text-butter-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">High Performance</h3>
            <p className="text-brown-200 text-sm">
              Process millions of messages per day with sub-second latency
            </p>
          </div>

          <div className="p-8 bg-brown-700/50 rounded-2xl border border-brown-600">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-butter-400/20 mb-4">
              <Lock className="w-6 h-6 text-butter-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
            <p className="text-brown-200 text-sm">
              Bank-grade encryption and secure custody of all trading credentials
            </p>
          </div>

          <div className="p-8 bg-brown-700/50 rounded-2xl border border-brown-600">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-butter-400/20 mb-4">
              <Server className="w-6 h-6 text-butter-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">99.9% Uptime</h3>
            <p className="text-brown-200 text-sm">
              Distributed infrastructure ensures you never miss critical alpha
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
