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
    console.log("ADJUSTING VOLUME");

    var el = e.target;
    var $el = $(el);
    var $progressBar = $el.find('.progress-bar');
    var parentOffset = $el.parent().offset();
    var x = e.pageX - parentOffset.left;
    var width = $el.width();
    var pct = x / width;

    console.log("X", x);
    console.log("pct", pct);
    console.log("progress bar", $progressBar);

    $progressBar
      .attr('aria-valuenow', parseInt(100 * pct))
      .css('width', (100 * pct) + '%');
  }
});