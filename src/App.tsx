import { useState } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <>
      {showOnboarding ? (
        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
