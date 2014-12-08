var React = require('react/addons');
var Comment = require('./Comment');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        React.createElement(Comment, {author: comment.author}, 
          comment.text
        )
      );
    });
    return (
      React.createElement("div", {className: "commentList"}, 
      commentNodes
      )
    );
  }
});