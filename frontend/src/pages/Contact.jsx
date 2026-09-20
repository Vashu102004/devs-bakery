import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-4">Contact Us</h1>
          <p className="text-brand-brown/70 text-lg">
            We'd love to hear from you. Get in touch for custom orders, feedback, or any queries.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 bg-white rounded-2xl shadow-xl shadow-brand-brown/5 overflow-hidden">
          
          <div className="w-full md:w-1/3 bg-brand-espresso p-10 text-brand-cream/80 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-terracotta/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-serif font-bold text-white mb-8">Get In Touch</h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <MapPin size={24} className="text-brand-terracotta shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Our Outlets in Indore</h3>
                    <p>Indrapuri • Bengali Square<br/>LIG • Geeta Bhawan</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone size={24} className="text-brand-terracotta shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Phone</h3>
                    <p>+91 98765 43210</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail size={24} className="text-brand-terracotta shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Email</h3>
                    <p>hello@devsbakery.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock size={24} className="text-brand-terracotta shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Opening Hours</h3>
                    <p>Mon - Sun: 9:00 AM - 10:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-2/3 p-10 md:p-16">
            <h2 className="text-2xl font-serif font-bold text-brand-brown mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Your Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-brown/80 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-2">Message</label>
                <textarea rows="5" className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-brown/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta"></textarea>
              </div>
              <button className="bg-brand-terracotta text-white px-8 py-3 rounded-md font-medium hover:bg-brand-brown transition-colors shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Contact;
