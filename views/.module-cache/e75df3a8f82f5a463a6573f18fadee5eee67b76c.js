var React = require('react/addons');

exports.render = function () {
  React.render(
    React.createElement("h1", null, "Hello, world!"),
    document.getElementsByTagName('body')[0]
  );
}