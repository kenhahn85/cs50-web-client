module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        "Hello, world, I'm a comment box!"
      )
    );
  }
});
