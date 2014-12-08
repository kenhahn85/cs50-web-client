var React = require('react/addons');
var Backbone = require('backbone');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {class: "LoginModal modal fade"}, 
        React.createElement("div", {class: "modal-dialog"}, 
          React.createElement("div", {class: "modal-content"}, 
            React.createElement("div", {class: "modal-header"}, 
              React.createElement("button", {type: "button", class: "close", 'data-dismiss': "modal"}, React.createElement("span", {'aria-hidden': "true"}, "×"), React.createElement("span", {class: "sr-only"}, "Close")), 
              React.createElement("h4", {class: "modal-title"}, "Modal title")
            ), 
            React.createElement("div", {class: "modal-body"}, 
              React.createElement("p", null, "One fine body…")
            ), 
            React.createElement("div", {class: "modal-footer"}, 
              React.createElement("button", {type: "button", class: "btn btn-default", 'data-dismiss': "modal"}, "Close"), 
              React.createElement("button", {type: "button", class: "btn btn-primary"}, "Save changes")
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
