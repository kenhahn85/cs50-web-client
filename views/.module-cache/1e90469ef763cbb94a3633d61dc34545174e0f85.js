var React = require('react/addons');
var Backbone = require('backbone');
var RootNav = require('./Root/RootNav');
var PlayList = require('./Root/PlayList');

window.Global = {
  currentUser: new Backbone.Model({
    loggedIn: false
  })
};

module.exports = React.createclassName({
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
      React.createElement("div", {id: "root"}, 
        React.createElement("div", {className: "col-sm-12"},
          React.createElement(RootNav, null)
        ), 
        React.createElement("div", {className: "col-sm-12"},
          React.createElement(PlayList, null)
        )
      )
    );
  }
});
