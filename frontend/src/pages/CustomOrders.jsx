import React, { useState } from 'react';
import { Cake, PartyPopper, Calendar, Image as ImageIcon, CheckCircle } from 'lucide-react';

const CustomOrders = () => {
  const [activeTab, setActiveTab] = useState('custom-cake'); // 'custom-cake' or 'celebration'
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, send data to backend
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-4">Special Requests</h1>
          <p className="text-brand-brown/70 text-lg">
            Looking for something unique? Order a custom cake or book our bakery space for your next celebration.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('custom-cake')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-medium transition-colors text-lg ${
              activeTab === 'custom-cake' 
                ? 'bg-brand-brown text-white shadow-lg' 
                : 'bg-white text-brand-brown border border-brand-brown/20 hover:bg-brand-brown/5'
            }`}
          >
            <Cake size={24} />
            Custom Cake Order
          </button>
          <button 
            onClick={() => setActiveTab('celebration')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-medium transition-colors text-lg ${
              activeTab === 'celebration' 
                ? 'bg-brand-terracotta text-white shadow-lg' 
                : 'bg-white text-brand-brown border border-brand-brown/20 hover:bg-brand-brown/5'
            }`}
          >
            <PartyPopper size={24} />
            Book a Celebration
          </button>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-8 flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            Your request has been sent! Our team will contact you shortly to confirm the details.
          </div>
        )}

        {/* Forms Container */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-brand-brown/5 border border-brand-brown/10">
          
          {/* Custom Cake Form */}
          {activeTab === 'custom-cake' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-brand-brown mb-2">Design Your Dream Cake</h2>
                <p className="text-brand-brown/70 text-sm">Fill out the details below and we will bring your vision to life.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Mobile Number</label>
                  <input required type="tel" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Preferred Flavor</label>
                  <select className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta text-brand-espresso">
                    <option>Chocolate Truffle</option>
                    <option>Red Velvet</option>
                    <option>Black Forest</option>
                    <option>Pineapple</option>
                    <option>Lotus Biscoff</option>
                    <option>Other (Specify in details)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Weight (in Pounds)</label>
                  <input required type="number" min="1" step="0.5" placeholder="e.g. 2.5" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-2">Delivery Date & Time</label>
                <input required type="datetime-local" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-2">Describe Your Custom Design</label>
                <textarea required rows="4" placeholder="Theme, colors, special messages, or specific shapes..." className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-2">Reference Image (Optional)</label>
                <div className="border-2 border-dashed border-brand-brown/20 rounded-md p-6 flex flex-col items-center justify-center text-brand-brown/50 bg-brand-cream/30 hover:bg-brand-cream/50 transition-colors cursor-pointer">
                  <ImageIcon size={32} className="mb-2 text-brand-terracotta" />
                  <span className="text-sm">Click to upload a photo of the cake you want</span>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <button type="submit" className="w-full bg-brand-brown text-white py-4 rounded-md font-bold hover:bg-brand-espresso transition-colors shadow-lg mt-8">
                Request Custom Cake
              </button>
            </form>
          )}

          {/* Celebration Form */}
          {activeTab === 'celebration' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-brand-brown mb-2">Book Your Celebration</h2>
                <p className="text-brand-brown/70 text-sm">Host your birthday, anniversary, or special event at our bakery with custom decorations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Mobile Number</label>
                  <input required type="tel" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Event Date</label>
                  <input required type="date" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Number of Guests</label>
                  <input required type="number" min="2" max="30" placeholder="Max 30" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-3">Decoration Package</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-brand-brown/20 rounded-lg cursor-pointer hover:bg-brand-terracotta/5 transition-colors">
                    <input type="radio" name="decoration" defaultChecked className="text-brand-terracotta focus:ring-brand-terracotta w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-bold text-brand-brown">Basic Decoration (₹500)</div>
                      <div className="text-sm text-brand-brown/60">Balloons, Happy Birthday Banner, Table Setup</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-brand-brown/20 rounded-lg cursor-pointer hover:bg-brand-terracotta/5 transition-colors">
                    <input type="radio" name="decoration" className="text-brand-terracotta focus:ring-brand-terracotta w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-bold text-brand-brown">Premium Theme (₹1500)</div>
                      <div className="text-sm text-brand-brown/60">Themed Balloons, Foil Curtains, LED Lights, Custom Props</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-brand-brown/20 rounded-lg cursor-pointer hover:bg-brand-terracotta/5 transition-colors">
                    <input type="radio" name="decoration" className="text-brand-terracotta focus:ring-brand-terracotta w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-bold text-brand-brown">I will do my own decoration</div>
                      <div className="text-sm text-brand-brown/60">Just reserve the space for us</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-2">Additional Requests</label>
                <textarea rows="3" placeholder="Do you need a photographer, specific music, or a pre-ordered cake?" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta"></textarea>
              </div>

              <button type="submit" className="w-full bg-brand-terracotta text-white py-4 rounded-md font-bold hover:bg-brand-brown transition-colors shadow-lg mt-8">
                Request Booking
              </button>
            </form>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default CustomOrders;
