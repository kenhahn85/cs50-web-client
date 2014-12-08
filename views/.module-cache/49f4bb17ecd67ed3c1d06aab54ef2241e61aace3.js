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
    var state = {
      currentUser: new Backbone.Model({
        loggedIn: false
      })
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
