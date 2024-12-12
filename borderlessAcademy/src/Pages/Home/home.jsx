import React, { useEffect, Suspense, useState } from "react";
import { useTheme } from '../../assets/Theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import HowItWorksSection from "./HowItWorksSection";
import PopularCoursesSection from "./PopularCoursesSection";
import FeaturesAndCTA from "./FeaturesAndCTA";
import PageTransition from '../../Components/common/PageTransition';
import ThemeDebugger from "../../Components/ThemeDebugger";
import FeaturesSection from "./FeaturesAndCTA";
import GradesSection from "./GradesSection";
import WhyChooseUsSection from "./WhyChooseUsSection";

// Lazy load Hero component
const Hero = React.lazy(() => import("./Hero"));

const Home = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [showDebugger, setShowDebugger] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Toggle debugger with keyboard shortcut (Ctrl + Shift + D)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setShowDebugger(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative">
      {/* Theme Debugger Toggle Button */}
      {/* <button
        onClick={() => setShowDebugger(prev => !prev)}
        className="fixed top-4 right-4 z-50 px-3 py-1 text-xs bg-gray-800 text-white rounded-full opacity-50 hover:opacity-100 transition-opacity"
      >
        {showDebugger ? 'Hide Debugger' : 'Show Debugger'}
      </button> */}

      {/* Theme Debugger */}
      {showDebugger && <ThemeDebugger />}

      <div className="relative">
        <PageTransition>
          <Suspense fallback={<div className="h-screen animate-pulse bg-background" />}>
            <Hero />
            <FeaturesSection />
            <GradesSection />
            <WhyChooseUsSection />
            <HowItWorksSection />
            <PopularCoursesSection />
            {/* <FeaturesAndCTA /> */}
          </Suspense>
        </PageTransition>
      </div>
    </div>
  );
};

export default Home;