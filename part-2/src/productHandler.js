async function handleProductEntry(productEntry, productStack) {
  const { productId, image } = productEntry;

  let outputProduct = productStack.find(stackedProduct =>
    (stackedProduct.productId === productId));

  if (outputProduct &&
      ((outputProduct.images.length >= 3) ||
       (outputProduct.images.includes(image)))) {
    // bypass
    return;
  }

  return productEntry;
}

module.exports = {
  handleProductEntry,
};
