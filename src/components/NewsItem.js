import React from 'react'

const NewsItem = (props) => {
    return (
        <div className="card my-3" style={{ width: "20.2rem" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                <span className="badge rounded-pill bg-danger">
                    {props.source}</span>
            </div>
            <img style={{ height: "12rem" }} src={!props.imageUrl ? "https://www.theweek.in/content/dam/week/magazine/theweek/cover/images/2022/8/13/121-Indias-Mars-Orbiter-Mission.jpg" : props.imageUrl} className="card-img-top" alt="..." />
            <div className="card-body" style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? '#404742' : 'white' }}>
                <h5 className="card-title">{props.title}....</h5>
                <p className="card-text">{props.description}....</p>
                <p className="card-text"><small className={`text-${props.mode === 'dark' ? 'white' : 'black'}`}>By {!props.author ? "unkown" : props.author} on {new Date(props.date).toGMTString()}</small></p>
                <a href={props.newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
    )
}

export default NewsItem