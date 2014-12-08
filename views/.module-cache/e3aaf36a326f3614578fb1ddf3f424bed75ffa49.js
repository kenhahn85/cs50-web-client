var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    var songList = this.state.songs.map(function(song) {
      return (
        React.createElement(SongEntry, {song: song})
      );
    });

    return (
      React.createElement("tr", null, 
        React.createElement("td", null, 
          React.createElement("i", {ref: "playPauseButton", onClick: this.onPlayPause, className: "fa fa-play"})
        ), 
        React.createElement("td", null, 
          React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsUp, className: "fa fa-thumbs-up"})
        ), 
        React.createElement("td", null, 
          React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsUp, className: "fa fa-thumbs-down"})
        ), 
        React.createElement("td", {ref: "artistName"}
        ), 
        React.createElement("td", {ref: "songName"}
        )
      )
    );
  }
});