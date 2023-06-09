import React from 'react'
import styles from'./eventcard.module.css'

function EventCard({func}) {
  const openPopUp = ()=>{
    func("grid")
  }
  return (
    <div className={styles.event} data-tag="nirvana" data-id="#1">
        <img src="images/NK038.jpg" alt="Event 1"></img>
        <p>Join us for a night of music featuring local bands and special guests.</p>
        <button className={styles.btn} id="cardsubmit" onClick={openPopUp}>See Info</button>
    </div>
  )
}

export default EventCard