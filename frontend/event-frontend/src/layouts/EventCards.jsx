import React from "react";
import styles from "./eventcards.module.css";
import { Link } from "react-router-dom";

function EventCards({ events, handleClick }) {

    const handClick = (id)=>{
        handleClick(id);
    }
  return (
    <div className={`${styles.event_cards} ${styles.content_card}`}>
      <div className={styles.title}>
        <h1>Trending This Week In Saintgits</h1>
        <p className={styles.see_all}>
          <Link to="/dash/all-events">See All</Link>
        </p>
      </div>
      <div className={styles.events}>
        {events.map((val, index) => (
          <div className={styles.event} key={val.eventId} onClick={()=>handClick(val.eventId)}>
            <img src={val.imagePath} alt="" />
            <p className={styles.p_h1}>{val.eventName}</p>
            <p className={styles.p_h3}>@{val.organizer}</p>
            <span>
              <img src="../images/jassie.jpeg" alt="jassie" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCards;
