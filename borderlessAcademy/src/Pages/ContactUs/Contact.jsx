/**
 * Contact Page Sections:
 * 
 * 1. Contact Hero Section
 * - Welcoming header
 * - Brief introduction
 * - Multiple contact options overview
 * - Local support emphasis
 * 
 * 2. Contact Methods Grid
 * - General Inquiries
 *   • Email: info@borderlessacademy.com
 *   • Phone: Malaysian support number
 *   • WhatsApp support
 * 
 * - Technical Support
 *   • 24/7 help desk
 *   • Live chat
 *   • Technical email
 * 
 * - Admission Inquiries
 *   • Admission hotline
 *   • Enrollment email
 *   • Schedule consultation
 * 
 * - Regional Offices
 *   • Main office in Malaysia
 *   • Regional support centers
 *   • International partners
 * 
 * 3. Contact Form Section
 * Fields:
 * - Full Name
 * - Email Address
 * - Phone Number
 * - Inquiry Type:
 *   • General Information
 *   • Admission Query
 *   • Technical Support
 *   • Partnership Opportunity
 *   • Other
 * - Subject
 * - Message
 * - Preferred Contact Method
 * - Best Time to Contact
 * - File Attachment Option
 * 
 * 4. FAQ Section
 * Common questions about:
 * - Enrollment process
 * - Technical requirements
 * - Payment methods
 * - Support hours
 * - Response times
 * 
 * 5. Live Chat Widget
 * - Instant support option
 * - Available in multiple languages
 * - Bot and human support
 * 
 * 6. Social Media Links
 * - Facebook
 * - Instagram
 * - LinkedIn
 * - WhatsApp
 * 
 * 7. Office Hours & Support Times
 * - Malaysian business hours
 * - International support hours
 * - Emergency contact info
 * 
 * 8. Map Section
 * - Office location
 * - Directions
 * - Nearby landmarks
 * 
 * 9. Partnership Inquiries
 * - Business development contact
 * - Partnership opportunities
 * - Collaboration proposals
 * 
 * 10. Support Language Options
 * - Bahasa Malaysia
 * - English
 * - Chinese
 * - Other regional languages
 */

// Example Contact Page Component Structure:
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import PageTransition from '../../Components/common/PageTransition';

// Lazy loaded components
const ContactHero = React.lazy(() => import('./ContactHero'));
const ContactMethods = React.lazy(() => import('./ContactMethods'));
const ContactForm = React.lazy(() => import('./ContactForm'));
const FAQSection = React.lazy(() => import('./FAQSection'));
const LiveChatWidget = React.lazy(() => import('./LiveChatWidget'));
const SocialLinks = React.lazy(() => import('./SocialLinks'));
const PartnershipSection = React.lazy(() => import('./PartnershipSection'));
const LanguageSupport = React.lazy(() => import('./LanguageSupport'));

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-page">
      <PageTransition>
        <Suspense fallback={<div className="h-screen animate-pulse bg-background" />}>
          <ContactHero />
          <ContactMethods />
            <ContactForm />
            <FAQSection />
          <LiveChatWidget />
            <SocialLinks />
            {/* <LanguageSupport /> */}
          <PartnershipSection />
        </Suspense>
      </PageTransition>
    </div>
  );
};

export default Contact;