const http = require('http');
http.get('http://localhost:3000/about', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/href="(\/_next\/static\/css\/[^"]+)"/);
    if (match) {
      http.get('http://localhost:3000' + match[1], (cssRes) => {
        let cssData = '';
        cssRes.on('data', chunk => cssData += chunk);
        cssRes.on('end', () => {
          const bgCream = cssData.match(/\.bg-cream\b[^{]*\{[^}]+\}/g);
          console.log('bg-cream:', bgCream);
          const liveBg = cssData.match(/\.live-bg\b[^{]*\{[^}]+\}/g);
          console.log('live-bg count:', liveBg ? liveBg.length : 0);
          const cards = cssData.match(/\.card\b[^{]*\{[^}]+\}/g);
          console.log('card:', cards);
        });
      });
    }
  });
});
