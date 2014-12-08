var React = require('react/addons');
var Backbone = require('backbone');
var TOpMenu = require('./RootNav/TopMenu');
var Player = require('./RootNav/Player');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "rootNav row"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement(TopMenu, null), 
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
