import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin 
} from 'lucide-react';

export default function ContactHero() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      info: "+60 3-XXXX XXXX",
      subInfo: "Toll-free within Malaysia"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      info: "info@borderlessacademy.my",
      subInfo: "24/7 email support"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      info: "Available 9 AM - 6 PM",
      subInfo: "Malaysian Standard Time"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      info: "Kuala Lumpur, Malaysia",
      subInfo: "By appointment only"
    }
  ];

  return (
    <div className="relative bg-background pt-24 pb-16">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            Have questions about our programs? We're here to help you in Bahasa Malaysia, 
            English, or Chinese. Our dedicated support team is ready to assist you on your 
            educational journey.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <div className="text-primary">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-800 mb-1">
                  {item.info}
                </p>
                <p className="text-sm text-gray-600">
                  {item.subInfo}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Support Languages */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-white px-6 py-3 rounded-full shadow-sm">
            <span className="text-gray-600">Available in:</span>
            <div className="flex items-center space-x-3">
              <span className="font-medium text-primary">🇲🇾 Bahasa Malaysia</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium text-primary">🌏 English</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium text-primary">中文</span>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>
              Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM (MYT)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}