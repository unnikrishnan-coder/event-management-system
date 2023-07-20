import React, { useEffect, useState } from 'react'
import styles from './dashmyevents.module.css';
import axios from 'axios';
import paths from '../paths';
// import {QRCodeCanvas} from 'qrcode.react';
import { useAlert } from 'react-alert';

function DashMyEvents() {
    const [popupDisplay,setPopUpDisplay] = useState("none");
    const [events,setEvents] = useState([]);
    const [qrData,setQrData] = useState({});
    const [qrEventData,setQrEventData] = useState({});
    const alert = useAlert();

    const openPopup = (eid)=>{
        let userId = JSON.parse(localStorage.getItem('user')).id;
        if(popupDisplay === "flex"){
            return
        }
        axios.get(`${paths.getQR}/${userId}/${eid}`).then((res)=>{
            setQrData(res.data[0]);
            setQrEventData(events.filter(val=>val.eventId==eid)[0]);
        }).catch((err)=>{
            console.log(err);
            alert.error("Error while fetching registration information")
        })
        setPopUpDisplay("flex")
    }
    const closePop = ()=>{
        if(popupDisplay === "none"){
            return
        }
        setPopUpDisplay("none")
    }

    useEffect(()=>{
        let userId = JSON.parse(localStorage.getItem('user')).id;
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
                {/* <QRCodeCanvas value="nirvana nation" className='qr'/> */}
                <h1 className={styles.h1}>{qrEventData.eventName}</h1>
                <h1 className="p-h1">{new Date(qrEventData.start).toLocaleString()}</h1>
                <h1 className="p-h1">{new Date(qrEventData.end).toLocaleString()}</h1>
                <h1 className="p-h1">{qrEventData.VENUE}</h1>
                <h1 className="p-h1">{qrEventData.incharge}</h1>
                <h1 className="p-h1">{qrEventData.incharge_email}</h1>
                <h1 className="p-h1">{qrEventData.incharge_phone}</h1>
                <p className="p-h1">Reference ID: {qrData.REF_ID}</p>
                <p className="p-h1">Check In Status: {qrData.CHECKEDIN==0?"Not Checked In":"Checked In"}</p>
            </div>
                <div className={styles.title}>
                    <h1>Registered Events</h1>
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

export default DashMyEvents