var React = require('react/addons');
var Root = require('./Components/Root');

module.exports = {
  render: function(){
    React.render(
      React.createElement(Root, null),
      document.getElementsByTagName('body')[0]
    )
  }
};