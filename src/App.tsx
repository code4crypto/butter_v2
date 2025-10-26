import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { ValueProps } from './components/ValueProps';
import { TechStack } from './components/TechStack';
import { CTA } from './components/CTA';

function App() {
  return (
    <div className="min-h-screen bg-brown-800 text-brown-50">
      <Hero />
      <HowItWorks />
      <Features />
      <ValueProps />
      <TechStack />
      <CTA />
    </div>
  );
}

export default App;
