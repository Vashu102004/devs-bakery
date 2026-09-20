import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0] || null);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-brown/20 transition-all duration-300 border border-brand-brown/20"
    >
      <div className="relative aspect-square overflow-hidden bg-brand-cream/50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Vegetarian badge */}
        {product.isVegetarian && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded shadow-sm border border-green-600/20">
            <div className="w-3 h-3 border border-green-600 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
            </div>
          </div>
        )}
        {product.bestSeller && (
          <div className="absolute top-3 left-3 bg-brand-terracotta text-white text-xs font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide">
            Best Seller
          </div>
        )}
        
        {/* Hover overlay add to cart */}
        <div className="absolute inset-0 bg-brand-espresso/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={handleAddToCart}
            className="bg-white text-brand-brown px-6 py-3 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-brown hover:text-white flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-lg font-semibold text-brand-brown mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-brand-brown/60 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold text-brand-espresso">
            ₹{product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
