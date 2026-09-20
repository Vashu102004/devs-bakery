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

// Remove old festival combos
products = products.filter(p => p.category !== 'Festival Combos');

const combos = [
  'Diwali Celebration Combo', 'Diwali Sweet & Chocolate Combo', 'Raksha Bandhan Combo',
  'Valentine’s Day Combo', 'Christmas Combo', 'New Year Combo', 'Dussehra Special Combo',
  'Holi Celebration Combo', 'Ganesh Chaturthi Combo', 'Navratri Special Combo',
  'Eid Celebration Combo', 'Eid Sweet & Bakery Combo', 'Independence Day Combo',
  'Republic Day Combo', 'Mother’s Day Combo', 'Father’s Day Combo', 'Children’s Day Combo',
  'Teacher’s Day Combo', 'Birthday Celebration Combo', 'Anniversary Celebration Combo',
  'Housewarming Combo', 'Graduation Celebration Combo', 'Thank You Gift Combo',
  'Festive Family Combo', 'Premium Festival Gift Hamper'
];

const imgFestive1 = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&w=600&q=80';
const imgFestive2 = 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&w=600&q=80';
const imgHeart = 'https://images.unsplash.com/photo-1518784307567-5f7823fb83b6?ixlib=rb-4.0.3&w=600&q=80';
const imgSweet = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&w=600&q=80';
const imgEid = 'https://images.unsplash.com/photo-1588628373307-e85df64988e4?ixlib=rb-4.0.3&w=600&q=80';
const imgPremium = '/images/devs_bakery_pack.jpg';

const newCombos = combos.map((name, index) => {
  let img = imgFestive1;
  let price = 1100;
  
  if (name.includes('Valentine') || name.includes('Anniversary')) { img = imgHeart; price = 1500; }
  else if (name.includes('Christmas') || name.includes('New Year')) { img = imgFestive2; price = 1300; }
  else if (name.includes('Eid')) { img = imgEid; price = 1200; }
  else if (name.includes('Premium')) { img = imgPremium; price = 2500; }
  else if (name.includes('Mother') || name.includes('Father') || name.includes('Teacher') || name.includes('Children')) { img = imgSweet; price = 850; }

  let occ = ['Festival Special'];
  if (name.includes('Birthday')) occ.push('Birthday');
  if (name.includes('Anniversary') || name.includes('Valentine')) occ.push('Anniversary');
  if (name.includes('Children')) occ.push('Kids Birthday');

  return {
    id: 1100 + index,
    name: name,
    description: 'Perfectly curated ' + name.toLowerCase() + ' with an assortment of our finest bakery items.',
    price: price,
    category: 'Festival Combos',
    occasions: occ,
    isVegetarian: true,
    image: img,
    variants: ['Standard Box', 'Premium Box'],
    bestSeller: index % 3 === 0
  };
});

products.push(...newCombos);

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Added 25 Festival Combos!');
