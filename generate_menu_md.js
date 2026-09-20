const fs = require('fs');

let code = fs.readFileSync('frontend/src/data/products.js', 'utf8');

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

let categories = {};
for(let p of products) {
  if(!categories[p.category]) categories[p.category] = [];
  categories[p.category].push(p.name);
}

let md = '# Bakery Full Menu Items\n\n';
for (let cat in categories) {
  md += '## ' + cat + ' (' + categories[cat].length + ' items)\n';
  for (let name of categories[cat]) {
    md += '- ' + name + '\n';
  }
  md += '\n';
}

fs.writeFileSync('C:/Users/pvash/.gemini/antigravity/brain/6b16192b-6206-42d1-a11b-cd80bbce4e24/bakery_full_menu.md', md);
console.log('Created markdown file.');
