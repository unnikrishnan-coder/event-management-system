import React, { useEffect, useState } from 'react'
import styles from './registercard.module.css';
import exstyles from '../layouts/dashallevents.module.css';
import { useNavigate } from 'react-router-dom';

function RegisterCard({venue,ename,sdate,edate,cost,org,eid,imgPath}) {

    const userId = JSON.parse(localStorage.getItem('user')).id;
    const fname = JSON.parse(localStorage.getItem('user')).fname;
    const lname = JSON.parse(localStorage.getItem('user')).lname;
    const email = JSON.parse(localStorage.getItem('user')).email;
    // const [registered,setRegistered] = useState(false);

    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/payment/${fname} ${lname}/${ename}/${cost}/${email}/${userId}/${eid}`)
    }
    // useEffect(()=>{
    //     const reg_events = localStorage.getItem('reg_events');
    //     if(reg_events){
    //         if(eid in reg_events){
    //         setRegistered(true);
    //     }
    //     }
        
    // },[])
  return (
    <div className={`${styles.register_card} ${exstyles.register_card}`}>
                <h1 className={styles.h1}>{ename}</h1>
                <img src={imgPath} alt="event"/>
                <div className={styles.text_content}>
                  <div className={styles.venue}>
                  <p className={styles.p_h3}>Venue</p>
                  <p className={styles.p_h1}>{venue}</p>
                </div>
                <div className={styles.date}>
                    <p className={styles.p_h3}>Date</p>
                    <p className={styles.p_h1}>{sdate}</p>
                    <p className={styles.p_h2}>{edate}</p>
                </div>
                <div className={styles.cost}>
                    <p className={styles.p_h3}>Cost</p>
                    <p className={styles.p_h1}>{cost}/-</p>
                </div>
                <div className={styles.organizer}>
                    <p className={styles.p_h3}>Organizer</p>
                    <p className={styles.p_h1}>@{org}</p>
                </div>
            </div>
                <button className={styles.btn_primary} onClick={handleClick}>Buy Tickets</button>
                <div className={styles.share}>
                    <p className={styles.p_h3}>Share</p>
                    <span>
                        <img src="../images/facebook.png" alt="facebook"/>
                        <img src="../images/instagram.png" alt="instagram"/>
                        <img src="../images/twitter.png" alt="instagram"/>
                    </span>
                </div>  
                
            </div>
  )
}

export default RegisterCard