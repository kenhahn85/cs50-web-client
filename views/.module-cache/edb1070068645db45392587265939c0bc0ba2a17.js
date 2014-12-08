var React = require('react/addons');
var SongEntry = require('./PlayList/SongEntry');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    var songList = Global.songs.map(function(song, index) {
      song.index = index;
      return (
        React.createElement(SongEntry, {song: song})
        );
    });

    return (
      React.createElement("div", {className: "PlayList row"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement("table", {className: "table table-striped"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", null, 
                  React.createElement("i", {ref: "playPauseButton", onClick: this.onPlayPause, className: "fa fa-play"})
                ), 
                React.createElement("th", null, "Artist"), 
                React.createElement("th", null, "Title")
              )
            ), 
            React.createElement("tbody", null, 
              songList
            )
          )
        )
      )
    );
  },

  componentWillMount: function () {
    PubSub.subscribe("ROOT.PLAYLIST_LOADED", function() {
      this.setState();
    }.bind(this));

    PubSub.subscribe("PLAYER.SONG_CHANGED", function() {
      this.setState();
    }.bind(this));

    PubSub.subscribe("PLAYER.SHOW_PLAY_BUTTON", function() {
      console.log('show play button');
      this.showPlayButton();
    }.bind(this));

    PubSub.subscribe("PLAYER.SHOW_PAUSE_BUTTON", function() {
      console.log('show pause button');
      this.showPauseButton();
    }.bind(this));
  },

  showPlayButton: function() {
    $(this.refs.playPauseButton.getDOMNode()).removeClass('fa-pause').addClass('fa-play');
  },

  showPauseButton: function() {
    $(this.refs.playPauseButton.getDOMNode()).removeClass('fa-play').addClass('fa-pause');
  }
});