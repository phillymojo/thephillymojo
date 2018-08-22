import React from "react"
import { connect } from "react-redux"

class Nasa extends React.Component {

  render() {
    const nasaData = this.props.nasaData;
    return (
      <div>
       {nasaData.title}
       {nasaData.date}
       <img src={nasaData.url} height={500}/>
       {nasaData.explanation}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nasaData: state.nasa.data.nasa,
    isLoading: state.isLoading
  }
}

export const NasaConnected = connect(
  mapStateToProps
)(Nasa)