const fs = require('fs');
let code = fs.readFileSync('frontend/src/data/products.js', 'utf8');

// A very hacky but effective way to parse the array and re-stringify it without breaking the export
const exportPrefix = code.substring(0, code.indexOf('export const mockProducts'));
let productsCode = code.substring(code.indexOf('export const mockProducts'));
productsCode = productsCode.replace('export const mockProducts = ', '');
if(productsCode.endsWith(';')) productsCode = productsCode.slice(0, -1);
if(productsCode.endsWith(';\r\n')) productsCode = productsCode.slice(0, -3);

let products;
try {
  products = eval(productsCode);
} catch(e) {
  console.log('Error evaluating:', e.message);
  process.exit(1);
}

const newBreads = [
  { id: 301, name: 'Artisanal Sourdough Boule', description: 'Crusty on the outside, chewy on the inside with a perfect tangy flavor.', price: 250, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fa08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', variants: ['500g'], bestSeller: true },
  { id: 302, name: 'Rustic Olive Ciabatta', description: 'Italian style flatbread studded with kalamata olives and herbs.', price: 180, category: 'Breads', occasions: ['Welcome', 'Festival Special'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', variants: ['350g'], bestSeller: false },
  { id: 303, name: 'Honey Oat Bread', description: 'Soft, slightly sweet bread made with natural honey and rolled oats.', price: 150, category: 'Breads', occasions: [], isVegetarian: true, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', variants: ['400g'], bestSeller: false },
  { id: 304, name: 'Banana Walnut Loaf', description: 'Moist and sweet teacake bread loaded with fresh bananas and roasted walnuts.', price: 300, category: 'Breads', occasions: ['Welcome', 'Kids Birthday'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1579705745172-2724a2bbecba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', variants: ['450g'], bestSeller: true },
  { id: 305, name: 'Pumpernickel Rye Bread', description: 'Dark, dense, and slightly sweet German rye bread.', price: 280, category: 'Breads', occasions: [], isVegetarian: true, image: 'https://images.unsplash.com/photo-1533626156295-885743f0cb18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', variants: ['400g'], bestSeller: false },
  { id: 306, name: 'Cinnamon Raisin Swirl Bread', description: 'Soft bread swirled with rich cinnamon and plump raisins, perfect for toast.', price: 200, category: 'Breads', occasions: ['Welcome', 'Festival Special'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1627448378548-2615ce675c93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', variants: ['400g'], bestSeller: false },
  { id: 307, name: 'Gluten-Free Almond Bread', description: 'Healthy alternative bread made entirely from almond flour.', price: 450, category: 'Breads', occasions: [], isVegetarian: true, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', variants: ['350g'], bestSeller: true }
];

products.push(...newBreads);

// Format back
const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Successfully added 7 more breads. Total breads: ' + products.filter(p => p.category === 'Breads').length);
