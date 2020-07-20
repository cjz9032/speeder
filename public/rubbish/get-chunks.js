const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const appStr = fs.readFileSync(path.join(__dirname, `/bee/mod/app.js`), { encoding: 'utf-8' });

const matchList = appStr.match(/n\.e\(\d+\)/g);
const resultIds = _.uniq(
  matchList.map((str) => {
    // n.e(32)
    return +str.match(/^n\.e\((\d+)\)$/)[1];
  })
).sort()


module.exports = resultIds;
