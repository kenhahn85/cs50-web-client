var React = require('react/addons');
var ProgressBar = require('./Player/ProgressBar');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "Player row"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement("div", {className: "row upperPlayer"}, 
            React.createElement("div", {className: "col-sm-12"}, 
              React.createElement("i", {ref: "backButton", onClick: this.onBack, className: "fa fa-2x fa-backward"}), 
              React.createElement("i", {ref: "playPauseButton", onClick: this.onPlayPause, className: "fa fa-2x fa-play"}), 
              React.createElement("i", {ref: "forwardButton", onClick: this.onForward, className: "fa fa-2x fa-forward"}), 
              React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsUp, className: "fa fa-2x fa-thumbs-up"}), 
              React.createElement("i", {ref: "thumbsDownButton", onClick: this.onThumbsDown, className: "fa fa-2x fa-thumbs-down"}), 
              React.createElement("span", {className: "songInfo", ref: "songInfo"}, "Song Info Here")
            )
          ), 

          React.createElement("div", {className: "row lowerPlayer"}, 
            React.createElement("div", {className: "col-sm-10"}, 
              React.createElement(ProgressBar, {initialProgress: 0, onProgressChange: this.onTrackProgressChange, componentClass: "TrackBar"})
            ), 
            React.createElement("div", {className: "col-sm-2"}, 
              React.createElement(ProgressBar, {initialProgress: 50, onProgressChange: this.onVolumeProgressChange, componentClass: "VolumeBar"}, 
                React.createElement("i", {className: "fa fa-volume-up"})
              )
            )
          )
        )
      )
    );
  },

  onTrackProgressChange: function(pct) {
    console.log("TRACK PROGRESS", pct);
  },

  onVolumeProgressChange: function(pct) {
    console.log("VOLUME PROGRESS", pct);
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
    var self = this;

    PubSub.subscribe("SONG.CHANGE", function(msg, data) {
    });

    PubSub.subscribe("SONG.LIST_LOADED", function(msg, songList) {
      self.scplayer.add_tracks(songList.map(function(song) {
        return song.soundCloudLink;
      }));
    });

    this.setupPlayer();
  },

  /**
   * see documentation for external lib here: https://github.com/soundcloud/soundcloud-custom-player
   */
  setupPlayer: function() {
    var self = this;

    this.scplayer = new SoundCloudPlayer([], {
      consumer_key: "510f70790e7f680c9ae95a3a5a86f7fa",
      loop: false
    });

    this.scplayer.on('scplayer.track.played', function() {
      return _this.onTrackPlayed();
    });
    this.scplayer.on('scplayer.track.resumed', function() {
      return _this.onTrackPlayed();
    });
    this.scplayer.on('scplayer.changing_track', function(e) {
      return _this.view.whileLoading();
    });
    this.scplayer.on('scplayer.track.info_loaded', function(e, track) {
      _this.song = track;
      return _this.view.onInfoLoaded();
    });
    this.scplayer.on('scplayer.track.whileplaying', function(e, percent) {
      PubSub.publishSync("SONG.PROGRESS_PERCENT", percent);
    });
    this.scplayer.on('scplayer.track.paused', function() {
      return _this.view.onTrackStopped();
    });
    this.scplayer.on('scplayer.track.stopped', function() {
      return _this.view.onTrackStopped();
    });
    this.scplayer.on('scplayer.track.finished', function() {
      return _this.view.onTrackStopped();
    });
    this.scplayer.on('scplayer.playlist.ended', function() {
      return _this.view.onPlaylistEnded();
    });
  },

  onPlayPause: function() {
    if (this.state.isPlaying) {
      // show play button
      // tell scplayer to stop playing music
      // broadcast so that song entry can listen
      $(this.refs.playPauseButton.getDOMNode())
        .removeClass("fa-pause")
        .addClass("fa-play");
      this.scplayer.pause();
      PubSub.publishSync("SONG.PAUSED", this.state.song.id);
    } else {
      // do inverse of the above
      $(this.refs.playPauseButton.getDOMNode())
        .removeClass("fa-play")
        .addClass("fa-pause");
      this.scplayer.play();
      PubSub.publishSync("SONG.PLAYING", this.state.song.id);
    }
  },

  onBack: function() {
    if (this.state.currentIdx > 0) {
      this.setState({currentIdx: 0});
    }
  },

  onForward: function() {

  },

  onThumbsUp: function() {

  },

  onThumbsDown: function() {

  }
});
