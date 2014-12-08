var React = require('react/addons');
var Backbone = require('backbone');
var RootNav = require('./Root/RootNav');
var PlayList = require('./Root/PlayList');
var LoginModal = require('./Modals/LoginModal');
var RegisterModal = require('./Modals/RegisterModal');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="Root container-fluid">
        <div className="row RootNavContainer">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-12">
                <RootNav />
              </div>
            </div>
          </div>
          <div className="col-sm-3" />
        </div>

        <div className="row PlayListContainer">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-12">
                <PlayList />
              </div>
            </div>
          </div>
          <div className="col-sm-3" />
        </div>
        <LoginModal />
        <RegisterModal />
      </div>
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
