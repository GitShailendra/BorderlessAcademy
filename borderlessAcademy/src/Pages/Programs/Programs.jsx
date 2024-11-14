import React, { useEffect, Suspense, useState } from "react";
import { useTheme } from '../../assets/Theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import PageTransition from '../../Components/common/PageTransition';
import ThemeDebugger from "../../Components/ThemeDebugger";
import InternationalSection from "./InternationalSection";
import MalaysianSyllabusSection from "./MalaysianSyllabusSection";
import HowItWorksSection from "./HowItWorksSection";
import CurriculumSection from "./CurriculumSection";

// Lazy load hero component
const ProgramsHero = React.lazy(() => import("./ProgramsHero"));

// Loading component
const SectionLoader = () => (
  <div className="h-screen animate-pulse bg-background" />
);

const Programs = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [showDebugger, setShowDebugger] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

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
      <button
        onClick={() => setShowDebugger(prev => !prev)}
        className="fixed top-4 right-4 z-50 px-3 py-1 text-xs bg-gray-800 text-white rounded-full opacity-50 hover:opacity-100 transition-opacity"
      >
        {showDebugger ? 'Hide Debugger' : 'Show Debugger'}
      </button>

      {showDebugger && <ThemeDebugger />}

      <div className="relative">
        <PageTransition>
          <Suspense fallback={<SectionLoader />}>
            <ProgramsHero />
            <MalaysianSyllabusSection />
            <InternationalSection />
            <HowItWorksSection />
            <CurriculumSection />
          </Suspense>
        </PageTransition>
      </div>
    </div>
  );
};

export default Programs;