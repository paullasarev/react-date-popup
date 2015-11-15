var React = require('react');
var Page = require('../js/page.jsx');

module.exports = React.createClass({
  title: 'Base page',

  init: ""
        + "<script>"
        + "  var reactDOM = require('react-dom');"
        + "  var Page = require('./page.jsx');" 
        + "  reactDOM.render(react.createElement(Page), document.getElementById('#page'));"
        + " </script>"
        ,

  render: function () {
    return (
      <div id="page">
        <Page/>
      </div>
    )
    
  }
});
