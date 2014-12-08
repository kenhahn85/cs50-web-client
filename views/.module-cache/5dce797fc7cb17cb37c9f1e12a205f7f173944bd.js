var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-sm-3"}, 
          React.createElement("i", {ref: "volumeIcon", className: "fa fa-volume-up"})
        ), 
        React.createElement("div", {className: "col-sm-9"}, 
          React.createElement("div", {className: "progress", style: this.state.outerStyle}, 
            React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", 'aria-valuenow': "40", 'aria-valuemin': "0", 'aria-valuemax': "100", style: this.state.innerStyle})
          )
        )
      )
      );
  },

  getInitialState: function() {
    return {
      outerStyle: {
        padding: 0
      },
      innerStyle: {
        width: "40%"
      }
    };
  }
});
