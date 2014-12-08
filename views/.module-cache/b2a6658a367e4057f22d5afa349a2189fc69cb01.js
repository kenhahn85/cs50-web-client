var React = require('react/addons');
var Backbone = require('backbone');
var RootNav = require('./Root/RootNav');
var PlayList = require('./Root/PlayList');
var LoginModal = require('./Modals/LoginModal');
var RegisterModal = require('./Modals/RegisterModal');

window.Global = {
  currentUser: new Backbone.Model({
    loggedIn: false
  }),
  login: function(data) {
    return $.ajax({
      url: API_SERVER + "/login",
      method: 'post',
      contentType: 'application/json',
      data: data
    });
  }
};

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "root container-fluid"}, 
        React.createElement("div", {className: "col-sm-3"}), 
        React.createElement("div", {className: "col-sm-6"}, 
          React.createElement("div", {className: "row content"}, 
            React.createElement("div", {className: "col-sm-12"}, 
              React.createElement(RootNav, null)
            )
          ), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-sm-12"}, 
              React.createElement(PlayList, null)
            )
          )
        ), 
        React.createElement("div", {className: "col-sm-3"}), 
        React.createElement(LoginModal, null), 
        React.createElement(RegisterModal, null)
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
