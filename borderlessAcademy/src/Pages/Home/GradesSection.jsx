import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Users, Star, CheckCircle } from 'lucide-react';

export default function GradesSection() {
  const { t } = useTranslation();

  const grades = [
    {
      grade: "Grade 1",
      highlights: [
        "Foundation in Reading & Writing",
        "Basic Mathematics",
        "Environmental Science",
        "Interactive Learning Games"
      ]
    },
    {
      grade: "Grade 2-3",
      highlights: [
        "Advanced Reading Comprehension",
        "Mathematical Operations",
        "Science & Discovery",
        "Language Development"
      ]
    },
    {
      grade: "Grade 4-5",
      highlights: [
        "Critical Thinking Skills",
        "Advanced Mathematics",
        "Scientific Principles",
        "Project-Based Learning"
      ]
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Grade Offerings
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive curriculum designed for grades 1-5, focusing on holistic development 
            and academic excellence.
          </p>
        </div>

        {/* Grades Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {grades.map((grade, index) => (
            <div 
              key={index}
              className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Grade Title */}
              <div className="text-2xl font-bold text-primary mb-6">
                {grade.grade}
              </div>

              {/* Highlights */}
              <ul className="space-y-4">
                {grade.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Learn More Button */}
              <button className="w-full mt-8 px-6 py-3 text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Features Below Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex items-center justify-center space-x-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-gray-600">Interactive Curriculum</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-gray-600">Expert Teachers</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Star className="h-6 w-6 text-primary" />
            <span className="text-gray-600">Progress Tracking</span>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600">
            Each grade's curriculum is aligned with international standards while 
            maintaining flexibility for regional requirements.
          </p>
        </div>
      </div>
    </div>
  );
}