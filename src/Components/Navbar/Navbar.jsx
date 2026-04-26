import React, { useContext, useState, useEffect, useRef } from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import profile_icon from '../../assets/jack.png'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../ThemeContext'
import { AuthContext } from '../../AuthContext'
import { signInWithGoogle, logout } from '../../firebase'

const Navbar = ({ setSideBar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  }

  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img className='menu-icon' onClick={() => setSideBar(prev => prev === false ? true : false)} src={menu_icon} alt='' />
        <Link to='/'><img className='logo' src={logo} alt='' /></Link>
      </div>

      <div className='nav-middle flex-div'>
        <form className='search-box flex-div' onSubmit={handleSearch}>
          <input type='text' placeholder='Search Any Video' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button type='submit' style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><img src={search_icon} alt='' /></button>
        </form>
      </div>

      <div className='nav-right flex-div'>
        <button className='theme-toggle' onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {user ? (
          <div className="profile-container" ref={dropdownRef}>
            <img src={user.photoURL || profile_icon} className='user-icon' alt='' onClick={() => setShowDropdown(!showDropdown)} title="Profile" />
            {showDropdown && (
              <div className="profile-dropdown">
                <p className="dropdown-name">{user.displayName}</p>
                <p className="dropdown-email">{user.email}</p>
                <button onClick={() => { logout(); setShowDropdown(false); }} className="dropdown-logout">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={signInWithGoogle} className="login-btn">Sign In</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar