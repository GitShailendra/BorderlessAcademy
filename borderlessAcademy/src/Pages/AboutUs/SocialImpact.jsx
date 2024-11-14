import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, GraduationCap, Globe, Landmark, HandHeart, Sprout, Target, LineChart, ArrowRight } from 'lucide-react';

export default function SocialImpact() {
  const { t } = useTranslation();

  const impactStats = [
    {
      icon: <HandHeart className="h-8 w-8" />,
      value: "2,500+",
      label: "Scholarships Awarded",
      color: "bg-blue-50"
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "15+",
      label: "Community Partners",
      color: "bg-green-50"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: "30+",
      label: "Rural Communities",
      color: "bg-purple-50"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      value: "85%",
      label: "Program Completion",
      color: "bg-orange-50"
    }
  ];

  const initiatives = [
    {
      icon: <Landmark className="h-10 w-10" />,
      title: "Education For All Fund",
      description: "Providing full scholarships to underprivileged students across Malaysia",
      metrics: "500+ students supported annually",
      color: "bg-blue-50",
      accent: "bg-blue-500"
    },
    {
      icon: <Sprout className="h-10 w-10" />,
      title: "Rural Education Initiative",
      description: "Bringing digital learning to remote communities through mobile learning centers",
      metrics: "30+ rural communities reached",
      color: "bg-green-50",
      accent: "bg-green-500"
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: "Skills Development Program",
      description: "Free coding and digital literacy workshops for underserved youth",
      metrics: "1000+ youth trained yearly",
      color: "bg-purple-50",
      accent: "bg-purple-500"
    },
    {
      icon: <LineChart className="h-10 w-10" />,
      title: "Community Teacher Training",
      description: "Empowering local educators with digital teaching skills",
      metrics: "200+ teachers trained",
      color: "bg-orange-50",
      accent: "bg-orange-500"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-8 leading-tight">
                Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  Positive Impact
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                At Borderless Academy, we believe that quality education is a fundamental right. 
                Our social impact initiatives focus on breaking down barriers to education and 
                creating opportunities for underserved communities across Malaysia.
              </p>

              {/* Impact Stats Cards */}
              <div className="grid grid-cols-2 gap-6">
                {impactStats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`${stat.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-primary">{stat.icon}</div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image with Overlays */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="/api/placeholder/800/1000"
                  alt="Creating impact in education"
                  className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                />
                
                {/* Floating Cards */}
                <div className="absolute -left-8 top-1/4 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Active NGO</div>
                      <div className="text-xs text-gray-500">Partnerships</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-1/4 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Global</div>
                      <div className="text-xs text-gray-500">Impact</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Initiatives Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Impact <span className="text-primary">Initiatives</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <div 
                key={index} 
                className={`${initiative.color} rounded-xl p-8 hover:shadow-lg transition-all transform hover:-translate-y-1`}
              >
                <div className="flex items-start gap-6">
                  <div className={`${initiative.accent} text-white p-4 rounded-xl`}>
                    {initiative.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {initiative.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      {initiative.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-primary font-semibold">
                        {initiative.metrics}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-primary mb-6">
              Join Us in Making a Difference
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Partner with us to expand our impact and reach more communities in need.
              Together, we can create lasting change.
            </p>
            <button className="bg-gradient-to-r from-primary to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
              Support Our Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}