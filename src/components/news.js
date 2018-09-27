import React from "react"
import { connect } from "react-redux"

class News extends React.Component {

  render() {
    return (
      <div>
        <ul>
          {
            this.props.newsItems.map((newsItem, i) => {
              return (
                <li key={i}>
                  <a href={newsItem.url} target="_blank">
                    <img src={newsItem.urlToImage} width="100px" />
                    {newsItem.title}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newsItems: state.newsItems,
    isLoading: state.isLoading
  }
}

export const NewsConnected = connect(
  mapStateToProps
)(News)