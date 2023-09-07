import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: false
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9b807757ab9462694c3879b8624d3d0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  getPrevious = async () => {
    this.state.page--;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9b807757ab9462694c3879b8624d3d0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false
    })

  }

  getNext = async () => {
    this.state.page++;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9b807757ab9462694c3879b8624d3d0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false
    })
  }

  render() {
    return (
      <div className='my-2 text-center'>
        <h1 className='text-center' style={{margin:'20px 0px'}}>NewsApp - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4">
              <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} name={element.source.name} />
            </div>
          })}
        </div>
        <div class="d-flex justify-content-between my-2">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.getPrevious}>&larr;Previous</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.getNext}>Next&rarr;</button>
        </div>
      </div>
    )
  }

}
