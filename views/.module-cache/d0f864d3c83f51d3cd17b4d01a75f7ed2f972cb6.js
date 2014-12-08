var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var React = require('react/addons');
var CommentBox = require('./../templates/CommentBox');

module.exports = Backbone.View.extend({
  initialize: function(){
    this.set('comments', [
      {author: "Ken Hahn", text: "Sup wid dis?"},
      {author: "Brian Hahn", text: "U know what i'm saying?"}
    ]);
    this.render();
  },

  render: function(){
    console.log("COMMENT BOX", CommentBox);
    React.render(
      React.createElement(CommentBox, {data: this.get('comments')}),
      document.getElementsByTagName('body')[0]
    )
  }
});