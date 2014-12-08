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

    PubSub.subscribe("SOUNDCLOUD.404", function(msg, data) {
      alert("That track is no longer available.");
    });

    PubSub.subscribe("USER.LOGGED_IN", function(msg, data) {
      self.onStateUpdate();
    });

    PubSub.subscribe("USER.LOGGED_OUT", function(msg, data) {
      self.onStateUpdate();
    });

    PubSub.subscribe("ROOT.PLAYLIST_LOADED", function(msg) {
      self.scplayer.add_tracks(Global.songs.map(function (song) {
        return song.soundCloudLink;
      }));
    });

    PubSub.subscribe("SONG_ENTRY.PLAY_CLICKED", function(msg, songIdx) {
      Global.currentIdx = songIdx;
      self.scplayer.goto(songIdx);
      self.onSongChange();
      self.onStateUpdate();
      self._deferApiFailureCheck();
    });

    this.setupPlayer();
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
   * this is only called when the player is attempting to change songs.
   */
  onStateUpdate: function() {
    var currentSong = this.getCurrentSong();
    // on first load, if soundcloud data has not yet finished loading...
    if (!currentSong) return;

    $(this.refs.songInfo.getDOMNode()).html(currentSong.primaryArtistName + "-" + currentSong.title);
    PubSub.publish("PLAYER.SONG_PLAYING");

    this.showPauseButton();
    this.checkForwardBackButton();
    this.checkThumbButtons();

    // force an update of the UI
    this.forceUpdate();
  },

  onSongChange: function() {
    PubSub.publishSync("PLAYER.PROGRESS_UPDATE.TrackBar", 0);
    PubSub.publishSync("PLAYER.TEXT_UPDATE.TrackBar", this.getTimeText(0));
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
      Global.isPlaying = true;
      self.timer = false;
      Global.currentIdx = self.scplayer.track_index();
      self.onStateUpdate();
      self.onSongChange();
    });
    this.scplayer.on('scplayer.track.resumed', function() {
      Global.isPlaying = true;
      self.showPauseButton();
    });
    this.scplayer.on('scplayer.changing_track', function(e) {
//      console.log('changing track');
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
      Global.isPlaying = false;
    });
    this.scplayer.on('scplayer.track.stopped', function() {
      self.showPlayButton();
      Global.isPlaying = false;
    });
    this.scplayer.on('scplayer.track.finished', function() {
      // transient state
    });
    this.scplayer.on('scplayer.playlist.ended', function() {
      self.showPlayButton();
      Global.currentIdx = 0;
      Global.isPlaying = false;
    });
  },

  checkForwardBackButton: function() {
    var self = this;
    if (Global.currentIdx === 0) {
      self.setButtonEnabled("backButton", false);
    } else {
      self.setButtonEnabled("backButton", true);
    }
    if (Global.currentIdx + 1 < Global.songs.length) {
      self.setButtonEnabled("forwardButton", true);
    } else {
      self.setButtonEnabled("forwardButton", false);
    }
  },

  checkThumbButtons: function() {
    var self = this;
    if (this.canThumbsUp() && this.canThumbsDown()) {
      self.setButtonEnabled("thumbsUpButton", true);
      self.setButtonEnabled("thumbsDownButton", true);
    } else if (this.canThumbsUp() && !this.canThumbsDown()) {
      self.setButtonEnabled("thumbsUpButton", true);
      self.setButtonEnabled("thumbsDownButton", false);
    } else if (!this.canThumbsUp() && this.canThumbsDown()) {
      self.setButtonEnabled("thumbsUpButton", false);
      self.setButtonEnabled("thumbsDownButton", true);
    } else {
      self.setButtonEnabled("thumbsUpButton", true);
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
    PubSub.publishSync("PLAYER.SHOW_PAUSE_BUTTON");
    $(this.refs.playPauseButton.getDOMNode()).removeClass('fa-play').addClass('fa-pause');
  },

  showPlayButton: function() {
    PubSub.publishSync("PLAYER.SHOW_PLAY_BUTTON");
    $(this.refs.playPauseButton.getDOMNode()).removeClass('fa-pause').addClass('fa-play');
  },

  /**
   * returns the timer text to be displayed in the text bar,
   *   or a loading indicator if that data is not ready yet.
   * @param pct
   * @returns {string}
   */
  getTimeText: function(pct) {
    // this may check properties on the current song before they have been loaded.
    // in this case, the song has not yet started and it's safe to display 0:00
    if (!this.getCurrentSong().duration) {
      return "Loading...";
    }

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
    if (Global.isPlaying) {
      // show play button
      // tell scplayer to stop playing music
      // broadcast so that song entry can listen
      $(this.refs.playPauseButton.getDOMNode())
        .removeClass("fa-pause")
        .addClass("fa-play");
      this.scplayer.pause();
      PubSub.publishSync("SONG.PAUSED", this.getCurrentSong().id);
    } else {
      // do inverse of the above
      $(this.refs.playPauseButton.getDOMNode())
        .removeClass("fa-play")
        .addClass("fa-pause");
      this.scplayer.play();
      PubSub.publishSync("SONG.PLAYING", this.getCurrentSong().id);
    }
  },

  onBack: function() {
    if (Global.currentIdx > 0) {
      Global.currentIdx--;
      PubSub.publishSync("PLAYER.SONG_CHANGED");
      self.onSongChange();
      this.onStateUpdate();
      this.scplayer.prev();
      this._deferApiFailureCheck();
    }
  },

  onForward: function() {
    if (Global.currentIdx + 1 < Global.songs.length) {
      Global.currentIdx++;
      this.onSongChange();
      PubSub.publishSync("PLAYER.SONG_CHANGED");
      this.onStateUpdate();
      this.scplayer.next();
      this._deferApiFailureCheck();
    }
  },

  // timeout protection mechanism. for when soundcloud's api fails for whatever reason.
  // this is a bandage, and not a robust solution.
  _deferApiFailureCheck: function() {
    // get current unix timestamp
    var timer = this.timer = +new Date();
    setTimeout(function() {
      if (timer === this.timer) {
        alert("There seems to be a problem loading the song. Let's try another one.");
      }
    }.bind(this), 5000);
  },

  canThumbsUp: function() {
    var currentSong = this.getCurrentSong();
    if (!Global.currentUser || !currentSong) return;
    var currentVote = Global.currentUser.get('voteMap')[currentSong.title];
    return currentVote !== 1;
  },

  canThumbsDown: function() {
    var currentSong = this.getCurrentSong();
    if (!Global.currentUser || !currentSong) return;
    var currentVote = Global.currentUser.get('voteMap')[currentSong.title];
    return currentVote !== -1;
  },

  onThumbsUp: function() {
    if (!Global.currentUser) {
      return $('.LoginModal').modal('show');
    }
    if (!this.canThumbsUp()) return;

    var title = this.getCurrentSong().title;
    var self = this;

    $.ajax({
      url: API_SERVER + "/songs/upvote/" + title,
      method: 'post'
    })
      .success(function() {
        Global.currentUser.get('voteMap')[title] = 1;
        self.onStateUpdate();
      })
      .fail(function() {
        alert("Something went wrong! Try again soon.");
      });
  },

  onThumbsDown: function() {
    if (!Global.currentUser) {
      return $('.LoginModal').modal('show');
    }
    if (!this.canThumbsDown()) return;

    var title = this.getCurrentSong().title;
    var self = this;

    $.ajax({
      url: API_SERVER + "/songs/downvote/" + title,
      method: 'post'
    })
      .success(function() {
        Global.currentUser.get('voteMap')[title] = - 1;
        self.onStateUpdate();
      })
      .fail(function() {
        alert("Something went wrong! Try again soon.");
      });
  }
});
