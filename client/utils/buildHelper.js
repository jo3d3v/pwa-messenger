var path = require('path');

var addRoot = path.join.bind(path, path.resolve(__dirname, '..'));

exports.addRoot = addRoot;
exports.isAot = (process.env.npm_lifecycle_event || '').includes('aot');
exports.isWatch = (process.env.npm_lifecycle_event || '').includes('watch');