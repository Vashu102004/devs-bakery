import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, cart } = useCartStore();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu & Order', path: '/menu' },
    { name: 'Custom Cakes', path: '/custom-orders' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#F5E6D3] text-brand-espresso text-sm py-2 px-4 text-center font-bold shadow-sm tracking-wide border-b border-brand-brown/10">
        Welcome to Dev's Bakery. Enjoy Flat 15% OFF your first order with code <span className="font-mono bg-white px-2 py-0.5 rounded mx-1">SWEET15</span>
      </div>

      <nav className="bg-brand-cream/95 backdrop-blur-md sticky top-0 z-50 shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Logo + Top Nav + Icons */}
          <div className="flex items-center justify-between py-4 border-b border-brand-brown/10">
            
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-espresso hover:text-brand-terracotta transition-colors"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
              <Link to="/" className="flex items-center bg-brand-espresso px-4 py-2 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                <img src="/logo.svg" alt="Dev's Bakery Logo" className="h-10 md:h-12 w-auto object-contain" />
              </Link>
            </div>

            {/* Right Side: Small Top Nav + Icons */}
            <div className="flex items-center space-x-6 justify-end flex-1 lg:flex-none">
              
              {/* Small Top Links (Hidden on mobile) */}
              <div className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-widest text-brand-espresso/70 mr-4">
                <Link to="/" className="hover:text-brand-terracotta transition-colors">Home</Link>
                <Link to="/about" className="hover:text-brand-terracotta transition-colors">Our Story</Link>
                <Link to="/contact" className="hover:text-brand-terracotta transition-colors">Contact</Link>
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-5">
                <button className="text-brand-espresso hover:text-brand-terracotta hidden sm:block transition-colors duration-300">
                  <Search size={20} />
                </button>
                <button className="text-brand-espresso hover:text-brand-terracotta hidden sm:block transition-colors duration-300">
                  <User size={20} />
                </button>
                <button 
                  onClick={toggleCart}
                  className="text-brand-espresso hover:text-brand-terracotta relative transition-colors duration-300 group"
                >
                  <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-terracotta text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-md">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Category Links (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-8 py-3">
            <Link to="/menu?category=Breads" className="text-sm font-bold text-brand-espresso hover:text-brand-terracotta uppercase tracking-wide transition-colors">BREADS</Link>
            <Link to="/menu?category=Cakes" className="text-sm font-bold text-brand-espresso hover:text-brand-terracotta uppercase tracking-wide transition-colors">CAKES</Link>
            <Link to="/menu?category=Chocolates" className="text-sm font-bold text-brand-espresso hover:text-brand-terracotta uppercase tracking-wide transition-colors">CHOCOLATES</Link>
            <Link to="/menu?category=Cookies" className="text-sm font-bold text-brand-espresso hover:text-brand-terracotta uppercase tracking-wide transition-colors">COOKIES</Link>
            <Link to="/menu?category=Bakery" className="text-sm font-bold text-brand-espresso hover:text-brand-terracotta uppercase tracking-wide transition-colors">BAKERY</Link>
            <Link to="/menu?category=Essentials" className="text-sm font-bold text-brand-espresso hover:text-brand-terracotta uppercase tracking-wide transition-colors">ESSENTIALS</Link>
            <Link to="/menu?category=Gift Hampers" className="text-sm font-bold text-brand-espresso hover:text-brand-terracotta uppercase tracking-wide transition-colors">GIFT BASKET</Link>
          </div>
        </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-brand-espresso border-t border-white/10 absolute w-full shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link to="/menu?category=Breads" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg font-medium">Breads</Link>
            <Link to="/menu?category=Cakes" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg font-medium">Cakes</Link>
            <Link to="/menu?category=Chocolates" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg font-medium">Chocolates</Link>
            <Link to="/menu?category=Cookies" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg font-medium">Cookies</Link>
            <Link to="/menu?category=Bakery" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg font-medium">Bakery</Link>
            <Link to="/menu?category=Essentials" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg font-medium">Essentials</Link>
            <Link to="/menu?category=Gift Hampers" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg font-medium">Gift Basket</Link>
            
            <div className="h-px bg-white/10 my-2"></div>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/60 text-sm">Home</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/60 text-sm">Our Story</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-white/60 text-sm">Contact</Link>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
