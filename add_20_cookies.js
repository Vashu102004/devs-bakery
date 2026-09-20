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

// Remove old cookies
products = products.filter(p => p.category !== 'Cookies');

const cookieItems = [
  'Butter Cookies', 'Chocolate Chip Cookies', 'Choco Cookies', 'Coconut Cookies',
  'Cashew Cookies', 'Almond Cookies', 'Kaju Pista Cookies', 'Jeera Cookies',
  'Nankhatai', 'Atta Cookies', 'Oats Cookies', 'Multigrain Cookies',
  'Tutti Frutti Cookies', 'Dry Fruit Cookies', 'Coffee Cookies', 'Coconut Macaroons',
  'Salted Cookies', 'Cream Cookies', 'Milk Cookies', 'Digestive Cookies'
];

const imgChoco = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&w=600&q=80';
const imgPlain = 'https://images.unsplash.com/photo-1590080876479-70364d930263?ixlib=rb-4.0.3&w=600&q=80';
const imgCoconut = 'https://images.unsplash.com/photo-1588628373307-e85df64988e4?ixlib=rb-4.0.3&w=600&q=80';
const imgNut = 'https://images.unsplash.com/photo-1601000625341-a67b9319fcb9?ixlib=rb-4.0.3&w=600&q=80';
const imgHealthy = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&w=600&q=80';

const newCookies = cookieItems.map((name, index) => {
  let img = imgPlain;
  let price = 120;
  
  if (name.includes('Choco') || name.includes('Coffee')) { img = imgChoco; price = 150; }
  else if (name.includes('Coconut') || name.includes('Macaroon')) { img = imgCoconut; price = 140; }
  else if (name.includes('Cashew') || name.includes('Almond') || name.includes('Pista') || name.includes('Fruit')) { img = imgNut; price = 180; }
  else if (name.includes('Oats') || name.includes('Multigrain') || name.includes('Jeera') || name.includes('Digestive')) { img = imgHealthy; price = 130; }

  return {
    id: 700 + index,
    name: name,
    description: 'Crispy and delicious freshly baked ' + name.toLowerCase() + '.',
    price: price,
    category: 'Cookies',
    occasions: ['Welcome', 'Festival Special'],
    isVegetarian: true,
    image: img,
    variants: ['400g Box', '250g Box'],
    bestSeller: index % 3 === 0
  };
});

products.push(...newCookies);

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Added 20 cookies!');
