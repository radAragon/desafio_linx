const http = require('http');


function checkUrl(productEntry) {
  const { image } = productEntry;

  return new Promise((resolve, reject) => {
    const getImage = http.get(image, (res) => {
      const { statusCode } = res;

      if (statusCode === 200) {
        resolve(productEntry);
      }
    });

    getImage.on('error', (err) => resolve());
  });
}

module.exports = {
  checkUrl,
};
