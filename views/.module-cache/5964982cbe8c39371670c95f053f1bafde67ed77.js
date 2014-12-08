var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("tr", {className: "SongEntry", ref: "entryRow"}, 
        React.createElement("td", null, 
          React.createElement("i", {ref: "playPauseButton", onClick: this.onPlay, className: "fa fa-play enabled"})
        ), 
        React.createElement("td", {ref: "artistName"}
        ), 
        React.createElement("td", {ref: "songName"}
        )
      )
    );
  },

  componentDidMount: function() {
    this.refs.artistName.getDOMNode().innerHTML = this.props.song.primaryArtistName;
    this.refs.songName.getDOMNode().innerHTML = this.props.song.title;

    PubSub.subscribe("PLAYER.SONG_PLAYING", function() {
      if (this.props.song.index === Global.currentIdx) {
        $(this.refs.entryRow.getDOMNode()).addClass("nowPlaying");
      } else {
        $(this.refs.entryRow.getDOMNode()).removeClass("nowPlaying");
      }
    }.bind(this));

    PubSub.subscribe("PLAYER.SHOW_PLAY_BUTTON", function() {
      console.log('show play button');
      this.showPlayButton();
    }.bind(this));

    PubSub.subscribe("PLAYER.SHOW_PAUSE_BUTTON", function() {
      if (Global.currentIdx === this.props.song.index)
        this.showPauseButton();
    }.bind(this));
  },

  onPlay: function() {
    if (this.props.song.index !== Global.currentIdx) {
      PubSub.publishSync("SONG_ENTRY.PLAY_CLICKED", this.props.song.index);
    }
  },

  showPlayButton: function() {
    $(this.refs.playPauseButton.getDOMNode()).removeClass('fa-pause').addClass('fa-play');
  },

  showPauseButton: function() {
    $(this.refs.playPauseButton.getDOMNode()).removeClass('fa-play').addClass('fa-pause');
  }
});