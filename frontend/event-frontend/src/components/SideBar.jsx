import React, { useEffect, useState } from "react";
import styles from './sidebar.module.css';
import { Link } from "react-router-dom";
import calenderWhite from "../../public/images/calendar-white.png";
import dateWhite from '../../public/images/date-white.png';
import powerOff from '../../public/images/power-off.png';
import profileWhite from '../../public/images/profile-white.png';
import stage from '../../public/images/stage.png';

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
            src={calenderWhite}
            alt="my-events"
            className="my-events"
          />
        </Link>
      </div>
      <div>
        <Link to="/login">
        <img src={powerOff} alt="logout" className="logout" onClick={logOut}/>
      </Link>
      <Link to="/dash/profile">
        <img src="../images/profile-white.png" alt="profile" className="profile" />
      </Link>
      </div>
      </div>)
      :
      (<div className={styles.sidebar}>
        <div>
        <Link to="/dash/add-event">
          <img
            src={dateWhite}
            alt="add-event"
            className="add-event"
          />
        </Link>
        <Link to="/dash/add-artist">
          <img
            src={profileWhite}
            alt="add-artist"
            className="add-artist"
          />
        </Link>
        <Link to="/dash/add-venue">
          <img
            src={stage}
            alt="add-venue"
            className="add-artist"
          />
        </Link>
      </div>
      <div>
        <Link to="/login">
        <img src={powerOff} alt="logout" className="logout" onClick={logOut}/>
      </Link>
      </div>
      </div>)
      }
      </>
  );
}

export default SideBar;
