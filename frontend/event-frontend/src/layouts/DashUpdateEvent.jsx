import React,{useEffect, useState} from 'react'
import styles from './dashaddevent.module.css';
import axios from 'axios';
import paths from '../paths';
import { useNavigate, useParams } from 'react-router-dom';
import camera from '../../public/images/camera.png';
import { useAlert,positions } from 'react-alert';

function DashUpdateEvent() {
    const alert = useAlert();
    const [imgPopUpDisplay,setImgPopUpDisplay] = useState("none");
    const [eventName,setEventName] = useState("");
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");
    const [venue,setVenue] = useState("");
    const [cost,setCost] = useState("");
    const [desc,setDesc] = useState("");
    const [imgPath,setImgPath] = useState();
    const [img,setImg] = useState();
    const [organizer,setOrganizer] = useState("");
    const [artistId,setArtistId] = useState("");
    const [artists,setArtists] = useState([]);
    const [previewPath,setPreviewPath] = useState();
    const {eid} = useParams();
    const navigate = useNavigate();
    const [venues,setVenues] = useState([]);
    const [publish,setPublish] = useState(0);
    const [incharge,setIncharge] = useState("");
    const [inchargePhone,setInchargePhone] = useState("");
    const [inchargeEmail,setInchargeEmail] = useState("");

    function datetimeLocal(datetime) {
        const dt = new Date(datetime);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        return dt.toISOString().slice(0, 16);
    }

    const validation = ()=>{
        if(eventName==""){
            alert.error("Event name is mandatory");
            return false;
        }else if(start==""){
            alert.error("starting date and time is mandatory");
            return false;
        }else if(end==""){
            alert.error("ending date and time is mandatory");
            return false;
        }else if(cost===""){
            alert.error("ticket price is mandatory");
            return false;
        }else if(desc==""){
            alert.error("description is mandatory");
            return false;
        }else if(imgPath==""){
            alert.error("Event thumbnail is mandatory");
            return false;
        }else if(organizer==""){
            alert.error("Organizer is a mandatory field");
            return false;
        }else if(incharge==""){
            alert.error("Event Co-ordinator is a required field");
            return false
        }else if(inchargePhone==""){
            alert.error("Event Co-ordinator phone number is a required field");
            return false
        }else if(inchargeEmail==""){
            alert.error("Event Co-ordinator email id is a required field");
            return false
        }
        else{
            return true;
        }
    }
    const checkDate = ()=>{
        let startDate = new Date(start);
        let endDate = new Date(end);
        let today = new Date();

        if(startDate.getTime() < today.getTime()){
            alert.error("Start date can't be a past date");
            return false;
        }else if(startDate.getTime() > endDate.getTime()){
            alert.error("Start date can't be beyond end date");
            return false;
        }else if(startDate.getTime()===endDate.getTime()){
            alert.error("Start time and end time can't be the same");
            return false
        }else if(endDate.getTime() - startDate.getTime() < 3600000){
            alert.error("Each event should have a duration of atleast one hour");
            return false;
        }else{
            return true
        }
    }
    const checkAvailability = ()=>{
        if(!venue){
            alert.error("Fill the required details to check availability");
            return false
        }else{
            axios.get(paths.allEvents).then((res)=>{
                const events = res.data;
                let filtered = events.filter(val=>val.VENUE==venue);
                if(filtered.length == 0){
                    alert.success("This venue is not booked by any other event");
                    return true
                }else{
                    alert.info(<div><p>These are the events with the same venue</p>
                    <div>{filtered.map((val,index)=>(<div key={index}><p>{index+1 + ":" +val.eventName}</p><p>{new Date(val.start).toLocaleString()}</p><p>{new Date(val.end).toLocaleString()}</p></div>))}</div></div>,{
                        position:positions.MIDDLE,
                        timeout:0,
                        offset:"scale"
                    });
                    return true
                }
            }).catch((err)=>{
                console.log(err);
                alert.error("Server Busy.Can't check the availability of venue right now!");
                return false
            })
        }
    }

    const updateEvent = (e)=>{
        e.preventDefault();
        // data validation
        let validated = validation();
        if(!validated) return
        // checking date is validated or not
        let dateValidation = checkDate();
        if(!dateValidation) return
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const formData = new FormData();
        formData.append('eventName',eventName);
        formData.append('start',start);
        formData.append('end',end);
        formData.append('venue',venue);
        formData.append('cost',cost);
        formData.append('desc',desc);
        formData.append('imgPath',img);
        formData.append('organizer',organizer);
        formData.append('creator',userId);
        formData.append('publish',publish);
        formData.append('incharge',incharge);
        formData.append('inchargeEmail',inchargeEmail);
        formData.append('inchargePhone',inchargePhone);
        if(artistId===""){
            formData.append('artistId',null)
        }else{
            formData.append('artistId',artistId);
        }
        axios.put(`${paths.updateEvent}/${eid}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{
            if(res.status>=400 && res.status <= 499){
                console.log(res.data);
                alert.error("Something snapped!")
            }else{
                alert.success("Successfully updated the event")
                navigate("/dash/my-events")
            }
        }).catch((err)=>{
            console.log(err);
            alert.error("Something snapped!")
        })
    }

    const closeImgPop = ()=>{
        if(imgPopUpDisplay === "none"){
            return
        }
        setImgPopUpDisplay("none")
    }
    useEffect(()=>{
        axios.get(paths.artists).then((res)=>{
            setArtists(res.data);
        }).catch((err)=>{
            console.log(err);
        })

        axios.get(paths.viewAvailableVenues).then((res)=>{
            setVenues(res.data);
        }).catch((err)=>{
            console.log(err);
        })

        axios.get(`${paths.getEvent}${eid}`).then((res)=>{
                setEventName(res.data.eventName);
                setStart(datetimeLocal(res.data.start));
                setEnd(datetimeLocal(res.data.end));
                setVenue(res.data.VENUE?res.data.VENUE:"");
                setCost(res.data.cost);
                setDesc(res.data.description);
                setOrganizer(res.data.organizer);
                setArtistId(res.data.artistId?res.data.artistId:"");
                setImgPath(res.data.imagePath);
                setImg(res.data.imagePath);
                setPreviewPath(res.data.imagePath);
                setPublish(res.data.published);
                setIncharge(res.data.incharge);
                setInchargeEmail(res.data.incharge_email);
                setInchargePhone(res.data.incharge_phone);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const previewImg = (e)=>{
        setImgPath(e.target.files[0].name);
        setImg(e.target.files[0])
        if(e.target.files && e.target.files[0]){
            const reader = new FileReader();

            reader.onload = (e)=>{
                setPreviewPath(e.target.result)
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }
  return (
    <>
    <div style={{display:imgPopUpDisplay}} className={styles.imgpopup}>
        {/* <div className={styles.overlay}></div> */}
        <span onClick={closeImgPop} className={styles.imgclosePop}>X</span>
        <img src={previewPath} alt="" />
    </div>
    <div className={styles.create_event_card}>
                <div className="title">
                    <h1 className={styles.h1}>Update Event</h1>
                </div>
                <div className={styles.details}>
                    <div className={styles.ename_div}>
                        <input type="text" className={styles.float_input} name="ename" id="ename" value={eventName} onChange={(e)=>setEventName(e.target.value)} required/>
                        <label htmlFor="ename" className={styles.float_label}>Event Title</label>
                    </div>
                    <div className={styles.incharge_div}>
                        <input type="text" className={styles.float_input} name="incharge" id="incharge" value={incharge} onChange={(e)=>setIncharge(e.target.value)} required/>
                        <label htmlFor="incharge" className={styles.float_label}>Event Co-Ordinator</label>
                    </div>
                    <div className={styles.inchargephone_div}>
                        <input type="text" className={styles.float_input} name="inchargephone" id="inchargephone" value={inchargePhone} onChange={(e)=>setInchargePhone(e.target.value)} required/>
                        <label htmlFor="inchargephone" className={styles.float_label}>Event Co-Ordinator Phone Number</label>
                    </div>
                    <div className={styles.inchargeemail_div}>
                        <input type="email" className={styles.float_input} name="inchargeemail" id="inchargeemail" value={inchargeEmail} onChange={(e)=>setInchargeEmail(e.target.value)} required/>
                        <label htmlFor="inchargeemail" className={styles.float_label}>Event Co-Ordinator Email ID</label>
                    </div>
                    <div className={styles.publish_div}>
                        <select type="text" className={styles.float_input} name="publish" id="publish" value={publish} onChange={(e)=>setPublish(e.target.value)} required>
                            <option value="0">Save as Draft</option>
                            <option value="1">Publish</option>
                        </select>
                        <label htmlFor="publish" className={styles.float_label}>Visibility</label>
                    </div>
                    <div className={styles.sdate_div}>
                        <input className={styles.float_input} type="datetime-local" name="sdate" id="sdate" value={start} onChange={(e)=>setStart(e.target.value)} required/>
                        <label className={styles.float_label} htmlFor="sdate">Starting Time and Date</label>
                    </div>
                    <div className={styles.edate_div}>
                        <input className={styles.float_input} type="datetime-local" name="edate" id="edate" value={end} onChange={(e)=>setEnd(e.target.value)} required/>
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
                        <label htmlFor="eimg"><span><img src={camera} alt=""/></span> {imgPath || "Select An Image"}</label>
                        <input type="file" name="eimg" id="eimg" accept="image/*" onChange={(e)=>previewImg(e)}/>
                        <button onClick={()=>setImgPopUpDisplay("block")} className={styles.openimagepop}>View Image</button>
                    </div>
                    <div className={styles.location_div}>
                        <select className={styles.float_input} type="text" name="location" value={venue} id="location" onChange={(e)=>setVenue(e.target.value)} required>
                            <option value=""></option>
                            {
                                venues.map((val)=>(
                                    <option value={val.id} key={val.id}>{val.NAME}</option>
                                ))
                            }
                        </select>
                        <label className={styles.float_label} htmlFor="location">Event Location</label>
                    </div>
                    <button className={styles.btn_primary + " " + styles.availbtn} onClick={()=>checkAvailability()}>Check Availability</button>
                    <button className={styles.btn_primary + " " + styles.submitbtn} onClick={updateEvent}>Update Event</button>
                </div>
            </div>
        </>
  )
}

export default DashUpdateEvent