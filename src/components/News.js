import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    const capitalizeFirstletterTitle = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.countryName}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(50);
        setArticles(parseData.articles);
        settotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = props.category ==="general" ? "NewsNest - Get Daily news for free" : `${capitalizeFirstletterTitle(props.category)} - NewsNest Get Daily news for free`;
        updateNews();
        //eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.countryName}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        settotalResults(parseData.totalResults);
    };

    return (
        <>
            <h2 className='text-center' style={{ margin: '35px 0px', paddingTop:'90px', color: props.mode === 'dark' ? 'white' : 'black' }}>{props.category==="general"?`NewsNest - Top Headlines`: `NewsNest - Top Headlines on ${capitalizeFirstletterTitle(props.category)}`}</h2>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={loading && <Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col md-4" key={element.url}>
                                <NewsItem mode={props.mode} title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 90) : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reprehenderit"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News