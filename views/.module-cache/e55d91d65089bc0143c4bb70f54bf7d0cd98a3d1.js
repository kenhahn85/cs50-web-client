var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "row VolumeBar"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement("div", {className: "progress ellipsis bold textShadow", onMouseDown: this.startVolumeChange, style: this.innerState.outerStyle}, 
            React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", 'aria-valuenow': "40", 'aria-valuemin': "0", 'aria-valuemax': "100", style: this.innerState.innerStyle}, 
              React.createElement("i", {className: "fa fa-volume-up"})
            )
          )
        )
      )
      );
  },

  componentWillMount: function() {
    this.innerState = {
      outerStyle: {
        padding: 0
      },
      innerStyle: {
        width: "40%"
      }
    };
  },

  startVolumeChange: function(e) {
    var el = e.target;
    var $el = $(el);
    var calcBarWidth = function(e) {
      var x = e.pageX - offset.left;
      var pct = x / width;
      if (pct < 0) pct = 0;
      else if (pct > 100) pct = 100;

      $progressBar
        .css('width', (100 * pct) + '%')
        .attr('aria-valuenow', parseInt(100 * pct));
    };

    if ($el.hasClass('progress-bar')) {
      // normalize calculations against the progress bar wrapper
      console.log("UH HI?", el.parentNode);
      $el = $(el.parentNode);
    }
    var $progressBar = $el.find('.progress-bar');
    var offset = $el.offset();
    var width = $el.width();

    $('body').one('mouseup', function() {
      // mouseup inner
      this.innerState.changingVolume = false;
      $('body').off('mousemove.VolumeBar')
    }.bind(this));

    $('body').on('mousemove.VolumeBar', calcBarWidth);

  }
});
