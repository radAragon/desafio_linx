const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');


function parseMap(filename, mapFunction) {
  const gunzip = zlib.createGunzip();
  const rstream = fs.createReadStream(filename);

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
      mapFunction(productEntry);
    }
  });

  return rl;
}

module.exports = {
  parseMap,
};
