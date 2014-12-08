var $ = require('jquery');
var React = require('react/addons');
var Root = require('./Root');

module.exports = {
  render: function(){
    var comments = [
      {author: "Ken Hahn", text: "Sup wid dis?"},
      {author: "Brian Hahn", text: "U know what i'm saying?"}
    ];
    React.render(
      React.createElement(Root, null),
      document.getElementsByTagName('body')[0]
    )
  },

  componentWillMount: function() {
    console.log("COMPONENT WILL MOUNT");
  }
};