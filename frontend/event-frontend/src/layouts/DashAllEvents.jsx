import React,{ useEffect,useState } from 'react'
import RegisterCard from '../components/RegisterCard';
import styles from './dashallevents.module.css';
import axios from 'axios';
import paths from '../paths';

function DashAllEvents() {
    const [events,setEvents] = useState([]);
    const [venue,setVenue] = useState();
    const [ename,setEname] = useState();
    const [sdate,setSdate] = useState();
    const [edate,setEdate] = useState();
    const [cost,setCost] = useState();
    const [org,setOrg] = useState();
    const [eid,setEid] = useState();
    const [imgPath,setImgPath] = useState();

    useEffect(()=>{
        axios.get(paths.allEvents).then((res)=>{
            if(res.data){
                setEvents(res.data)
                setVenue(res.data[0].venue);
                setCost(res.data[0].cost);
                setEdate(res.data[0].end);
                setSdate(res.data[0].start);
                setEname(res.data[0].eventName);
                setOrg(res.data[0].organizer);
                setEid(res.data[0].eventId);
                setImgPath(res.data[0].imagePath);
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const handleClick = (id)=>{
        let data = events.filter(event=>event.eventId===id);
        setVenue(data[0].venue);
        setCost(data[0].cost);
        setEdate(data[0].end);
        setSdate(data[0].start);
        setEname(data[0].eventName);
        setOrg(data[0].organizer);
        setEid(data[0].eventId);
        setImgPath(data[0].imagePath);
    }
  return (
    <>
            <div className={styles.reg_events_card}>
                <div className={styles.title}>
                    <h1>All Events</h1>
                </div>
                <div className={styles.reg_events}>
                {
                    events.map((val,index)=>(
                                <div className={styles.event} key={val.eventId} onClick={()=>handleClick(val.eventId)}>
                                    <img src={val.imagePath} alt={val.eventName}/>
                                    <p className="p-h1">{val.eventName}</p>
                                    <p className="p-h3">@{val.organizer}</p>
                                    <span><img src="../images/jassie.jpeg" alt="jassie"/></span>
                                </div>
                            )
                        )  
                }
                </div>
            </div>
            <RegisterCard venue={venue} ename={ename} sdate={sdate} edate={edate} cost={cost} org={org} eid={eid} imgPath={imgPath}/>   
        </>
  )
}

export default DashAllEvents