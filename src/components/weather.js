import React from "react"
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class Weather extends React.Component {

  render() {
    return (
      <div className="weather col-sm-2">{this.props.weather.text} - {this.props.weather.temp}&deg;</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
  }
 }
  
 export const WeatherConnected = withRouter(connect(
  mapStateToProps
)(Weather))