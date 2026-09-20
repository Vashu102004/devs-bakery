const fs = require('fs');

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

console.log('Parsed items:', items.length);
console.log(items.slice(0, 3));
