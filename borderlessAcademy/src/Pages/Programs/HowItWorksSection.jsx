import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ClipboardList, 
  Target, 
  Rocket, 
  Award,
  ArrowRight,
  CheckCircle,
  Users,
  BookOpen
} from 'lucide-react';

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <ClipboardList className="h-8 w-8" />,
      number: "01",
      title: "Initial Assessment",
      description: "Complete our comprehensive assessment to determine your current level and learning style",
      benefits: [
        "Personalized evaluation",
        "Learning style identification",
        "Skill gap analysis"
      ],
      color: "bg-primary/5"
    },
    {
      icon: <Target className="h-8 w-8" />,
      number: "02",
      title: "Custom Learning Path",
      description: "Receive a tailored curriculum based on your goals and current proficiency",
      benefits: [
        "Customized study plan",
        "Flexible scheduling",
        "Progress milestones"
      ],
      color: "bg-primary/10"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      number: "03",
      title: "Interactive Learning",
      description: "Engage with our digital platform and expert teachers through live sessions",
      benefits: [
        "Live online classes",
        "Interactive exercises",
        "Real-time feedback"
      ],
      color: "bg-primary/15"
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "04",
      title: "Progress & Achievement",
      description: "Track your progress and earn certifications as you advance",
      benefits: [
        "Regular assessments",
        "Performance tracking",
        "Achievement certificates"
      ],
      color: "bg-primary/20"
    }
  ];

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Teachers",
      description: "Learn from qualified Malaysian educators"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "KPM Aligned",
      description: "Following Malaysian education standards"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Regular monitoring and improvement"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Our simple yet effective learning process ensures every student receives 
            the support and guidance they need to excel.
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Steps List */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`rounded-xl cursor-pointer transition-all duration-300 ${
                  activeStep === index 
                    ? 'shadow-lg scale-105' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`p-6 rounded-xl ${step.color}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">{step.number}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-secondary">
                        {step.description}
                      </p>
                    </div>
                    {activeStep === index && (
                      <ArrowRight className="h-6 w-6 text-primary ml-auto flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Step Details */}
          <div className="bg-surface rounded-xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                {steps[activeStep].icon}
              </div>
              <div>
                <div className="text-sm text-primary/60 mb-1">Step {steps[activeStep].number}</div>
                <h3 className="text-2xl font-bold text-primary">
                  {steps[activeStep].title}
                </h3>
              </div>
            </div>
            <div className="space-y-4">
              {steps[activeStep].benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-secondary">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-surface p-6 rounded-xl hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-primary/5 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-primary">{feature.title}</h3>
              </div>
              <p className="text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 inline-block">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-secondary mb-6">
              Join us today and experience our innovative learning approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white rounded-lg 
                hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="px-8 py-3 border border-primary text-primary 
                rounded-lg hover:bg-primary/5 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;