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
                React.createElement("th", null, 
                  React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsUp, className: "fa fa-thumbs-up"})
                ), 
                React.createElement("th", null, 
                  React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsDown, className: "fa fa-thumbs-down"})
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
    return $.getJSON(API_SERVER + "/songs/search/findByNetUpvotes")
      .done(function(results) {
        Global.songs = results._embedded.songs;
        PubSub.publishSync("ROOT.PLAYLIST_LOADED", Global.songs);
        this.setState();
      }.bind(this))
      .fail(function() {
        alert("Failed to load songs. Please try again momentarily.");
      });

    PubSub.subcribe("PLAYER.SONG_PLAYING", function() {
      this.setState();
    }.bind(this));
  }
});
