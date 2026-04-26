import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Video from './pages/Video/Video';
import Search from './pages/Search/Search';
import History from './pages/History/History';
import Settings from './pages/Settings/Settings';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {

  const [sidebar,setSideBar] = useState(window.innerWidth > 900);
  const [category, setCategory] = useState(0);

  return (
    <div>
      <ScrollToTop />
      <Navbar setSideBar={setSideBar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} setSideBar={setSideBar} category={category} setCategory={setCategory} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
        <Route path='/search/:searchQuery' element={<Search sidebar={sidebar} setSideBar={setSideBar} category={category} setCategory={setCategory} />}/>
        <Route path='/history' element={<History sidebar={sidebar} setSideBar={setSideBar} category={category} setCategory={setCategory} />}/>
        <Route path='/settings' element={<Settings sidebar={sidebar} setSideBar={setSideBar} category={category} setCategory={setCategory} />}/>
      </Routes>
    </div>
  )
}

export default App;