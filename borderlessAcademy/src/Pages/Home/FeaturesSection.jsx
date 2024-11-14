import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Globe2, 
  BookOpen, 
  Laptop, 
  Puzzle, 
  BrainCircuit, 
  Smartphone 
} from 'lucide-react';

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Globe2 className="h-8 w-8" />,
      title: "Global Accessibility",
      description: "Access quality education from anywhere in the world, breaking down geographical barriers."
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Country-specific Syllabi",
      description: "Curriculum aligned with your local education standards while maintaining global perspectives."
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Interactive Learning",
      description: "Engage with interactive tools and resources designed for enhanced learning experiences."
    },
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: "AI-powered Learning",
      description: "Personalized learning paths adapted to each student's unique pace and style."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile-friendly Interface",
      description: "Learn seamlessly across all devices with our responsive platform."
    },
    {
      icon: <Puzzle className="h-8 w-8" />,
      title: "Digital Technologies",
      description: "Cutting-edge digital tools and technologies for a modern learning experience."
    }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600">
            Our platform combines advanced technology with expert teaching to provide 
            a comprehensive learning experience tailored to each student.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Icon */}
              <div className="text-primary mb-4">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Experience the future of education with our innovative features
          </p>
          <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors">
            Explore All Features
          </button>
        </div>
      </div>
    </div>
  );
}