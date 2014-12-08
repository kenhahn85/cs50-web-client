var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var React = require('react/addons');
var CommentBox = require('./../templates/CommentBox');

module.exports = {
  render: function(){
    var comments = [
      {author: "Ken Hahn", text: "Sup wid dis?"},
      {author: "Brian Hahn", text: "U know what i'm saying?"}
    ];
    this.render();
    React.render(
      React.createElement(CommentBox, {data: comments}),
      document.getElementsByTagName('body')[0]
    )
  }
};