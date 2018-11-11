const mongoose = require('mongoose');

let isConnected = false;


async function connect() {
  if (!isConnected) {
    try {
      await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/myapp`, {
        useNewUrlParser: true
      });
      isConnected = true;
      console.log('<DB> Connected');
    } catch(err) {
      console.error('<DB> Connection error:', err);
      throw err;
    }
  }
}

async function disconnect() {
  if (isConnected) {
    try {
      await mongoose.connection.close();
      isConnected = false;
      console.log('<DB> Disconnected');
    } catch(err) {
      console.error(err);
    }
  }
}

module.exports = {
  connect,
  disconnect,
};
