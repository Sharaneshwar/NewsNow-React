import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import error from './error.png'

export class News extends Component {
	static defaultProps = {
		country: 'in',
		category: 'general',
		pagesize: 8,
	}

	static propTypes = {
		country: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		pagesize: PropTypes.number,
	}

	constructor() {
		super();
		this.state = {
			articles: [],
			loading: false,
			page: 1
		}
	}

	async componentDidMount() {
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb483d5f5735406bac439950558f0606&page=${this.state.page}&pageSize=${this.props.pagesize}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false
		});
	}

	handlePreviousClick = async () => {
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb483d5f5735406bac439950558f0606&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
		this.setState({
			articles: [],
			loading: true
		});
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: parsedData.articles,
			page: this.state.page - 1,
			loading: false
		});
	}

	handleNextClick = async () => {
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb483d5f5735406bac439950558f0606&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
		this.setState({
			articles: [],
			loading: true
		});
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: parsedData.articles,
			page: this.state.page + 1,
			loading: false
		});
	}

	render() {
		return (
			<div className='container'>
				<h1 className='text-center my-4'>NewsNow - Top Headlines</h1>
				<div className="d-flex justify-content-between mb-4">
					<button type="button" disabled={this.state.page <= 1} className="btn btn-secondary" onClick={this.handlePreviousClick}>&larr; Previous</button>
					<button type="button" disabled={this.state.totalResults <= this.state.page * this.props.pagesize} className="btn btn-secondary" onClick={this.handleNextClick}>Next &rarr;</button>
				</div>
				{this.state.loading && <Loader />}
				<div className="row">
					{
						this.state.articles.map((element) => {
							return <div key={element.url} className="col-md-3 mb-4">
								<NewsItem
									title={element.title}
									description={element.description}
									imageURL={element.urlToImage ? element.urlToImage : error}
									newsURL={element.url}
								/>
							</div>
						})
					}
				</div>
			</div>
		)
	}
}

export default News
