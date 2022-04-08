const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  mongo: {
    db: 'mongodb://localhost/cocktail-builder',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '317216620482033',
    appSecret: '79db2d9130c87893af7e0b8981dba878',
  },
};