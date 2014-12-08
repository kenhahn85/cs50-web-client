var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "row VolumeBar"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement("div", {className: "progress ellipsis bold textShadow", onClick: this.adjustVolume, onDrag: this.adjustVolume, style: this.state.outerStyle}, 
            React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", 'aria-valuenow': "40", 'aria-valuemin': "0", 'aria-valuemax': "100", style: this.state.innerStyle}, 
              React.createElement("i", {className: "fa fa-volume-up"})
            )
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
  },

  adjustVolume: function(e) {
    var el = e.target;
    var parentOffset = $(el).parent().offset();
    e.preventDefault();
    var x = e.pageX - el.offsetLeft;
    var y = e.pageY - el.offsetTop;
    console.log('x', x);
  }
});
