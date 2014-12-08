var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "TopMenu row"}, 
        React.createElement("div", {className: "col-sm-12 textAlignRight"}, 
          React.createElement("div", {className: "hide", ref: "loggedOut"}, 
            React.createElement("span", null, 
              React.createElement("a", {onClick: this.openRegisterModal}, "Register")
            ), 
            React.createElement("span", null, 
              React.createElement("a", {onClick: this.openLoginModal}, "Login")
            )
          ), 

          React.createElement("div", {className: "hide", ref: "loggedIn"}, 
            React.createElement("span", null, 
              "Welcome ", this.state.currentUser, "!"
            ), 
            React.createElement("span", null, 
              React.createElement("a", {onClick: this.attemptLogout}, "Logout")
            )
          )
        )
      )
      );
  },

  getInitialState: function() {
    return {
      currentUser: "Guest"
    };
  },

  componentWillMount: function() {
    Global.checkIfLoggedIn();

    PubSub.subscribe("USER.LOGGED_IN", function(msg, user) {
      console.log("user", user);
      this.setState({currentUser: user.get('username')});
      $(this.refs.loggedOut.getDOMNode()).addClass('hide');
      $(this.refs.loggedIn.getDOMNode()).removeClass('hide');
    }.bind(this));

    PubSub.subscribe("USER.LOGGED_OUT", function(msg, user) {
      console.log('logged out!');
      $(this.refs.loggedIn.getDOMNode()).addClass('hide');
      $(this.refs.loggedOut.getDOMNode()).removeClass('hide');
    }.bind(this));
  },

  openLoginModal: function() {
    $('.LoginModal').modal('show');
  },

  openRegisterModal: function() {
    $('.RegisterModal').modal('show');
  },

  attemptLogout: function() {
    Global.logout();
  }
});
