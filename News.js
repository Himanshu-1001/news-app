import React, { Component } from 'react'
import NewsItems from './NewsItems'

export default class News extends Component {
  constructor(){
    super();
    this.state={
      articles: [],
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=e9b807757ab9462694c3879b8624d3d0&page=${this.state.page}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    })
  }

  getPrevious= async ()=>{
    this.state.page--;
    let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=e9b807757ab9462694c3879b8624d3d0&page=${this.state.page}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles: parsedData.articles
    })

  }

  getNext= async ()=>{
    this.state.page++;
    let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=e9b807757ab9462694c3879b8624d3d0&page=${this.state.page}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles: parsedData.articles
    })
  }

  render() {
    return (
      <div className='my-2'>
        <h1>NewsApp - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4">
              <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
        </div>
        <div class="d-flex justify-content-between my-2">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.getPrevious}>&larr;Previous</button>
          <button disabled={this.state.page>=Math.ceil(this.state.totalResults/20)}type="button" className="btn btn-dark" onClick={this.getNext}>Next&rarr;</button>
        </div>
      </div>
    )
  }

}
