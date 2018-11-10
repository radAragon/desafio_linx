const Router = require('koa-router');
const router = new Router();

router.get('/products', (ctx) => {
  ctx.body = {status: 'alive'};
});

router.post('/products', async (ctx) => {
  return await Promise.resolve();
});

module.exports = router;
