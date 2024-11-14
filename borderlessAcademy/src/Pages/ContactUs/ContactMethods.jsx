import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  HelpCircle, 
  GraduationCap,
  Headphones, 
  Building2,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Globe
} from 'lucide-react';

export default function ContactMethods() {
  const { t } = useTranslation();

  const contactSections = [
    {
      title: "General Inquiries",
      icon: <HelpCircle className="h-8 w-8" />,
      description: "For general information about our programs and services",
      methods: [
        {
          icon: <Phone className="h-5 w-5" />,
          label: "Call",
          value: "+60 3-XXXX XXXX",
          time: "9AM - 6PM (MYT)"
        },
        {
          icon: <Mail className="h-5 w-5" />,
          label: "Email",
          value: "info@borderlessacademy.my"
        },
        {
          icon: <MessageCircle className="h-5 w-5" />,
          label: "WhatsApp",
          value: "+60 1X-XXX XXXX"
        }
      ]
    },
    {
      title: "Technical Support",
      icon: <Headphones className="h-8 w-8" />,
      description: "24/7 support for our learning platform",
      methods: [
        {
          icon: <Mail className="h-5 w-5" />,
          label: "Email",
          value: "support@borderlessacademy.my"
        },
        {
          icon: <MessageCircle className="h-5 w-5" />,
          label: "Live Chat",
          value: "Available 24/7"
        },
        {
          icon: <Phone className="h-5 w-5" />,
          label: "Help Desk",
          value: "+60 3-XXXX XXXX"
        }
      ]
    },
    {
      title: "Admission Inquiries",
      icon: <GraduationCap className="h-8 w-8" />,
      description: "Information about enrollment and admissions",
      methods: [
        {
          icon: <Phone className="h-5 w-5" />,
          label: "Admissions",
          value: "+60 3-XXXX XXXX"
        },
        {
          icon: <Mail className="h-5 w-5" />,
          label: "Email",
          value: "admissions@borderlessacademy.my"
        },
        {
          icon: <Clock className="h-5 w-5" />,
          label: "Consultation",
          value: "Book an appointment"
        }
      ]
    },
    {
      title: "Regional Offices",
      icon: <Building2 className="h-8 w-8" />,
      description: "Visit our offices across Malaysia",
      methods: [
        {
          icon: <Building2 className="h-5 w-5" />,
          label: "Main Office",
          value: "Kuala Lumpur"
        },
        {
          icon: <Building2 className="h-5 w-5" />,
          label: "Support Centers",
          value: "Penang • Johor Bahru • Kuching"
        },
        {
          icon: <Globe className="h-5 w-5" />,
          label: "International",
          value: "Singapore • Jakarta"
        }
      ]
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactSections.map((section, index) => (
            <div 
              key={index}
              className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Section Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <div className="text-primary">
                    {section.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary">
                  {section.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 text-sm">
                {section.description}
              </p>

              {/* Contact Methods */}
              <div className="space-y-4">
                {section.methods.map((method, methodIndex) => (
                  <div 
                    key={methodIndex}
                    className="flex items-start space-x-3 text-sm"
                  >
                    <div className="text-primary mt-1">
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-gray-600">{method.label}</div>
                      <div className="text-primary font-medium">
                        {method.value}
                      </div>
                      {method.time && (
                        <div className="text-gray-500 text-xs">
                          {method.time}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Response Promise */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-primary/5 px-6 py-3 rounded-full">
            <Clock className="h-5 w-5 text-primary mr-2" />
            <span className="text-gray-600">
              We aim to respond to all inquiries within 24 hours
            </span>
          </div>
        </div>

        {/* Language Support Note */}
        <div className="mt-8 text-center text-sm text-gray-600">
          All our support channels are available in Bahasa Malaysia, English, and Chinese
        </div>
      </div>
    </div>
  );
}