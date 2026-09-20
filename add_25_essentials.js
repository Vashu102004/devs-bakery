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

// Remove old essentials
products = products.filter(p => p.category !== 'Essentials');

const essentialItems = [
  'Bread', 'Brown Bread', 'Multigrain Bread', 'Pav', 'Bun', 'Rusk',
  'Cookies', 'Nankhatai', 'Khari', 'Cream Roll', 'Puff', 'Veg Puff', 'Patties',
  'Pizza', 'Sandwich', 'Burger', 'Donut', 'Muffin', 'Cupcake', 'Pastry',
  'Birthday Cake', 'Chocolate Cake', 'Black Forest Cake', 'Brownie', 'Cake Jar'
];

const imgBread = 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&w=600&q=80';
const imgPav = 'https://images.unsplash.com/photo-1563714192534-1191ff02aef1?ixlib=rb-4.0.3&w=600&q=80';
const imgRusk = 'https://images.unsplash.com/photo-1605391515250-9f06fc321a5b?ixlib=rb-4.0.3&w=600&q=80';
const imgCookies = 'https://images.unsplash.com/photo-1590080876479-70364d930263?ixlib=rb-4.0.3&w=600&q=80';
const imgPuff = 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?ixlib=rb-4.0.3&w=600&q=80';
const imgPizza = 'https://images.unsplash.com/photo-1600806497793-138be5a043a2?ixlib=rb-4.0.3&w=600&q=80';
const imgBurger = 'https://images.unsplash.com/photo-1588725841443-4e6f47dfbb36?ixlib=rb-4.0.3&w=600&q=80';
const imgDonut = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&w=600&q=80';
const imgCupcake = 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&w=600&q=80';
const imgCake = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&w=600&q=80';
const imgBF = 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&w=600&q=80';
const imgBrownie = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&w=600&q=80';

const newEssentials = essentialItems.map((name, index) => {
  let img = imgBread;
  let price = 50;
  
  if (name.includes('Bread')) { img = imgBread; }
  else if (name.includes('Pav') || name.includes('Bun')) { img = imgPav; price = 40; }
  else if (name.includes('Rusk')) { img = imgRusk; price = 60; }
  else if (name.includes('Cookies') || name.includes('Nankhatai')) { img = imgCookies; price = 120; }
  else if (name.includes('Khari') || name.includes('Puff') || name.includes('Patties') || name.includes('Roll')) { img = imgPuff; price = 30; }
  else if (name.includes('Pizza') || name.includes('Sandwich')) { img = imgPizza; price = 80; }
  else if (name.includes('Burger')) { img = imgBurger; price = 60; }
  else if (name.includes('Donut')) { img = imgDonut; price = 70; }
  else if (name.includes('Muffin') || name.includes('Cupcake')) { img = imgCupcake; price = 50; }
  else if (name.includes('Pastry') || name.includes('Black Forest')) { img = imgBF; price = 90; }
  else if (name.includes('Cake')) { img = imgCake; price = 400; }
  else if (name.includes('Brownie')) { img = imgBrownie; price = 100; }
  
  return {
    id: 800 + index,
    name: 'Bakery Fresh ' + name,
    description: 'A daily bakery essential - fresh, delicious ' + name.toLowerCase() + '!',
    price: price,
    category: 'Essentials',
    occasions: ['Welcome'],
    isVegetarian: true,
    image: img,
    variants: ['Standard'],
    bestSeller: index % 2 === 0
  };
});

products.push(...newEssentials);

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Added 25 Essentials!');
