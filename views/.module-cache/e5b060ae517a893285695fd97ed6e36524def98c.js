var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, 
          React.createElement("i", {ref: "playPauseButton", onClick: this.onPlayPause, className: "fa fa-play"})
        ), 
        React.createElement("td", null, 
          React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsUp, className: "fa fa-thumbs-up"})
        ), 
        React.createElement("td", null, 
          React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsDown, className: "fa fa-thumbs-down"})
        ), 
        React.createElement("td", {ref: "artistName"}
        ), 
        React.createElement("td", {ref: "songName"}
        )
      )
    );
  },

  componentWillMount: function() {
    this.refs.artistName.getDOMNode().innerHTML = 'Test Artist';
    this.refs.songName.getDOMNode().innerHTML = 'Test Song';
  },

  onPlayPause: function() {
    // depending on state
    // switch to pause button
    // highlight row
    // message bus it
  },

  onThumbsUp: function() {

  },

  onThumbsDown: function() {

  }
});