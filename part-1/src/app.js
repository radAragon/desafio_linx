const Koa = require('koa');
const Router = require('koa-router');
const products = require('./products');

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Health check: on';
});

router.use(products.routes());

app.use(router.routes());

if (require.main === module) {
  const port = 3000
  app.listen(port);
  console.info('API listening on', port);
}

module.exports = {
  app
};
