var React = require('react/addons');
var Backbone = require('backbone');
var RootNav = require('./Root/RootNav');
var PlayList = require('./Root/PlayList');

window.Global = {
  currentUser: new Backbone.Model({
    loggedIn: false
  })
};

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "root container-fluid"}, 
        React.createElement("div", {className: "col-md-3"}), 
        React.createElement("div", {className: "col-md-6"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-12"}, 
              React.createElement(RootNav, null)
            )
          ), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-12"}, 
              React.createElement(PlayList, null)
            )
          )
        ), 
        React.createElement("div", {className: "col-md-3"})
      )
    );
  },

  componentWillMount: function () {
    console.log("MOUNTED?");
    var token = PubSub.subscribe("TESTING", function(msg, data) {
      console.log(msg, data);
    });
  },

  getInitialState: function() {
    var state = {};

    return state;
  }
});
