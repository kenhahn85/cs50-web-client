var React = require('react/addons');
var Backbone = require('backbone');
var Menu = require('./RootNav/Menu');
var Player = require('./RootNav/Player');

module.exports = React.createclassName({
  render: function() {
    return (
      React.createElement("div", {id: "root"}, 
        React.createElement(Menu, null), 
        React.createElement(Player, null)
      )
      );
  },

  componentWillMount: function () {
    console.log("MOUNTED?");
    var token = PubSub.subscribe("TESTING", function(msg, data) {
      console.log(msg, data);
    });
  }
});
