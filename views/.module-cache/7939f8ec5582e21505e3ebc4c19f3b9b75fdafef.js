var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');
var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {data: []};
  },

  componentWillMount: function () {
    console.log("MOUNTED?");
    var token = PubSub.subscribe("TESTING", function(msg, data) {
      console.log(msg, data);
    });
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.setState({data: this.props.initialData});
    }.bind(this), 3000);
  },

  handleCommentSubmit: function(comment) {
    this.state.data.push(comment);
    this.setState();
    PubSub.publishSync("TESTING", "Hey babe", {some:12232});
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
