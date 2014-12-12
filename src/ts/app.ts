interface Window {
  Backbone: any;
  Global: any;
  PubSub: any;
  React: any;
}
import PubSub = require('pubsub-js');
window.PubSub = PubSub;
import Backbone = require('backbone');
window.Backbone = Backbone;
import React = require('./React/Master');
window.React = React;

console.log("testing TS");

// http://quickleft.com/blog/cookies-with-my-cors
$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.crossDomain ={
    crossDomain: true
  };
  options.xhrFields = {
    withCredentials: true
  };
});

window.Global = {
  currentUser: null,
  currentSong: null,
  songs: [],
  currentIdx: 0,
  login: function(userInfo) {
    var self = this;
    $('.LoginModal').modal('hide');
    return $.ajax({
      url: API_SERVER + "/login",
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(userInfo)
    })
      .then(function(user) {
        self.withUserInfo(user);
        PubSub.publishSync("USER.LOGGED_IN", user);
        return user;
      });
  },
  withUserInfo: function(user) {
    var voteMap = {};
    Global.currentUser = new Backbone.Model(user);
    Global.currentUser.get('votes').forEach(function(vote) {
      voteMap[vote.songTitle] = vote.val;
    });
    Global.currentUser.set('voteMap', voteMap);
  },
  logout: function() {
    return $.ajax({
      url: API_SERVER + "/goodbye",
      method: 'post'
    })
      .then(function() {
        Global.currentUser = null;
        PubSub.publishSync("USER.LOGGED_OUT");
      })
      .fail(function() {
        alert("Failed to log out. Try again shortly.");
      });
  },
  checkIfLoggedIn: function() {
    var self = this;
    return $.ajax({
      url: API_SERVER + "/users/me",
      method: 'get'
    })
      .then(function(user) {
        self.withUserInfo(user);
        PubSub.publishSync("USER.LOGGED_IN", user);
        return user;
      })
      .fail(function() {
        PubSub.publishSync("USER.LOGGED_OUT");
        Global.currentUser = null;
      })
  }
};

React.render();
