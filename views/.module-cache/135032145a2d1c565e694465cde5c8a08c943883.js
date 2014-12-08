var React = require('react/addons');
var Backbone = require('backbone');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "player-controls"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-sm-6"},
            React.createElement("i", {onClick: this.onBack, className: "fa fa-2x fa-backward"}), 
            React.createElement("i", {ref: "playPauseButton", onClick: this.onPlayPause, className: "fa fa-2x fa-play"}), 
            React.createElement("i", {onClick: this.onForward, className: "fa fa-2x fa-forward"}), 
            React.createElement("i", {onClick: this.onThumbsUp, className: "fa fa-2x fa-thumbs-up"}), 
            React.createElement("i", {onClick: this.onThumbsDown, className: "fa fa-2x fa-thumbs-down"})
          ), 
          React.createElement("div", {className: "col-sm-6", ref: "songArtistAndTitle"}, "Song Info here")
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-sm-12", ref: "progressBar", onClick: this.onProgressBarClick}, "Progress Bar here")
        )
      )
      );
  },

  onProgressBarClick: function() {
  },

  getInitialState: function() {
    console.log("player starting.");
    return {
      currentSong: null,
      songList: new Backbone.Collection({
        model: Backbone.Model
      }),
      currentPosition: 0
    };
  },

  componentWillMount: function () {
    var token = PubSub.subscribe("SONG.CHANGE", function(msg, data) {
      console.log("song info", data);
    });

    this.setupPlayer();
  },

  setupPlayer: function() {
    this.scplayer = new SoundCloudPlayer([], {
      consumer_key: "510f70790e7f680c9ae95a3a5a86f7fa",
      loop: false
    });
  },

  onPlayPause: function() {

  },

  onBack: function() {

  },

  onForward: function() {

  },

  onThumbsUp: function() {

  },

  onThumbsDown: function() {

  }
});
