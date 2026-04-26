import React, { useEffect, useState } from 'react'
import './Feed.css'
import {API_KEY} from '../../data'
import {value_converter} from '../../data'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Feed = ({category}) => {

    const[data,setData] = useState([])

    const fetchData = async () =>{
        const videoList_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&videoCategoryId=${category}&maxResults=50&key=${API_KEY}`
        await fetch(videoList_url)
        .then(response => response.json())
        .then(data => {
            // Shuffle the videos to make them look new on every reload
            const shuffled = data.items ? [...data.items].sort(() => Math.random() - 0.5) : [];
            setData(shuffled);
        })
        .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchData()
    },[category])

  return (
    <div className='feed'>
        {data.map((item,index)=>{
            return (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className='card' key={index}>
                <img src={item.snippet.thumbnails.medium.url} alt=''/>
                <h2>{item.snippet.title}</h2>
                <h3>{item.snippet.channelTitle}</h3>
                <p>{value_converter(item.statistics.viewCount)}&bull; {moment(item.snippet.publishedAt).fromNow()}</p>
            </Link>
            )
        })}
        
    </div>
    
  )
}
export default Feed