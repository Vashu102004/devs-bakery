import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { mockProducts, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const bestSellers = mockProducts.filter(p => p.bestSeller).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      
      {/* Modern Editorial Hero Section */}
      <section className="relative w-full min-h-[90vh] bg-[#FAF8F5] overflow-hidden flex items-center pt-10 pb-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-terracotta/5 blur-[80px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-brown/5 blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 mt-10 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-brand-brown/10 shadow-sm mb-8">
                  <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse"></span>
                  <span className="text-sm font-bold tracking-wide text-brand-brown uppercase">Freshly Baked Every Morning</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-serif font-bold text-brand-espresso leading-[1.1] mb-6">
                  Artisanal <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-terracotta to-brand-brown italic font-light">
                    Perfection.
                  </span>
                </h1>
                
                <p className="text-lg text-brand-espresso/70 mb-10 leading-relaxed max-w-md">
                  Elevate your everyday moments with our handcrafted breads, delicate pastries, and bespoke celebration cakes. Baked with passion, served with love.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/menu"
                    className="group relative px-8 py-4 bg-brand-espresso text-white rounded-full overflow-hidden text-center font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    <div className="absolute inset-0 w-full h-full bg-brand-terracotta transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Order Online
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link 
                    to="/menu?category=Breads"
                    className="px-8 py-4 bg-transparent border-2 border-brand-brown/20 text-brand-espresso hover:border-brand-espresso rounded-full text-center font-bold transition-colors"
                  >
                    Explore Bakery
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Images - Creative Composition */}
            <div className="lg:col-span-7 relative h-[50vh] lg:h-[75vh] order-1 lg:order-2 w-full flex items-center justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-[90%] lg:w-[85%] h-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-brand-espresso/10 z-10 hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                  alt="Artisanal Breads" 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                />
              </motion.div>
              
              {/* Overlapping smaller image */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="absolute left-[-5%] lg:left-[5%] bottom-[5%] lg:bottom-[10%] w-[45%] h-[40%] rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-[#FAF8F5] z-20 hidden md:block"
              >
                <img 
                  src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Fresh Pastries" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="absolute right-[-10px] lg:right-[-20px] top-[15%] bg-white p-3 lg:p-4 rounded-2xl shadow-xl z-30 flex items-center gap-3 lg:gap-4 border border-brand-brown/5"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-cream rounded-full flex items-center justify-center text-xl lg:text-2xl">
                  ⭐
                </div>
                <div>
                  <p className="text-sm lg:text-base font-bold text-brand-espresso">4.9/5 Rating</p>
                  <p className="text-xs lg:text-sm text-brand-espresso/60">Loved by Indore</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Premium Marketing Section - Dev's Signature Bakery Pack */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-4 bg-brand-cream rounded-[3rem] -z-10 rotate-3 transform origin-bottom-left"></div>
            <img 
              src="/images/devs_bakery_pack.jpg" 
              alt="Dev's Signature Bakery Pack" 
              className="w-full h-auto rounded-3xl shadow-2xl object-cover aspect-[4/5] md:aspect-square"
            />
            <div className="absolute -bottom-6 -right-6 bg-brand-terracotta text-white p-6 rounded-full shadow-xl flex flex-col items-center justify-center w-32 h-32 rotate-12">
              <span className="text-sm font-medium uppercase tracking-widest">Premium</span>
              <span className="text-xl font-bold">Hamper</span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-brown leading-tight">
              Dev's Signature Pack.
            </h2>
            <p className="text-xl text-brand-terracotta font-serif italic">
              "Coffee, chocolates, breads & snacks in one premium box."
            </p>
            <p className="text-lg text-brand-brown/70 leading-relaxed">
              Experience the ultimate Dev's Bakery collection! This curated pack includes our finest artisanal coffee, handcrafted assorted chocolates, savory bakery snacks, and a freshly baked signature bread loaf. Perfect for gifting or treating yourself!
            </p>
            
            <div className="pt-4">
              <Link 
                to="/menu"
                className="inline-flex items-center gap-2 bg-brand-brown text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-brand-espresso transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
              >
                Order Signature Pack <ChevronRight size={20} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-brown mb-4">Our Best Sellers</h2>
              <p className="text-brand-brown/70 max-w-xl">
                The most loved treats by our customers. Guaranteed to make your day special.
              </p>
            </div>
            <Link to="/menu" className="hidden md:inline-flex items-center gap-2 text-brand-brown font-medium hover:text-brand-terracotta transition-colors pb-1 border-b border-transparent hover:border-brand-terracotta">
              View all <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/menu" className="inline-flex bg-brand-brown/10 text-brand-brown px-6 py-3 rounded-md font-medium">
              View All Best Sellers
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal Promo */}
      <section className="py-20 px-4 bg-brand-espresso text-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-6 z-10 relative">
            <span className="text-brand-terracotta font-serif italic text-xl">Seasonal Special</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Celebrate Every Occasion With Something Sweet.
            </h2>
            <p className="text-brand-cream/80 text-lg max-w-md">
              Discover our premium gift hampers curated perfectly for festivals, birthdays, and special moments.
            </p>
            <Link to="/menu?category=Gift%20Hampers" className="inline-block bg-white text-brand-espresso px-8 py-3 rounded-md font-medium hover:bg-brand-terracotta hover:text-white transition-colors">
              Explore Hampers
            </Link>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gift Hampers" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-brown/50 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>
      </section>

      {/* Promo Offers Slider */}
      <section className="py-16 px-4 bg-brand-cream/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-brand-brown mb-3">Special Offers Just For You</h2>
            <p className="text-brand-brown/70">Use these exclusive coupon codes at checkout to save big on your fresh bakes!</p>
          </div>
          
          <div className="relative overflow-hidden bg-brand-espresso rounded-2xl shadow-xl p-8 md:p-12">
            <OfferSlider />
          </div>
        </div>
      </section>

    </div>
  );
};

// Custom component for the 3-second auto-slider
const OfferSlider = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const offers = [
    { code: "DEV50", title: "Flat ₹50 OFF", desc: "On orders above ₹500", color: "bg-orange-500/20", border: "border-orange-500/40", text: "text-orange-400" },
    { code: "DEV100", title: "Flat ₹100 OFF", desc: "On orders above ₹1000", color: "bg-brand-terracotta/20", border: "border-brand-terracotta/40", text: "text-brand-terracotta" },
    { code: "DEV250", title: "Flat ₹250 OFF", desc: "On orders above ₹2000", color: "bg-amber-500/20", border: "border-amber-500/40", text: "text-amber-400" },
    { code: "DEV500", title: "Flat ₹500 OFF", desc: "On orders above ₹3000", color: "bg-red-500/20", border: "border-red-500/40", text: "text-red-400" },
    { code: "FREEDELIVERY", title: "100% Free Shipping", desc: "On all orders above ₹800 instantly", color: "bg-emerald-500/20", border: "border-emerald-500/40", text: "text-emerald-400" },
    { code: "SWEET15", title: "Flat 15% OFF", desc: "No minimum order value required", color: "bg-purple-500/20", border: "border-purple-500/40", text: "text-purple-400" }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(timer);
  }, [offers.length]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-sm relative h-48">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.code}
            initial={{ opacity: 0, x: 100 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : (index < currentIndex ? -100 : 100),
              scale: index === currentIndex ? 1 : 0.9,
              zIndex: index === currentIndex ? 10 : 0,
              pointerEvents: index === currentIndex ? 'auto' : 'none'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6 rounded-2xl border-2 ${offer.color} ${offer.border}`}
          >
            <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${offer.text}`}>Use Code: {offer.code}</p>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 text-center">{offer.title}</h3>
            <p className="text-brand-cream/80 text-center font-medium">{offer.desc}</p>
            
            <button 
              onClick={() => navigator.clipboard.writeText(offer.code)}
              className="mt-4 text-xs bg-white text-brand-brown px-4 py-2 rounded-lg font-bold hover:bg-brand-cream transition-colors shadow-sm"
            >
              COPY CODE
            </button>
          </motion.div>
        ))}
      </div>
      
      {/* Dots Indicator */}
      <div className="flex gap-2 mt-8">
        {offers.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? 'bg-brand-terracotta' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
