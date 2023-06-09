import React from 'react'
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
    <div className={styles.footer_container}>
        <div className={styles.logo}>
            <a href="/">Festy</a>
        </div>
        <div className={styles.social_icons}>
            <a href="#"><img src="images/facebook.png" alt="Facebook"/></a>
            <a href="#"><img src="images/instagram.png" alt="Instagram"/></a>
        </div>
    </div>
</footer>
  )
}

export default Footer