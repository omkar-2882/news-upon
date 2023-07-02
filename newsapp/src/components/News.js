import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import { fetchCategoryNews } from '../json/api';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // const updateNews = async () => {
  //     props.setProgress(10)
  //     // console.log(props.setProgress(10))
  //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d865168ba8a84445b05c22ce257bf397&page=${page}&pageSize=${props.pageSize}`
  //     setLoading(true)
  //     let data = await fetch(url)
  //     let parsedData = await data.json()
  //     props.setProgress(50)
  //     setArticles(parsedData.articles)
  //     setTotalResults(parsedData.totalResults)
  //     setLoading(false)
  //     props.setProgress(100)
  // }

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);

    try {
      //   const jsonFilePath = `../json/${props.category}.json`;
      //   const response = await fetch(jsonFilePath);
      const data = await fetchJson(props.category);
      //   console.log(data)
      //   const data = jsonData.json();
      props.setProgress(50);
      setArticles(data.articles);
      setTotalResults(data.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error reading JSON file:", error);
      setLoading(false);
    }
  };

  const fetchJson = async (category) => {
    try {
      //   console.log(`${category}`)
      const data = await require(`../json/${category}.json`);
      return data;
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

//   const handlePrevClick = async () => {
//       setPage(page-1)
//       updateNews()
//   }

//   const handleNextClick = async () => {
//       setPage(page+1)
//       updateNews()
//   }

  // const fetchMoreData = async () => {
  //     setPage(page+1)
  //     // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d865168ba8a84445b05c22ce257bf397&page=${page+1}&pageSize=${props.pageSize}`
  //     const url = `https://newsapi.in/newsapi/news.php?country=${props.country}&category=${props.category}&apiKey=9tni1PU2eIOlIbpIeeei7iXba55ubX&page=${page+1}&pageSize=${props.pageSize}`
  //     let data = await fetch(url)
  //     let parsedData = await data.json()
  //     setArticles(articles.concat(parsedData.articles))
  //     setTotalResults(parsedData.totalResult)
  // };

  const fetchMoreData = async () => {
    setPage(page + 1);

    try {
      const data = await fetchJson(props.category);

      setArticles(articles.concat(data.articles));
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  };

  return (
    <>
      <h1 style={{ fontWeight: "bold" }} className="text-center p-4">
        Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        {console.log("Length: " + articles.length)}
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-danger" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(articles.totalResults / props.pageSize)} type="button" className="btn btn-success" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 100,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
