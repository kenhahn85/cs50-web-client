var React = require('react/addons');
var Backbone = require('backbone');
var Menu = require('./RootNav/Menu');
var Player = require('./RootNav/Player');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "rootNav row"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement(Menu, null), 
          React.createElement(Player, null)
        )
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
