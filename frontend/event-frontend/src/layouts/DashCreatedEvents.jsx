import React, { useEffect, useState } from 'react'
import styles from './dashcreatedevents.module.css';
import axios from 'axios';
import paths from '../paths';

function DashCreatedEvents() {
    const [popupDisplay,setPopUpDisplay] = useState("none");
    const [events,setEvents] = useState([]);
    const [venue,setVenue] = useState();
    const [ename,setEname] = useState();
    const [sdate,setSdate] = useState();
    const [edate,setEdate] = useState();
    const [cost,setCost] = useState();
    const [org,setOrg] = useState();
    const [eid,setEid] = useState();
    const [desc,setDesc] = useState();

    const openPopup = (id)=>{
        if(popupDisplay === "flex"){
            return
        }
        setPopUpDisplay("flex")
        const event = events.filter(event=>event.eventId===id);
        setVenue(event[0].venue);
        setCost(event[0].cost);
        setEdate(event[0].end);
        setSdate(event[0].start);
        setEname(event[0].eventName);
        setOrg(event[0].organizer);
        setEid(event[0].eventId);
        setDesc(event[0].description);

    }
    const closePop = ()=>{
        if(popupDisplay === "none"){
            return
        }
        setPopUpDisplay("none")
    }

    const deleteEvent = (eid)=>{
        const userId = JSON.parse(localStorage.getItem('user')).id;
        axios.get(`${paths.deleteEvent}/${userId}/${eid}`).then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
        closePop()
    }
    useEffect(()=>{
        const userId = JSON.parse(localStorage.getItem('user')).id;
        axios.get(`${paths.createdEvents}?uid=${userId}`).then((res)=>{
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
                {/* <img src="../images/qr.png" alt="qr" className="qr"/> */}
                <h1 className={styles.h1}>{ename}</h1>
                <p className="p-h1">{sdate} - {edate}</p>
                <p className="p-h1">Organizer: {org}</p>
                <p className="p-h1">Venue: {venue}</p>
                <p className="p-h1">Description: {desc}</p>
                <p className="p-h1">Cost: {cost}</p>
                <button className={styles.btn_primary} onClick={()=>deleteEvent(eid)}>Delete Event</button>

            </div>
                <div className={styles.title}>
                    <h1>Created Events</h1>
                </div>
                <div className={styles.reg_events}>
                    {
                        events.map((val,index)=>(
                            <div className={styles.event} onClick={()=>openPopup(val.eventId)} key={val.eventId}>
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

export default DashCreatedEvents;