import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import error from './error.png'
import InfiniteScroll from "react-infinite-scroll-component";

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

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			loading: true,
			page: 1,
			totalResults: 0
		}
		document.title = `NewsNow - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
	}

	async updateNews() {
		this.props.setProgress(10);
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		this.props.setProgress(30);
		let parsedData = await data.json();
		this.props.setProgress(70);
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false
		});
		this.props.setProgress(100);
	}

	async componentDidMount() {
		await this.updateNews();
	}

	handlePreviousClick = async () => {
		this.setState({ page: this.state.page - 1 });
		await this.updateNews();
	}

	handleNextClick = async () => {
		this.setState({ page: this.state.page + 1 });
		await this.updateNews();
	}

	fetchMoreData = async () => {
		this.setState({ page: this.state.page + 1 })
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: this.state.articles.concat(parsedData.articles),
			totalResults: parsedData.totalResults,
			loading: false
		});
	}

	render() {
		return (
			<>
				<h1 className='text-center my-4'>NewsNow - Top Headlines - {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</h1>
				{this.state.loading && <Loader />}

				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length !== this.state.totalResults}
					loader={<Loader />}
				>
					<div className="container">
						<div className="row">
							{
								this.state.articles.map((element) => {
									return <div key={element.url} className="col-md-3 mb-4">
										<NewsItem
											title={element.title}
											description={element.description}
											imageURL={element.urlToImage ? element.urlToImage : error}
											newsURL={element.url}
											author={element.author}
											date={element.publishedAt}
											source={element.source.name}
										/>
									</div>
								})
							}
						</div>
					</div>
				</InfiniteScroll>
				{/* <div className="d-flex justify-content-between mb-4">
					<button type="button" disabled={this.state.page <= 1} className="btn btn-secondary" onClick={this.handlePreviousClick}>&larr; Previous</button>
					<button type="button" disabled={this.state.totalResults <= this.state.page * this.props.pagesize} className="btn btn-secondary" onClick={this.handleNextClick}>Next &rarr;</button>
				</div> */}
			</>
		)
	}
}

export default News