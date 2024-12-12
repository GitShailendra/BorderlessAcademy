import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Users, Globe2, BookOpen } from 'lucide-react';
import programhero from "../../assets/Images/home/program.jpg";
const ProgramsHero = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      value: "KPM",
      label: "Approved",
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: "10,000+",
      label: "Active Students",
    },
    {
      icon: <Globe2 className="h-6 w-6" />,
      value: "50+",
      label: "Countries",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      value: "4.9/5",
      label: "Parent Rating",
    }
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
              World-Class Malaysian Education for Global Success
            </h1>

            <p className="text-lg text-secondary mb-8 leading-relaxed">
              Experience excellence in education with our KPM-approved curriculum. 
              Combining Malaysian educational standards with innovative digital learning 
              to prepare students for future success.
            </p>

            {/* Vision Statement */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-primary/10 mb-8">
              <p className="text-secondary italic">
                "Empowering students with a perfect blend of Malaysian values and 
                global perspectives through innovative digital education."
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm border border-primary/10"
                >
                  <div className="flex justify-center text-primary mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image & Overlay Elements */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={programhero}
                alt="Digital learning experience"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Elements */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-secondary">KPM Approved</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium text-secondary">Digital Excellence</span>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="absolute bottom-4 left-4 space-y-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-lg inline-block">
                  <span className="text-sm font-medium text-secondary">🇲🇾 Malaysian Curriculum</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-lg inline-block">
                  <span className="text-sm font-medium text-secondary">🌏 Global Standards</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-lg inline-block">
                  <span className="text-sm font-medium text-secondary">📱 Digital-First Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Key Features */}
        <div className="mt-16 text-center">
          <div className="inline-flex gap-8 items-center justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-secondary">Bahasa Malaysia & English</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-secondary">Interactive Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-secondary">24/7 Learning Access</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-secondary">Expert Teachers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsHero;