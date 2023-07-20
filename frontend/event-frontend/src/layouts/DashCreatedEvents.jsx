import React, { useEffect, useState } from 'react'
import styles from './dashcreatedevents.module.css';
import axios from 'axios';
import paths from '../paths';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

function DashCreatedEvents() {
    const alert = useAlert();
    const [popupDisplay,setPopUpDisplay] = useState("none");
    const [events,setEvents] = useState([]);
    const [venue,setVenue] = useState();
    const [ename,setEname] = useState();
    const [sdate,setSdate] = useState();
    const [edate,setEdate] = useState();
    const [cost,setCost] = useState();
    const [org,setOrg] = useState();
    const [artist,setArtist] = useState();
    const [artists,setArtists] = useState();
    const [eid,setEid] = useState();
    const [desc,setDesc] = useState();
    const [img,setImg] = useState();
    const [registrations,setRegistrations] = useState(0);
    const navigate = useNavigate();
    const [venues,setVenues] = useState([]);
    const [filterEvents,setFilterEvents] = useState([]);
    const [filter,setFilter] = useState(2);
    const [publish,setPublish] = useState();
    const [incharge,setIncharge] = useState("");
    const [inchargePhone,setInchargePhone] = useState("");
    const [inchargeEmail,setInchargeEmail] = useState("");

    const handleFilter = ()=>{
        if(filter==1){
            setFilterEvents(events);
        }else if(filter==2){
            setFilterEvents(events.filter(val=>val.VENUE === null));
        }else if(filter==3){
            setFilterEvents(events.filter(val=>val.VENUE !== null));
        }else if(filter==4){
            setFilterEvents(events.filter(val=>val.artistId === null));
        }else if(filter==5){
            setFilterEvents(events.filter(val=>val.artistId !== null));
        }else if(filter==6){
            setFilterEvents(events.filter(val=>val.published == 1));
        }else if(filter==7){
            setFilterEvents(events.filter(val=>val.published == 0));
        }else{
            setFilterEvents(events);
        }
    }

    const openPopup = (id)=>{
        if(popupDisplay === "flex"){
            return
        }
        setPopUpDisplay("flex")
        const event = events.filter(event=>event.eventId===id);
        let popupVenue;
        popupVenue = venues.filter(item=>item.id===event[0].VENUE);
        if(popupVenue.length >=1){
            setVenue(popupVenue[0].NAME);
        }else{
            setVenue("Not assigned")
        }
        let popupartist;
        popupartist = artists.filter(item=>item.artistId===event[0].artistId);
        if(popupartist.length >=1){
            setArtist(popupartist[0].name);
        }else{
            setArtist("Not assigned")
        }
        let startingDate = new Date(event[0].start);
        let endingDate = new Date(event[0].end);
        setCost(event[0].cost);
        setEdate(endingDate.toLocaleString());
        setSdate(startingDate.toLocaleString());
        setEname(event[0].eventName);
        setOrg(event[0].organizer);
        setEid(event[0].eventId);
        setDesc(event[0].description);
        setImg(event[0].imagePath);
        setRegistrations(event[0].registrations);
        setPublish(event[0].published);
        setIncharge(event[0].incharge);
        setInchargeEmail(event[0].incharge_email);
        setInchargePhone(event[0].incharge_phone);
    }
    const closePop = ()=>{
        if(popupDisplay === "none"){
            return
        }
        setPopUpDisplay("none");
        setVenue();
        setCost();
        setEdate();
        setSdate();
        setEname();
        setOrg();
        setEid();
        setDesc();
        setImg();
        setRegistrations();
        setPublish();
        setIncharge();
        setInchargeEmail();
        setInchargePhone();
    }

    const deleteEvent = (eid)=>{
        const confirm = window.confirm("Do you want to delete this event?")
        if(confirm){
            const userId = JSON.parse(localStorage.getItem('user')).id;
            axios.delete(`${paths.deleteEvent}/${userId}/${eid}`).then((res)=>{
                alert.success(res.data);
                let filterData = filterEvents.filter(val=>val.eventId!=eid);
                setFilterEvents(filterData);
            }).catch((err)=>{
                console.log(err);
                alert.error("Deletion was not successfull!")
            })
            closePop()
            navigate("/dash/my-events")
        }
        return
        
    }

    const updateEvent = (eid)=>{
        navigate(`/dash/update-event/${eid}`)
    }
    useEffect(()=>{
        const userId = JSON.parse(localStorage.getItem('user')).id;
        axios.get(`${paths.createdEvents}?uid=${userId}`).then((res)=>{
            setEvents(res.data);
            setFilterEvents(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get(paths.viewVenues).then((res)=>{
            setVenues(res.data);
        }).catch((err)=>{
            console.log(err);
        })

        axios.get(paths.viewArtists).then((res)=>{
            setArtists(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <>
        <div className={styles.reg_events_card}>
            <div className={styles.ticket_popup} style={{display:popupDisplay}}>
                <span className={styles.close_popup} onClick={closePop}>X</span>
                <h1 className={styles.h1} style={{fontSize:"2.5rem"}}>{ename}</h1>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <h1 className={styles.h1}>Event Details</h1>
                        <img src={img} className="qr"/>
                        <p className="p-h1">From {sdate} to {edate}</p>
                        <p className="p-h1">Organizer: {org}</p>
                        <p className="p-h1">Venue: {venue}</p>
                        <p className="p-h1">Artist: {artist}</p>
                        <p className="p-h1">Description: {desc}</p>
                        <p className="p-h1">Cost: {cost}</p>
                        <p className="p-h1">Event Co-ordinator: {incharge}</p>
                        <p className="p-h1">Co-ordinator Email: {inchargeEmail}</p>
                        <p className="p-h1">Co-ordinator Phone: {inchargePhone}</p>
                        <p className="p-h1">Visibility: {publish==0?"Draft":"Published"}</p>
                        <button className={styles.btn_primary} onClick={()=>updateEvent(eid)}>Update Event</button>
                    </div>
                    <div className={styles.right}>
                        <h1 className={styles.h1}>Registration Details</h1>
                        <p className="p-h1">Total Number Of Registrations: {registrations}</p>
                        <p className="p-h1">Total Amount Of Money Recieved: {registrations*cost}/-</p>
                        <button className={styles.btn_primary} onClick={()=>navigate(`/dash/view-registered/${eid}`)}>View Registered Participants</button>
                        <button className={styles.btn_primary} onClick={()=>deleteEvent(eid)}>Delete Event</button>
                    </div>
                </div>
            </div>
                <div className={styles.title}>
                    <h1>Created Events</h1>
                    <div className={styles.filter}>
                    <select name="filter" id="filter" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                        <option value="2">Venue Not Assigned</option>
                        <option value="3">Venue assigned</option>
                        <option value="4">Artist Not Assigned</option>
                        <option value="5">Artist assigned</option>
                        <option value="6">Published</option>
                        <option value="7">Saved as Draft</option>
                        <option value="1">Reset</option>
                    </select>
                    <button className={styles.btn_primary} onClick={()=>handleFilter()}>Filter</button>
                    </div>
                </div>
                <div className={styles.reg_events}>
                    {
                        filterEvents.map((val)=>(
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