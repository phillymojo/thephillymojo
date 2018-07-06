import React from "react"
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class InspirationalQuote extends React.Component {

  render() {
    return (
      <div>
        <br />
        {this.props.isLoading ?
          <span>Loading...</span> :
          <div>
          <div>{this.props.inspirationalQuote.quoteText}</div>
          <div>{this.props.inspirationalQuote.quoteAuthor}</div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inspirationalQuote: state.inspirationalQuote,
  }
 }
  
 export const InspirationalQuoteConnected = withRouter(connect(
  mapStateToProps
)(InspirationalQuote))