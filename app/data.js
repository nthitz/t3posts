var _ = require('lodash');

var fs = require('fs');

var postDir = __dirname + '/posts/';
var posts = fs.readdirSync(postDir);

var generateRoutes = require('./generateRoutes.js');

var defaultRoutes = [
  '/',
  '/about',
];

var routes = defaultRoutes.concat(_.map(generateRoutes, function(route) {
  return route.path;
}));

module.exports = {
  title: 'nt3',
  routes: routes,
}

