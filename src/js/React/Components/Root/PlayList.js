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
                  React.createElement("i", {className: "fa fa-play"})
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
  }
});
