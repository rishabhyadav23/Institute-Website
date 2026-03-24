import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-lg">
        {/* 404 Graphic */}
        <div className="relative mb-8">
          <p className="text-[120px] sm:text-[180px] font-heading font-extrabold text-gray-100 dark:text-gray-800 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-brand-600" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Don't worry, let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="rounded-xl font-bold">
              <Home className="w-5 h-5 mr-2" /> Back to Home
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-xl font-bold"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
