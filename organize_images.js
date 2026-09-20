const fs = require('fs');
const path = require('path');
const https = require('https');

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

const baseDir = path.join(__dirname, 'frontend', 'public', 'images');

// Fallback images in case of download failure
const fallbackImages = {
  'Cakes': path.join(baseDir, 'pineapple_cake.jpg'),
  'Gift Hampers': path.join(baseDir, 'devs_bakery_pack.jpg'),
  'Breads': path.join(baseDir, 'breads', '1_white_bread.jpg'),
  'default': path.join(baseDir, 'breads', '1_white_bread.jpg')
};

const sanitize = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url.startsWith('http')) {
      // It's already a local path, try to copy it if it exists
      let srcPath = path.join(__dirname, 'frontend', 'public', url);
      if (fs.existsSync(srcPath) && srcPath !== dest) {
         fs.copyFileSync(srcPath, dest);
      }
      resolve();
      return;
    }
    
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
         https.get(response.headers.location, (res) => {
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
         }).on('error', (err) => { fs.unlink(dest, ()=>{}); reject(err); });
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', (err) => {
      fs.unlink(dest, ()=>{});
      reject(err);
    });
  });
}

async function processAll() {
  for (let p of products) {
    let catDirName = sanitize(p.category);
    let catDir = path.join(baseDir, catDirName);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
    
    let fileName = sanitize(p.name) + '.jpg';
    let destPath = path.join(catDir, fileName);
    let newImageUrl = '/images/' + catDirName + '/' + fileName;
    
    if (!fs.existsSync(destPath)) {
      try {
        console.log('Downloading/Copying for', p.name);
        await downloadImage(p.image, destPath);
      } catch (e) {
        console.log('Failed to download', p.image, 'using fallback.');
        let fb = fallbackImages[p.category] || fallbackImages['default'];
        if (fs.existsSync(fb)) {
          fs.copyFileSync(fb, destPath);
        }
      }
    }
    
    p.image = newImageUrl;
  }
  
  const newCode = exportPrefix + 'export const mockProducts = ' + JSON.stringify(products, null, 2) + ';';
  fs.writeFileSync('frontend/src/data/products.js', newCode);
  console.log('All images processed and organized!');
}

processAll();
