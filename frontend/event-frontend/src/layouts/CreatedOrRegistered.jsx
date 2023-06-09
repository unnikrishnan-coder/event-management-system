import React, { useEffect, useState } from 'react'
import DashMyEvents from './DashMyEvents';
import DashCreatedEvents from './DashCreatedEvents';

function CreatedOrRegistered() {

    const [role,setRole] = useState();

    useEffect(()=>{
        const role = JSON.parse(localStorage.getItem('user')).role;
        setRole(role);
    },[])
  return (
    <>
    {
        role==="viewer"?<DashMyEvents />:<DashCreatedEvents />
    }
    </>
  )
}

export default CreatedOrRegistered