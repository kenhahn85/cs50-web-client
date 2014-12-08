var React = require('react/addons');
var SongEntry = require('./PlayList/SongEntry');

module.exports = React.createClass({
  render: function() {
    var songList = Global.songs.map(function(song, index) {
      song.index = index;
      return (
        <SongEntry song={song} />
        );
    });

    return (
      <div className="PlayList row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <i className="fa fa-play"></i>
                </th>
                <th>Artist</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {songList}
            </tbody>
          </table>
        </div>
      </div>
    );
  },

  componentWillMount: function () {
    PubSub.subscribe("ROOT.PLAYLIST_LOADED", function() {
      this.setState();
    }.bind(this));

    PubSub.subscribe("PLAYER.SONG_CHANGED", function() {
      this.setState();
    }.bind(this));
  }
});
