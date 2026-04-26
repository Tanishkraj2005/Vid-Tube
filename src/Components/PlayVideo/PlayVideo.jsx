import React, { useEffect, useState, useContext, useRef } from 'react'
import './PlayVideo.css'

// Assets
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'

import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import { db } from '../../firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

const PlayVideo = () => {
  const {videoId} = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const { user } = useContext(AuthContext);
  const iframeRef = useRef(null);

  // Lock to landscape when iframe goes fullscreen (Android Chrome)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl && screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
      } else if (!fsEl && screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Fetch video
  const fetchVideoData = async () => {
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setApiData(data.items?.[0] || null);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch channel + comments
  const fetchOtherData = async () => {
    try {
      // Channel
      const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData?.snippet?.channelId}&key=${API_KEY}`;
      const res1 = await fetch(channelUrl);
      const data1 = await res1.json();
      setChannelData(data1.items?.[0] || null);

      // Comments (TOP comments first)
      const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&order=relevance&key=${API_KEY}`;
      const res2 = await fetch(commentUrl);
      const data2 = await res2.json();
      setCommentData(data2.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Video fetch
  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  // Channel + comments fetch
  useEffect(() => {
    if (apiData) {
      fetchOtherData();
    }
  }, [apiData]);

  // Add to History
  useEffect(() => {
    const addToHistory = async () => {
      if (apiData) {
        // Save to LocalStorage fallback
        const localHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
        const newEntry = {
          videoId,
          categoryId: apiData.snippet.categoryId || 0,
          title: apiData.snippet.title,
          channelTitle: apiData.snippet.channelTitle,
          thumbnail: apiData.snippet.thumbnails.medium.url,
          timestamp: new Date().getTime()
        };
        // Remove duplicates and prepend
        const filteredHistory = localHistory.filter(item => item.videoId !== videoId);
        localStorage.setItem('watchHistory', JSON.stringify([newEntry, ...filteredHistory]));

        // Save to Firebase
        if (user) {
          try {
            const historyRef = doc(db, "users", user.uid, "history", videoId);
            await setDoc(historyRef, {
              ...newEntry,
              timestamp: serverTimestamp()
            }, { merge: true });
          } catch (error) {
            console.error("Error adding to Firebase history, using localStorage only.", error);
          }
        }
      }
    };
    addToHistory();
  }, [user, apiData, videoId]);

  return (
    <div className='play-video'>

      {/* Video */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        title="video"
      ></iframe>

      {/* Title */}
      <h3>{apiData?.snippet?.title || "Title Here"}</h3>

      {/* Info */}
      <div className='play-video-info'>
        <p>
          {value_converter(apiData?.statistics?.viewCount || 16000)} &bull;{" "}
          {apiData?.snippet?.publishedAt
            ? moment(apiData.snippet.publishedAt).fromNow()
            : ""}
        </p>

        <div>
          <span>
            <img src={like} alt="" />
            {value_converter(apiData?.statistics?.likeCount || 0)}
          </span>
          <span><img src={dislike} alt="" /> 2</span>
          <span><img src={share} alt="" /> Share</span>
          <span><img src={save} alt="" /> Save</span>
        </div>
      </div>

      <hr />

      {/* Channel */}
      <div className='publisher'>
        <img
          src={channelData?.snippet?.thumbnails?.default?.url || jack}
          alt=""
        />
        <div>
          <p>{apiData?.snippet?.channelTitle}</p>
          <span>
            {value_converter(channelData?.statistics?.subscriberCount || 0)} Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      {/* Description */}
      <div className='vid-description'>
        <p>{apiData?.snippet?.description?.slice(0, 250)}</p>

        <hr />
        <h4>
          {value_converter(apiData?.statistics?.commentCount || 0)} Comments
        </h4>

        {/* Comments */}
        {commentData.map((item, index) => {
          const comment = item.snippet.topLevelComment.snippet;

          return (
            <div key={index} className='comment'>
              <img src={comment.authorProfileImageUrl || user_profile} alt="" />
              <div>
                <h3>
                  {comment.authorDisplayName}{" "}
                  <span>{moment(comment.publishedAt).fromNow()}</span>
                </h3>
                <p>{comment.textDisplay}</p>

                <div className='comment-action'>
                  <img src={like} alt="" />
                  <span>{comment.likeCount}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;