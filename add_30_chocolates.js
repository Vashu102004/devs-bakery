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

// Remove old items in Chocolates category to maintain a clean list
products = products.filter(p => p.category !== 'Chocolates');

const chocoItems = [
  'Chocolate Brownie', 'Chocolate Fudge Brownie', 'Chocolate Muffin', 'Chocolate Cupcake',
  'Chocolate Lava Cake', 'Chocolate Truffle', 'Chocolate Doughnut', 'Chocolate Eclair',
  'Chocolate Croissant', 'Chocolate Swiss Roll', 'Chocolate Roll', 'Chocolate Slice Cake',
  'Chocolate Tea Cake', 'Chocolate Loaf Cake', 'Chocolate Marble Cake', 'Chocolate Walnut Cake',
  'Chocolate Almond Cake', 'Chocolate Hazelnut Cake', 'Chocolate Mousse Cake', 'Chocolate Fudge Cake',
  'Chocolate Truffle Cake', 'Chocolate Crunch Cake', 'Chocolate Oreo Cake', 'Chocolate KitKat Cake',
  'Chocolate Drip Cake', 'Chocolate Pinata Cake', 'Chocolate Cake Jar', 'Chocolate Cake Pop',
  'Chocolate Cream Roll', 'Chocolate Chip Cookie'
];

const imgBrownie = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&w=600&q=80';
const imgCupcake = 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&w=600&q=80';
const imgCake = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&w=600&q=80';
const imgLava = 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&w=600&q=80';
const imgDonut = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&w=600&q=80';
const imgCookie = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&w=600&q=80';

const newChocos = chocoItems.map((name, index) => {
  let img = imgCake;
  let price = 400;
  let desc = 'Rich and delicious ' + name.toLowerCase() + ' made with premium cocoa.';
  
  if (name.includes('Brownie')) { img = imgBrownie; price = 120; }
  else if (name.includes('Cupcake') || name.includes('Muffin')) { img = imgCupcake; price = 80; }
  else if (name.includes('Lava') || name.includes('Mousse')) { img = imgLava; price = 150; }
  else if (name.includes('Doughnut') || name.includes('Croissant') || name.includes('Roll') || name.includes('Eclair')) { img = imgDonut; price = 100; }
  else if (name.includes('Cookie')) { img = imgCookie; price = 60; }
  else if (name.includes('Jar') || name.includes('Pop')) { img = imgCupcake; price = 120; }
  
  // High end cakes
  if (name.includes('Truffle Cake') || name.includes('Fudge Cake') || name.includes('Pinata')) {
    price = 650;
  }

  return {
    id: 600 + index,
    name: name,
    description: desc,
    price: price,
    category: 'Chocolates',
    occasions: ['Birthday', 'Anniversary', 'Festival Special'],
    isVegetarian: true,
    image: img,
    variants: ['Standard'],
    bestSeller: index % 4 === 0
  };
});

products.push(...newChocos);

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Added 30 chocolates!');
