import React from 'react'
import styles from './registercard.module.css';
import { useNavigate } from 'react-router-dom';

function RegisterCard({venue,ename,sdate,edate,cost,org,eid,imgPath,desc,incharge,artist,inchargeEmail,inchargePhone}) {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const fname = JSON.parse(localStorage.getItem('user')).fname;
    const lname = JSON.parse(localStorage.getItem('user')).lname;
    const email = JSON.parse(localStorage.getItem('user')).email;
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/payment/${fname} ${lname}/${ename}/${cost}/${email}/${userId}/${eid}`)
    }
  return (
    <div className={`${styles.register_card}`}>
                <h1 className={styles.h1}style={{"textTransform":"capitalize"}}>{ename}</h1>
                <img src={imgPath} alt="event"/>
                <div className={styles.text_content}>
                <div className={styles.desc}>
                    <p className={styles.p_h3}style={{"textTransform":"uppercase"}}>{desc}</p>
                </div>
                <div className={styles.venue}>
                  <p className={styles.p_h3}>Venue</p>
                  <p className={styles.p_h1}style={{"textTransform":"capitalize"}}>{venue?venue:"Venue Not assigned"}</p>
                </div>
                <div className={styles.date}>
                    <p className={styles.p_h3}>Date</p>
                    <p className={styles.p_h1}>{new Date(sdate).toLocaleString()}</p>
                    <p className={styles.p_h2}>{new Date(edate).toLocaleString()}</p>
                </div>
                <div className={styles.cost}>
                    <p className={styles.p_h3}>Cost</p>
                    <p className={styles.p_h1}>{cost}/-</p>
                </div>
                <div className={styles.organizer}>
                    <p className={styles.p_h3}>Organizer</p>
                    <p className={styles.p_h1} style={{"textTransform":"capitalize"}}>@{org}</p>
                </div>
                <div className={styles.artist}>
                    <p className={styles.p_h3}>Artist</p>
                    <p className={styles.p_h1} style={{"textTransform":"capitalize"}}>{artist?artist:"Artist Not assigned"}</p>
                </div>
                <div className={styles.incharge}>
                    <p className={styles.p_h3}>Event Co-Ordinator Details</p>
                    <p className={styles.p_h1}style={{"textTransform":"capitalize"}}>Name: {incharge}</p>
                    <p className={styles.p_h1}>Contact Number: {inchargePhone}</p>
                    <p className={styles.p_h1}>Email Id: {inchargeEmail}</p>
                </div>
            </div>
                <button className={styles.btn_primary} onClick={handleClick}>Register</button>
                {/* <div className={styles.share}>
                    <p className={styles.p_h3}>Share</p>
                    <span>
                        <img src="../images/facebook.png" alt="facebook"/>
                        <img src="../images/instagram.png" alt="instagram"/>
                        <img src="../images/twitter.png" alt="instagram"/>
                    </span>
                </div>   */}
                
            </div>
  )
}

export default RegisterCard