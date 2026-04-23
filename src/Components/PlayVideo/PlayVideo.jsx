import React from 'react'
import './PlayVideo.css'

// Assets
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'

const PlayVideo = () => {
  return (
    <div className='play-video'>

      {/* Video Player */}
      <video src={video1} controls autoPlay muted />

      {/* Title */}
      <h3>Best YouTube Channel To Learn Web Development</h3>

      {/* Video Info */}
      <div className='play-video-info'>
        <p>1234 Views &bull; 2 days ago</p>
        <div>
          <span><img src={like} alt="like" /> 125</span>
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
          <p>GreatStack</p>
          <span>1M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      {/* Description */}
      <div className='vid-description'>
        <p>Channel that makes learning easy</p>
        <p>Subscribe to GreatStack to watch more tutorials on web development</p>

        <hr />
        <h4>130 Comments</h4>

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