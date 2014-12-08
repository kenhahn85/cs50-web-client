var React = require('react/addons');
var Backbone = require('backbone');

module.exports = React.createclassName({
  render: function() {
    return (
      React.createElement("div", {className: "player-controls"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-sm-1", onClick: this.onBack}, React.createElement("i", {className: "fa fa-2x fa-backward"})),
          React.createElement("div", {className: "col-sm-1", ref: "playPause", onClick: this.onPlayPause}, React.createElement("i", {className: "fa fa-2x fa-play"})),
          React.createElement("div", {className: "col-sm-1", onClick: this.onForward}, React.createElement("i", {className: "fa fa-2x fa-forward"})),
          React.createElement("div", {className: "col-sm-1", onClick: this.onThumbsUp}, React.createElement("i", {className: "fa fa-2x fa-thumbs-up"})),
          React.createElement("div", {className: "col-sm-1", onClick: this.onThumbsDown}, React.createElement("i", {className: "fa fa-2x fa-thumbs-down"})),
          React.createElement("div", {className: "col-sm-1"}),
          React.createElement("div", {className: "col-sm-6", ref: "songArtistAndTitle"})
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
