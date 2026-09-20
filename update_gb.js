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

for(let p of products) {
  if (p.name === 'Garlic Bread') {
    p.image = 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&w=800&q=80';
  }
  if (p.name === 'Korean Cream Cheese Garlic Bun') {
    p.image = 'https://images.unsplash.com/photo-1589363460779-cb73eb4eb9a6?ixlib=rb-4.0.3&w=800&q=80';
  }
}

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Updated garlic bread images.');
