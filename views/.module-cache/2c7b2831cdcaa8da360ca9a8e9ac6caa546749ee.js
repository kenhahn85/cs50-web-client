var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {

  },

  render: function() {
    return (
      React.createElement("div", {id: "root"}, 
        React.createElement(TopNav, null), 
        React.createElement(Body, null)
      )
    );
  }
});
