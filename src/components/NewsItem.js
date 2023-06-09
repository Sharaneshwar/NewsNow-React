import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsURL } = this.props;
    return (
      <div className="card bg-dark text-light border-secondary">
        <img src={imageURL} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className='text-secondary'>Last Updated 3 mins ago</small></p>
          <a href={newsURL} rel="noreferrer" target='_blank' className="btn btn-sm btn-light">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItem
