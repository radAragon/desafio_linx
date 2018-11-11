const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const products = require('./products');

const app = new Koa();
const router = new Router();

app.use(koaBody());

app.use(async (ctx, next) => {
  try {
    await next();
    console.log(ctx.url, '>', ctx.response.status)
  } catch (err) {
    console.error(ctx.url, '> Fail:', err);
  }
})

router.get('/', (ctx) => {
  ctx.body = 'Health check: on';
});

router.use(products.routes());

app.use(router.routes());

module.exports = {
  app,
};
