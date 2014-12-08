var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');
var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.props.data = this.props.initialData;
    }.bind(this));
  },

  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.props.data}), 
        React.createElement(CommentForm, null)
      )
    );
  }
});
