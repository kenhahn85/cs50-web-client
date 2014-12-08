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
        React.createElement("th", null, "Play"), 
        React.createElement("th", null, "Up"), 
        React.createElement("th", null, "Dn"), 
        React.createElement("th", null, "Artist"), 
        React.createElement("th", null, "Title")
      )
    );
  }
});