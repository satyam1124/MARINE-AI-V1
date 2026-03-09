const fs = require('fs');

const aranhaCode = fs.readFileSync('js/data/ref-books/aranha.js', 'utf8');
const libraryCode = fs.readFileSync('js/modules/ref-library.js', 'utf8');

const combined = `
  ${aranhaCode}
  global.REF_BOOKS = { 'ar': REF_BOOK_AR };
  ${libraryCode}
  const hits = refBookSearch('types of scavenging', 'ar', 4);
  console.log('Hits found:', hits.length);
  hits.forEach(h => console.log('Score:', h._score, 'Pages:', h.pages));
`;

fs.writeFileSync('temp.js', combined);
