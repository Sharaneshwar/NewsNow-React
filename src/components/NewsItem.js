import React, { Component } from 'react'

export class NewsItem extends Component {
	render() {
		let { title, description, imageURL, newsURL, author, date, source } = this.props;
		return (
			<div className="card bg-dark text-light">
				<div style={{
					display: 'flex',
					justifyContent: 'flex-end',
					position: 'absolute',
					right: 0
				}}>
					<span className="badge rounded-pill bg-success">{source}</span>
				</div>
				<div>
					<img src={imageURL} className="card-img-top" alt={title} />
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{description}</p>
						<p className="card-text"><small className='text-secondary'>By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
						<a href={newsURL} rel="noreferrer" target='_blank' className="btn btn-sm btn-light">Read More</a>
					</div>
				</div>
			</div>
		)
	}
}

export default NewsItem
