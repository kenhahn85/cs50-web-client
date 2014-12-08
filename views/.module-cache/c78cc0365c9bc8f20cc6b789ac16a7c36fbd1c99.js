var React = require('react/addons');
var Backbone = require('backbone');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "LoginModal modal fade"}, 
        React.createElement("div", {className: "modal-dialog"}, 
          React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
              React.createElement("button", {type: "button", className: "close", 'data-dismiss': "modal"}, React.createElement("span", {'aria-hidden': "true"}, "Close"), React.createElement("span", {className: "sr-only"}, "Close")), 
              React.createElement("h4", {className: "modal-title"}, "Modal title")
            ), 
            React.createElement("div", {className: "modal-body"}, 
              React.createElement("p", null, "One fine body")
            ), 
            React.createElement("div", {className: "modal-footer"}, 
              React.createElement("button", {type: "button", className: "btn btn-default", 'data-dismiss': "modal"}, "Close"), 
              React.createElement("button", {type: "button", className: "btn btn-primary"}, "Login")
            )
          )
        )
      )
    );
  },

  openRegisterModal: function() {

  },

  openLoginModal: function() {

  },

  componentWillMount: function () {
    console.log("MOUNTED?");
    var token = PubSub.subscribe("TESTING", function(msg, data) {
      console.log(msg, data);
    });
  }
});
