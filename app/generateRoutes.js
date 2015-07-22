var fs = require('fs');
var _ = require('lodash');

var POST_RELATIVE_DIR = '/posts/';
var OUTPUT_NAME = __dirname + '/generatedRoutes.jsx';
var postDir = __dirname + POST_RELATIVE_DIR;

var postFiles = fs.readdirSync(postDir);

var posts = _.map(postFiles, function(postFilename, postIndex) {
  var postContents = fs.readFileSync(postDir + postFilename).toString();
  // return postContents
  var key = postFilename.replace(/[^a-zA-Z0-9]/g, '');

  var route = {
    path: '/' + key + '/',
    componentPath: '.' + POST_RELATIVE_DIR + postFilename,
    key: key,
  }

  return route;
})

// provides a map of <Route>s and import statements
function generateRoutes() {
  var Routes = _.reduce(
    _.map(posts, function(post) {
      return {
        route: "<Route path='" + post.path + "' handler={" + post.key + "} />",
        import: "import " + post.key + " from '" + post.componentPath + "';",
      }
    }),
    function(result, value, key) {
      result.route += value.route + "\n";
      result.import += value.import + "\n";
      return result;
    },
    {
      route: '',
      import: ''
    }
  );
  return Routes;
}
var routes = generateRoutes();

var file = 'var React = require("react");\n' +
  'var Route = require("react-router").Route;\n' +
  routes.import +
  'module.exports = (<Route>' + routes.route + '</Route>);';

fs.writeFileSync(OUTPUT_NAME, file, 'utf-8');

module.exports = _.map(posts, function(post) {
  return post.path;
})


