var React = require('react/addons');
var TopMenu = require('./RootNav/TopMenu');
var Player = require('./RootNav/Player');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="rootNav row">
        <div className="col-sm-12">
          <TopMenu />
          <Player />
        </div>
      </div>
      );
  },

  componentWillMount: function () {
    var token = PubSub.subscribe("TESTING", function(msg, data) {
      console.log(msg, data);
    });
  }
});
