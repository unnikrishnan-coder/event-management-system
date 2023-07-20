import React, { useEffect, useState } from 'react'
import styles from './dashallvenues.module.css';
import axios from 'axios';
import paths from '../paths';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

function DashAllVenues() {
    const alert = useAlert();
    const [venues,setVenues] = useState([]);
    const navigate = useNavigate();

    const deleteVenue = (id,name)=>{
        const confirm = window.confirm(`Do you want to delete ${name}?`)
        if(confirm){
            axios.delete(`${paths.deleteVenue}/${id}`).then((res)=>{
                console.log(res.data);
                alert.success(`Successfully deleted ${name} venue`);
                setVenues(venues.filter(val=>val.id!==id))
            }).catch((err)=>{
                console.log(err);
                alert.error("Error while deleting the venue")
            })
            navigate("/dash/all-venues")
        }
        return
    }

    const updateVenue = (id)=>{
        navigate(`/dash/update-venue/${id}`);
    }
    useEffect(()=>{
        axios.get(paths.viewVenues).then((res)=>{
            if(res.data.length>0){
                setVenues(res.data)
            }
        }).catch((err)=>{
            console.log(err);
        })       
    },[])
  return (
    <div className={styles.all_venues_main}>
      <h1 className={styles.h1}>All Venues</h1>
      <div className={styles.all_venues}>
        {venues.map((val, index) => (
          <div className={styles.venue} key={val.id}>
            <p className="p-h1">{val.NAME}</p>
            <p className="p-h3">{val.AVAILABILITY===1?"Venue Available":"Venue Not Available"}</p>
            <button className={styles.btn_primary + ' ' + styles.editbtn} onClick={()=>updateVenue(val.id)}>View/Edit Details</button>
            <button className={styles.btn_primary + ' ' + styles.dltbtn} onClick={()=>deleteVenue(val.id,val.NAME)}>Delete Venue</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashAllVenues