import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Rocket, 
  Target, 
  Globe2, 
  Cloud, 
  Smartphone, 
  BrainCircuit,
  Award,  // Replacing Graduation with Award
  Users
} from 'lucide-react';

export default function VisionMission() {
  const { t } = useTranslation();

  const digitalFeatures = [
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud-Based Solutions",
      description: "Seamless access to learning materials anytime, anywhere"
    },
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to each student"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile-First Design",
      description: "Optimized for all devices, ensuring continuous learning"
    },
    {
      icon: <Globe2 className="h-6 w-6" />,
      title: "Global Connectivity",
      description: "Connect with students and educators worldwide"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* E-Vision Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Vision & Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Borderless Academy, we harness cutting-edge digital technologies to deliver 
              globally accessible, immersive learning experiences, focusing on Malaysian 
              excellence with international standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {digitalFeatures.map((feature, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission Section */}
          <div className="bg-background rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Rocket className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600">
                To provide inclusive, high-quality education to learners across Malaysia and beyond, 
                breaking down geographical, financial, and social barriers.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-primary mt-1 mr-3" /> {/* Replaced Graduation */}
                  <span className="text-gray-600">
                    Deliver excellence in Malaysian and international curricula
                  </span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-primary mt-1 mr-3" />
                  <span className="text-gray-600">
                    Foster a global community while preserving local values
                  </span>
                </li>
                <li className="flex items-start">
                  <Globe2 className="h-5 w-5 text-primary mt-1 mr-3" />
                  <span className="text-gray-600">
                    Enable accessibility through digital innovation
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-background rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-primary">Our Vision</h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600">
                We envision a world where education knows no borders, where Malaysian students 
                have equal access to world-class learning opportunities while maintaining their 
                cultural identity.
              </p>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-primary mb-2">Digital Literacy</h4>
                  <p className="text-gray-600">
                    Promoting technological proficiency in education
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-primary mb-2">Global Standards</h4>
                  <p className="text-gray-600">
                    Maintaining international excellence with local relevance
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-primary mb-2">Cultural Integration</h4>
                  <p className="text-gray-600">
                    Preserving Malaysian values in global education
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-16">
          <blockquote className="text-xl text-gray-600 italic max-w-3xl mx-auto">
            "Bridging Malaysian excellence with global opportunities through innovative digital education."
          </blockquote>
        </div>
      </div>
    </div>
  );
}
