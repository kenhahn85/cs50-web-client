var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    // see: http://fortawesome.github.io/Font-Awesome/examples/
    return (
      React.createElement("div", {className: "RegisterModal modal fade"}, 
        React.createElement("div", {className: "modal-dialog"}, 
          React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
              React.createElement("button", {type: "button", className: "close", 'data-dismiss': "modal"}, React.createElement("span", {'aria-hidden': "true"}, "X"), React.createElement("span", {className: "sr-only"}, "Close")), 
              React.createElement("h4", {className: "modal-title"}, "Register")
            ), 
            React.createElement("div", {className: "modal-body"}, 
              React.createElement("form", {ref: "registrationForm"}, 
                React.createElement("div", {className: "input-group margin-bottom-sm"}, 
                  React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "fa fa-envelope-o fa-fw"})), 
                  React.createElement("input", {name: "email", className: "form-control", type: "text", placeholder: "Email"})
                ), 
                React.createElement("div", {className: "input-group"}, 
                  React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "fa fa-user fa-fw"})), 
                  React.createElement("input", {name: "username", className: "form-control", type: "text", placeholder: "Username"})
                ), 
                React.createElement("div", {className: "input-group"}, 
                  React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "fa fa-key fa-fw"})), 
                  React.createElement("input", {name: "password", className: "form-control", type: "password", placeholder: "Password"})
                ), 
                React.createElement("div", {className: "input-group"}, 
                  React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "fa fa-key fa-fw"})), 
                  React.createElement("input", {name: "confirmPassword", className: "form-control", type: "password", placeholder: "Confirm Password"})
                )
              )
            ), 
            React.createElement("div", {className: "modal-footer"}, 
              React.createElement("button", {type: "button", className: "btn btn-default", 'data-dismiss': "modal"}, "Cancel"), 
              React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.attemptRegister}, "Register")
            )
          )
        )
      )
    );
  },

  attemptRegister: function(e) {
    var data = {};

    // http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
    $(this.refs.registrationForm.getDOMNode())
      .serializeArray()
      .forEach(function(x){ data[x.name] = x.value;});

    if (data.password !== data.confirmPassword) {
      alert("Your password and confirmation password do not match!");
      return;
    }

    delete data.confirmPassword;
    console.log('data', data);

    $.ajax({
      url: API_SERVER + "/register",
      method: 'post',
      contentType: 'application/json',
      data: data
    })
      .done(function(result) {
        // successfully registered
        console.log("successfully registered!")
        PubSub.publishSync("USER.LOGGED_IN", result);
        $('.LoginForm').modal('hide');
      })
      .fail(function(err) {
        alert("Your login failed. Double check your credentials.");
      });
  }
});
