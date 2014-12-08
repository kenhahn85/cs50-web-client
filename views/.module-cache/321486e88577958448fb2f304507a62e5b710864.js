var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement("div", {className: "progress ellipsis bold textShadow pointer", onMouseDown: this.startProgressChange, style: this.innerState.outerStyle}, 
            React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", 'aria-valuenow': "0", 'aria-valuemin': "0", 'aria-valuemax': "100", style: this.innerState.innerStyle}, 
              this.props.children
            )
          )
        )
      )
    );
  },

  getInitialState: function() {
    return {
      progress: this.props.initialProgress
    };
  },

  componentWillMount: function() {
    this.innerState = {
      outerStyle: {
        padding: 0
      },
      innerStyle: {
        width: this.state.progress + "%"
      }
    };
  },

  startProgressChange: function(e) {
    var el = e.target;
    var $el = $(el).closest('.progress');
    var $progressBar = $el.find('.progress-bar');
    var offset = $el.offset();
    var width = $el.width();
    var runCallbacks = function(e) {
      var x = e.pageX - offset.left;
      var pct = 100 * x / width;
      if (pct < 0) pct = 0;
      else if (pct > 100) pct = 100;

      $progressBar
        .css('width', pct + '%')
        .attr('aria-valuenow', parseInt(pct));

      this.props.onProgressChange(pct);
    }.bind(this);

    $('body').addClass('noTextSelect');

    $('body').one('mouseup.ProgressBar', function() {
      // mouseup inner
      $('body').off('mousemove.ProgressBar');
      $(document).off('mouseout.ProgressBar');

      // http://stackoverflow.com/questions/13411760/how-to-remove-text-selection-from-selected-text-which-is-comming-by-default-on-p
      if (window.getSelection) window.getSelection().removeAllRanges();
      else if (document.selection) document.selection.empty();
      $('body').removeClass('noTextSelect');
    }.bind(this));

    /**
     * when mouse has left the window, treat like a mouseup:
     * http://stackoverflow.com/questions/923299/how-can-i-detect-when-the-mouse-leaves-the-window
     */
    $(document).on('mouseout.ProgressBar', function(e) {
      e = e ? e : window.event;
      var from = e.relatedTarget || e.toElement;

      if (!from || from.nodeName == "HTML") {
        // stop your drag event here
        // for now we can just use an alert
        $('body').trigger('mouseup.ProgressBar');
      }
    });

    $('body').on('mousemove.ProgressBar', runCallbacks);
    runCallbacks(e);
  }
});
