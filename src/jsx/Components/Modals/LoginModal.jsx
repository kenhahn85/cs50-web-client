var React = require('react/addons');
var _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    // see: http://fortawesome.github.io/Font-Awesome/examples/
    return (
      <div className="LoginModal modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">X</span><span className="sr-only">Close</span></button>
              <h4 className="modal-title">Login</h4>
            </div>
            <div className="modal-body">
              <form ref="loginForm">
                <div className="input-group margin-bottom-sm">
                  <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                  <input name="username" className="form-control" type="text" placeholder="Username" />
                </div>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                  <input name="password" className="form-control" type="password" placeholder="Password" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.openRegistrationModal}>Register</button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.attemptLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  },

  openRegistrationModal: function() {
    $('.LoginModal').modal('hide');
    $('.RegisterModal').modal('show');
  },

  attemptLogin: function(e) {
    var data = {};

    // http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
    $(this.refs.loginForm.getDOMNode())
      .serializeArray()
      .forEach(function(x){ data[x.name] = x.value;});

    Global.login(data)
      .fail(function(err) {
        alert("Your login failed. Double check your credentials.");
      });
  }
});
