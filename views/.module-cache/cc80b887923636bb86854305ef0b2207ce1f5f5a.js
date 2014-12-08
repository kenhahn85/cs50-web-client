var React = require('react/addon');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello world! I'm a comment form!"
      )
    );
  }
});