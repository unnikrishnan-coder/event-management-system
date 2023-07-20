import React,{useState,useEffect} from 'react'
import styles from './dashallartists.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import paths from '../paths';
import {useAlert} from 'react-alert';

function DashAllArtists() {
    const alert = useAlert();
    const [popupDisplay,setPopUpDisplay] = useState("none");
    const [artists,setArtists] = useState([]);
    const [name,setName] = useState();
    const [artistid,setAid] = useState();
    const navigate = useNavigate();

    const openPopup = (id)=>{
        if(popupDisplay === "flex"){
            return
        }
        setPopUpDisplay("flex")
        const artist = artists.filter(artist=>artist.artistId===id);
        setName(artist[0].name);
        setAid(artist[0].artistId);
    }
    const closePop = ()=>{
        if(popupDisplay === "none"){
            return
        }
        setPopUpDisplay("none")
    }
    const deleteArtist = (aid)=>{
        const confirm = window.confirm("Do you want to delete this artist?")
        if(confirm){
            axios.get(`${paths.deleteArtist}/${aid}`).then((res)=>{
                console.log(res.data);
                alert.success("Artist deleted successfully");
                setArtists(artists.filter(val=>val.artistId!=aid));
            }).catch((err)=>{
                alert.error("Something snapped");
                console.log(err);
            })
            closePop()
            navigate("/dash/view-artist")
        }
        return
        
    }

    const updateArtist = (aid)=>{
        navigate(`/dash/update-artist/${aid}`)
    }
    useEffect(()=>{
        const userId = JSON.parse(localStorage.getItem('user')).id;
        axios.get(`${paths.viewArtists}?uid=${userId}`).then((res)=>{
            setArtists(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div className={styles.all_artists_main}>
        <div className={styles.ticket_popup} style={{display:popupDisplay}}>
                <span className={styles.close_popup} onClick={closePop}>X</span>
                <h1 className={styles.h1} style={{fontSize:"2.5rem"}}>{name}</h1>
                <div className={styles.content}>
                    <button className={styles.btn_primary} onClick={()=>updateArtist(artistid)}>Update Artist</button>
                    <button className={styles.btn_primary} onClick={()=>deleteArtist(artistid)}>Delete Artist</button>
                </div>
            </div>
      <h1 className={styles.h1}>All Artists</h1>
      <div className={styles.all_artists}>
        {artists.map((val, index) => (
          <div className={styles.artist} onClick={() => openPopup(val.artistId)} key={val.artistId}>
            <img src={val.imgPath} alt="" />
            <p className="p-h1">{val.name}</p>
            <p className="p-h3">{val.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashAllArtists