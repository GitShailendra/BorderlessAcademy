import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book, Lightbulb, Users, BarChart, CheckCircle, Globe2 } from 'lucide-react';

const MalaysianSyllabusSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: "KPM Approved Curriculum",
      description: "Fully aligned with Malaysian Ministry of Education standards",
      icon: <CheckCircle className="h-6 w-6" />,
      badge: "Official"
    },
    {
      title: "Bilingual Excellence",
      description: "Instruction in both Bahasa Malaysia and English",
      icon: <Globe2 className="h-6 w-6" />,
      badge: "Featured"
    },
    {
      title: "Local Context",
      description: "Content tailored to Malaysian cultural values and context",
      icon: <Book className="h-6 w-6" />
    }
  ];

  const subjects = [
    {
      name: "Bahasa Malaysia",
      features: [
        "Comprehensive language skills",
        "Cultural integration",
        "Modern literature"
      ]
    },
    {
      name: "Mathematics",
      features: [
        "Problem-solving focus",
        "Real-world applications",
        "KBAT approach"
      ]
    },
    {
      name: "Science",
      features: [
        "Hands-on experiments",
        "Environmental awareness",
        "Local ecosystems"
      ]
    },
    {
      name: "English",
      features: [
        "International standards",
        "Communication skills",
        "Creative writing"
      ]
    }
  ];

  return (
    <section id="malaysian" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Malaysian National Curriculum
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Experience excellence in Malaysian education with our KPM-approved digital learning program, 
            designed to nurture tomorrow's leaders.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-surface p-6 rounded-lg hover:shadow-lg transition-all 
                hover:-translate-y-1 cursor-pointer relative overflow-hidden"
            >
              {feature.badge && (
                <div className="absolute top-3 right-3 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {feature.badge}
                </div>
              )}
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-background border border-surface rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Book className="h-5 w-5" />
                {subject.name}
              </h3>
              <ul className="space-y-3">
                {subject.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-secondary">
                    <CheckCircle className="h-4 w-4 mt-1 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-surface rounded-xl p-8 inline-block">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Excel in Malaysian Education?
            </h3>
            <p className="text-secondary mb-6">
              Join our program and experience the perfect blend of traditional values and modern learning.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Explore Curriculum
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-surface transition-colors">
                Download Syllabus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MalaysianSyllabusSection;