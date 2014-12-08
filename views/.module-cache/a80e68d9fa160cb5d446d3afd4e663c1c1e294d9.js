var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement("div", {className: "progress ellipsis bold textShadow pointer", onMouseDown: this.startProgressChange, style: this.innerState.outerStyle}, 
            React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", 'aria-valuenow': "0", 'aria-valuemin': "0", 'aria-valuemax': "100", style: this.state.innerStyle})
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
        width: "0%"
      }
    };
  },

  startProgressChange: function(e) {
    var el = e.target;
    var $el = $(el).closest('.progress');
    var $progressBar = $el.find('.progress-bar');
    var offset = $el.offset();
    var width = $el.width();
    var calcBarWidth = function(e) {
      var x = e.pageX - offset.left;
      var pct = 100 * x / width;
      if (pct < 0) pct = 0;
      else if (pct > 100) pct = 100;

      $progressBar
        .css('width', pct + '%')
        .attr('aria-valuenow', parseInt(pct));
    };

    $('body').one('mouseup.VolumeBar', function() {
      // mouseup inner
      $('body').off('mousemove.VolumeBar');
      $(document).off('mouseout.VolumeBar');
    }.bind(this));

    /**
     * when mouse has left the window, treat like a mouseup:
     * http://stackoverflow.com/questions/923299/how-can-i-detect-when-the-mouse-leaves-the-window
     */
    $(document).on('mouseout.VolumeBar', function(e) {
      e = e ? e : window.event;
      var from = e.relatedTarget || e.toElement;

      if (!from || from.nodeName == "HTML") {
        // stop your drag event here
        // for now we can just use an alert
        $('body').trigger('mouseup.VolumeBar');
      }
    });

    $('body').on('mousemove.VolumeBar', calcBarWidth);
    calcBarWidth(e);
  }
});
