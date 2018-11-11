const db = require('./lib/db');
const { app } = require('./app');

const PORT = 3000;


async function run() {
  await db.connect();

  const server = app.listen(PORT);
  console.log('API listening on', PORT);

  return server;
}

if (require.main === module) {
  run();
}

module.exports = {
  run,
  disconnect: db.disconnect
};
