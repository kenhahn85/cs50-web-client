var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("tr", {ref: "entryRow"}, 
        React.createElement("td", null, 
          React.createElement("i", {ref: "playPauseButton", onClick: this.onPlayPause, className: "fa fa-play enabled"})
        ), 
        React.createElement("td", null, 
          React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsUp, className: "fa fa-thumbs-up enabled"})
        ), 
        React.createElement("td", null, 
          React.createElement("i", {ref: "thumbsUpButton", onClick: this.onThumbsDown, className: "fa fa-thumbs-down enabled"})
        ), 
        React.createElement("td", {ref: "artistName"}
        ), 
        React.createElement("td", {ref: "songName"}
        )
      )
    );
  },

  componentDidMount: function() {
    this.refs.artistName.getDOMNode().innerHTML = this.props.song.primaryArtistName;
    this.refs.songName.getDOMNode().innerHTML = this.props.song.title;
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