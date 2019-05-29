import React from "react"
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class Weather extends React.Component {

  render() {
    return (
      <div>
        {/* {this.props.isLoading ?
          <span>Loading...</span> :
          <div>{this.props.weather.text}{this.props.weather.temp}</div>
        } */}
      </div>
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