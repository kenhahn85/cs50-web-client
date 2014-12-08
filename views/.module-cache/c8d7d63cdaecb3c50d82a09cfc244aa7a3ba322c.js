var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');
var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.setState({data: this.props.initialData});
    }.bind(this), 3000);
  },

  handleCommentSubmit: function(comment) {
    
  },

  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement("br", null), 
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
      )
    );
  }
});
