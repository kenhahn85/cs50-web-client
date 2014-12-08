var React = require('react/addons');
var Root = require('./Root');

module.exports = {
  render: function(){
    React.render(
      <Root />,
      document.getElementsByTagName('body')[0]
    )
  }
};