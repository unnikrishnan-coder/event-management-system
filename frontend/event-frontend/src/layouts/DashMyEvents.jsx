import React, { useEffect, useState } from 'react'
import styles from './dashmyevents.module.css';
import axios from 'axios';
import paths from '../paths';

function DashMyEvents() {
    const [popupDisplay,setPopUpDisplay] = useState("none");
    const [events,setEvents] = useState([]);
    const openPopup = ()=>{
        if(popupDisplay === "flex"){
            return
        }
        setPopUpDisplay("flex")
    }
    const closePop = ()=>{
        if(popupDisplay === "none"){
            return
        }
        setPopUpDisplay("none")
    }

    useEffect(()=>{
        const userId = JSON.parse(localStorage.getItem('user')).id;
        axios.get(`${paths.regEvents}?uid=${userId}`).then((res)=>{
            setEvents(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <>
        <div className={styles.reg_events_card}>
            <div className={styles.ticket_popup} style={{display:popupDisplay}}>
                <span className={styles.close_popup} onClick={closePop}>X</span>
                <img src="../images/qr.png" alt="qr" className="qr"/>
                <h1 className={styles.h1}>Nirvana Nation</h1>
                <p className="p-h1">18 Nov 2022</p>
                <p className="p-h1">Ticket Owners Name: Unnikrishnan</p>
            </div>
                <div className={styles.title}>
                    <h1>Registered Events</h1>
                </div>
                <div className={styles.reg_events}>
                    {
                        events.map((val,index)=>(
                            <div className={styles.event} onClick={openPopup} key={val.eventId}>
                        <img src={val.imagePath} alt=""/>
                        <p className="p-h1">{val.eventName}</p>
                        <p className="p-h3">@{val.organizer}</p>
                        <span><img src="../images/jassie.jpeg" alt="jassie"/></span>
                    </div>
                        ))
                    }
                    
                </div>
            </div>
    </>
  )
}

export default DashMyEvents