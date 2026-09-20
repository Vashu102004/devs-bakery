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

// Clean any old kids special cakes
products = products.filter(p => p.category !== 'Kids Special Cakes');

const kidsCakes = [
  'Cartoon Theme Cake', 'Mickey Mouse Cake', 'Minnie Mouse Cake', 'Tom & Jerry Cake',
  'Doraemon Cake', 'Peppa Pig Cake', 'Spider-Man Cake', 'Superhero Cake',
  'Dinosaur Cake', 'Unicorn Cake', 'Princess Cake', 'Mermaid Cake',
  'Barbie Theme Cake', 'Minions Cake', 'Pokémon Cake', 'Teddy Bear Cake',
  'Car Theme Cake', 'Racing Car Cake', 'Football Theme Cake', 'Cricket Theme Cake',
  'Space Theme Cake', 'Rainbow Cake', 'Jungle Theme Cake', 'Cute Animal Cake',
  'Gaming Theme Cake'
];

const imgKids1 = 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&w=600&q=80';
const imgKids2 = 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?ixlib=rb-4.0.3&w=600&q=80';
const imgKids3 = 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?ixlib=rb-4.0.3&w=600&q=80';
const imgKids4 = 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&w=600&q=80';
const imgKids5 = 'https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&w=600&q=80';

const newKidsCakes = kidsCakes.map((name, index) => {
  let img = imgKids1;
  if (index % 5 === 0) img = imgKids1;
  else if (index % 5 === 1) img = imgKids2;
  else if (index % 5 === 2) img = imgKids3;
  else if (index % 5 === 3) img = imgKids4;
  else if (index % 5 === 4) img = imgKids5;

  return {
    id: 1000 + index,
    name: name,
    description: 'Beautifully crafted custom ' + name.toLowerCase() + ' for your child\'s special day!',
    price: 1200,
    category: 'Kids Special Cakes',
    occasions: ['Kids Birthday', 'Birthday'],
    isVegetarian: true,
    image: img,
    variants: ['1.5 Kg', '2 Kg', '3 Kg'],
    bestSeller: index % 4 === 0
  };
});

products.push(...newKidsCakes);

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Added 25 Kids Special Cakes!');
