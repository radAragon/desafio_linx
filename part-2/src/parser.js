const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');
const { handleProduct, getProductStack } = require('./productHandler');
const { writeProductIndex } = require('./writer');

const gunzip = zlib.createGunzip();
const rstream = fs.createReadStream(process.argv[2] || 'input-dump.gz');

const rl = readline.createInterface({
  input: rstream.pipe(gunzip),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  const startOfJson = line.indexOf('{');
  const endOfJson = line.lastIndexOf('}') + 1;

  if ((startOfJson >= 0) && endOfJson) {
    const validString = line.substring(startOfJson, endOfJson);
    const productEntry = JSON.parse(validString);
    handleProduct(productEntry);
  }
});

rl.on('close', () => {
  writeProductIndex(getProductStack(), process.argv[3]);
});
