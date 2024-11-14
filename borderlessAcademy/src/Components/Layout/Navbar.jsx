import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navItems = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'About Us',
      path: '/about',
      children: [
        { label: 'Our Story', path: '/about/story' },
        { label: 'Mission & Vision', path: '/about/mission' },
        { label: 'Leadership Team', path: '/about/leadership' },
        { label: 'Social Impact', path: '/about/impact' },
      ]
    },
    {
      label: 'Programs',
      path: '/programs',
      children: [
        { label: 'Malaysia Syllabus', path: '/programs/indian' },
        { label: 'International Syllabus', path: '/programs/international' },
        { label: 'How It Works', path: '/programs/how-it-works' },
        { label: 'Curriculum Grades 1-5', path: '/programs/curriculum' },
      ]
    },
    {
      label: 'Parents & Community',
      path: '/community',
      children: [
        { label: 'Parent Resources', path: '/community/resources' },
        { label: 'Testimonials', path: '/community/testimonials' },
        { label: 'Community Forum', path: '/community/forum' },
      ]
    },
    {
      label: 'Resources',
      path: '/resources',
      children: [
        { label: 'Blog', path: '/resources/blog' },
        { label: 'Learning Materials', path: '/resources/materials' },
        { label: 'FAQs', path: '/resources/faqs' },
      ]
    },
    {
      label: 'Contact',
      path: '/contact',
    }
  ];

  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 1024) {
      setActiveDropdown(index);
    }
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth >= 1024) {
      setActiveDropdown(null);
    }
  };

  // New handler for parent menu click
  const handleParentClick = (path, index) => {
    if (window.innerWidth < 1024) {
      // For mobile: toggle dropdown if has children, otherwise navigate
      if (navItems[index].children) {
        setActiveDropdown(activeDropdown === index ? null : index);
      } else {
        navigate(path);
        setIsMenuOpen(false);
      }
    } else {
      // For desktop: always navigate on click
      navigate(path);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-[70vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Borderless</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <div 
                key={index} 
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Parent Menu Item */}
                <div 
                  onClick={() => handleParentClick(item.path, index)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-surface cursor-pointer"
                >
                  <span className="text-secondary group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  {item.children && (
                    <ChevronDown 
                      size={16} 
                      className={`text-secondary group-hover:text-primary transition-all duration-200
                        ${activeDropdown === index ? 'rotate-180' : 'rotate-0'}`}
                    />
                  )}
                </div>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === index && (
                  <div className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-2 z-50 border border-surface">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        to={child.path}
                        className="block px-4 py-2 text-secondary hover:text-primary hover:bg-surface transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <LanguageSwitcher />
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-8 border-l pl-8 border-surface">
              <Link 
                to="/login" 
                className="text-secondary hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90 transition-all
                  hover:shadow-md active:transform active:scale-95"
              >
                Enroll Now
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-secondary hover:text-primary hover:bg-surface transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 absolute top-full left-0 right-0 bg-white border-t border-surface shadow-lg">
            <div className="max-w-[70vw] mx-auto flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div
                    onClick={() => handleParentClick(item.path, index)}
                    className="w-full flex justify-between items-center py-2 cursor-pointer"
                  >
                    <span className="text-secondary hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    {item.children && (
                      <ChevronDown 
                        size={16}
                        className={`text-secondary transition-transform duration-200
                          ${activeDropdown === index ? 'rotate-180' : 'rotate-0'}`}
                      />
                    )}
                  </div>
                  
                  {/* Mobile Dropdown */}
                  {item.children && activeDropdown === index && (
                    <div className="pl-4 space-y-2 bg-surface rounded-md p-2">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.path}
                          className="block py-2 text-sm text-secondary hover:text-primary transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-surface space-y-3">
                <Link 
                  to="/login"
                  className="block w-full text-center py-2 text-secondary hover:text-primary 
                    transition-colors rounded-md hover:bg-surface"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="block w-full text-center py-2 text-white bg-primary rounded-md 
                    hover:bg-primary/90 transition-all hover:shadow-md active:transform active:scale-95"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;