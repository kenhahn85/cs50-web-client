var React = require('react/addons');
var SongEntry = require('./PlayList/SongEntry');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    var songList = this.state.songs.map(function(song) {
      return (
        React.createElement(SongEntry, {song: song})
        );
    });

    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement("table", {className: "table table-striped"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", null, "Play"), 
                React.createElement("th", null, "Up"), 
                React.createElement("th", null, "Dn"), 
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

  getInitialState: function() {
    return {
      songs: []
    }
  },

  componentWillMount: function () {
    $.ajax({

    });

    PubSub.subscribe("SONGS.LOADED", function(msg, songs) {
      this.state.songs.concat(songs);
      // trigger a UI refresh
      this.setState();
    }.bind(this));
  }
});
