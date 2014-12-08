var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    PubSub
  },

  render: function() {
    return (
      React.createElement("div", {id: "root"}, 
        React.createElement(RootNav, null), 
        React.createElement(PlayList, null)
      )
    );
  }
});
