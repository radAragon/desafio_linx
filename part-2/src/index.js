const fs = require('fs');
const { TIMEOUT_SECONDS } = require('./config');
const { parseMap } = require('./parser');
const { handleProductEntry, getProductStack } = require('./productHandler');
const { checkUrl } = require('./urlChecker');


const PRODUCT_STACK = [];

async function aggregator(filename) {
  const inputStream = parseMap(filename, (productEntry) =>
    handleProductEntry(productEntry, PRODUCT_STACK)
    .then(async (usefulEntry) => {
      if (usefulEntry) {
        return checkUrl(usefulEntry);
      }
      // else ignore repeated Product
    })
    .then(async (validEntry) => {
      if (validEntry) {
        let outputProduct = PRODUCT_STACK.find(stackedProduct =>
          (stackedProduct.productId === validEntry.productId));

        if (!outputProduct) {
          outputProduct = {
            productId: validEntry.productId,
            images: [validEntry.image],
          };
          PRODUCT_STACK.push(outputProduct);
          return;
        }

        if (outputProduct.images.length < 3) {
          outputProduct.images.push(validEntry.image);
        }
      }
      // else ignore failed image
    }));

  await new Promise((resolve, reject) => {
    inputStream.on('error', reject);
    inputStream.on('close', resolve);
  });

  console.log('OUTPUT =>', JSON.stringify(PRODUCT_STACK, null, 2));
}

if (require.main === module) {
  aggregator(process.argv[2]);
}

module.exports = {
  aggregator,
};
