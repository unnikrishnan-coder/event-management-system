import React, { useState } from 'react';
import styles from './signup.module.css';
import inputStyles from './dashaddevent.module.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import paths from '../paths';

function Signup() {
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [role,setRole] = useState("");
    const [email,setEmail] = useState("");
    const [pass1,setPass1] = useState("");
    const [pass2,setPass2] = useState("");
    const [dob,setDOB] = useState("");
    // const [addr,setAddr] = useState("");
    // const [phnnum,setPhnnum] = useState("");

    const signUp = (e)=>{
        e.preventDefault();
        const data = {
            fname,
            lname,
            dob,
            role,
            email,
            pass1,
            pass2
        };
        if(data.pass1!==data.pass2){
            console.log("Passwords Dont match");
        }else{
            axios.post(paths.signup,data).then((res)=>{
                if(res.status>=400 && res.status <= 499){
                    console.log(res.data);
                }else{
                    navigate('/login')
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
  return (
    <div className={styles.wrapper}>
    <div className={styles.logo}>
          <Link to="/">Festy</Link>
    </div>
    <div className={styles.signup_container}>
        <h1>Signup</h1>
        <div className={styles.registration_section}>
            <form action="/signup" method="POST" className={styles.form} onSubmit={signUp}>
                <div>
                <input className={inputStyles.float_input} type="text" name="fname" id='fname' onChange={(e)=>setFname(e.target.value)} required/>
                <label htmlFor="fname" className={inputStyles.float_label}>First Name</label>
                </div>
                <div>
                <input className={inputStyles.float_input} type="text" name="lname" id='lname' onChange={(e)=>setLname(e.target.value)} required/>
                <label htmlFor="lname" className={inputStyles.float_label}>Last Name</label>
                </div>
                <div>
                <input className={inputStyles.float_input} type="date" name="dob" id='dob' onChange={(e)=>setDOB(e.target.value)} required/>
                <label htmlFor="dob" className={inputStyles.float_label}>Date of Birth(yyyy-mm-dd)</label>
                </div>
                {/* <div>
                <input className={inputStyles.float_input} type="text" name="addr" id='addr' onChange={(e)=>setAddr(e.target.value)} required/>
                <label htmlFor="addr" className={inputStyles.float_label}>Address</label>
                </div>
                <div>
                <input className={inputStyles.float_input} type="text" name="phnnum" id='phnnum' onChange={(e)=>setPhnnum(e.target.value)} required/>
                <label htmlFor="phnnum" className={inputStyles.float_label}>Phone Number</label>
                </div> */}
                <div>
                <select className={inputStyles.float_input} name="role" id="role" onChange={(e)=>setRole(e.target.value)} required>
                    <option value=""></option>
                    <option value="Viewer">Viewer</option>
                </select>
                <label htmlFor="role" className={inputStyles.float_label}>Select Your Role</label>
                </div>
                <div>
                <input className={inputStyles.float_input} type="email" name="email" id='email' onChange={(e)=>setEmail(e.target.value)} required/>
                <label htmlFor="email" className={inputStyles.float_label}>Email</label>
                </div>
                <div>
                <input className={inputStyles.float_input} type="password" name="password1" id='pass1' onChange={(e)=>setPass1(e.target.value)} required/>
                <label htmlFor="pass1" className={inputStyles.float_label}>Password</label>
                </div>
                <div>
                <input className={inputStyles.float_input} type="password" name="password2" id='pass2' onChange={(e)=>setPass2(e.target.value)} required/>
                <label htmlFor="pass2" className={inputStyles.float_label}>Confirm Password</label>
                </div>
                <input type="submit" value="Register" className={inputStyles.btn_primary}/>
            </form>
            <p>Already have an account, <Link to="/login">Login</Link></p>
        </div>
    </div>
</div>
  )
}

export default Signup