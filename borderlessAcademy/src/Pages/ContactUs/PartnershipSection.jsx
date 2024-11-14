import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Handshake, // Changed from HandShake to Handshake
  Building2, 
  GraduationCap, 
  Globe,
  FileText,
  Users,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

export default function PartnershipSection() {
  const { t } = useTranslation();

  const partnershipTypes = [
    {
      title: "Educational Institutions",
      icon: <Building2 className="h-8 w-8" />,
      description: "Partner with schools and educational institutions across Malaysia",
      benefits: [
        "Curriculum integration",
        "Shared resources",
        "Teacher training programs",
        "Joint certification"
      ]
    },
    {
      title: "Corporate Partners",
      icon: <TrendingUp className="h-8 w-8" />,
      description: "Strategic partnerships with businesses and corporations",
      benefits: [
        "CSR initiatives",
        "Employee training",
        "Skill development",
        "Digital transformation"
      ]
    },
    {
      title: "NGOs & Foundations",
      icon: <Users className="h-8 w-8" />,
      description: "Collaborations for social impact and education accessibility",
      benefits: [
        "Scholarship programs",
        "Community outreach",
        "Educational access",
        "Impact measurement"
      ]
    }
  ];

  const applicationProcess = [
    {
      title: "Submit Proposal",
      description: "Share your partnership vision and objectives"
    },
    {
      title: "Initial Discussion",
      description: "Meet with our partnership team"
    },
    {
      title: "Due Diligence",
      description: "Review and alignment of objectives"
    },
    {
      title: "Partnership Agreement",
      description: "Formalize the collaboration"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-6">Partnership Opportunities</h2>

      {/* Types of Partnerships */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {partnershipTypes.map((type, index) => (
          <div key={index} className="bg-background rounded-xl p-6">
            <div className="text-primary mb-4">{type.icon}</div>
            <h3 className="text-lg font-semibold text-primary mb-2">{type.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{type.description}</p>
            <ul className="space-y-2">
              {type.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Application Process */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-primary mb-6">Partnership Process</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {applicationProcess.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-2">{index + 1}</div>
                <h4 className="font-medium text-primary mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {index < applicationProcess.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-primary/30"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-primary/5 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Get Started</h3>
        <p className="text-gray-600 mb-6">
          Interested in partnering with Borderless Academy? Contact our partnership team:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <a 
            href="mailto:partnerships@borderlessacademy.my"
            className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <div className="font-medium">Send Proposal</div>
              <div className="text-sm text-gray-600">partnerships@borderlessacademy.my</div>
            </div>
          </a>
          <a 
            href="tel:+60XXXXXXXX"
            className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <Globe className="h-6 w-6 text-primary" />
            <div>
              <div className="font-medium">Partnership Office</div>
              <div className="text-sm text-gray-600">+60 3-XXXX XXXX</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}