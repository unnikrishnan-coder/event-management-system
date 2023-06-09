import React from 'react'
import styles from './header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.header}>
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Link to="#">Festy</Link>
            </div>
            <div className={styles.menu}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Header