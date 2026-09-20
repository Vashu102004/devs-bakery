import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-espresso text-brand-cream/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.svg" alt="Dev's Bakery Logo" className="h-16 w-auto object-contain" />
            </Link>
            <p className="mb-6 text-sm leading-relaxed">
              Premium, freshly baked cakes, pastries, and treats crafted with love in Indore. Bringing sweetness to every celebration.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/devsbakery?igsi=aGhlcHVkaDNoMDZq" target="_blank" rel="noopener noreferrer" className="text-brand-cream/80 hover:text-brand-terracotta transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16.113 11.543A5 5 0 1 1 11.5 6.93a5 5 0 0 1 4.613 4.613z"/><line x1="16.5" x2="16.5" y1="7.5" y2="7.51"/></svg>
                <span className="text-sm font-medium">Follow us on Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link to="/menu?category=Cakes" className="hover:text-white transition-colors">Cakes</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-serif font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/menu?category=Cakes" className="hover:text-white transition-colors">Cakes</Link></li>
              <li><Link to="/menu?category=Pastries" className="hover:text-white transition-colors">Pastries & Cheesecakes</Link></li>
              <li><Link to="/menu?category=Cupcakes" className="hover:text-white transition-colors">Cupcakes</Link></li>
              <li><Link to="/menu?category=Cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              <li><Link to="/menu?category=Brownies" className="hover:text-white transition-colors">Brownies</Link></li>
              <li><Link to="/menu?category=Breads" className="hover:text-white transition-colors">Breads</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-serif font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-terracotta shrink-0 mt-0.5" />
                <span>Indrapuri • Bengali Square<br/>LIG • Geeta Bhawan, Indore</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-terracotta shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-terracotta shrink-0" />
                <span>hello@devsbakery.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-brand-terracotta shrink-0 mt-0.5" />
                <span>Mon - Sun: 9:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-cream/60">
          <p>&copy; {new Date().getFullYear()} Dev's Bakery. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
