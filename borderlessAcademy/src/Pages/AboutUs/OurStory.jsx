import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book, Heart, Globe2, Lightbulb } from 'lucide-react';

export default function OurStory() {
  const { t } = useTranslation();

  const milestones = [
    {
      icon: <Book className="h-6 w-6" />,
      year: "2018",
      title: "Foundation",
      description: "Established with a vision to break down educational barriers",
      translationKey: 'foundation'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      year: "2019",
      title: "Scholarship Program",
      description: "Launched initiatives for underserved communities",
      translationKey: 'scholarship'
    },
    {
      icon: <Globe2 className="h-6 w-6" />,
      year: "2020",
      title: "Global Expansion",
      description: "Extended our reach to 50+ countries",
      translationKey: 'expansion'
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      year: "2023",
      title: "Digital Innovation",
      description: "Implemented AI-driven personalized learning",
      translationKey: 'innovation'
    }
  ];

  const features = [
    {
      icon: "🎓",
      text: "Quality Education",
      translationKey: 'feature1'
    },
    {
      icon: "🌟",
      text: "Global Community",
      translationKey: 'feature2'
    },
    {
      icon: "🤝",
      text: "Inclusive Learning",
      translationKey: 'feature3'
    }
  ];

  const values = [
    { text: "Innovation First", translationKey: 'innovation' },
    { text: "Inclusive Education", translationKey: 'inclusion' },
    { text: "Academic Excellence", translationKey: 'excellence' },
    { text: "Community Focus", translationKey: 'community' }
  ];

  return (
    <div className="relative min-h-[80vh] bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Our Journey of Educational Innovation
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Borderless Academy was founded with a clear mission: to make high-quality education 
              accessible to every child, regardless of location or background. We've grown from 
              a small initiative to a global platform for learning.
            </p>

            {/* Vision Statement */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-primary/10 mb-8">
              <p className="text-gray-700 italic">
                "We envision a world where education knows no borders, where every learner has 
                equal access to learning opportunities, irrespective of where they live or their circumstances."
              </p>
            </div>

            {/* Milestone Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm border border-primary/10 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center text-primary mb-2">
                    {milestone.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {milestone.year}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {milestone.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image & Overlay Elements */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/api/placeholder/800/1000"
                alt="Our educational journey through the years"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Elements */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">Social Impact</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium text-gray-700">Excellence in Education</span>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="absolute bottom-4 left-4 space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-lg inline-block">
                    <span className="text-sm font-medium text-gray-700">
                      {feature.icon} {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Key Values */}
        <div className="mt-16 text-center">
          <div className="inline-flex gap-8 items-center justify-center flex-wrap">
            {values.map((value, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-600">{value.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}