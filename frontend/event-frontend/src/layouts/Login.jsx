import React, { useState } from 'react'
import styles from './login.module.css';
import inputStyles from './dashaddevent.module.css'; 
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import paths from '../paths';
import Logo from '../components/Logo';
import {useAlert} from 'react-alert';

function Login() {
  const navigate = useNavigate();
  const alert = useAlert();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const login = (e)=>{
    e.preventDefault();
    axios.post(paths.login,{
      username,
      password
    }).then((res)=>{
      if(res.status===400){
        console.log(res.data);
        alert.error(res.data)
      }else{
        const role = res.data.role;
        const user = JSON.stringify(res.data);
        localStorage.setItem('user',user);
        alert.success("Login successfull")
        if(role==="viewer"){
          navigate('/dash/home');
        }else{
          navigate("/dash/add-event")
        }
      }
    }).catch((err)=>{
      console.error(err);
      alert.error(err.response.data)
    })
  }
  return (
    <div className={styles.wrapper}>
    <div >
          <Link to="/"><Logo /></Link>
        </div>
    <div className={styles.login_container}>
        
        <h1>Login</h1>
        <form action="/login" method="POST" onSubmit={login}>
            <div className="udiv">
            <input type="text" className={inputStyles.float_input} name="username" id='username' onChange={(e)=>setUsername(e.target.value)} required/>
            <label htmlFor="username" className={inputStyles.float_label}>Username</label>
            </div>
            <div className="passdiv">
            <input type="password" name="password" id='password' onChange={(e)=>setPassword(e.target.value)} className={inputStyles.float_input} required/>
              <label htmlFor="password" className={inputStyles.float_label}>Password</label>
            </div>
            <input type="submit" id="loginsubmit" value="Login" className={inputStyles.btn_primary}/>
        </form>
        <p>Don't have an account, <Link to="/signup">SignUp</Link></p>
    </div>
</div>
  )
}

export default Login