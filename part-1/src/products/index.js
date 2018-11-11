const Router = require('koa-router');
const { checkSignature, saveProducts, getProduct, listProducts } = require('./handlers');

const router = new Router();


router.get('/products', async (ctx) => {
  const products = await listProducts();
  ctx.body = [...products];
});

router.get('/products/:id', async (ctx) => {
  const { id } = ctx.params;
  const product = await getProduct(id)

  if (!product) {
    ctx.status = 404;
    return;
  }

  ctx.body = product;
})

router.post('/products', async (ctx) => {
  const payload = ctx.request.body;

  if (!await checkSignature(payload)) {
    ctx.status = 403;
    return;
  }

  await saveProducts(payload);
  ctx.status = 200;
});

module.exports = router;
