import React, { useEffect, useState, useContext } from 'react';
import './History.css';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { AuthContext } from '../../AuthContext';
import { db } from '../../firebase';
import { collection, query, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import moment from 'moment';

const History = ({ sidebar, setSideBar, category, setCategory }) => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      // Always load local history first
      const localHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
      setHistory(localHistory);

      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "users", user.uid, "history"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const historyData = [];
        querySnapshot.forEach((doc) => {
          historyData.push({ id: doc.id, ...doc.data() });
        });
        
        if (historyData.length > 0) {
           const uniqueHistory = [];
           const seenVideos = new Set();
           historyData.forEach(item => {
              if(!seenVideos.has(item.videoId)){
                  seenVideos.add(item.videoId);
                  uniqueHistory.push(item);
              }
           });
           setHistory(uniqueHistory);
        }
      } catch (error) {
        console.error("Error fetching Firebase history, falling back to local:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  const clearHistory = async () => {
    localStorage.removeItem('watchHistory');
    setHistory([]);
    if (user) {
      try {
        const snapshot = await getDocs(collection(db, 'users', user.uid, 'history'));
        snapshot.forEach(async (item) => {
          await deleteDoc(doc(db, 'users', user.uid, 'history', item.id));
        });
      } catch (err) {
        console.error('Could not clear Firebase history:', err);
      }
    }
  };

  return (
    <>
      <Sidebar sidebar={sidebar} setSideBar={setSideBar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? "" : 'large-container'}`}>
        <div className="history-page">
          <div className="history-header">
            <h1 className="history-title">Watch History</h1>
            {history.length > 0 && (
              <button className="clear-history-btn" onClick={clearHistory}>🗑 Clear History</button>
            )}
          </div>
          {loading && history.length === 0 ? (
             <p className="history-message">Loading history...</p>
          ) : history.length === 0 ? (
             <p className="history-message">No watch history found. Watch some videos!</p>
          ) : (
             <div className="history-list">
               {history.map((item, index) => (
                 <Link to={`/video/${item.categoryId || 0}/${item.videoId}`} className="history-card" key={index}>
                    <img src={item.thumbnail} alt="" />
                    <div className="history-info">
                       <h2>{item.title}</h2>
                       <p className="history-channel">{item.channelTitle}</p>
                       <p className="history-time">Watched {item.timestamp ? moment(typeof item.timestamp === 'number' ? item.timestamp : item.timestamp.toDate()).fromNow() : 'recently'}</p>
                    </div>
                 </Link>
               ))}
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
