import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const location = useLocation();
  const pageName = location.pathname.substring(1).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="bg-brand-cream min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-4">
        {pageName}
      </h1>
      <p className="text-brand-brown/70 text-lg mb-8 max-w-md">
        We are working hard to bring you this page. Please check back soon for exciting updates!
      </p>
      <Link 
        to="/"
        className="bg-brand-terracotta text-white px-8 py-3 rounded-md font-medium hover:bg-brand-brown transition-colors shadow-lg"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ComingSoon;
