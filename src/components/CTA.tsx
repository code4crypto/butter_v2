import { Bot, Rocket, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-brown-800 to-brown-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-butter-400/20 via-butter-500/20 to-butter-400/20 rounded-3xl blur-3xl" />

          <div className="relative p-12 md:p-16 bg-brown-700/80 backdrop-blur-sm rounded-3xl border border-brown-600">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your
                <br />
                <span className="bg-gradient-to-r from-butter-300 to-butter-500 bg-clip-text text-transparent">
                  Trading Experience?
                </span>
              </h2>

              <p className="text-xl text-brown-200 mb-12">
                Join the next generation of crypto traders leveraging community intelligence
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button className="group px-8 py-4 bg-butter-400 hover:bg-butter-500 text-brown-900 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-butter-400/30 flex items-center gap-2 min-w-[240px] justify-center">
                  <Bot className="w-5 h-5" />
                  Install Bot
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group px-8 py-4 bg-brown-600 hover:bg-brown-500 border-2 border-butter-400/30 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-butter-400/20 flex items-center gap-2 min-w-[240px] justify-center">
                  <Rocket className="w-5 h-5" />
                  Launch App
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-brown-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-butter-400" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-butter-400" />
                  Free trial available
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-butter-400" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-brown-700 text-center text-brown-400 text-sm">
          <p>© 2025 Butter Trade Terminal. Built for the crypto trading community.</p>
        </footer>
      </div>
    </section>
  );
}
