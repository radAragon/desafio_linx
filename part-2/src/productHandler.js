const http = require('http');

const productStack = [];


function handleProduct(productEntry) {
  const { productId, image } = productEntry;

  let parsedProduct = productStack.find(stackedProduct =>
    (stackedProduct.productId === productId));

  console.log('=>', parsedProduct);

  if (parsedProduct &&
      ((parsedProduct.images.length >= 3) ||
       (parsedProduct.images.includes(image)))) {
    // bypass
    return;
  } else {
    parsedProduct = {
      productId,
      images: [],
    };
    productStack.push(parsedProduct);
  }

  http.get(image, (res) => {
    const { statusCode } = res;

    if (statusCode === 200) {
      parsedProduct.images.push(image);
    }
  });
}

function getProductStack() {
  return productStack;
}

module.exports = {
  handleProduct,
  getProductStack,
};
