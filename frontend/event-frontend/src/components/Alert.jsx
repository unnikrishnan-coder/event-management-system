import React, { useEffect, useState } from 'react'
import styles from './alert.module.css';

function Alert({p,state}) {
    const [open,setOpen] = useState(state);

    useEffect(()=>{
        setOpen(state);
    },[state])
  return (
    <div>
        {
            open? (
                <div className={styles.alert} style={{display:"flex"}}>
                    <p>{p}</p>
                    <span>X</span>
                </div>
            )      
        :
        (
            <div className={styles.alert} style={{display:"none"}}>
                <p>{p}</p>
                <span>X</span>
            </div>
        )
        }
    </div>
    
    
  )
}

export default Alert