const fs = require('fs');
const chai = require('chai');
const nock = require('nock');
const { aggregator } = require('../src/index');


const { expect } = chai;

describe('aggregator', function() {
  it('should parse inputfile (all success) and print output', async function() {
    const mockImages = nock('http://www.xxx.com')
      .get(/.+/)
      .times(7)
      .reply(200);

    await aggregator('test/test_input.gz');

    expect(mockImages.isDone()).to.eql(true);
  });
});
