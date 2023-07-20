import React,{useState} from 'react'
import styles from '../cssmodules/addartist.module.css';
import camera from '../../public/images/camera.png';
import axios from 'axios';
import paths from '../paths';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

function AddArtist() {
    const navigate = useNavigate();
    const [eventName,setEventName] = useState("");
    const [desc,setDesc] = useState("");
    const [imgPath,setImgPath] = useState("");
    const alert = useAlert();

    const validation = ()=>{
        if(eventName===""){
            alert.error("Artist name is mandatory");
            return false;
        }else if(desc===""){
            alert.error("Description is mandatory");
            return false
        }else if(imgPath===""){
            alert.error("Artist image is mandatory");
            return false
        }else{
            return true
        }
    }
    const addEvent = (e)=>{
        e.preventDefault();
        const validity = validation()
        if(!validity)return
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const formData = new FormData();
        formData.append('eventName',eventName);
        formData.append('desc',desc);
        formData.append('imgPath',imgPath);
        formData.append('creator',userId);
        axios.post(paths.addArtist,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{
            if(res.status>=400 && res.status <= 499){
                console.log(res.data);
                alert.error(res.data);
            }else{
                console.log(res.data);
                alert.success("Artist added successfully");
                setEventName("");
                setDesc("");
                setImgPath({})
            }
        }).catch((err)=>{
            console.log(err);
            alert.error("Something snapped!!")
        })
    }
  return (
    <div className={styles.add_artist_card}>
                <div className={styles.title}>
                    <h1 className={styles.h1}>Add An Artist</h1>
                    <button className={styles.btn_primary} onClick={()=>navigate("/dash/view-artist")}>View All Artists</button>
                </div>
                <div className={styles.details}>
                    <div className={styles.ename_div}>
                        <input type="text" className={styles.float_input} name="ename" id="ename" value={eventName} onChange={(e)=>setEventName(e.target.value)} required/>
                        <label htmlFor="ename" className={styles.float_label}>Artist Name</label>
                    </div>
                    <div className={styles.desc_div}>
                        <textarea className={styles.float_input} name="desc" id="desc" value={desc} cols="30" rows="10" onChange={(e)=>setDesc(e.target.value)} required></textarea>
                        <label className={styles.float_label} htmlFor="desc">Artist Description</label>
                    </div>
                    <div className={`${styles.file_input} ${styles.eimg_div}`}>
                        <label htmlFor="eimg"><span><img src={camera} alt=""/></span> {imgPath.name|| "Select An Image"}</label>
                        <input type="file" name="eimg" id="eimg" accept="image/*" onChange={(e)=>setImgPath(e.target.files[0])}/>
                    </div>
                    <button className={styles.btn_primary} onClick={addEvent}>Add Artist</button>
                </div>
            </div>
  )
}

export default AddArtist