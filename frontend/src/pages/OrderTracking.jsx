import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, ChefHat, Truck, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderTracking = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { id: 1, title: 'Order Confirmed', icon: <CheckCircle size={24} />, desc: 'We have received your order.' },
    { id: 2, title: 'Preparing', icon: <ChefHat size={24} />, desc: 'Your treats are being baked.' },
    { id: 3, title: 'Out for Delivery', icon: <Truck size={24} />, desc: 'Order is on the way.' },
    { id: 4, title: 'Delivered', icon: <Home size={24} />, desc: 'Enjoy your delicious treats!' },
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-10 md:py-20 flex flex-col items-center">
      <div className="max-w-3xl w-full px-4">
        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-brand-brown/5 border border-brand-brown/10 text-center">
          
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-brand-brown mb-2">Order Confirmed!</h1>
          <p className="text-brand-brown/70 mb-8">
            Thank you for your order. Order #DEV{Math.floor(100000 + Math.random() * 900000)}
          </p>

          <div className="relative py-8 max-w-md mx-auto text-left">
            {/* Tracking Timeline */}
            <div className="absolute left-8 md:left-12 top-12 bottom-12 w-0.5 bg-brand-brown/10"></div>
            
            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-start gap-6 group">
                  {/* Line active segment */}
                  {index < steps.length - 1 && currentStep > step.id && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      className="absolute left-[1.125rem] md:left-[2.125rem] top-10 w-0.5 bg-brand-terracotta -z-0"
                    />
                  )}
                  
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 bg-white ${
                    currentStep >= step.id 
                      ? 'border-brand-terracotta text-brand-terracotta' 
                      : 'border-brand-brown/20 text-brand-brown/30'
                  }`}>
                    {step.icon}
                  </div>
                  
                  <div>
                    <h3 className={`font-bold text-lg ${currentStep >= step.id ? 'text-brand-brown' : 'text-brand-brown/40'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${currentStep >= step.id ? 'text-brand-brown/70' : 'text-brand-brown/30'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-brand-brown/10">
            <Link 
              to="/menu"
              className="inline-block bg-brand-brown text-white px-8 py-3 rounded-md font-medium hover:bg-brand-espresso transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
