import React,{useEffect, useState} from 'react'
import styles from './addvenue.module.css';
import axios from 'axios';
import paths from '../paths';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';

function UpdateVenue() {
    const alert = useAlert();
    const [venueName,setVenueName] = useState("");
    const [landmark,setLandmark] = useState("");
    const [availability,setAvailability] = useState(1);
    const navigate = useNavigate();
    const {id} = useParams();

    const updateVenue = (e)=>{
        e.preventDefault();
        if(venueName==null||venueName==undefined||venueName=='' || landmark==null||landmark==undefined||landmark==''){
            console.error("required fields should be filled");
            return 
        }else{
            const userId = JSON.parse(localStorage.getItem('user')).id;
            axios.put(`${paths.updateVenue}/${id}`,{venueName,landmark,availability,userId}).then((res)=>{
                if(res.status>=400 && res.status <= 499){
                    console.log(res.data);
                    alert.error("Error while updating the venue")
                }else{
                    console.log(res.data);
                    alert.success(res.data);
                    navigate("/dash/all-venues")
                }
            }).catch((err)=>{
                console.log(err);
                alert.error("Something snapped")
            })
        }
        
    }

    useEffect(()=>{
        axios.get(`${paths.viewSingleVenue}/${id}`).then((res)=>{
            const data = res.data;
            if(data){
                setVenueName(data.NAME);
                setAvailability(data.AVAILABILITY);
                setLandmark(data.LANDMARK);
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div className={styles.create_event_card}>
                <div className={styles.title}>
                    <h1 className={styles.h1}>Update Venue</h1>
                    <button className={styles.btn_primary} onClick={()=>navigate("/dash/all-venues")}>View All Venues</button>
                </div>
                <div className={styles.details}>
                    <div className={styles.vname_div}>
                        <input type="text" className={styles.float_input} name="vname" id="vname" value={venueName} onChange={(e)=>setVenueName(e.target.value)} required/>
                        <label htmlFor="vname" className={styles.float_label}>Venue Name</label>
                    </div>
                    <div className={styles.avail_div}>
                        <select className={styles.float_input} name="availability" id="availability" value={availability} onChange={(e)=>setAvailability(Number(e.target.value))} required>
                            <option value="1">Available</option>
                            <option value="0">Not Available</option>
                        </select>
                        <label className={styles.float_label} htmlFor="availability">Availability of Venue</label>
                    </div>
                    <div className={styles.landmark_div}>
                        <textarea className={styles.float_input} name="landmark" id="landmark" value={landmark} cols="30" rows="10" onChange={(e)=>setLandmark(e.target.value)} required></textarea>
                        <label className={styles.float_label} htmlFor="landmark">LandMark</label>
                    </div>
                    <button className={styles.btn_primary} onClick={updateVenue}>Update Venue</button>
                </div>
            </div>
  )
}

export default UpdateVenue;