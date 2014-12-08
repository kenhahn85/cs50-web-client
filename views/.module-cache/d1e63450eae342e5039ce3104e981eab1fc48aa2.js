var React = require('react/addons');
var Backbone = require('backbone');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "LoginModal row"}, 
        React.createElement("div", {className: "col-sm-12 textAlignRight"}, 
          React.createElement("div", {class: "input-group margin-bottom-sm"}, 
            React.createElement("span", {class: "input-group-addon"}, React.createElement("i", {class: "fa fa-envelope-o fa-fw"})), 
            React.createElement("input", {class: "form-control", type: "text", placeholder: "Email address"})
          ), 
          React.createElement("div", {class: "input-group"}, 
            React.createElement("span", {class: "input-group-addon"}, React.createElement("i", {class: "fa fa-key fa-fw"})), 
            React.createElement("input", {class: "form-control", type: "password", placeholder: "Password"})
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
