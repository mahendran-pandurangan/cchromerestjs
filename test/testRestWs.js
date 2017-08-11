var restCall = require('../lib/backEndUtils');
var logger = require('../lib/logger');
xlProvider = require('../lib/excel-provider.js');

//const mochaTimeOut = 90000;
var dataProvider;
describe('rest api suite', function () {
  it('rest api suite', function (done) {
    //this.timeout(mochaTimeOut);

    dataProvider = xlProvider.readExcelData('resources/datasheet/RestURLs.xlsx',
        'MC');

    //this.timeout(mochaTimeOut);
    // var dataProvider = require('../resources/json-output/MC-data.json');
    logger.info('In rest test');
    dataProvider.forEach(function (readData) {
      if (readData.url !== '' && readData.flag === 'Y') {
        try {
          var test = restCall.getRestWebServicesUtil(readData.url, 'GET',
              'content-type=application/json', '');
          logger.info(readData.url)
          logger.info(test.statusCode);
          logger.info(test.body);
        }
        catch (err) {
          logger.error('Error due to' + err);
        }
        done();
      }
    });
  });
})

