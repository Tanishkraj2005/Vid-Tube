import React, { useEffect, useState } from 'react'
import './PlayVideo.css'

// Assets
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import {API_KEY, value_converter} from '../../data'  
import moment from 'moment'
const PlayVideo = ({videoId}) => {

  const[apiData,setApiData] = useState(null);

  const fetchVideoData = async () =>{
    // Fetching Videos Data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url).then(res=>res.json()).then(data=> setApiData(data.items[0]));
  }
  useEffect(()=>{
    fetchVideoData();
  },[videoId])

  return (
    <div className='play-video'>

      {/* Video Player */}
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      {/* Title */}
      <h3>{apiData?.snippet.title || "Title Here"}</h3>

      {/* Video Info */}
      <div className='play-video-info'>
        <p>{apiData?value_converter(apiData.statistics.viewCount): "16K"} &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
        <div>
          <span><img src={like} alt="like" />{apiData?value_converter(apiData.statistics.likeCount) : 16}</span>
          <span><img src={dislike} alt="dislike" /> 2</span>
          <span><img src={share} alt="share" /> Share</span>
          <span><img src={save} alt="save" /> Save</span>
        </div>
      </div>

      <hr />

      {/* Publisher */}
      <div className='publisher'>
        <img src={jack} alt="channel logo" />
        <div>
          <p>{apiData?apiData.snippet.channelTitle:""}</p>
          <span>1M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      {/* Description */}
      <div className='vid-description'>
        <p>{apiData?apiData.snippet.description.slice(0,250):"Description Here"  }</p>

        <hr />
        <h4>{apiData?value_converter(apiData.statistics.commentCount):10}</h4>

        {/* Comment */}
        <div className='comment'>
          <img src={user_profile} alt="user profile" />
          <div>
            <h3>
              Jack Nicholson <span>1 day ago</span>
            </h3>
            <p>
              A global computer network providing a variety of information through 
              interconnected networks using standardized communication protocols.
            </p>

            <div className='comment-action'>
              <img src={like} alt="like" />
              <span>244</span>
              <img src={dislike} alt="dislike" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PlayVideo