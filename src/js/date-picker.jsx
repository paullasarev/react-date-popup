var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="date-picker">

        <input className="date-picker__input" placeholder={this.props.format}/>

      </div>
    )
  }
});
