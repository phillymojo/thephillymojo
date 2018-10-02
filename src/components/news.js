import React from "react"
import { connect } from "react-redux"

class News extends React.Component {

  render() {
    return (
      <div className={'news_content'}>
        {
          this.props.newsItems.map((newsItem, i) => {
            return (
              <div className={'news_item'} key={i}>
                <a href={newsItem.url} target="_blank">
                  <div className={'news_image'}>
                    <img className={!newsItem.urlToImage ? 'no_image' : ''} src={newsItem.urlToImage || '/no_image_placeholder.jpg'} />
                  </div>
                  <div className={'news_source'}>{newsItem.source.name}</div>
                  <div className={'news_item_title'}>{newsItem.title}</div>
                </a>
              </div>
            )
          })
        }
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