const https = require('https');
const fs = require('fs');

const companies = [
  { name: 'anglo.png', domain: 'angloeastern.com' },
  { name: 'msc.png', domain: 'msc.com' },
  { name: 'maersk.png', domain: 'maersk.com' },
  { name: 'bsm.png', domain: 'bs-shipmanagement.com' },
  { name: 'synergy.png', domain: 'synergymarinegroup.com' },
  { name: 'vships.png', domain: 'vgrouplimited.com' },
  { name: 'thome.png', domain: 'osmthome.com' },
  { name: 'wallem.png', domain: 'wallem.com' },
  { name: 'shell.png', domain: 'shell.com' },
  { name: 'torm.png', domain: 'torm.com' },
  { name: 'scorpio.png', domain: 'scorpiogroup.net' },
  { name: 'kline.png', domain: 'kline.co.jp' },
  { name: 'nyk.png', domain: 'nyk.com' },
  { name: 'mol.png', domain: 'mol.co.jp' },
  { name: 'andromeda.png', domain: 'andromeda-shipping.com' },
  { name: 'eastaway.png', domain: 'eastaway.com' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, function(response) {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
         download(response.headers.location, dest).then(resolve).catch(reject);
         return;
      }
      if (response.statusCode !== 200) {
        reject(new Error('Failed (' + response.statusCode + ')'));
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
  for (const c of companies) {
    let success = false;
    try {
      await download('https://logo.clearbit.com/' + c.domain, 'assets/logos/' + c.name);
      let stats = fs.statSync('assets/logos/' + c.name);
      if (stats.size > 100) { success = true; console.log('Downloaded ' + c.name + ' from Clearbit'); }
    } catch(e) {}
    
    if (!success) {
      try {
        await download('https://icon.horse/icon/' + c.domain, 'assets/logos/' + c.name);
        console.log('Downloaded ' + c.name + ' from IconHorse');
      } catch(e) {
        console.log('Failed ' + c.name);
      }
    }
  }
}

main();
