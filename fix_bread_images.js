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
  if (p.category === 'Breads' || p.name.includes('Bread') || p.name.includes('Bun') || p.name.includes('Pav')) {
    let n = p.name.toLowerCase();
    if (n.includes('white bread') || (n === 'bread')) {
      p.image = 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('brown bread')) {
      p.image = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('wheat') || n.includes('atta')) {
      p.image = 'https://images.unsplash.com/photo-1627448378548-2615ce675c93?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('multigrain')) {
      p.image = 'https://images.unsplash.com/photo-1542385151-efd9000785a0?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('sandwich')) {
      p.image = 'https://images.unsplash.com/photo-1528207776546-32248a482d92?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('milk bread')) {
      p.image = 'https://images.unsplash.com/photo-1586524339665-3eb7be5ee44a?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('honey oat')) {
      p.image = 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('french') || n.includes('baguette')) {
      p.image = 'https://images.unsplash.com/photo-1589311053155-25eeb10c92ec?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('masala bread')) {
      p.image = 'https://images.unsplash.com/photo-1563714192534-1191ff02aef1?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('ragi')) {
      p.image = 'https://images.unsplash.com/photo-1533626156295-885743f0cb18?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('seeded')) {
      p.image = 'https://images.unsplash.com/photo-1579705745172-2724a2bbecba?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('burger bun')) {
      p.image = 'https://images.unsplash.com/photo-1588725841443-4e6f47dfbb36?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('pav') || n.includes('bun')) {
      p.image = 'https://images.unsplash.com/photo-1563714192534-1191ff02aef1?ixlib=rb-4.0.3&w=800&q=80';
    } else if (n.includes('pizza base')) {
      p.image = 'https://images.unsplash.com/photo-1600806497793-138be5a043a2?ixlib=rb-4.0.3&w=800&q=80';
    }
  }
}

const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
fs.writeFileSync('frontend/src/data/products.js', newCode);
console.log('Fixed all bread images to exact realistic images.');
