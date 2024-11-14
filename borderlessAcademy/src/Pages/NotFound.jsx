// src/pages/NotFound.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useTheme } from '../assets/Theme/ThemeContext';

export default function NotFound() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[150px] font-bold text-primary/10">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              Page Not Found
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="mt-2 text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Go Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>

          {/* Home Button */}
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-background rounded-full">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">
              Try searching for what you need
            </span>
          </div>
        </div>

        {/* Help Links */}
        <div className="mt-8 space-y-2 text-sm">
          <p className="text-gray-600">
            Need help? Try these:
          </p>
          <div className="flex justify-center space-x-4 text-primary">
            <Link to="/help" className="hover:underline">
              Help Center
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:underline">
              Contact Support
            </Link>
            <span>•</span>
            <Link to="/faq" className="hover:underline">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}