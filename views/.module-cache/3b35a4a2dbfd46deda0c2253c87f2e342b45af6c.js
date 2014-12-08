var React = require('react/addons');
var Backbone = require('backbone');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "TopMenu row"}, 
        React.createElement("div", {className: "col-sm-12 textAlignRight"}, 
          React.createElement("span", null, 
            React.createElement("a", {onClick: this.openRegisterModal}, "Register")
          ), 
          React.createElement("span", null, 
            React.createElement("a", {onClick: this.openLoginModal}, "Login")
          )
        )
      )
      );
  },

  openRegisterModal: function() {
    console.log("openRegisterModal clicked");
    $('.LoginModal').modal('show');
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
