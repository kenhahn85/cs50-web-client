var React = require('react/addons');

module.exports = React.createClass({displayName: 'exports',
  componentWillMount: function () {
    var token = PubSub.subscribe("TESTING", function(msg, data) {
    });
  },

  render: function() {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-sm-12"}, 
          React.createElement("table", {class: "table table-striped"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", null, "#"), 
                React.createElement("th", null, "First Name"), 
                React.createElement("th", null, "Last Name"), 
                React.createElement("th", null, "Username")
              )
            ), 
            React.createElement("tbody", null, 
              React.createElement("tr", null, 
                React.createElement("td", null, "1"), 
                React.createElement("td", null, "Mark"), 
                React.createElement("td", null, "Otto"), 
                React.createElement("td", null, "@mdo")
              ), 
              React.createElement("tr", null, 
                React.createElement("td", null, "2"), 
                React.createElement("td", null, "Jacob"), 
                React.createElement("td", null, "Thornton"), 
                React.createElement("td", null, "@fat")
              ), 
              React.createElement("tr", null, 
                React.createElement("td", null, "3"), 
                React.createElement("td", null, "Larry"), 
                React.createElement("td", null, "the Bird"), 
                React.createElement("td", null, "@twitter")
              )
            )
          )
        )
      )
      );
  }
});
