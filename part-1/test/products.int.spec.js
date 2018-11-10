const chai = require('chai');
chai.use(require('chai-http'));
const { app } = require('../src/app');

const { request, expect } = chai;


describe('products', function() {
  describe('#GET', function() {
    it('should reply ok', async function() {
      const resp = await request(app.listen()).get('/products');
      expect(resp.status).to.eql(200);
      expect(resp.body).to.eql({status: 'alive'});
    });
  });
});
