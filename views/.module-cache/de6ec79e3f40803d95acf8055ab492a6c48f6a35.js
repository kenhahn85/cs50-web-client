var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("form", {className: "commentForm"}, 
        React.createElement("input", {type: "text", placeholder: "Your name"}), 
        React.createElement("input", {type: "text", placeholder: "Say something..."}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});