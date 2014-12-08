var React = require('react/addons');
var Backbone = require('backbone');
var RootNav = require('./Root/RootNav');
var PlayList = require('./Root/PlayList');
var LoginModal = require('./Modals/LoginModal');
var RegisterModal = require('./Modals/RegisterModal');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "Root container-fluid"}, 
        React.createElement("div", {className: "row RootNavContainer"}, 
          React.createElement("div", {className: "col-sm-3"}), 
          React.createElement("div", {className: "col-sm-6"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-sm-12"}, 
                React.createElement(RootNav, null)
              )
            )
          ), 
          React.createElement("div", {className: "col-sm-3"})
        ), 

        React.createElement("div", {className: "row PlayListContainer"}, 
          React.createElement("div", {className: "col-sm-3"}), 
          React.createElement("div", {className: "col-sm-6"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-sm-12"}, 
                React.createElement(PlayList, null)
              )
            )
          ), 
          React.createElement("div", {className: "col-sm-3"})
        ), 
        React.createElement(LoginModal, null), 
        React.createElement(RegisterModal, null)
      )
    );
  },

  componentWillMount: function () {
    $.getJSON(API_SERVER + "/songs/search/findByNetUpvotes")
      .done(function(results) {
        Global.songs = results._embedded.songs;
        PubSub.publishSync("ROOT.PLAYLIST_LOADED", Global.songs);
      }.bind(this))
      .fail(function() {
        alert("Failed to load songs. Please try again momentarily.");
      });
  }
});
