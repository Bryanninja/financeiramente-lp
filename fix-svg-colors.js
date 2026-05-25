const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.svg'));

let updated = 0;

function parseColorMatrix(matrixStr) {
  const match = matrixStr.match(/values="0\s+0\s+0\s+0\s+([0-9.]+)\s+0\s+0\s+0\s+0\s+([0-9.]+)\s+0\s+0\s+0\s+0\s+([0-9.]+)/);
  if (match) {
    const r = Math.round(parseFloat(match[1]) * 255);
    const g = Math.round(parseFloat(match[2]) * 255);
    const b = Math.round(parseFloat(match[3]) * 255);
    // if it's perfectly black because of the first matrix, ignore it
    if (r===0 && g===0 && b===0 && matrixStr.includes('127 0')) return null;
    return '#' + [r,g,b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  }
  return null;
}

for (const file of files) {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let changed = false;
  
  // Find all filters
  const filterRegex = /<filter\s+id="([^"]+)"[\s\S]*?<\/filter>/g;
  let filterMatch;
  const filterColors = {};
  
  while ((filterMatch = filterRegex.exec(content)) !== null) {
    const filterId = filterMatch[1];
    const filterContent = filterMatch[0];
    
    // Find all feColorMatrix
    const matrices = filterContent.match(/<feColorMatrix[^>]+type="matrix"[^>]+values="[^"]+"/g);
    if (matrices && matrices.length > 0) {
      // Figma's actual color is usually the last feColorMatrix
      for (let i = matrices.length - 1; i >= 0; i--) {
        const color = parseColorMatrix(matrices[i]);
        if (color) {
          filterColors[filterId] = color;
          break;
        }
      }
    }
  }

  // Now replace `<g filter="url(#filterId)">...<path fill="white" ...>`
  for (const [filterId, color] of Object.entries(filterColors)) {
    const groupRegex = new RegExp(`<g\\s+filter="url\\(#${filterId}\\)"\\s*>([\\s\\S]*?)<\\/g>`, 'g');
    
    content = content.replace(groupRegex, (match, innerContent) => {
      changed = true;
      let newInner = innerContent.replace(/fill="(?:white|#FAF9F6|#FFFFFF)"/gi, `fill="${color}"`);
      return `<g>${newInner}</g>`;
    });
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file} with colors:`, Object.values(filterColors));
    updated++;
  }
}

console.log(`Total fixed: ${updated}`);
