import React,{useEffect, useState} from 'react'
import SideBar from '../components/SideBar'
import styles from './dashboard.module.css';
import { Outlet, useLocation } from 'react-router-dom'

function DashBoard() {
  const location = useLocation();
  const [contentClass,setContentClass] = useState('')
  useEffect(() => {
    if(location.pathname==="/dash/home"){
      setContentClass('content_for_home')
    }else if(location.pathname==="/dash/add-event"){
      setContentClass("content_for_add_event")
    }else if(location.pathname==="/dash/all-events"){
      setContentClass('content_for_all_events')
    }else if(location.pathname==="/dash/profile"){
      setContentClass('content_for_profile')
    }else{
      setContentClass('content_for_add_event')
    }
    
  }, [location])
  
  return (
    <main className={styles.main}>
        <SideBar />
        <div className={styles[contentClass]}>
            <Outlet />
        </div>
    </main>
  )
}

export default DashBoard