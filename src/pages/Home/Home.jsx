import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Home.css'
import Feed from '../../Components/Feed/Feed'

export const Home = ({sidebar, setSideBar, category, setCategory}) => {
  return (
    <>
      <Sidebar sidebar={sidebar} setSideBar={setSideBar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar?"":'large-container'}`}>
        <Feed category={category}/>
      </div>
    </>
  )
}
export default Home;