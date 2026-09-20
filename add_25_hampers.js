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

// Remove old hampers
products = products.filter(p => p.category !== 'Gift Hampers');

const hamperItems = [
  'Chocolate Gift Box', 'Assorted Cookies Box', 'Brownie Box', 'Cupcake Box',
  'Donut Box', 'Dry Fruit Cookies Box', 'Chocolate & Cookies Hamper', 'Cake & Chocolate Hamper',
  'Premium Bakery Hamper', 'Kids Treat Hamper', 'Birthday Gift Hamper', 'Anniversary Hamper',
  'Couple Gift Hamper', 'Mini Cake Hamper', 'Brownie & Chocolate Hamper', 'Cookie & Muffin Hamper',
  'Tea-Time Hamper', 'Coffee & Cookies Hamper', 'Festive Bakery Hamper', 'Diwali Sweet & Chocolate Hamper',
  'Raksha Bandhan Hamper', 'Christmas Bakery Hamper', 'New Year Celebration Hamper', 'Thank You Gift Hamper',
  'Premium Celebration Hamper'
];

const imgChocoBox = 'https://images.unsplash.com/photo-1548907040-4baa42d10919?ixlib=rb-4.0.3&w=600&q=80';
const imgCookieBox = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&w=600&q=80';
const imgBrownieBox = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&w=600&q=80';
const imgCupcakeBox = 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&w=600&q=80';
const imgDonutBox = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&w=600&q=80';
const imgPremium = '/images/devs_bakery_pack.jpg';
const imgFestive = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&w=600&q=80';
const imgAnniv = 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&w=600&q=80';
const imgCoffee = 'https://images.unsplash.com/photo-1514065683262-d4b9b9426f8d?ixlib=rb-4.0.3&w=600&q=80';

const newHampers = hamperItems.map((name, index) => {
  let img = imgPremium;
  let price = 999;
  
  if (name.includes('Chocolate Box')) { img = imgChocoBox; price = 650; }
  else if (name.includes('Cookie Box')) { img = imgCookieBox; price = 450; }
  else if (name.includes('Brownie')) { img = imgBrownieBox; price = 500; }
  else if (name.includes('Cupcake')) { img = imgCupcakeBox; price = 400; }
  else if (name.includes('Donut')) { img = imgDonutBox; price = 350; }
  else if (name.includes('Festive') || name.includes('Diwali') || name.includes('Raksha') || name.includes('Christmas') || name.includes('New Year')) { img = imgFestive; price = 1200; }
  else if (name.includes('Anniversary') || name.includes('Couple') || name.includes('Thank You') || name.includes('Birthday')) { img = imgAnniv; price = 1500; }
  else if (name.includes('Coffee') || name.includes('Tea')) { img = imgCoffee; price = 850; }
  
  let occ = ['Festival Special'];
  if (name.includes('Birthday')) occ.push('Birthday');
  if (name.includes('Anniversary') || name.includes('Couple')) occ.push('Anniversary');
  if (name.includes('Kids')) occ.push('Kids Birthday');

  return {
    id: 900 + index,
    name: name,
    description: 'A beautifully curated ' + name.toLowerCase() + ' packed with premium bakery delights.',
    price: price,
    category: 'Gift Hampers',
    occasions: occ,
    isVegetarian: true,
    image: img,
    variants: ['Standard', 'Large'],
    bestSeller: index % 3 === 0
  };
});

products.push(...newHampers);

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Added 25 Hampers!');
