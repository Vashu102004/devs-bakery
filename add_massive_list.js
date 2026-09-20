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

const lines = fs.readFileSync('raw_menu.txt', 'utf8').split('\n').map(l => l.trim());
let items = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  
  if (line.startsWith('?')) {
    let priceStr = line.replace('?', '').replace(/,/g, '');
    let price = parseFloat(priceStr) || 0;
    
    let name = lines[i-1];
    
    let desc = '';
    let j = i + 1;
    while (j < lines.length && !lines[j].toLowerCase().includes('vegetarian') && !lines[j].startsWith('?')) {
      if (lines[j]) {
        desc += lines[j] + ' ';
      }
      j++;
    }
    
    items.push({
      name: name,
      price: price,
      description: desc.trim() || 'A delightful bakery treat.',
    });
  }
}

const imgCake = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&w=600&q=80';
const imgPastry = 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&w=600&q=80';
const imgCookie = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&w=600&q=80';
const imgPuff = 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?ixlib=rb-4.0.3&w=600&q=80';
const imgBread = 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&w=600&q=80';
const imgHamper = '/images/devs_bakery_pack.jpg';
const imgBrownie = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&w=600&q=80';
const imgPudding = 'https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&w=600&q=80';

const mappedItems = items.map((item, index) => {
  let cat = 'Bakery';
  let img = imgPuff;
  let nameLower = item.name.toLowerCase();

  if (nameLower.includes('combo') || nameLower.includes('hamper')) { cat = 'Gift Hampers'; img = imgHamper; }
  else if (nameLower.includes('cake') && !nameLower.includes('pastry')) { cat = 'Cakes'; img = imgCake; }
  else if (nameLower.includes('pastry') || nameLower.includes('cheesecake')) { cat = 'Cakes'; img = imgPastry; }
  else if (nameLower.includes('cookie')) { cat = 'Cookies'; img = imgCookie; }
  else if (nameLower.includes('brownie') || nameLower.includes('chocolate')) { cat = 'Chocolates'; img = imgBrownie; }
  else if (nameLower.includes('bread') || nameLower.includes('bun') || nameLower.includes('pav')) { cat = 'Breads'; img = imgBread; }
  else if (nameLower.includes('pudding')) { cat = 'Cakes'; img = imgPudding; }
  
  let occ = [];
  if (nameLower.includes('birthday')) occ.push('Birthday');
  if (nameLower.includes('valentine') || nameLower.includes('anniversary')) occ.push('Anniversary');
  if (nameLower.includes('father') || nameLower.includes('mother') || nameLower.includes('diwali') || nameLower.includes('christmas')) occ.push('Festival Special');
  if (occ.length === 0) occ.push('Welcome');

  return {
    id: 2000 + index,
    name: item.name,
    description: item.description,
    price: item.price,
    category: cat,
    occasions: occ,
    isVegetarian: true,
    image: img,
    variants: ['Standard'],
    bestSeller: index % 5 === 0
  };
});

products.push(...mappedItems);

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Added ' + mappedItems.length + ' items from the massive list!');
