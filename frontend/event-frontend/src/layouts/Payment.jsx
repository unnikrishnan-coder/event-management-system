import React from 'react'
import styles from './payment.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import paths from '../paths';
import { useAlert } from 'react-alert';

function Payment() {

    const {name,event,cost,email,uid,eid} = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {uid,eid};
        axios.post(paths.payment,data).then((res)=>{
            alert.success(res.data);
            navigate('/dash/my-events')
        }).catch((err)=>{
            alert.error(err);
        })
    }
  return (
    <div className={styles.container}>
    <h1 className={styles.h1}>Event Registration Payment</h1>
    <form onSubmit={handleSubmit}>
      <div className={styles.form_group}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" value={name} readOnly required/>
      </div>
      <div className={styles.form_group}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" value={email} readOnly required/>
      </div>
      <div className={styles.form_group}>
        <label htmlFor="ename">Event Name</label>
        <input type="text" id="ename" name="ename" value={event} readOnly required/>
      </div>
      <div className={styles.form_group}>
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" name="amount" value={cost} readOnly required/>
      </div>
      <button type="submit">Submit Payment</button>
    </form>
  </div>
  )
}

export default Payment