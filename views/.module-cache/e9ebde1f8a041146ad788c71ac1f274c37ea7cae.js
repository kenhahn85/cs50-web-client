var CommentBox = React.createClass({displayName: 'CommentBox',

});

exports.render = function() {
  React.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
  );
}