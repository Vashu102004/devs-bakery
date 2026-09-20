const fs = require('fs');
let code = fs.readFileSync('frontend/src/data/products.js', 'utf8');

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

// Remove all existing breads
products = products.filter(p => p.category !== 'Breads');

// Add the 12 Indian Normal Breads
const indianBreads = [
  { id: 401, name: 'White Sandwich Bread', description: 'Soft, fresh, and daily baked normal white sliced bread. Perfect for sandwiches and toast.', price: 50, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&w=800', variants: ['400g'], bestSeller: true },
  { id: 402, name: '100% Brown Bread', description: 'Healthy and fiber-rich whole wheat brown bread.', price: 60, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&w=800', variants: ['400g'], bestSeller: true },
  { id: 403, name: 'Multigrain Bread', description: 'Packed with 7 different grains and seeds for a healthy breakfast.', price: 75, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?ixlib=rb-4.0.3&w=800', variants: ['400g'], bestSeller: false },
  { id: 404, name: 'Mumbai Ladi Pav', description: 'Authentic Mumbai style soft and fluffy pav, perfect for Vada Pav and Bhaji.', price: 45, category: 'Breads', occasions: ['Festival Special', 'Welcome'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1563714192534-1191ff02aef1?ixlib=rb-4.0.3&w=800', variants: ['Pack of 6'], bestSeller: true },
  { id: 405, name: 'Classic Burger Buns', description: 'Soft, sesame-topped burger buns.', price: 50, category: 'Breads', occasions: ['Kids Birthday'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1588725841443-4e6f47dfbb36?ixlib=rb-4.0.3&w=800', variants: ['Pack of 4'], bestSeller: false },
  { id: 406, name: 'Hot Dog Rolls', description: 'Freshly baked soft long rolls for hot dogs.', price: 50, category: 'Breads', occasions: ['Kids Birthday'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1628198755073-67c293679860?ixlib=rb-4.0.3&w=800', variants: ['Pack of 4'], bestSeller: false },
  { id: 407, name: 'Fresh Pizza Base', description: 'Thick and soft pizza bases ready for your favorite toppings.', price: 60, category: 'Breads', occasions: ['Kids Birthday'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1600806497793-138be5a043a2?ixlib=rb-4.0.3&w=800', variants: ['Pack of 2 (8 inch)'], bestSeller: true },
  { id: 408, name: 'Garlic Bread Loaf', description: 'Indian bakery style garlic loaf, perfect with soups or pasta.', price: 70, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&w=800', variants: ['250g'], bestSeller: false },
  { id: 409, name: 'Tutti Frutti Fruit Bread', description: 'Sweet bread loaded with colorful tutti frutti, loved by kids.', price: 65, category: 'Breads', occasions: ['Kids Birthday', 'Welcome'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1579705745172-2724a2bbecba?ixlib=rb-4.0.3&w=800', variants: ['400g'], bestSeller: true },
  { id: 410, name: 'Soft Milk Bread', description: 'Extra soft, milky, and slightly sweet loaf.', price: 55, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1586524339665-3eb7be5ee44a?ixlib=rb-4.0.3&w=800', variants: ['400g'], bestSeller: false },
  { id: 411, name: 'Elaichi Suji Rusk (Toast)', description: 'Crispy, crunchy Indian bakery toast with cardamom flavor.', price: 80, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1605391515250-9f06fc321a5b?ixlib=rb-4.0.3&w=800', variants: ['400g'], bestSeller: true },
  { id: 412, name: 'Soft Bakery Kulcha', description: 'Bakery style soft kulchas to enjoy with chole or paneer.', price: 50, category: 'Breads', occasions: ['Festival Special'], isVegetarian: true, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&w=800', variants: ['Pack of 4'], bestSeller: false }
];

products.push(...indianBreads);

// Format back
const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Successfully replaced all breads with 12 normal Indian breads.');
