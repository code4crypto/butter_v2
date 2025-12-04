import { Hero } from './Hero';
import { Features } from './Features';
import { ValueProps } from './ValueProps';
import { HowItWorks } from './HowItWorks';
import { TechStack } from './TechStack';
import { CTA } from './CTA';
import { CommunityBanner } from './CommunityBanner';

interface LandingPageProps {
  onInstallBot?: () => void;
  onLaunchApp?: () => void;
  onViewWalletDemo?: () => void;
}

export function LandingPage({ onInstallBot, onLaunchApp, onViewWalletDemo }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <Hero onInstallBot={onInstallBot} onLaunchApp={onLaunchApp} />
      <Features />
      {/* <ValueProps onInstallBot={onInstallBot} onLaunchApp={onLaunchApp} /> */}
      <HowItWorks />
      {/* <TechStack /> */}
      <CTA onInstallBot={onInstallBot} onLaunchApp={onLaunchApp} />
      <CommunityBanner />
      <footer className="bg-brown-900 py-8 px-6 border-t border-brown-700 text-center text-brown-400 text-sm">
        <p>© 2025 Butter Trade Terminal. Built for the crypto trading community.</p>
        {onViewWalletDemo && (
          <button
            onClick={onViewWalletDemo}
            className="mt-4 px-4 py-2 bg-butter-400/20 hover:bg-butter-400/30 border border-butter-400/50 text-butter-400 rounded-lg transition-colors"
          >
            View Wallet Components Demo
          </button>
        )}
      </footer>
    </div>
  );
}

