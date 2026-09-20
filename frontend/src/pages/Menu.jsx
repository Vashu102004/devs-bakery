import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search as SearchIcon, X, ChevronDown, Sparkles, Gift, PartyPopper, Heart, Star, Home, Flame } from 'lucide-react';
import { mockProducts, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const occasionOptions = [
  { value: 'All', label: 'All Occasions', icon: <Sparkles size={18} /> },
  { value: 'Birthday', label: 'Birthday', icon: <Gift size={18} /> },
  { value: 'Kids Birthday', label: 'Kids Birthday', icon: <PartyPopper size={18} /> },
  { value: 'Anniversary', label: 'Anniversary', icon: <Heart size={18} /> },
  { value: 'Baby Shower', label: 'Baby Shower', icon: <Star size={18} /> },
  { value: 'Welcome', label: 'Welcome', icon: <Home size={18} /> },
  { value: 'Festival Special', label: 'Festivals & Specials', icon: <Flame size={18} /> },
];

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery || 'All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [isVegetarian, setIsVegetarian] = useState(true); // Default eggless checked since bakery focuses on eggless
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isOccasionDropdownOpen, setIsOccasionDropdownOpen] = useState(false);
  const [isMobileOccasionDropdownOpen, setIsMobileOccasionDropdownOpen] = useState(false);

  // Update URL and state when category is clicked
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    }
  }, [categoryQuery]);

  // Filter products
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesOccasion = selectedOccasion === 'All' || (product.occasions && product.occasions.includes(selectedOccasion));
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !isVegetarian || product.isVegetarian;
    
    return matchesCategory && matchesOccasion && matchesSearch && matchesVeg;
  });

  return (
    <div className="bg-brand-cream min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-4">Our Menu</h1>
          <p className="text-brand-brown/70 text-lg">
            Explore our wide range of premium baked goods, crafted fresh daily.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Filters (Desktop) */}
          <aside className="hidden md:block w-64 shrink-0 space-y-8">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-brand-brown/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta focus:border-transparent text-sm"
              />
              <SearchIcon size={18} className="absolute left-3 top-3.5 text-brand-brown/40" />
            </div>

            {/* Occasions */}
            <div className="relative">
              <h3 className="font-serif font-bold text-brand-brown text-lg mb-4">Shop by Occasion</h3>
              
              <div className="relative">
                <button 
                  onClick={() => setIsOccasionDropdownOpen(!isOccasionDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-white border border-brand-brown/15 rounded-xl shadow-sm hover:border-brand-terracotta/50 hover:shadow transition-all text-left group"
                >
                  <span className="font-medium text-brand-espresso text-sm flex items-center gap-2">
                    {(() => {
                      const opts = occasionOptions;
                      const selected = opts.find(o => o.value === selectedOccasion) || opts[0];
                      return <><span className="text-lg">{selected.icon}</span> {selected.label}</>;
                    })()}
                  </span>
                  <ChevronDown size={18} className={`text-brand-brown/50 transition-transform duration-300 ${isOccasionDropdownOpen ? 'rotate-180 text-brand-terracotta' : 'group-hover:text-brand-terracotta'}`} />
                </button>

                {isOccasionDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 py-2 bg-white border border-brand-brown/10 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                    {occasionOptions.map((occ) => (
                      <button
                        key={occ.value}
                        onClick={() => {
                          setSelectedOccasion(occ.value);
                          setIsOccasionDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                          selectedOccasion === occ.value 
                            ? 'bg-brand-cream text-brand-terracotta font-bold' 
                            : 'text-brand-espresso hover:bg-brand-cream/50'
                        }`}
                      >
                        <span className="text-lg">{occ.icon}</span>
                        <span>{occ.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-serif font-bold text-brand-brown text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleCategorySelect('All')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${selectedCategory === 'All' ? 'bg-brand-brown text-white' : 'text-brand-brown hover:bg-white hover:shadow-sm'}`}
                  >
                    All Items
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button 
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${selectedCategory === cat ? 'bg-brand-brown text-white' : 'text-brand-brown hover:bg-white hover:shadow-sm'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="font-serif font-bold text-brand-brown text-lg mb-4">Preferences</h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input 
                    type="checkbox" 
                    checked={isVegetarian}
                    onChange={(e) => setIsVegetarian(e.target.checked)}
                    className="appearance-none w-5 h-5 border-2 border-brand-brown/30 rounded rounded-sm checked:bg-green-600 checked:border-green-600 transition-colors cursor-pointer"
                  />
                  {isVegetarian && <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>}
                </div>
                <span className="text-sm text-brand-brown group-hover:text-brand-terracotta transition-colors flex items-center gap-2">
                  <div className="w-3 h-3 border border-green-600 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  </div>
                  Eggless / Vegetarian
                </span>
              </label>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex gap-4 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-brand-brown/10 rounded-lg text-sm"
              />
              <SearchIcon size={18} className="absolute left-3 top-3.5 text-brand-brown/40" />
            </div>
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="bg-white border border-brand-brown/10 p-3 rounded-lg text-brand-brown flex items-center justify-center"
            >
              <Filter size={20} />
            </button>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-end">
              <h2 className="font-serif text-2xl text-brand-brown font-bold">
                {selectedCategory === 'All' ? 'All Items' : selectedCategory}
              </h2>
              <span className="text-sm text-brand-brown/60">
                Showing {filteredProducts.length} results
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-brand-brown/5 shadow-sm">
                <p className="text-brand-brown/60 text-lg mb-4">No products found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setIsVegetarian(false);
                    setSearchParams({});
                  }}
                  className="text-brand-terracotta font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-brand-espresso/60" onClick={() => setIsMobileFiltersOpen(false)}></div>
          <div className="relative w-4/5 max-w-xs bg-brand-cream h-full ml-auto shadow-2xl flex flex-col">
            <div className="p-4 border-b border-brand-brown/10 flex justify-between items-center bg-white">
              <h2 className="font-serif font-bold text-lg text-brand-brown">Filters</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}><X size={20} className="text-brand-brown/60"/></button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-6">
              <div className="relative">
                <h3 className="font-bold text-brand-brown mb-3">Shop by Occasion</h3>
                
                <div className="relative">
                  <button 
                    onClick={() => setIsMobileOccasionDropdownOpen(!isMobileOccasionDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-brand-brown/15 rounded-xl shadow-sm hover:border-brand-terracotta/50 transition-all text-left group"
                  >
                    <span className="font-medium text-brand-espresso text-sm flex items-center gap-2">
                      {(() => {
                        const opts = occasionOptions;
                        const selected = opts.find(o => o.value === selectedOccasion) || opts[0];
                        return <><span className="text-lg">{selected.icon}</span> {selected.label}</>;
                      })()}
                    </span>
                    <ChevronDown size={18} className={`text-brand-brown/50 transition-transform duration-300 ${isMobileOccasionDropdownOpen ? 'rotate-180 text-brand-terracotta' : 'group-hover:text-brand-terracotta'}`} />
                  </button>

                  {isMobileOccasionDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 py-2 bg-white border border-brand-brown/10 rounded-xl shadow-xl max-h-56 overflow-y-auto">
                      {occasionOptions.map((occ) => (
                        <button
                          key={occ.value}
                          onClick={() => {
                            setSelectedOccasion(occ.value);
                            setIsMobileOccasionDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                            selectedOccasion === occ.value 
                              ? 'bg-brand-cream text-brand-terracotta font-bold' 
                              : 'text-brand-espresso hover:bg-brand-cream/50'
                          }`}
                        >
                          <span className="text-lg">{occ.icon}</span>
                          <span>{occ.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-brand-brown mb-3">Categories</h3>
                <div className="space-y-2">
                  <button onClick={() => { handleCategorySelect('All'); setIsMobileFiltersOpen(false); }} className={`w-full text-left px-3 py-2 rounded-md ${selectedCategory === 'All' ? 'bg-brand-brown text-white' : 'bg-white text-brand-brown'}`}>All Items</button>
                  {categories.map(cat => (
                    <button key={cat} onClick={() => { handleCategorySelect(cat); setIsMobileFiltersOpen(false); }} className={`w-full text-left px-3 py-2 rounded-md ${selectedCategory === cat ? 'bg-brand-brown text-white' : 'bg-white text-brand-brown'}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-brand-brown mb-3">Preferences</h3>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={isVegetarian} onChange={(e) => setIsVegetarian(e.target.checked)} className="w-5 h-5 rounded text-green-600 focus:ring-green-500" />
                  <span className="text-sm">Eggless / Vegetarian</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Menu;

