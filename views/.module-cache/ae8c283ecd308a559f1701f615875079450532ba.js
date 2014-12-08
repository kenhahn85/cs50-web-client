var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "commentList"}, 
        "Hello, world! I'm a comment list."
      )
    );
  }
});