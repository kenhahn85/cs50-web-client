var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-sm-9 progress"},
          React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", 'aria-valuenow': "40", 'aria-valuemin': "0", 'aria-valuemax': "100", style: this.state.style})
        ), 
        React.createElement("div", {className: "col-sm-3"})
      )
    );
  },

  getInitialState: function() {
    return {
      style: {
        width: "40%",
        padding: 0
      }
    };
  }
});