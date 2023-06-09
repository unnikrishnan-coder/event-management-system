import React,{useEffect, useState} from 'react'
import styles from './dashaddevent.module.css';
import axios from 'axios';
import paths from '../paths';

function DashAddEvent() {
    const [eventName,setEventName] = useState("");
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");
    const [venue,setVenue] = useState("");
    const [cost,setCost] = useState("");
    const [desc,setDesc] = useState("");
    const [imgPath,setImgPath] = useState("");
    const [organizer,setOrganizer] = useState("");
    const [artistId,setArtistId] = useState("");
    const [artists,setArtists] = useState([]);

    const addEvent = (e)=>{
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const formData = new FormData();
        formData.append('eventName',eventName);
        formData.append('start',start);
        formData.append('end',end);
        formData.append('venue',venue);
        formData.append('cost',cost);
        formData.append('desc',desc);
        formData.append('imgPath',imgPath);
        formData.append('organizer',organizer);
        formData.append('creator',userId);
        formData.append('artistId',artistId);
        axios.post(paths.addEvent,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{
            if(res.status>=400 && res.status <= 499){
                console.log(res.data);
            }else{
                console.log(res.data);
                setEventName("");
                setStart("");
                setEnd("");
                setVenue("");
                setCost("");
                setDesc("");
                setOrganizer("");
                setArtistId("");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        axios.get(paths.artists).then((res)=>{
            setArtists(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div className={styles.create_event_card}>
                <div className="title">
                    <h1 className={styles.h1}>Create An Event</h1>
                </div>
                <div className={styles.details}>
                    <div className={styles.ename_div}>
                        <input type="text" className={styles.float_input} name="ename" id="ename" value={eventName} onChange={(e)=>setEventName(e.target.value)} required/>
                        <label htmlFor="ename" className={styles.float_label}>Event Title</label>
                    </div>
                    <div className={styles.sdate_div}>
                        <input className={styles.float_input} type="text" name="sdate" id="sdate" value={start} onChange={(e)=>setStart(e.target.value)} required/>
                        <label className={styles.float_label} htmlFor="sdate">Starting Time and Date</label>
                    </div>
                    <div className={styles.edate_div}>
                        <input className={styles.float_input} type="text" name="edate" id="edate" value={end} onChange={(e)=>setEnd(e.target.value)} required/>
                        <label className={styles.float_label} htmlFor="edate">Ending Time and Date</label>
                    </div>
                    <div className={styles.org_div}>
                        <input className={styles.float_input} type='text' name="org" id="org" value={organizer} onChange={(e)=>setOrganizer(e.target.value)} required/>
                        <label className={styles.float_label} htmlFor="org">Organizer</label>
                    </div>
                    <div className={styles.artist_div}>
                        <select className={styles.float_input} name="artist" id="artist" value={artistId} onChange={(e)=>setArtistId(Number(e.target.value))} required>
                            <option value=""></option>
                            {
                                artists.map((val)=>(
                                    <option value={val.artistId} key={val.artistId}>{val.name}</option>
                                ))
                            }
                        </select>
                        <label className={styles.float_label} htmlFor="artist">Artist Or Chief Guest of Event</label>
                    </div>
                    <div className={styles.desc_div}>
                        <textarea className={styles.float_input} name="desc" id="desc" value={desc} cols="30" rows="10" onChange={(e)=>setDesc(e.target.value)} required></textarea>
                        <label className={styles.float_label} htmlFor="desc">Event Description</label>
                    </div>
                    <div className={styles.cost_div}>
                        <input className={styles.float_input} type="number" name="cost" value={cost} id="cost" onChange={(e)=>setCost(Number(e.target.value))} required/>
                        <label className={styles.float_label} htmlFor="cost">Entry Fee</label>
                    </div>
                    <div className={`${styles.file_input} ${styles.eimg_div}`}>
                        <label htmlFor="eimg"><span><img src="../images/camera.png" alt=""/></span> Select an image</label>
                        <input type="file" name="eimg" id="eimg" accept="image/*" onChange={(e)=>setImgPath(e.target.files[0])}/>
                    </div>
                    <div className={styles.location_div}>
                        <input className={styles.float_input} type="text" name="location" value={venue} id="location" onChange={(e)=>setVenue(e.target.value)} required/>
                        <label className={styles.float_label} htmlFor="location">Event Location</label>
                    </div>
                    <button className={styles.btn_primary} onClick={addEvent}>Create Event</button>
                </div>
            </div>
  )
}

export default DashAddEvent