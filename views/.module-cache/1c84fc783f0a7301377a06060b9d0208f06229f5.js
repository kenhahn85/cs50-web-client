var react = require('react/addons');

module.exports = react.createclass({
  render: function() {
    return (
      React.createElement("div", {classname: "comment"}, 
        React.createElement("h2", {classname: "commentauthor"}, 
        this.props.author
        ), 
        this.props.children
      )
    );
  }
});