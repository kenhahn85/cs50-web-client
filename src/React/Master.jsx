var React = require('react/addons');
var Root = require('./Components/Root');

module.exports = {
  render: function(){
    //testing
    React.render(
      <Root />,
      document.getElementsByTagName('body')[0]
    )
  }
};