var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("tr", {className: "SongEntry", ref: "entryRow"}, 
        React.createElement("td", null, 
          React.createElement("i", {ref: "playButton", onClick: this.onPlay, className: "fa fa-play enabled"})
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
  },

  onPlayPause: function() {
    PubSub.publishSync("SONG_ENTRY.PLAY_CLICKED", this.props.song.index);
  }
});