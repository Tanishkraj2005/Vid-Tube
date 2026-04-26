import React from 'react'
import './Sidebar.css'
import home from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import sports from '../../assets/sports.png'
import entertainement from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Sidebar = ({sidebar, setSideBar, category, setCategory}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (catId) => {
    setCategory(catId);
    if (window.innerWidth <= 900 && setSideBar) {
      setSideBar(false);
    }
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 900 && setSideBar) {
      setSideBar(false);
    }
  };

  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
      <div className='shortcut-links'>
        <div className={`side-link ${category===0?"active":""}`} onClick={()=>handleCategoryClick(0)}>
          <img src={home} alt=''/><p>Home</p>
        </div>
        <div className={`side-link ${category===20?"active":""}`} onClick={()=>handleCategoryClick(20)}>
          <img src={game_icon} alt=''/><p>Game Icon</p>
        </div>
        <div className={`side-link ${category===2?"active":""}`} onClick={()=>handleCategoryClick(2)}>
          <img src={automobiles} alt=''/><p>Automobiles</p>
        </div>
        <div className={`side-link ${category===17?"active":""}`} onClick={()=>handleCategoryClick(17)}>
          <img src={sports} alt=''/><p>Sports</p>
        </div>
        <div className={`side-link ${category===24?"active":""}`} onClick={()=>handleCategoryClick(24)}>
          <img src={entertainement} alt=''/><p>Entertainement</p>
        </div>
        <div className={`side-link ${category===28?"active":""}`} onClick={()=>handleCategoryClick(28)}>
          <img src={tech} alt=''/><p>Tech</p>
        </div>
        <div className={`side-link ${category===10?"active":""}`} onClick={()=>handleCategoryClick(10)}>
          <img src={music} alt=''/><p>Music</p>
        </div>
        <div className={`side-link ${category===22?"active":""}`} onClick={()=>handleCategoryClick(22)}>
          <img src={blogs} alt=''/><p>Blogs</p>
        </div>
        <div className={`side-link ${category===25?"active":""}`} onClick={()=>handleCategoryClick(25)}>
          <img src={news} alt=''/><p>News</p>
        </div>
        <hr/>
      </div>
      <div className='shortcut-links'>
        <Link to="/settings" onClick={handleLinkClick} className='side-link' style={{textDecoration: 'none', color: 'inherit'}}>
          <img src={news} alt=''/><p>Settings</p>
        </Link>
        <Link to="/history" onClick={handleLinkClick} className='side-link' style={{textDecoration: 'none', color: 'inherit'}}>
          <img src={blogs} alt=''/><p>Watch History</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;