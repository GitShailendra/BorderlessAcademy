import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center">
          <div className="w-full lg:w-1/2 py-20 lg:py-0">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold space-y-4 mb-6">
              <span className="block text-primary">
                Education
              </span>
              <span className="block text-primary">
                Without
              </span>
              <span className="block text-secondary">
                Boundaries
              </span>
            </h1>

            {/* Vision Statement */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-10">
              At Borderless Academy, we envision a world where education knows no borders. 
              Our innovative digital platform connects students globally, providing personalized 
              learning experiences that adapt to each student's unique needs and cultural context.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <button 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary border-2 border-primary rounded-full hover:bg-primary/5 transition-colors"
                onClick={() => {/* Add video modal functionality */}}
              >
                Learn More
                <Play className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right side image */}
          <div className="hidden lg:block w-1/2 pl-20">
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/api/placeholder/800/600" 
                  alt="Students learning globally"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 -left-8 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Live Classes</span>
                </div>
              </div>

              <div className="absolute bottom-8 -right-8 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium">Global Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}