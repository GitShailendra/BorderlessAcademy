import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../assets/Theme/ThemeContext';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import logo from "../../assets/Images/logo/boderlesslogonavwhite32x32-01.png";
export default function Footer() {
  const { theme } = useTheme();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
          <img src={logo} alt="Borderless Academy Logo" className="h-16 w-auto" />
            <p className="text-sm opacity-80">
              Transforming education through accessible online learning. 
              Quality education without boundaries.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="hover:text-secondary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="hover:text-secondary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="hover:text-secondary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="hover:text-secondary transition-colors">
                  Our Teachers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-secondary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Registration */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Join Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register/student" className="hover:text-secondary transition-colors">
                  Student Registration
                </Link>
              </li>
              <li>
                <Link to="/register/teacher" className="hover:text-secondary transition-colors">
                  Become a Teacher
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-secondary transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail size={20} />
                <a href="mailto:info@borderlessacademy.com" 
                  className="hover:text-secondary transition-colors">
                  info@borderlessacademy.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={20} />
                <a href="tel:+1234567890" 
                  className="hover:text-secondary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-white/70">
              © {currentYear} Borderless Academy. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm text-white/70">
                <li>
                  <Link to="/privacy" className="hover:text-secondary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-secondary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-secondary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}