var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  componentWillMount: function () {
    var token = PubSub.subscribe("TESTING", function() {
      console.log("OHAI");
    });
  },

  getInitialState: function() {
    var state = {
      loggedIn: null
    };

    return state;
  },

  render: function() {
    return (
      React.createElement("div", {id: "root"}, 
        React.createElement(RootNav, null), 
        React.createElement(PlayList, null)
      )
    );
  }
});