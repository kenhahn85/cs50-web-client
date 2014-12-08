var React = require('react/addons');

module.exports = React.createClass({
  render: function() {
    // see: http://fortawesome.github.io/Font-Awesome/examples/
    return (
      <div className="RegisterModal modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">X</span><span className="sr-only">Close</span></button>
              <h4 className="modal-title">Register</h4>
            </div>
            <div className="modal-body">
              <form ref="registrationForm">
                <div className="input-group margin-bottom-sm">
                  <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
                  <input name="email" className="form-control" type="text" placeholder="Email" />
                </div>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                  <input name="username" className="form-control" type="text" placeholder="Username" />
                </div>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                  <input name="password" className="form-control" type="password" placeholder="Password" />
                </div>
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                  <input name="confirmPassword" className="form-control" type="password" placeholder="Confirm Password" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.openLoginModal}>Login</button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.attemptRegister}>Register</button>
            </div>
          </div>
        </div>
      </div>
    );
  },

  openLoginModal: function() {
    $('.RegisterModal').modal('hide');
    $('.LoginModal').modal('show');
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


    $.ajax({
      url: API_SERVER + "/register",
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
      .done(function(result) {
        $('.RegisterModal').modal('hide');
        Global.login(data)
      })
      .fail(function(err) {
        alert("Your registration failed. Either your username or your email may already be taken.");
      });
  }
});
