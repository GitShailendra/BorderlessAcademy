import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Enrollment",
      questions: [
        {
          q: "How do I enroll my child in Borderless Academy?",
          a: "Enrollment is a simple 3-step process: Complete the online registration form, submit required documents, and schedule a welcome session. Our admissions team will guide you through each step."
        },
        {
          q: "What documents are required for enrollment?",
          a: "Required documents include student's IC/passport, previous academic records, and a parent/guardian's identification. For international students, additional documentation may be required."
        }
      ]
    },
    {
      category: "Technical Requirements",
      questions: [
        {
          q: "What are the technical requirements for online learning?",
          a: "Students need a stable internet connection (minimum 5Mbps), a computer or tablet with webcam, and updated Chrome/Firefox browser. Our platform is optimized for both Windows and Mac."
        },
        {
          q: "Is the platform accessible on mobile devices?",
          a: "Yes, our platform is fully responsive and works on smartphones and tablets. We recommend downloading our mobile app for the best experience."
        }
      ]
    },
    {
      category: "Payment & Fees",
      questions: [
        {
          q: "What payment methods are accepted?",
          a: "We accept major credit cards, online banking, and FPX payments. Monthly installment options are available through select Malaysian banks."
        },
        {
          q: "Are there any additional costs beyond tuition?",
          a: "Tuition covers all core learning materials. Optional costs may include physical textbooks and specialized workshops."
        }
      ]
    },
    {
      category: "Support Services",
      questions: [
        {
          q: "What are your support hours?",
          a: "Technical support is available 24/7. Academic support operates from 9 AM to 6 PM (MYT) on weekdays. Emergency support is available via WhatsApp."
        },
        {
          q: "In what languages is support available?",
          a: "Support is available in Bahasa Malaysia, English, and Chinese. Select programs offer additional language support."
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <h3 className="text-lg font-semibold text-primary mb-4">
              {category.category}
            </h3>
            
            <div className="space-y-4">
              {category.questions.map((faq, faqIndex) => {
                const index = `${categoryIndex}-${faqIndex}`;
                const isOpen = openIndex === index;

                return (
                  <div 
                    key={faqIndex}
                    className="bg-background rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-primary/5 transition-colors"
                    >
                      <span className="font-medium text-gray-800">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="p-4 pt-0">
                        <p className="text-gray-600">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Our support team is here to help.
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.href = 'mailto:support@borderlessacademy.my'}
              className="inline-flex items-center justify-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </button>
            <button className="inline-flex items-center justify-center px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}