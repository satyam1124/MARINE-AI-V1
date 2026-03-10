const https = require('https');
const fs = require('fs');

const logos = [
  { name: 'anglo.png', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1yE36N30_91854n0vOItUeI0Gj9Xp_N9P5w&s' },
  { name: 'msc.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/MSC_Crociere_logo.svg/1200px-MSC_Crociere_logo.svg.png' },
  { name: 'maersk.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Maersk_Group_Logo.svg/2048px-Maersk_Group_Logo.svg.png' },
  { name: 'bsm.png', url: 'https://companieslogo.com/downloads/assets/webp/dir_95/Bernhard_Schulte_Shipmanagement_BSM-Logo.webp' },
  { name: 'synergy.png', url: 'https://www.synergymarinegroup.com/wp-content/uploads/2022/10/Synergy-Marine-Group-Logo.png' },
  { name: 'vships.png', url: 'https://vgrouplimited.com/wp-content/uploads/2021/08/V.Group-Logo-1.png' },
  { name: 'thome.png', url: 'https://osmthome.com/wp-content/uploads/2023/10/OSM-Thome-Logo-RGB-Positive.png' },
  { name: 'wallem.png', url: 'https://www.wallem.com/wp-content/uploads/2024/02/wallem-logo.png' },
  { name: 'shell.png', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Shell_logo.svg/1200px-Shell_logo.svg.png' },
  { name: 'torm.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/TORM_Logo.svg/1200px-TORM_Logo.svg.png' },
  { name: 'scorpio.png', url: 'https://www.scorpiogroup.net/wp-content/uploads/2019/07/Scorpio-Group-Logo.png' },
  { name: 'kline.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kawasaki_Kisen_Kaisha_logo.svg/1200px-Kawasaki_Kisen_Kaisha_logo.svg.png' },
  { name: 'nyk.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Nyk.svg/2048px-Nyk.svg.png' },
  { name: 'mol.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mitsui_OSK_Lines_logo.svg/2560px-Mitsui_OSK_Lines_logo.svg.png' },
  { name: 'andromeda.png', url: 'https://www.andromeda-shipping.com/wp-content/uploads/2021/04/andromeda-logo.png' },
  { name: 'eastaway.png', url: 'https://www.eastaway.com/wp-content/uploads/2021/05/Eastaway-Logo.png' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36' } }, function(response) {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
         download(response.headers.location, dest).then(resolve).catch(reject);
         return;
      }
      if (response.statusCode !== 200) {
        reject(new Error('Failed to get ' + url + ' (' + response.statusCode + ')'));
        return;
      }
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve);
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const logo of logos) {
    try {
      await download(logo.url, 'assets/logos/' + logo.name);
      console.log('Downloaded ' + logo.name);
    } catch (e) {
      console.error('Error downloading ' + logo.name + ': ' + e.message);
    }
  }
}

main();
