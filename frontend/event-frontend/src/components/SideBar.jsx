import React, { useEffect, useState } from "react";
import styles from './sidebar.module.css';
import { Link } from "react-router-dom";

function SideBar() {
  const logOut = ()=>{
    localStorage.removeItem('user')
  }
const [role,setRole] = useState();
  useEffect(()=>{
    const role = JSON.parse(localStorage.getItem('user')).role;
    setRole(role);
  },[])

  return (
    <>
    {
      role==="viewer"?
      (<div className={styles.sidebar}>
        <div>
        <Link to="/dash/home">
          <img src="../images/home-white.png" alt="home" className="home" />
        </Link>
        <Link to="/dash/all-events">
          <img
            src="../images/event-white.png"
            alt="all-events"
            className="all-events"
          />
        </Link>
        <Link to="/dash/my-events">
          <img
            src="../images/calendar-white.png"
            alt="my-events"
            className="my-events"
          />
        </Link>
      </div>
      <div>
        <Link to="/login">
        <img src="../images/power-off.png" alt="logout" className="logout" onClick={logOut}/>
      </Link>
      {/* <Link to="/dash/profile">
        <img src="../images/profile-white.png" alt="profile" className="profile" />
      </Link> */}
      </div>
      </div>)
      :
      (<div className={styles.sidebar}>
        <div>
        <Link to="/dash/add-event">
          <img
            src="../images/date-white.png"
            alt="add-event"
            className="add-event"
          />
        </Link>
        <Link to="/dash/my-events">
          <img
            src="../images/calendar-white.png"
            alt="my-events"
            className="my-events"
          />
        </Link>
      </div>
      <div>
        <Link to="/login">
        <img src="../images/power-off.png" alt="logout" className="logout" onClick={logOut}/>
      </Link>
      </div>
      </div>)
      }
      </>
  );
}

export default SideBar;
