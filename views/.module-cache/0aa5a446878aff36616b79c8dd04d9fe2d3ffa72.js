var React = require('react/addons');
var ProgressBar = require('./Player/ProgressBar');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "Player row"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement("div", {className: "row margin-bottom-10"}, 
            React.createElement("div", {className: "col-sm-12"}, 
              React.createElement("i", {ref: "backButton", onClick: this.onBack, className: "fa fa-2x fa-backward"}), 
              React.createElement("i", {ref: "playPauseButton", onClick: this.onPlayPause, className: "fa fa-2x fa-play"}), 
              React.createElement("i", {ref: "forwardButton", onClick: this.onForward, className: "fa fa-2x fa-forward"}), 
              React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsUp, className: "fa fa-2x fa-thumbs-up"}), 
              React.createElement("i", {ref: "thumbsDownButton", onClick: this.onThumbsDown, className: "fa fa-2x fa-thumbs-down"})
            )
          ), 
          React.createElement("div", {className: "row margin-bottom-10"}, 
            React.createElement("div", {className: "col-sm-12"}, 
              React.createElement("span", {className: "songInfo", ref: "songInfo"})
            )
          ), 

          React.createElement("div", {className: "row lowerPlayer"}, 
            React.createElement("div", {className: "col-sm-10"}, 
              React.createElement(ProgressBar, {initialProgress: 0, onProgressChange: this.onTrackProgressChange, componentClass: "TrackBar", textClassNames: "absoluteRight"})
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

  getInitialState: function() {
    return {
      currentIdx: 0
    };
  },

  componentWillMount: function () {
    var self = this;
    self.readyQueue = [];

    soundManager.setup({
      url: '/public/swfs/',
      flashVersion: 9,
      useFastPolling: true,
      useHighPerformance: true,
      preferFlash: false,
      onready: function() {
        self.isReady = true;
        self.readyQueue.forEach(function(fn) {
          fn();
        });
      },
      ontimeout: function() {
        return console.log('SM2 init failed!');
      }
    });

    PubSub.subscribe("SONG.CHANGE", function(msg, data) {
    });

    PubSub.subscribe("ROOT.PLAYLIST_LOADED", function(msg) {
      self.scplayer.add_tracks(Global.songs.map(function (song) {
        return song.soundCloudLink;
      }));
    });

    this.setupPlayer();
  },

  onNewSong: function() {
    var currentVote = Global.currentUser.get('voteMap')[this.state.currentSong.id];
    var thumbsUpNode = $(this.refs.thumbsUpButton.getDOMNode());
    var thumbsDownNode = $(this.refs.thumbsDownButton.getDOMNode());

    if (!currentVote) {
      thumbsUpNode.addClass('enabled');
      thumbsDownNode.addClass('enabled');
    } else if (currentVote === 1) {
      thumbsUpNode.addClass('disabled');
      thumbsDownNode.addClass('enabled');
    } else {
      thumbsUpNode.addClass('enabled');
      thumbsDownNode.addClass('disabled');
    }
  },

  onTrackProgressChange: function(pct) {
    this.scplayer.seek(pct / 100);
  },

  onVolumeProgressChange: function(pct) {
    this.scplayer.volume(pct);
  },

  getCurrentSong: function() {
    return Global.songs[Global.currentIdx];
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
      self.setState({
        isPlaying: true
      })
      $(self.refs.songInfo.getDOMNode()).html(self.getCurrentSong().primaryArtistName + "-" + self.getCurrentSong().title);
      PubSub.publish("PLAYER.SONG_PLAYING");
      self.showPauseButton();
      self.checkForwardBackButton();
      self.checkThumbButtons();
    });
    this.scplayer.on('scplayer.track.resumed', function() {
      self.showPauseButton();
    });
    this.scplayer.on('scplayer.changing_track', function(e) {
      console.log('changing track');
    });
    this.scplayer.on('scplayer.track.info_loaded', function(e, track) {
      self.songInfo = track;
      self.scplayer.play();
      self.getCurrentSong().duration = track.duration;
      self.setButtonEnabled("playPauseButton", true);
    });
    this.scplayer.on('scplayer.track.whileplaying', function(e, percent) {
      PubSub.publishSync("PLAYER.TEXT_UPDATE.TrackBar", self.getTimeText(percent));
      PubSub.publishSync("PLAYER.PROGRESS_UPDATE.TrackBar", percent);
    });
    this.scplayer.on('scplayer.track.paused', function() {
      self.showPlayButton();
    });
    this.scplayer.on('scplayer.track.stopped', function() {
      self.showPlayButton();
    });
    this.scplayer.on('scplayer.track.finished', function() {
    });
    this.scplayer.on('scplayer.playlist.ended', function() {
      self.showPlayButton();
      Global.currentIdx = 0;
    });
  },

  checkForwardBackButton: function() {
    var self = this;
    if (Global.currentIdx === 0 && Global.songs.length > 1) {
      self.setButtonEnabled("backButton", false);
      self.setButtonEnabled("forwardButton", false);
    } else if (Global.currentIdx + 1 < Global.songs.length) {
      self.setButtonEnabled("backButton", true);
      self.setButtonEnabled("forwardButton", false);
      self.setButtonEnabled("backButton", true);
      self.setButtonEnabled("forwardButton", true);
    }
  },

  checkThumbButtons: function() {
    if (this.canThumbsUp() && this.canThumbsDown()) {
      self.setButtonEnabled("thumbsUpButton", true);
      self.setButtonEnabled("thumbsDownButton", true);
    } else if (this.canThumbsUp()) {
      self.setButtonEnabled("thumbsUpButton", true);
      self.setButtonEnabled("thumbsDownButton", false);
    } else {
      self.setButtonEnabled("thumbsUpButton", false);
      self.setButtonEnabled("thumbsDownButton", true);
    }
  },

  setButtonEnabled: function(ref, bool) {
    if (bool) {
      $(this.refs[ref].getDOMNode()).removeClass('disabled').addClass('enabled');
    } else {
      $(this.refs[ref].getDOMNode()).removeClass('enabled').addClass('disabled');
    }
  },

  showPauseButton: function() {
    $(this.refs.playPauseButton.getDOMNode()).removeClass('fa-play').addClass('fa-pause');
  },

  showPlayButton: function() {
    $(this.refs.playPauseButton.getDOMNode()).removeClass('fa-pause').addClass('fa-play');
  },

  getTimeText: function(pct) {
    var duration = this.getCurrentSong().duration / 1000;
    var minutes = Math.floor(duration /  60);
    var seconds = Math.floor(duration % 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var text = this.scplayer.get_time() + " / ";
    text += minutes + ":" + seconds;
    return text;
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
    if (Global.currentIdx > 0) {
      this.setState({currentIdx: Global.currentIdx - 1, currentSong: this.getCurrentSong()});
      this.scplayer.prev();
    }
  },

  onForward: function() {
    if (Global.currentIdx + 1 < Global.songs.length) {
      this.setState({currentIdx: Global.currentIdx + 1, currentSong: this.getCurrentSong()});
      this.scplayer.next();
    }
  },

  canThumbsUp: function() {
    var currentVote = Global.currentUser.get('voteMap')[this.getCurrentSong().id];
    return currentVote !== 1;
  },

  canThumbsDown: function() {
    var currentVote = Global.currentUser.get('voteMap')[this.getCurrentSong().id];
    if (currentVote !== -1) return;
  },

  onThumbsUp: function() {
    if (!this.canThumbsUp()) return;
  },

  onThumbsDown: function() {
    if (!this.canThumbsDown()) return;

  }
});