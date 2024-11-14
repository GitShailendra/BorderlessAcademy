import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Globe2, 
    CheckCircle, 
    BookOpen, 
    Trophy, 
    BrainCircuit, 
    Microscope, 
    Languages, 
    Lightbulb,
    ArrowRight  // Added this import
  } from 'lucide-react';

const InternationalSection = () => {
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Globe2 className="h-8 w-8" />,
      title: "Global Standards",
      description: "Curriculum benchmarked against leading international education frameworks",
      keyPoints: [
        "IGCSE & IB aligned content",
        "Cambridge Assessment standards",
        "Global best practices"
      ]
    },
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: "21st Century Skills",
      description: "Developing critical competencies for the modern world",
      keyPoints: [
        "Critical thinking",
        "Digital literacy",
        "Creative problem solving"
      ]
    },
    {
      icon: <Languages className="h-8 w-8" />,
      title: "Multilingual Focus",
      description: "Supporting language development across major global languages",
      keyPoints: [
        "English proficiency",
        "Native language support",
        "Cultural exchange"
      ]
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Global Recognition",
      description: "Qualifications recognized by international institutions",
      keyPoints: [
        "University pathway programs",
        "International certifications",
        "Global partnerships"
      ]
    }
  ];

  const subjects = [
    {
      name: "English",
      icon: <BookOpen className="h-6 w-6" />,
      level: "Cambridge Advanced",
      features: ["Literature Analysis", "Academic Writing", "Public Speaking"]
    },
    {
      name: "Mathematics",
      icon: <BrainCircuit className="h-6 w-6" />,
      level: "IB Standard",
      features: ["Advanced Analytics", "Problem Solving", "Mathematical Modeling"]
    },
    {
      name: "Sciences",
      icon: <Microscope className="h-6 w-6" />,
      level: "International STEM",
      features: ["Practical Labs", "Research Projects", "Scientific Method"]
    },
    {
      name: "Global Studies",
      icon: <Globe2 className="h-6 w-6" />,
      level: "World Perspectives",
      features: ["Cultural Studies", "Current Affairs", "Global Citizenship"]
    }
  ];

  return (
    <section id="international" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe2 className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-primary">
              International Programme
            </h2>
          </div>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Elevate your education with our internationally recognized curriculum, 
            preparing students for success in a global context while maintaining 
            Malaysian values.
          </p>
        </div>

        {/* Interactive Features Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Feature Navigation */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-primary text-white shadow-lg scale-105' 
                    : 'bg-background hover:bg-primary/5'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`${
                    activeFeature === index ? 'text-white' : 'text-primary'
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      activeFeature === index ? 'text-white' : 'text-primary'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`${
                      activeFeature === index ? 'text-white/90' : 'text-secondary'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Feature Details */}
          <div className="bg-background rounded-xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              {features[activeFeature].icon}
              <h3 className="text-2xl font-bold text-primary">
                {features[activeFeature].title}
              </h3>
            </div>
            <div className="space-y-4">
              {features[activeFeature].keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-secondary">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="group bg-background rounded-xl p-6 hover:shadow-lg transition-all duration-300
                hover:-translate-y-1 border border-primary/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                  {subject.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{subject.name}</h3>
                  <span className="text-xs text-secondary">{subject.level}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {subject.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-secondary text-sm">
                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block bg-primary/5 rounded-2xl p-8">
            <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Begin Your International Journey?
            </h3>
            <p className="text-secondary mb-6 max-w-2xl mx-auto">
              Join our international programme and gain the knowledge, skills, and 
              qualifications needed for success on the global stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 
                transition-colors flex items-center justify-center gap-2">
                Download Prospectus
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-lg 
                hover:bg-primary/5 transition-colors">
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalSection;