var React = require('react/addons');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="TopMenu row">
        <div className="col-sm-12 textAlignRight">
          <div className="hide" ref="loggedOut">
            <span>
              <a onClick={this.openRegisterModal}>Register</a>
            </span>
            <span>
              <a onClick={this.openLoginModal}>Login</a>
            </span>
          </div>

          <div className="hide" ref="loggedIn">
            <span ref="username">
              Welcome!
            </span>
            <span>
              <a onClick={this.attemptLogout}>Logout</a>
            </span>
          </div>
        </div>
      </div>
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
      this.setState({currentUser: user.username});
      this.refs.username.getDOMNode().innerHTML = "Welcome " + user.username + "!";
      $(this.refs.loggedOut.getDOMNode()).addClass('hide');
      $(this.refs.loggedIn.getDOMNode()).removeClass('hide');
    }.bind(this));

    PubSub.subscribe("USER.LOGGED_OUT", function(msg, user) {
      this.refs.username.getDOMNode().innerHTML = "Welcome!";
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
