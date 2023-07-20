import React,{useEffect, useState} from 'react'
import styles from './profile.module.css';
import axios from 'axios';
import paths from '../paths';
import { useAlert } from 'react-alert';

function Profile() {
    const alert = useAlert();
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [dob,setDob] = useState("");
    const [addr,setAddr] = useState("");
    const [pincode,setPincode] = useState("");
    const [phnnum,setPhnnum] = useState("");
    const [email,setEmail] = useState("");
    const id = JSON.parse(localStorage.getItem('user')).id;

    const validation = ()=>{
        if(fname==""){
            alert.error("First name is mandatory");
            return false;
        }else if(lname==""){
            alert.error("Last name is mandatory");
            return false;
        }else if(dob==""){
            alert.error("Date of birth is mandatory");
            return false;
        }else if(phnnum===""){
            alert.error("Phone number is mandatory");
            return false;
        }else if(addr===""){
            alert.error("Address is mandatory is mandatory");
            return false;
        }else if(pincode===""){
            alert.error("Pincode is mandatory");
            return false;
        }else{
            return true;
        }
    }
    const checkDate = ()=>{
        let dobDate = new Date(dob);
        let today = new Date();

        if(dobDate.getTime() > today.getTime()){
            alert.error("Date of birth can't be a future date");
            return false;
        }else if((today.getTime() - dobDate.getTime())<315569520000){
            alert.error("Age can't be less than 10 years");
            return false;
        }else{
            return true;
        }
    }

    useEffect(() => {
      axios.get(`${paths.getUser}/${id}`).then((res)=>{
            setEmail(res.data.email);
            setAddr(res.data.addr?res.data.addr:"");
            const date = new Date(res.data.DOB)
            setDob(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
            setFname(res.data.fname);
            setLname(res.data.lname);
            setPhnnum(res.data.phnnum?res.data.phnnum:"");
            setPincode(res.data.PINCODE?res.data.PINCODE:"");
      }).catch((err)=>{
        console.log(err);
        alert.error("Error while fetching user information")
      })
    }, [])
    
    const updateProfile = ()=>{
        const data = {
            fname,lname,dob,addr,pincode,phnnum,id
        }
        let validated = validation();
        if(!validated)return
        let dobCheck = checkDate()
        if(!dobCheck)return
        axios.put(paths.updateUser,data).then((res)=>{
            alert.success("Successfully updated user information")
            setEmail(res.data.email);
            setAddr(res.data.addr);
            const date = new Date(res.data.DOB)
            setDob(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
            setFname(res.data.fname);
            setLname(res.data.lname);
            setPhnnum(res.data.phnnum);
            setPincode(res.data.PINCODE);
        }).catch((err)=>{
            console.log(err);
            alert.error("Error while updating user information")
        })
    }
  return (
    <>
        <div className={styles.profile_card}>
                <div className={styles.title}>
                    <h1>Profile Details</h1>
                </div>
                <div className={styles.details}>
                    <input type="text" name="fname" id="fname" placeholder='First Name' onChange={(e)=>setFname(e.target.value)} value={fname}/>
                    <input type="text" name="lname" id="lname" placeholder='Last Name' onChange={(e)=>setLname(e.target.value)} value={lname}/>
                    <input type="date" name="dob" id="dob" value={dob} onChange={(e)=>setDob(e.target.value)}/>
                    <input type="email" name="email" id="email" value={email} readOnly/>
                    <input type="tel" name="c-number" id="c-number" value={phnnum} placeholder='Phone Number'  onChange={(e)=>setPhnnum(e.target.value)}/>
                    <input type="text" name="address" id="address" placeholder='Address' onChange={(e)=>setAddr(e.target.value)} value={addr}/>
                    <input type="number" name="pincode" pattern='[0-9]{6}' title='Six digit pincode' id="pincode" placeholder='Pincode' onChange={(e)=>setPincode(e.target.value)} value={pincode}/>
                    <button className={styles.btn_primary} onClick={updateProfile}>Update</button>
                </div>
            </div>
            {/* <div className={styles.reg_events_card}>
                <div className={styles.title}>
                    <h1>Registered Events</h1>
                        <p className="see_all">See All</p>
                </div>
                <div className={styles.reg_events}>
                    <div className={styles.event}>
                        <img src="../images/dj.jpg" alt=""/>
                        <p className="p-h1">Nirvana Nation</p>
                        <p className="p-h3">@Nakshathra</p>
                        <span><img src="../images/jassie.jpeg" alt="jassie"/></span>
                    </div>
                    <div className={styles.event}>
                        <img src="../images/dj.jpg" alt=""/>
                        <p className="p-h1">Nirvana Nation</p>
                        <p className="p-h3">@Nakshathra</p>
                        <span><img src="../images/jassie.jpeg" alt="jassie"/></span>
                    </div>
                    <div className={styles.event}>
                        <img src="../images/dj.jpg" alt=""/>
                        <p className="p-h1">Nirvana Nation</p>
                        <p className="p-h3">@Nakshathra</p>
                        <span><img src="../images/jassie.jpeg" alt="jassie"/></span>
                    </div>
                </div>
            </div>
            <div className={styles.my_events_card}>
                <div className={styles.title}>
                    <h1>Created Events</h1>
                        <p className="see_all">See All</p>
                </div>
                <div className={styles.my_events}>
                    <div className={styles.event}>
                        <img src="../images/dj.jpg" alt=""/>
                        <p className="p-h1">Nirvana Nation</p>
                        <p className="p-h3">@Nakshathra</p>
                        <span><img src="../images/jassie.jpeg" alt="jassie"/></span>
                    </div>
                    <div className={styles.event}>
                        <img src="../images/dj.jpg" alt=""/>
                        <p className="p-h1">Nirvana Nation</p>
                        <p className="p-h3">@Nakshathra</p>
                        <span><img src="../images/jassie.jpeg" alt="jassie"/></span>
                    </div>
                    <div className={styles.event}>
                        <img src="../images/dj.jpg" alt=""/>
                        <p className="p-h1">Nirvana Nation</p>
                        <p className="p-h3">@Nakshathra</p>
                        <span><img src="../images/jassie.jpeg" alt="jassie"/></span>
                    </div>
                </div>
            </div>
            <div className={styles.artist_cards}>
                <div className={styles.title}>
                   <h1>Artists & Organizers You Follow</h1>
                   <p className="see_all">See All</p>
                </div>
                <div className={styles.artists}>
                        <div className={`${styles.artist} ${styles.linear}`}>
                        <img src="../images/jassie.jpeg" alt="jassy"/>
                        <div className="text-content">
                           <p className="p-h2">Jassie Gift</p>
                            <p className="p-h3">Melodies that ignite joy, making hearts dance.</p> 
                        </div>
                        <button className={styles.follow_btn}>Follow</button>
                    </div>
                    <div className={`${styles.artist} ${styles.linear}`}>
                        <img src="../images/jassie.jpeg" alt="jassy"/>
                        <div className="text-content">
                           <p className="p-h2">Jassie Gift</p>
                            <p className="p-h3">Melodies that ignite joy, making hearts dance.</p> 
                        </div>
                        <button className={styles.follow_btn}>Follow</button>
                    </div>
                    <div className={`${styles.artist} ${styles.linear}`}>
                        <img src="../images/jassie.jpeg" alt="jassy"/>
                        <div className="text-content">
                           <p className="p-h2">Jassie Gift</p>
                            <p className="p-h3">Melodies that ignite joy, making hearts dance.</p> 
                        </div>
                        <button className={styles.follow_btn}>Follow</button>
                    </div>
                    <div className={`${styles.artist} ${styles.linear}`}>
                        <img src="../images/jassie.jpeg" alt="jassy"/>
                        <div className="text-content">
                           <p className="p-h2">Jassie Gift</p>
                            <p className="p-h3">Melodies that ignite joy, making hearts dance.</p> 
                        </div>
                        <button className={styles.follow_btn}>Follow</button>
                    </div>
                    
                </div>
            </div> */}
    </>
  )
}

export default Profile