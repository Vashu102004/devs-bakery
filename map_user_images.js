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

for (let p of products) {
  let n = p.name.toLowerCase();
  
  if (n === 'multigrain bread' || n.includes('seeded bread')) {
    p.image = '/images/breads/multigrain_bread.jpg';
  } else if (n === 'brown bread' || n === 'brown bread (450 g)' || n === '100% brown bread') {
    p.image = '/images/breads/brown_bread.jpg';
  } else if (n === 'white bread' || n === 'white bread (450 g)' || n === 'white sandwich bread') {
    p.image = '/images/breads/sandwich_bread.jpg';
  } else if (n === 'sandwich big bread (850 g)' || n === 'sandwich bread') {
    p.image = '/images/breads/sandwich_bread.jpg';
  } else if (n.includes('kulcha')) {
    p.image = '/images/breads/kulcha.jpg';
  } else if (n.includes('toast')) {
    p.image = '/images/breads/butter_toast.jpg';
  } else if (n.includes('samosa')) {
    p.image = '/images/breads/baked_samosa.jpg';
  } else if (n.includes('baguette') || n.includes('french')) {
    p.image = '/images/breads/mixed_breads.jpg';
  }
}

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Mapped user local images to products!');
