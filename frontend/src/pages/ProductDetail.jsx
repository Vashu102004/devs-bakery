import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, ChevronLeft, Truck, Clock } from 'lucide-react';
import { mockProducts } from '../data/products';
import { useCartStore } from '../store/cartStore';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  
  const product = mockProducts.find(p => p.id === parseInt(id));
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [customMessage, setCustomMessage] = useState('');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-cream">
        <h2 className="text-2xl font-serif text-brand-brown mb-4">Product not found</h2>
        <Link to="/menu" className="text-brand-terracotta hover:underline">Return to Menu</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // You could also store the customMessage in the cart item if needed
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    navigate('/checkout');
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-brand-brown/60 hover:text-brand-terracotta transition-colors mb-8"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl shadow-brand-brown/5 overflow-hidden flex flex-col md:flex-row border-2 border-brand-brown/20">
          
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 lg:w-3/5 bg-brand-cream/30 p-4 md:p-8 flex items-center justify-center relative">
            {product.isVegetarian && (
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur p-2 rounded shadow-sm border border-green-600/20 z-10 flex items-center gap-2">
                <div className="w-4 h-4 border border-green-600 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-green-700">100% Eggless</span>
              </div>
            )}
            <div className="aspect-square w-full max-w-lg rounded-xl overflow-hidden shadow-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 origin-center"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-10 flex flex-col">
            <div className="mb-2 text-brand-terracotta text-sm font-medium uppercase tracking-wider">
              {product.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-brown mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-brand-espresso mb-6">
              ₹{product.price}
            </p>
            <p className="text-brand-brown/70 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-brand-brown mb-3">Select Size/Weight</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-5 py-2 rounded-md border text-sm font-medium transition-colors ${
                        selectedVariant === variant 
                          ? 'border-brand-brown bg-brand-brown text-white' 
                          : 'border-brand-brown/20 text-brand-brown hover:border-brand-brown/50 bg-white'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Message (for Cakes) */}
            {product.category === 'Cakes' && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-brand-brown mb-3">Message on Cake (Optional)</h3>
                <input 
                  type="text" 
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g., Happy Birthday John!"
                  maxLength={30}
                  className="w-full px-4 py-3 bg-white border border-brand-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-terracotta focus:border-transparent text-sm text-brand-espresso"
                />
                <p className="text-xs text-brand-brown/50 mt-1 text-right">{30 - customMessage.length} characters left</p>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-brand-brown mb-3">Quantity</h3>
              <div className="flex items-center w-32 bg-white border-2 border-brand-brown/30 rounded-md overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 p-3 text-brand-brown hover:bg-brand-brown/10 flex justify-center border-r border-brand-brown/20"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold text-brand-brown">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 p-3 text-brand-brown hover:bg-brand-brown/10 flex justify-center border-l border-brand-brown/20"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 border-brand-brown text-brand-brown py-4 rounded-md font-bold hover:bg-brand-brown/5 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-brand-terracotta text-white py-4 rounded-md font-bold hover:bg-brand-brown transition-colors shadow-lg shadow-brand-terracotta/20"
              >
                Buy Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="mt-8 pt-6 border-t border-brand-brown/10 space-y-3">
              <div className="flex items-center gap-3 text-sm text-brand-brown/70">
                <Truck size={18} className="text-brand-terracotta" />
                <span>Home delivery available across Indore.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-brown/70">
                <Clock size={18} className="text-brand-terracotta" />
                <span>Estimated delivery: Same day for orders before 6 PM.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
