import React, { useEffect, Suspense, useState } from "react";
import { useTheme } from '../../assets/Theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import PageTransition from '../../Components/common/PageTransition';
import ThemeDebugger from "../../Components/ThemeDebugger";


// Lazy load sections
const AboutHero = React.lazy(() => import("./AboutHero"));
const VisionMission = React.lazy(() => import("./VisionMission"));
const OurStory = React.lazy(() => import("./OurStory"));
// const LeadershipTeam = React.lazy(() => import("./sections/LeadershipTeam"));
const SocialImpact = React.lazy(() => import("./SocialImpact"));
// const DigitalInnovation = React.lazy(() => import("./sections/DigitalInnovation"));
// const ParentCommunity = React.lazy(() => import("./sections/ParentCommunity"));
// const Recognition = React.lazy(() => import("./sections/Recognition"));
// const AboutCTA = React.lazy(() => import("./sections/AboutCTA"));

const About = () => {
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
      <button
        onClick={() => setShowDebugger(prev => !prev)}
        className="fixed top-4 right-4 z-50 px-3 py-1 text-xs bg-gray-800 text-white rounded-full opacity-50 hover:opacity-100 transition-opacity"
      >
        {showDebugger ? 'Hide Debugger' : 'Show Debugger'}
      </button>

      {/* Theme Debugger */}
      {showDebugger && <ThemeDebugger />}

      <div className="relative">
        <PageTransition>
          <Suspense fallback={<div className="h-screen animate-pulse bg-background" />}>
            {/* About Hero Section */}
            <AboutHero />
            <VisionMission />
            <OurStory />
            <SocialImpact />
          </Suspense>
        </PageTransition>
      </div>
    </div>
  );
};

export default About;