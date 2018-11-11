const mongoose = require('mongoose');


const signatureSchema = new mongoose.Schema({
  hash: {
    type: 'string',
    unique: true,
    required: true,
  },
  expireAt: { type: Date }
});

signatureSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });
const Signature = mongoose.model('Signature', signatureSchema);


const productSchema = new mongoose.Schema({
  id: {
    type: 'string',
    unique: true,
    required: true,
  },
  name: 'string',
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Signature,
  Product,
}