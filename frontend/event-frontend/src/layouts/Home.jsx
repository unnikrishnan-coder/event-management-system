import React from "react";
import { Link } from "react-router-dom";
import styles from './home.module.css';
import SvgComponent from "../components/SvgComponent";

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.logo}>
          <Link to="/">Festy</Link>
        </div>
        <section className={styles.hero_image}>
          <div className={styles.left}>
              <SvgComponent styles={styles}/>
          </div>
          <div className={styles.right}>
            <h1>All Events At One Place!</h1>
          <p>Your Ultimate Experience Hub</p>
          <Link className={styles.btn} to="/login">
            Explore Now
          </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
