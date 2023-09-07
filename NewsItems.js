import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {
    let {title, description, imageUrl,newsUrl,author, date,name}=this.props;
    return (
      <div className="card">
        <img src={imageUrl?imageUrl:"https://www.hollywoodreporter.com/wp-content/uploads/2023/07/Haunted-Mansion-Barbie-and-Oppenheimer-Split-H-2023.jpg?w=1024"} className="card-img-top" alt="..."/>
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:1}}>
          {name}
          <span class="visually-hidden">unread messages</span>
        </span>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p class="card-text"><small class="text-body-secondary">By {author?author:"Unknown"} on {date}</small></p>
          <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}
