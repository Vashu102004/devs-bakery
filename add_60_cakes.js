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

// Remove old cakes
products = products.filter(p => p.category !== 'Cakes' && p.category !== 'Kids Special Cakes');

const imgChoco = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&w=600&q=80';
const imgBlackForest = 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&w=600&q=80';
const imgVanilla = 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&w=600&q=80';
const imgRedVelvet = 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?ixlib=rb-4.0.3&w=600&q=80';
const imgKids = 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&w=600&q=80';
const imgHeart = 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&w=600&q=80';
const imgPremium = 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?ixlib=rb-4.0.3&w=600&q=80';

const cakesData = [
  // Birthday Cakes
  ['Classic Chocolate Cake', imgChoco], ['Black Forest Cake', imgBlackForest], ['White Forest Cake', imgVanilla],
  ['Chocolate Truffle Cake', imgChoco], ['Choco Vanilla Cake', imgVanilla], ['Red Velvet Cake', imgRedVelvet],
  ['Butterscotch Cake', imgPremium], ['Pineapple Cake', imgVanilla], ['Strawberry Cake', imgRedVelvet],
  ['Vanilla Fresh Cream Cake', imgVanilla], ['KitKat Chocolate Cake', imgChoco], ['Oreo Cake', imgChoco],
  ['Ferrero Rocher Cake', imgPremium], ['Choco Crunch Cake', imgChoco], ['Death by Chocolate Cake', imgChoco],
  // Anniversary Cakes
  ['Anniversary Heart Cake', imgHeart], ['Romantic Red Velvet Cake', imgRedVelvet], ['Couple Photo Cake', imgVanilla],
  ['Love Theme Cake', imgHeart], ['Heart-Shaped Chocolate Cake', imgChoco], ['Elegant Floral Cake', imgPremium],
  ['Premium Anniversary Cake', imgPremium], ['Golden Anniversary Cake', imgPremium], ['Rose Theme Cake', imgRedVelvet],
  ['Couple Name Cake', imgVanilla],
  // Kids Cakes
  ['Rainbow Cake', imgKids], ['Unicorn Cake', imgKids], ['Dinosaur Cake', imgKids],
  ['Princess Cake', imgKids], ['Doll Cake', imgKids], ['Car Theme Cake', imgKids],
  ['Racing Car Cake', imgKids], ['Superhero Cake', imgKids], ['Space Theme Cake', imgKids],
  ['Jungle Theme Cake', imgKids], ['Animal Theme Cake', imgKids], ['Mermaid Cake', imgKids],
  ['Fairy Theme Cake', imgKids], ['Cartoon Character Cake', imgKids], ['Football Theme Cake', imgKids],
  // Cartoon Cakes
  ['Mickey Mouse Cake', imgKids], ['Minnie Mouse Cake', imgKids], ['Tom & Jerry Cake', imgKids],
  ['Doraemon Cake', imgKids], ['Shinchan Cake', imgKids], ['Chhota Bheem Cake', imgKids],
  ['Motu Patlu Cake', imgKids], ['Pokémon Theme Cake', imgKids], ['SpongeBob Cake', imgKids],
  ['Peppa Pig Cake', imgKids], ['Barbie Theme Cake', imgKids], ['Hello Kitty Cake', imgKids],
  ['Minions Cake', imgKids], ['Frozen Theme Cake', imgKids], ['Spider-Man Cake', imgKids],
  // Eggless & Premium Cakes
  ['Eggless Chocolate Cake', imgChoco], ['Eggless Black Forest Cake', imgBlackForest], ['Eggless Red Velvet Cake', imgRedVelvet],
  ['Eggless Butterscotch Cake', imgPremium], ['Eggless Vanilla Cake', imgVanilla]
];

const newCakes = cakesData.map((cake, index) => {
  let occ = ['Birthday'];
  let price = 500;
  if(index >= 15 && index <= 24) { occ = ['Anniversary']; price = 800; }
  else if (index >= 25 && index <= 54) { occ = ['Kids Birthday']; price = 1200; }
  else if (index >= 55) { occ = ['Welcome', 'Festival Special', 'Birthday']; price = 600; }

  return {
    id: 500 + index,
    name: cake[0],
    description: 'Freshly baked ' + cake[0] + ' crafted with premium ingredients.',
    price: price,
    category: 'Cakes',
    occasions: occ,
    isVegetarian: true, // All are eggless/veg
    image: cake[1],
    variants: ['500g', '1kg', '2kg'],
    bestSeller: index % 5 === 0
  };
});

products.push(...newCakes);

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Added 60 cakes!');
