import React from 'react';
import { CheckCircle, BookOpen, Users, LineChart } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: BookOpen,
      title: "Choose Your Course",
      description: "Browse through our extensive library of courses and select the one that matches your learning goals.",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Connect with Expert Teachers",
      description: "Get matched with qualified educators from around the world who specialize in your subject area.",
      color: "text-teal-500"
    },
    {
      icon: CheckCircle,
      title: "Learn Interactively",
      description: "Engage in live virtual classes with interactive tools and real-time collaboration.",
      color: "text-green-500"
    },
    {
      icon: LineChart,
      title: "Track Your Progress",
      description: "Monitor your learning journey with detailed analytics and achievement milestones.",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your learning journey in four simple steps
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 md:w-1/2 p-6">
                  <div className={`max-w-md ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full bg-white shadow-lg ${step.color}`}>
                        <step.icon size={24} />
                      </div>
                      <h3 className="ml-4 text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="md:absolute hidden md:block md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-blue-500 z-10" />

                <div className="flex-1 md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;