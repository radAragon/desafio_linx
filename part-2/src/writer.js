const fs = require('fs');


async function writeProductIndex(productStack, filename='output-dump') {
  const output = fs.createWriteStream(filename);

  productStack.forEach((product) => {
    output.write(`${JSON.stringify(product)}\n`);
  });

  output.end();
}

module.exports = {
  writeProductIndex,
};
