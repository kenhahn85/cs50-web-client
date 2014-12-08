var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  componentWillMount: function () {
    var token = PubSub.subscribe("TESTING", function(msg, data) {
    });
  },

  render: function() {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-sm-12"}, "Root Body")
      )
      );
  }
});
