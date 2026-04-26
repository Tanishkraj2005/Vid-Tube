import React, { useEffect, useState } from 'react';
import './Search.css';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Search = ({ sidebar, setSideBar, category, setCategory }) => {
  const { searchQuery } = useParams();
  const [data, setData] = useState([]);

  const fetchSearchData = async () => {
    const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&type=video&key=${API_KEY}`;
    await fetch(searchUrl)
      .then((res) => res.json())
      .then((resData) => setData(resData.items || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSearchData();
  }, [searchQuery]);

  return (
    <>
      <Sidebar sidebar={sidebar} setSideBar={setSideBar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? "" : 'large-container'}`}>
        <div className="search-results">
          {data.map((item, index) => {
            return (
              <Link to={`/video/0/${item.id.videoId}`} className="search-card" key={index}>
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <div className="search-info">
                  <h2>{item.snippet.title}</h2>
                  <p className="search-channel">{item.snippet.channelTitle}</p>
                  <p className="search-desc">{item.snippet.description}</p>
                  <p className="search-time">{moment(item.snippet.publishedAt).fromNow()}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
