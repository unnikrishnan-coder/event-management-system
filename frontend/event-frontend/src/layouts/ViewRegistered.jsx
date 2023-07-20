import React, { useEffect, useState } from 'react'
import styles from "./viewregistered.module.css";
import {useParams} from "react-router-dom";
import paths from '../paths';
import axios from 'axios';
import { useAlert } from 'react-alert';

function ViewRegistered() {
    const alert = useAlert();
    const {eid} = useParams();
    const [data,setData] = useState([]);

    useEffect(()=>{
        axios.get(`${paths.viewRegistered}/${eid}`).then((res)=>{
            setData(res.data);
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const checkIn = (uid)=>{
        axios.put(`${paths.checkIn}/${uid}/${eid}`,{checkIn:1}).then((res)=>{
            if(res.status==200){
                console.log("success");
                window.location.reload()
            }
        }).catch((err)=>{
            console.log(err);
            if(err.response.status==400){
                alert.error(err.response.data)
            }else{
                alert.error("Internal server error")
            }
        })
    }
  return (
    <div className={styles.content}>
        <div className={styles.title}>
            <h1>Registered Participants</h1>
        </div>
        <table>
            <thead>
                <tr>
                <th>SI No</th>
                <th>Full Name</th>
                <th>Email Id</th>
                <th>Payment Status</th>
                <th>Contact Number</th>
                <th>Reference Number</th>
                <th>Check In Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                    data.length>0?
                       data.map((val,index)=>(
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{val.fname} {val.lname}</td>
                        <td>{val.email}</td>
                        <td>Confirm</td>
                        <td>{val.phnnum}</td>
                        <td>{val.checkedin.ref_id}</td>
                        <td>{val.checkedin.CHECKEDIN==0?"Not Checked In" : "Checked In"}</td>
                        <td>
                            {
                                val.checkedin.CHECKEDIN==0?
                                <button onClick={()=>checkIn(val.id)} className={styles.btn_primary}>CheckIn</button>
                                :<button disabled className={styles.btn_primary}>CheckIn</button>
                            }
                            
                        </td>
                        </tr>
                       )) 
                            
                        
                    :null
                }
               
            </tbody>
            
        </table>
    </div>
  )
}

export default ViewRegistered