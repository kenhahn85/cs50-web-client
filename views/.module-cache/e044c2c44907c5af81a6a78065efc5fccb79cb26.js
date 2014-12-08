var React = require('react/addons');
var Backbone = require('backbone');

module.exports = React.createClass({displayName: 'exports',
  componentWillMount: function () {
    console.log("MOUNTED?");
    var token = PubSub.subscribe("TESTING", function(msg, data) {
      console.log(msg, data);
    });
  },

  getInitialState: function() {
    var state = {};

    return state;
  },

  render: function() {
    return (
      React.createElement("div", {class: "row"}, 
        React.createElement("div", {class: "col-sm-12"}, "Root Body")
      )
      );
  }
});
