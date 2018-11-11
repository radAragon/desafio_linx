const Promise = require('bluebird');
const moment = require('moment');
const crypto = require('crypto');
const { SIGNATURE } = require('../config');
const { Signature, Product } = require('../lib/models');

const SALT_ROUNDS = 8;


async function checkSignature(payload) {
  const hash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  const match = await Signature.findOne({ hash }).exec();

  if (match && moment().isBefore(match.expireAt)) {
    console.log('Signature already found expireAt:', match.expireAt);
    return false;
  }

  await Signature.updateOne({ hash }, {
    expireAt: moment().add(SIGNATURE.SECONDS_TO_EXPIRE, 'seconds').valueOf()
  }, { upsert: true });
  console.log('Signature created:', hash);

  return true;
}

function listProducts() {
  return Product.find().exec();
}

function getProduct(id) {
  return Product.findOne({ id }).exec();
}

function saveProducts(products) {
  return Promise.map(products, product =>
    Product.updateOne({ id: product.id }, product, { upsert: true }),
    { concurrency: 10 });
}

function delProduct(id) {
  return Product.findOneAndDelete({ id }).exec();
}

module.exports = {
  checkSignature,
  saveProducts,
  listProducts,
  getProduct,
  delProduct,
};
