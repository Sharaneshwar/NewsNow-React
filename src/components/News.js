import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import error from './error.png'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [totalResults, setTotalResults] = useState(0)
	// document.title = `NewsNow - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;

	const updateNews = async () => {
		props.setProgress(10);
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pagesize}`;
		setLoading(true);
		let data = await fetch(url);
		props.setProgress(30);
		let parsedData = await data.json();
		props.setProgress(70);
		setArticles(parsedData.articles);
		setTotalResults(parsedData.totalResults);
		setLoading(false);
		props.setProgress(100);
	}

	useEffect(() => {
		updateNews();
	}, [])

	const handlePreviousClick = async () => {
		setPage(page - 1);
		await updateNews();
	}

	const handleNextClick = async () => {
		setPage(page + 1);
		await updateNews();
	}

	const fetchMoreData = async () => {
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pagesize}`;
		setPage(page + 1);
		let data = await fetch(url);
		let parsedData = await data.json();
		setArticles(articles.concat(parsedData.articles));
		setTotalResults(parsedData.totalResults);
		setLoading(false);
	}

	return (
		<>
			<h1 className='text-center' style={{ margin: '35px 0', marginTop: '75px' }}>NewsNow - Top Headlines - {props.category.charAt(0).toUpperCase() + props.category.slice(1)}</h1>
			{loading && <Loader />}

			<InfiniteScroll
				dataLength={articles.length}
				next={fetchMoreData}
				hasMore={articles.length !== totalResults}
				loader={<Loader />}
			>
				<div className="container">
					<div className="row">
						{
							articles.map((element) => {
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
				<button type="button" disabled={page <= 1} className="btn btn-secondary" onClick={handlePreviousClick}>&larr; Previous</button>
				<button type="button" disabled={totalResults <= page * props.pagesize} className="btn btn-secondary" onClick={handleNextClick}>Next &rarr;</button>
			</div> */}
		</>
	)
}

News.defaultProps = {
	country: 'in',
	category: 'general',
	pagesize: 8,
}

News.propTypes = {
	country: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	pagesize: PropTypes.number,
}

export default News