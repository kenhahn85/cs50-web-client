var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    render (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
        this.props.author
        ), 
        this.props.children
      )
    );
  }
});