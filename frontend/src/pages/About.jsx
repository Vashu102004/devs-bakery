import React from 'react';
import { Leaf, Heart, Star, Cake } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Bakery Story" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-espresso/70 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Our Story</h1>
          <p className="text-lg md:text-xl text-white/90 font-light">
            Bringing honest flavors, premium ingredients, and beautiful moments to Indore.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold text-brand-brown mb-8">Our Philosophy & History</h2>
        <p className="text-xl md:text-3xl font-serif text-brand-terracotta leading-snug mb-12 italic">
          "Fresh Ingredients. Honest Flavours. Beautiful Moments."
        </p>
        <div className="space-y-6 text-brand-brown/80 text-lg leading-relaxed">
          <p>
            Welcome to Dev's Bakery, a passion-driven artisan bakery nestled in the heart of Indore. Founded in <strong>July 2009</strong> by our Director, <strong>Mr. Himanshu Dev</strong>, what started as a love for baking has grown into a beloved destination for premium cakes, delicate pastries, and comforting treats.
          </p>
          <p>
            With a commitment to quality, we specialize in <strong>100% eggless bakery goods, custom cakes, and cafe items</strong>. Today, we proudly serve our community through multiple outlets across Indore, including <strong>Indrapuri, Bengali Square, LIG, and Geeta Bhawan</strong>.
          </p>
          <p>
            We believe that every celebration deserves a centerpiece that looks spectacular and tastes even better. That's why we never compromise on quality, using only the finest ingredients to craft our recipes from scratch daily.
          </p>
        </div>
        
        {/* Outlet Image */}
        <div className="mt-16 max-w-4xl mx-auto">
          <img 
            src="/images/devs_outlet.webp" 
            alt="Dev's Bakery Outlet" 
            className="w-full h-auto rounded-2xl shadow-xl shadow-brand-brown/10 border-4 border-white"
          />
          <p className="mt-4 text-brand-brown/60 text-sm font-medium italic">Visit us at one of our welcoming outlets in Indore</p>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-brand-brown mb-16">What Makes Us Special</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Star size={32}/>, title: "Quality Ingredients", desc: "We source the finest chocolates, real butter, and fresh local produce for our creations." },
              { icon: <Leaf size={32}/>, title: "Vegetarian Selection", desc: "A wide variety of 100% eggless/vegetarian options that never compromise on taste or texture." },
              { icon: <Heart size={32}/>, title: "Freshly Prepared", desc: "Baked fresh daily in small batches to ensure the highest quality and perfect taste." },
              { icon: <Cake size={32}/>, title: "For Every Celebration", desc: "From intimate birthdays to grand weddings, we craft treats for all your special moments." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-cream/50 p-8 rounded-2xl text-center border border-brand-brown/5 hover:border-brand-terracotta/30 hover:shadow-lg transition-all"
              >
                <div className="text-brand-terracotta mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="font-serif font-bold text-brand-brown text-xl mb-3">{feature.title}</h3>
                <p className="text-brand-brown/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Freshness You Can See */}
      <section className="py-20 px-4 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-terracotta font-serif italic text-xl">Our Bakery</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-brown mt-2">Freshness You Can See</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 md:h-[400px] rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bakery Display" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
            </div>
            <div className="grid grid-rows-2 gap-4 h-[400px]">
              <div className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Baking Process" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Cakes" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                </div>
                <div className="rounded-2xl overflow-hidden bg-brand-brown flex items-center justify-center p-6 text-center">
                  <p className="font-serif text-white text-xl md:text-2xl italic leading-snug">
                    "Baked with love,<br/>served with joy."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
