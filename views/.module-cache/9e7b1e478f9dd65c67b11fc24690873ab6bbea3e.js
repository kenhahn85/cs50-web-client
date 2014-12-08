var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function () {
    return (
      React.createElement("div", {id: "root"}, 
        React.createElement(TopNav, null)
      )
    );
  }
});
