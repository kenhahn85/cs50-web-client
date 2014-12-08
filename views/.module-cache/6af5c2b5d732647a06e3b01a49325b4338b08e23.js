var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "progress"}, 
        React.createElement("div", {class: "progress-bar progress-bar-success", role: "progressbar", 'aria-valuenow': "40", 'aria-valuemin': "0", 'aria-valuemax': "100", style: "width: 40%"}, 
          React.createElement("span", {class: "sr-only"}, "40% Complete (success)")
        )
      )
    );
  }
});
