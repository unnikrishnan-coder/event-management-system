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
  const [desc, setDesc] = useState();
  const [artistId,setArtistId] = useState("");
  const [artists,setArtists] = useState([]);
  const [venues,setVenues] = useState([]);
  const [incharge,setIncharge] = useState("");
  const [inchargePhone,setInchargePhone] = useState("");
  const [inchargeEmail,setInchargeEmail] = useState("");
  const [sdate, setSdate] = useState();
  const [edate, setEdate] = useState();
  const [cost, setCost] = useState();
  const [org, setOrg] = useState();
  const [eid, setEid] = useState();
  const [imgPath, setImgPath] = useState();
  const uid = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    axios
      .get(`${paths.publishedEvents}/${uid}`)
      .then((res) => {
        setEvents(res.data);
        if(res.data.length>0){
          setVenue(res.data[0].VENUE);
        setCost(res.data[0].cost);
        setEdate(res.data[0].end);
        setSdate(res.data[0].start);
        setEname(res.data[0].eventName);
        setOrg(res.data[0].organizer);
        setEid(res.data[0].eventId);
        setImgPath(res.data[0].imagePath);
        setDesc(res.data[0].description);
        setArtistId(res.data[0].artistId);
        setIncharge(res.data[0].incharge);
        setInchargeEmail(res.data[0].incharge_email);
        setInchargePhone(res.data[0].incharge_phone);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (id)=>{
    let data = events.filter(event=>event.eventId===id);
    setVenue(data[0].VENUE);
    setCost(data[0].cost);
    setEdate(data[0].end);
    setSdate(data[0].start);
    setEname(data[0].eventName);
    setOrg(data[0].organizer);
    setEid(data[0].eventId);
    setImgPath(data[0].imagePath);
    setDesc(data[0].description);
    setArtistId(data[0].artistId);
    setIncharge(data[0].incharge);
    setInchargeEmail(data[0].incharge_email);
    setInchargePhone(data[0].incharge_phone);
}
  return (
    <>
      <EventCards events={events} handleClick={handleClick}/>
      <ArtistCards />
      { events.length>0?
      <RegisterCard venue={venue} ename={ename} sdate={sdate} edate={edate} cost={cost} org={org} eid={eid} imgPath={imgPath} 
      desc={desc} artist={artistId} incharge={incharge} inchargeEmail={inchargeEmail} inchargePhone={inchargePhone} />
      :null}
      
    </>
  );
}

export default DashHome;
