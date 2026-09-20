const fs = require('fs');
let code = fs.readFileSync('frontend/src/data/products.js', 'utf8');

// A very hacky but effective way to parse the array and re-stringify it without breaking the export
const exportPrefix = code.substring(0, code.indexOf('export const mockProducts'));
let productsCode = code.substring(code.indexOf('export const mockProducts'));
productsCode = productsCode.replace('export const mockProducts = ', '');
// It might end with a semicolon
if(productsCode.endsWith(';')) productsCode = productsCode.slice(0, -1);
if(productsCode.endsWith(';\r\n')) productsCode = productsCode.slice(0, -3);

let products;
try {
  products = eval(productsCode);
} catch(e) {
  console.log('Error evaluating:', e.message);
  process.exit(1);
}

const targetOccasions = ['Birthday', 'Kids Birthday', 'Anniversary', 'Baby Shower', 'Welcome', 'Festival Special'];

// Distribute occasions heavily so each has >= 15
products.forEach(p => {
  if(!p.occasions) p.occasions = [];
  
  if (p.category === 'Cakes' || p.category === 'Chocolates') {
     if(!p.occasions.includes('Birthday')) p.occasions.push('Birthday');
     if(!p.occasions.includes('Anniversary')) p.occasions.push('Anniversary');
  }
  if (p.category === 'Gift Hampers') {
     targetOccasions.forEach(o => {
        if(!p.occasions.includes(o)) p.occasions.push(o);
     });
  }
  if (p.category === 'Cookies' || p.category === 'Bakery') {
     if(!p.occasions.includes('Welcome')) p.occasions.push('Welcome');
     if(!p.occasions.includes('Festival Special')) p.occasions.push('Festival Special');
     if(!p.occasions.includes('Baby Shower')) p.occasions.push('Baby Shower');
  }
  if (p.name.includes('Kid') || p.name.includes('Cartoon')) {
     if(!p.occasions.includes('Kids Birthday')) p.occasions.push('Kids Birthday');
  }
  if (p.category === 'Essentials') {
     if(!p.occasions.includes('Welcome')) p.occasions.push('Welcome');
  }
});

targetOccasions.forEach(occ => {
  const count = products.filter(p => p.occasions && p.occasions.includes(occ)).length;
  console.log(occ + ': ' + count);
});

// Format back
const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Successfully updated occasions.');
