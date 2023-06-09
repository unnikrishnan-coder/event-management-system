import React from 'react'
import styles from './eventpopup.module.css';
import { Link } from 'react-router-dom';

function EventPopUp({display,func}) {
  const closePop = ()=>{
    func("none")
  }
  return (
    <div className={styles.popup} style={{display: display}}>
            <img src="images/NK034.jpg" name="img" alt="Event 2"/>
            <span className={styles.close} onClick={closePop} name="close">X</span>
            <h2 className={styles.title} name="title">Nirvana Nation</h2>
            <p className={styles.desc} name="desc">a night of music and entertainment</p>
            <div className={styles.spans} name="spans">
                <span id="price" name="price">200/-</span>
                <span id="date" name="date">18-12-2002</span>
                <span id="venue" name="venue">Nakshathra</span>
                <span id="org" name="organizer">Saintgits</span>
            </div>
            
            <Link to="/login" className={styles.btn} id="popupsubmit" name="register">Register Now</Link>
    </div>
  )
}

export default EventPopUp