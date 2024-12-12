import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import logo from "../../assets/Images/logo/boderlesslogonav-01.png";

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
        { label: 'Our Story', path: '/about' },
        { label: 'Mission & Vision', path: '/about' },
        { label: 'Leadership Team', path: '/about' },
        { label: 'Social Impact', path: '/about' },
      ]
    },
    {
      label: 'Programs',
      path: '/programs',
      children: [
        { label: 'Malaysia Syllabus', path: '/programs' },
        { label: 'International Syllabus', path: '/programs' },
        { label: 'How It Works', path: '/programs' },
        { label: 'Curriculum Grades 1-5', path: '/programs' },
      ]
    },
    {
      label: 'Parents & Community',
      path: '/community',
      children: [
        { label: 'Parent Resources', path: '/community' },
        { label: 'Testimonials', path: '/community' },
        { label: 'Community Forum', path: '/community' },
      ]
    },
    {
      label: 'Resources',
      path: '/resources',
      children: [
        { label: 'Blog', path: '/resources' },
        { label: 'Learning Materials', path: '/resources' },
        { label: 'FAQs', path: '/resources' },
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

  const handleParentClick = (path, index) => {
    if (window.innerWidth < 1024) {
      if (navItems[index].children) {
        setActiveDropdown(activeDropdown === index ? null : index);
      } else {
        navigate(path);
        setIsMenuOpen(false);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className=" mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center pr-6">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <div 
                key={index} 
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
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

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-secondary hover:text-primary hover:bg-surface transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[88px] bg-white z-50 overflow-y-auto">
            <div className="max-w-[90vw] mx-auto py-6 px-4 flex flex-col h-full">
              <div className="flex-1 space-y-4">
                {navItems.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <div
                      onClick={() => handleParentClick(item.path, index)}
                      className="w-full flex justify-between items-center py-3 cursor-pointer border-b border-surface"
                    >
                      <span className="text-secondary hover:text-primary transition-colors text-lg font-medium">
                        {item.label}
                      </span>
                      {item.children && (
                        <ChevronDown 
                          size={20}
                          className={`text-secondary transition-transform duration-200
                            ${activeDropdown === index ? 'rotate-180' : 'rotate-0'}`}
                        />
                      )}
                    </div>
                    
                    {item.children && activeDropdown === index && (
                      <div className="pl-4 space-y-3 bg-surface rounded-md p-4">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            to={child.path}
                            className="block py-2 text-secondary hover:text-primary transition-colors text-base"
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
              </div>

              <div className="pt-6 space-y-4 border-t border-surface mt-6">
                <Link 
                  to="/login"
                  className="block w-full text-center py-3 text-secondary hover:text-primary 
                    transition-colors rounded-md hover:bg-surface text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="block w-full text-center py-3 text-white bg-primary rounded-md 
                    hover:bg-primary/90 transition-all hover:shadow-md active:transform 
                    active:scale-95 text-lg font-medium"
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