import React,{useEffect, useState} from 'react'
import styles from './profile.module.css';
import axios from 'axios';
import paths from '../paths';

function Profile() {
    const [user,setUser] = useState({});
    const [fname,setFname] = useState();
    const [lname,setLname] = useState();
    const [dob,setDob] = useState();
    const [addr,setAddr] = useState();
    const [pincode,setPincode] = useState();
    const [phnnum,setPhnnum] = useState();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
        if(userData){
            setUser(userData);
            setAddr(user.addr);
            setDob(user.dob);
            setFname(user.fname);
            setLname(user.lname);
            setPhnnum(user.phnnum);
            setPincode(user.pincode);
        }
    }, [])
    
    const updateProfile = ()=>{
        const id = user.id;
        const data = {
            fname,lname,dob,addr,pincode,phnnum,id
        }
        axios.put(paths.updateUser,data).then((res)=>{
            setUser(res.data)
        }).catch((err)=>{
            console.log(err);
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
                    <input type="email" name="email" id="email" value={user.email} readOnly/>
                    <input type="tel" name="c-number" id="c-number" value={phnnum} placeholder='Phone Number'  onChange={(e)=>setPhnnum(e.target.value)}/>
                    <input type="text" name="address" id="address" placeholder='Address' onChange={(e)=>setAddr(e.target.value)} value={addr}/>
                    <input type="number" name="pincode" id="pincode" placeholder='Pincode' onChange={(e)=>setPincode(e.target.value)} value={pincode}/>
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