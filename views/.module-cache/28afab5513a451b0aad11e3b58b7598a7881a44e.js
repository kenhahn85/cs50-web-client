var React = require('react/addons');

exports.module = React.createClass({displayName: 'module',
  render: function() {
    return (
      React.createElement("div", {className: "commentList"}, 
        "Hello, world! I'm a comment list."
      )
    );
  }
});