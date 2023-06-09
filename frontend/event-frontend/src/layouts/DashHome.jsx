import React, { useEffect, useState } from "react";
import EventCards from "./EventCards";
import ArtistCards from "./ArtistCards";
import RegisterCard from "../components/RegisterCard";
import axios from "axios";
import paths from "../paths";

function DashHome() {
  const [events, setEvents] = useState([]);
  const [venue, setVenue] = useState();
  const [ename, setEname] = useState();
  const [sdate, setSdate] = useState();
  const [edate, setEdate] = useState();
  const [cost, setCost] = useState();
  const [org, setOrg] = useState();
  const [eid, setEid] = useState();
  const [imgPath, setImgPath] = useState();

  useEffect(() => {
    axios
      .get(paths.home)
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
        setVenue(res.data[0].venue);
                setCost(res.data[0].cost);
                setEdate(res.data[0].end);
                setSdate(res.data[0].start);
                setEname(res.data[0].eventName);
                setOrg(res.data[0].organizer);
                setEid(res.data[0].eventId);
                setImgPath(res.data[0].imagePath);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (id)=>{
    let data = events.filter(event=>event.eventId===id);
    setVenue(data[0].venue);
    setCost(data[0].cost);
    setEdate(data[0].end);
    setSdate(data[0].start);
    setEname(data[0].eventName);
    setOrg(data[0].organizer);
    setEid(data[0].eventId);
    setImgPath(data[0].imagePath);
}
  return (
    <>
      <EventCards events={events} handleClick={handleClick}/>
      {/* <ArtistCards /> */}
      <RegisterCard
        venue={venue}
        ename={ename}
        sdate={sdate}
        edate={edate}
        cost={cost}
        org={org}
        eid={eid}
        imgPath={imgPath}
      />
    </>
  );
}

export default DashHome;
