import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  UserCheck,
  Users,
  Globe,
  Heart, // Replaced ParentIcon with Heart
  LineChart,
  Laptop
} from 'lucide-react';

export default function WhyChooseUsSection() {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Personalized Learning",
      description: "Tailored learning paths that adapt to each student's unique pace and learning style."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Teachers",
      description: "Qualified educators with experience in both local and international curricula."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Community",
      description: "Connect with students and educators from around the world."
    },
    {
      icon: <Heart className="h-8 w-8" />, // Using Heart icon instead
      title: "Parent Involvement",
      description: "Regular updates and tools for parents to track and support their child's progress."
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Progress Tracking",
      description: "Detailed analytics and progress reports to monitor learning achievements."
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Interactive Tools",
      description: "State-of-the-art digital learning tools and interactive content."
    }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              Why Choose Borderless Academy?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We combine innovative technology with proven teaching methods to provide 
              a comprehensive learning experience that prepares students for success 
              in an interconnected world.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="border border-primary/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-gray-600">Student Satisfaction</div>
              </div>
              <div className="border border-primary/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600">Countries Represented</div>
              </div>
            </div>
          </div>

          {/* Right Side - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students already learning with Borderless Academy
            </p>
            <button className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
              Get Started Today
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}