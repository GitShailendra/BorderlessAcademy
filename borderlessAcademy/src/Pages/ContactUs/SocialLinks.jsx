import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  MessageCircle,
  Globe,
  Mail,
  Phone,
  Clock // Added this import
} from 'lucide-react';

export default function SocialLinks() {
  const { t } = useTranslation();

  const socialMedia = [
    {
      name: "Facebook",
      icon: <Facebook className="h-6 w-6" />,
      link: "https://facebook.com/borderlessacademy",
      username: "@borderlessacademy",
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-6 w-6" />,
      link: "https://instagram.com/borderlessacademy",
      username: "@borderlessacademy",
      color: "hover:text-pink-600"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6" />,
      link: "https://linkedin.com/company/borderlessacademy",
      username: "Borderless Academy",
      color: "hover:text-blue-700"
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-6 w-6" />,
      link: "https://youtube.com/borderlessacademy",
      username: "Borderless Academy",
      color: "hover:text-red-600"
    }
  ];

  const quickContacts = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-6 w-6" />,
      value: "+60 1X-XXX XXXX",
      link: "https://wa.me/601xxxxxxxx",
      color: "hover:text-green-600"
    },
    {
      name: "Website",
      icon: <Globe className="h-6 w-6" />,
      value: "www.borderlessacademy.my",
      link: "https://www.borderlessacademy.my",
      color: "hover:text-primary"
    },
    {
      name: "Email",
      icon: <Mail className="h-6 w-6" />,
      value: "info@borderlessacademy.my",
      link: "mailto:info@borderlessacademy.my",
      color: "hover:text-primary"
    },
    {
      name: "Helpline",
      icon: <Phone className="h-6 w-6" />,
      value: "+60 3-XXXX XXXX",
      link: "tel:+603xxxxxxxx",
      color: "hover:text-primary"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-8">Connect With Us</h2>

      {/* Social Media Links */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media</h3>
        <div className="grid grid-cols-2 gap-4">
          {socialMedia.map((platform) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors ${platform.color} group`}
            >
              <div className="mr-4 text-gray-600 group-hover:text-inherit">
                {platform.icon}
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {platform.name}
                </div>
                <div className="text-sm text-gray-500">
                  {platform.username}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Contact Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Contact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickContacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors ${contact.color} group`}
            >
              <div className="mr-4 text-gray-600 group-hover:text-inherit">
                {contact.icon}
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {contact.name}
                </div>
                <div className="text-sm text-gray-500">
                  {contact.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Operating Hours Note */}
      <div className="mt-8 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-primary mt-1">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Operating Hours</h4>
            <p className="text-sm text-gray-600">
              Monday - Friday: 9:00 AM - 6:00 PM (MYT)<br />
              Technical Support: 24/7<br />
              Weekend Support: Available via WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* Language Support */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Support available in Bahasa Malaysia, English, and Chinese
      </div>
    </div>
  );
}