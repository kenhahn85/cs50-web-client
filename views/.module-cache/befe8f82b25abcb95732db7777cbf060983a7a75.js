var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    // see: http://fortawesome.github.io/Font-Awesome/examples/
    return (
      React.createElement("div", {className: "LoginModal modal fade"}, 
        React.createElement("div", {className: "modal-dialog"}, 
          React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
              React.createElement("button", {type: "button", className: "close", 'data-dismiss': "modal"}, React.createElement("span", {'aria-hidden': "true"}, "X"), React.createElement("span", {className: "sr-only"}, "Close")), 
              React.createElement("h4", {className: "modal-title"}, "Login")
            ), 
            React.createElement("div", {className: "modal-body"}, 
              React.createElement("form", {ref: "loginForm"}, 
                React.createElement("div", {className: "input-group margin-bottom-sm"}, 
                  React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "fa fa-user fa-fw"})), 
                  React.createElement("input", {name: "username", className: "form-control", type: "text", placeholder: "Username"})
                ), 
                React.createElement("div", {className: "input-group"}, 
                  React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "fa fa-key fa-fw"})), 
                  React.createElement("input", {name: "password", className: "form-control", type: "password", placeholder: "Password"})
                )
              )
            ), 
            React.createElement("div", {className: "modal-footer"}, 
              React.createElement("button", {type: "button", className: "btn btn-default", 'data-dismiss': "modal"}, "Cancel"), 
              React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.attemptLogin}, "Login")
            )
          )
        )
      )
    );
  },

  attemptLogin: function(e) {
    var data = {};

    // http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
    $(this.refs.loginForm.getDOMNode())
      .serializeArray()
      .forEach(function(x){ data[x.name] = x.value;});

    Global.login()
      .then(function(result) {
        // successfully logged in
        PubSub.publishSync("USER.LOGGED_IN", result);
        $('.LoginForm').modal('hide');
      })
      .fail(function(err) {
        alert("Your login failed. Double check your credentials.");
      });
  }
});
