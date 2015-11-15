var React = require('react');
var DatePicker = require('./date-picker.jsx')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      date: new Date(),
    }
  },

  onChoose: function(date) {
    console.log('onChoose', date)

  },

  render: function() {
    return (
      <div className="page">
        <DatePicker format='DD-MM-YYYY' defaultValue={this.props.date} onChoose={this.onChoose}/>
      </div>
    )
  }
})