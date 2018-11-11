const chai = require('chai');
chai.use(require('chai-http'));
const server = require('../src/server');
const { SIGNATURE } = require('../src/config');
const { delProduct } = require('../src/products/handlers');

const { request, expect } = chai;


describe('products', function() {
  SIGNATURE.SECONDS_TO_EXPIRE = 1;
  const payload1 = [{"id": "123", "name": "mesa"}];
  let host;

  before(async () => {
    host = await server.run();
  });

  after(async () => {
    await delProduct(payload1[0].id);
    await server.disconnect();
  })

  describe('#GET', function() {
    it('should reply Ok', async function() {
      const resp = await request(host).get('/products');
      expect(resp.status).to.eql(200);
      console.log(resp.body);
    });

    it('should reply Not Found if given Id does not exists', async function() {
      const resp = await request(host).get('/products/missingId1');
      expect(resp.status).to.eql(404);
    });
  });

  describe('#POST', function() {
    it('should reply Ok to payload1', async function() {
      const resp = await request(host)
        .post('/products')
        .send(payload1);
      expect(resp.status).to.eql(200);

      const getResp = await request(host)
        .get(`/products/${payload1[0].id}`)
      expect(getResp.status).to.eql(200);
    });

    it('should reply Forbidden to payload1', async function() {
      const resp = await request(host)
        .post('/products')
        .send(payload1);
      expect(resp.status).to.eql(403);
    });

    it('should reply Ok to payload1 again after SECONDS_TO_EXPIRE', async function() {
      await new Promise(resolve => setTimeout(resolve, SIGNATURE.SECONDS_TO_EXPIRE * 1000));
      const resp = await request(host)
        .post('/products')
        .send(payload1);
      expect(resp.status).to.eql(200);
    });
  });
});
