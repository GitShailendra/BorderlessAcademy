// src/pages/home/Home.jsx
import React, { useEffect, Suspense } from "react";
import { useTheme } from '../../assets/Theme/ThemeContext';
import CoursesHero from "./CoursesHero";

// Lazy load Hero component


const Courses = () => {
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <Suspense fallback={<div className="h-screen animate-pulse bg-background" />}>
          <CoursesHero />
        </Suspense>
      </div>
    </div>
  );
};

export default Courses;