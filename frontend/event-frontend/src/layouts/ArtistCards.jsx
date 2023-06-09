import React from 'react'
import styles from './artistcards.module.css';
import { Link } from 'react-router-dom';

function ArtistCards() {
  return (
    <div className={`${styles.content_card} ${styles.artist_cards}`}>
                <div className={styles.title}>
                   <h1>Artists & Organizers</h1>
                   <p className={styles.see_all}><Link to="#">See All</Link></p>
                </div>
                <div className={styles.artists}>
                    <div className={styles.linear_artist_section}>
                        <div className={`${styles.artist} ${styles.linear}`}>
                        <img src="../images/jassie.jpeg" alt="jassy"/>
                        <div className={styles.text_content}>
                           <p className={styles.p_h2}>Jassie Gift</p>
                            <p className={styles.p_h3}>Melodies that ignite joy, making hearts dance.</p> 
                        </div>
                        <button className={styles.follow_btn}>Follow</button>
                    </div>
                    <div className={`${styles.artist} ${styles.linear}`}>
                        <img src="../images/jassie.jpeg" alt="jassy"/>
                        <div className={styles.text_content}>
                           <p className={styles.p_h2}>Jassie Gift</p>
                            <p className={styles.p_h3}>Melodies that ignite joy, making hearts dance.</p> 
                        </div>
                        <button className={styles.follow_btn}>Follow</button>
                    </div>
                    <div className={`${styles.artist} ${styles.linear}`}>
                        <img src="../images/jassie.jpeg" alt="jassy"/>
                        <div className={styles.text_content}>
                           <p className={styles.p_h2}>Jassie Gift</p>
                            <p className={styles.p_h3}>Melodies that ignite joy, making hearts dance.</p> 
                        </div>
                        <button className={styles.follow_btn}>Follow</button>
                    </div>
                    </div>
                    <div className={styles.vertical_artist_section}>
                     <div className={`${styles.artist} ${styles.vertical}`}>
                        <img src="../images/neeraj.jpeg" alt="neeraj"/>
                        <div className={styles.text_content}>
                            <div>
                                <p className={styles.p_h1}>Neeraj Madhav</p>
                                 <p className={styles.p_h3}>@neerajmadhav</p>
                            </div>
                            <button className={styles.follow_btn}>Follow</button>
                        </div>
                        <p className={styles.p_h2}>Melodies that spark joy, a musical maestro who effortlessly weaves enchanting tunes, leaving hearts dancing and spirits soaring.</p> 
                    </div>   
                    </div>
                    
                </div>
            </div>
  )
}

export default ArtistCards