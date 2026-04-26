import React, { useContext } from 'react';
import './Settings.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { ThemeContext } from '../../ThemeContext';
import { AuthContext } from '../../AuthContext';

const Settings = ({ sidebar, setSideBar, category, setCategory }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <Sidebar sidebar={sidebar} setSideBar={setSideBar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? "" : 'large-container'}`}>
        <div className="settings-page">
          <h1 className="settings-title">Settings</h1>
          
          <div className="settings-section">
            <h2>Appearance</h2>
            <div className="settings-row">
              <p>Theme: {theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
              <button className="settings-btn" onClick={toggleTheme}>Toggle Theme</button>
            </div>
          </div>

          <div className="settings-section">
            <h2>Account</h2>
            {user ? (
              <div className="settings-row">
                <div>
                  <p><strong>Name:</strong> {user.displayName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              </div>
            ) : (
              <p>Please sign in to manage your account.</p>
            )}
          </div>

          <div className="settings-section">
            <h2>History</h2>
            <div className="settings-row">
              <p>Manage your watch history data.</p>
              <button className="settings-btn" onClick={() => window.location.href = '/history'}>View History</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
