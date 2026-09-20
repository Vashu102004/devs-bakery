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

// Add the exactly 12 requested Indian Breads
const indianBreads = [
  { id: 401, name: 'White Bread', description: 'Classic soft white bread, perfect for toast and sandwiches.', price: 50, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: '/images/breads/1_white_bread.jpg', variants: ['400g'], bestSeller: true },
  { id: 402, name: 'Brown Bread', description: 'Healthy and fiber-rich brown bread.', price: 60, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: '/images/breads/2_brown_bread.jpg', variants: ['400g'], bestSeller: true },
  { id: 403, name: 'Whole Wheat / Atta Bread', description: '100% whole wheat atta bread with zero maida.', price: 70, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: '/images/breads/3_whole_wheat.jpg', variants: ['400g'], bestSeller: false },
  { id: 404, name: 'Multigrain Bread', description: 'Packed with multiple healthy grains and seeds.', price: 75, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: '/images/breads/4_multigrain.jpg', variants: ['400g'], bestSeller: true },
  { id: 405, name: 'Sandwich Bread', description: 'Large jumbo slices designed perfectly for grilling sandwiches.', price: 65, category: 'Breads', occasions: ['Kids Birthday'], isVegetarian: true, image: '/images/breads/5_sandwich.jpg', variants: ['500g'], bestSeller: false },
  { id: 406, name: 'Milk Bread', description: 'Extra soft, slightly sweet, and milky loaf.', price: 55, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: '/images/breads/6_milk_bread.jpg', variants: ['400g'], bestSeller: false },
  { id: 407, name: 'Honey Oat Bread', description: 'Healthy oat bread naturally sweetened with honey.', price: 80, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: '/images/breads/7_honey_oat.jpg', variants: ['400g'], bestSeller: true },
  { id: 408, name: 'Garlic Bread', description: 'Freshly baked loaf infused with roasted garlic and herbs.', price: 70, category: 'Breads', occasions: ['Festival Special', 'Welcome'], isVegetarian: true, image: '/images/breads/8_garlic_bread.jpg', variants: ['250g'], bestSeller: false },
  { id: 409, name: 'French Bread / Baguette', description: 'Crispy exterior and soft chewy interior. Perfect for bruschetta.', price: 90, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: '/images/breads/9_french_bread.jpg', variants: ['1 Loaf'], bestSeller: false },
  { id: 410, name: 'Masala Bread', description: 'Spicy Indian twist with onions, green chilies, and coriander.', price: 65, category: 'Breads', occasions: ['Welcome', 'Festival Special'], isVegetarian: true, image: '/images/breads/10_masala_bread.jpg', variants: ['400g'], bestSeller: true },
  { id: 411, name: 'Ragi Bread', description: 'Healthy bread made with finger millet (Ragi) for extra calcium.', price: 75, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: '/images/breads/11_ragi_bread.jpg', variants: ['400g'], bestSeller: false },
  { id: 412, name: 'Seeded Bread', description: 'Topped and filled with flax, pumpkin, and sesame seeds.', price: 85, category: 'Breads', occasions: ['Welcome'], isVegetarian: true, image: '/images/breads/12_seeded_bread.jpg', variants: ['400g'], bestSeller: false }
];

products.push(...indianBreads);

// Format back
const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Successfully added the 12 exact requested breads.');
