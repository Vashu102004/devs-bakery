const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/Menu.jsx', 'utf8');

// Replace the array literal with occasionOptions
code = code.replace(/const opts = \[\s*\{\s*value: 'All'.*?\];/gs, 'const opts = occasionOptions;');
code = code.replace(/\{\[\s*\{\s*value: 'All'.*?\]/gs, '{occasionOptions');

fs.writeFileSync('frontend/src/pages/Menu.jsx', code);
