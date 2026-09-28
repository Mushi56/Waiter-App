const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function updateAppJs(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log(`Updating ${filePath}...`);
  let code = fs.readFileSync(filePath, 'utf8');

  // 1. Replace all image paths ending with .png to .webp in images/
  code = code.replace(/images\/([a-zA-Z0-9_\-]+)\.png/g, 'images/$1.webp');

  // 2. Bump MENU_VERSION from '26' to '27'
  code = code.replace(/const MENU_VERSION = '26';/g, "const MENU_VERSION = '27';");

  // 3. Update autoCropSquare to convert to WebP format
  const oldCrop = `          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, size, size);
          resolve(canvas.toDataURL('image/jpeg', 0.85));`;

  const newCrop = `          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, size, size);
          // Export in optimized WebP format with JPEG fallback
          const webpData = canvas.toDataURL('image/webp', 0.82);
          if (webpData && webpData.startsWith('data:image/webp')) {
            resolve(webpData);
          } else {
            resolve(canvas.toDataURL('image/jpeg', 0.85));
          }`;

  if (code.includes(oldCrop)) {
    code = code.replace(oldCrop, newCrop);
    console.log(`  Updated autoCropSquare to WebP in ${filePath}`);
  } else {
    // Alternative match in case of minor whitespace differences
    const altRegex = /ctx\.drawImage\(img,\s*startX,\s*startY,\s*minDim,\s*minDim,\s*0,\s*0,\s*size,\s*size\);\s*resolve\(canvas\.toDataURL\('image\/jpeg',\s*0\.85\)\);/;
    if (altRegex.test(code)) {
      code = code.replace(altRegex, newCrop);
      console.log(`  Updated autoCropSquare via regex in ${filePath}`);
    } else {
      console.log(`  Warning: autoCropSquare target pattern not found in ${filePath}`);
    }
  }

  // 4. In loadData, add auto-migration to ensure any cached items with .png are migrated to .webp
  const migrationSnippet = `
    // Auto-migrate cached item and category images from .png to .webp
    let migratedToWebp = false;
    if (Array.isArray(menuItems)) {
      menuItems.forEach(item => {
        if (item.image && typeof item.image === 'string' && item.image.endsWith('.png')) {
          item.image = item.image.replace(/\\.png$/, '.webp');
          migratedToWebp = true;
        }
        if (Array.isArray(item.gallery)) {
          item.gallery.forEach(g => {
            if (g && g.data && typeof g.data === 'string' && g.data.endsWith('.png')) {
              g.data = g.data.replace(/\\.png$/, '.webp');
              migratedToWebp = true;
            }
          });
        }
      });
    }
    if (Array.isArray(appCategories)) {
      appCategories.forEach(cat => {
        if (cat.image && typeof cat.image === 'string' && cat.image.endsWith('.png')) {
          cat.image = cat.image.replace(/\\.png$/, '.webp');
          migratedToWebp = true;
        }
      });
    }
    if (migratedToWebp) {
      saveMenu();
      saveCategories();
    }
`;

  if (!code.includes('migratedToWebp')) {
    // Insert migration right before "const storedOrders" in loadData()
    if (code.includes('const storedOrders = localStorage.getItem(\'wh_orders\');')) {
      code = code.replace(
        'const storedOrders = localStorage.getItem(\'wh_orders\');',
        migrationSnippet + '\n    const storedOrders = localStorage.getItem(\'wh_orders\');'
      );
      console.log(`  Added WebP localStorage migration to loadData in ${filePath}`);
    }
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`  Successfully wrote ${filePath}`);
}

function updateSwJs(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log(`Updating ${filePath}...`);
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/images\/([a-zA-Z0-9_\-]+)\.png/g, 'images/$1.webp');
  code = code.replace(/const CACHE_NAME = 'waiter-helper-v\d+';/g, "const CACHE_NAME = 'waiter-helper-v118';");
  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`  Successfully wrote ${filePath}`);
}

// Update files
updateAppJs(path.join(ROOT, 'app.js'));
updateAppJs(path.join(ROOT, 'www', 'app.js'));
updateSwJs(path.join(ROOT, 'sw.js'));
updateSwJs(path.join(ROOT, 'www', 'sw.js'));

console.log('Update script completed.');
