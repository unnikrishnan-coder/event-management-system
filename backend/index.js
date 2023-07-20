var express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer');
const mailer = require('./mailer')

// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
  })

const upload = multer({ storage: storage })

// template filler for event creation email
const fillTemplate = (eventName,start,end,venue,eventImg,cost,desc,organizer,incharge,inchargeEmail,inchargePhone)=>{
    let template = `<h1>Event Name: ${eventName}</h1>
    <p>Starting Date:${new Date(start).toLocaleString()}</p>
    <p>Ending Date:${new Date(end).toLocaleString()}</p>
    <p>Venue: ${venue}</p>
    <p>Image Path:${eventImg.path}</p>
    <p>Ticket Cost: ${cost}</p>
    <img src="http://localhost:3000/uploads/${eventImg.filename}" />
    <p>${desc}</p>
    <p>Organizer: ${organizer}</p>
    <h3>For more details contact:</h3>
    <p>${incharge}</p>
    <p>Email: ${inchargeEmail}</p>
    <p>Number: ${inchargePhone}</p>`;

    return template;
}

// express app initialization with port 3000
const app = express()
app.use('/uploads',express.static(__dirname + '/uploads'));
const port = 3000;
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// database connectivity
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'unni',
  password: 'unni123',
  database: 'event_management_system'
})
connection.connect()

// to get the users registered events
app.get('/dash/reg-events',(req,res)=>{
    const uid = req.query.uid;
    connection.query('SELECT eventId FROM BRIDGE WHERE userId=?',[uid],(err,results,fields)=>{
        if(err){
            res.statusCode = 400;
            res.send(err)
        }else{
            const data = JSON.stringify(results);
            const eidsObj = JSON.parse(data)
            const eids = [];
            eidsObj.forEach(element => {
                eids.push(element.eventId)
            });
            connection.query('SELECT * FROM EVENT WHERE eventId IN (?)',[eids],(err,results,fields)=>{
                if(err){
                    res.statusCode = 400;
                    res.send(err)
                }else{
                    res.statusCode = 200;
                    res.send(results)
                }
            })
        }
    })
    
})

app.get("/dash/getUser/:uid",(req,res)=>{
    const uid = req.params.uid;
    connection.query("SELECT * FROM USERS WHERE ID=?",[uid],(err,results,fields)=>{
        if(err){
            res.status(500).send("Internal server error")
        }else{
            res.status(200).send(results[0])
        }
    })
})

app.put('/dash/updateProfile',(req,res)=>{
    const {fname,lname,dob,addr,pincode,phnnum,id}=req.body;
    connection.query('UPDATE USERS SET fname=?,lname=?,DOB=?,addr=?,pincode=?,phnnum=? WHERE ID = ?',[fname,lname,dob,addr,pincode,phnnum,id],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err.code);
        }else{
            connection.query('SELECT * FROM USERS WHERE ID=?',[id],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    res.statusCode = 400;
                    res.send(err.code);
                }else{
                    res.send(results[0]);
                }
            })
        }
    })
})

app.get('/dash/created',(req,res)=>{
    const uid = req.query.uid;
    connection.query('SELECT * FROM EVENT WHERE CREATOR = ?',[uid],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err.code);
        }else{
            if(results.length > 0){
                res.statusCode = 200;
                res.send(results);
            }else{
                res.statusCode = 200;
                res.send([]);
            }
        }
    })
})

app.delete('/dash/deleteEvent/:uid/:eid',(req,res)=>{
    const uid = req.params.uid;
    const eid = req.params.eid;
    connection.query('DELETE FROM EVENT WHERE CREATOR = ? AND EVENTID=?',[uid,eid],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err.code);
        }else{
            console.log(results);
            res.send("Successfully Deleted")
        }
    })
})

app.get('/dash/home',(req,res)=>{
    connection.query('SELECT * FROM EVENT LIMIT 3',(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err.code);
        }else{
            if(results.length > 0){
                res.statusCode = 200;
                res.send(results);
            }else{
                res.statusCode = 200;
                res.send([]);
            }
        }
    })
})

app.get('/dash/all-events',(req,res)=>{
    connection.query('SELECT * FROM EVENT',(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err)
        }else{
            if(results.length > 0){
                res.statusCode = 200;
                res.send(results);
            }else{
                res.statusCode = 200
                res.send([])
            }
        }
    })
})

// to get all published events
app.get('/dash/all-published-events/:uid',(req,res)=>{
    const uid = req.params.uid;
    connection.query("SELECT EVENTID FROM BRIDGE WHERE USERID=?",[uid],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.status(400).send("Error while getting events");
        }else{
            let query;
            let eventId = [];
            results.forEach((val)=>{
                eventId.push(val.EVENTID)
            })
            if(eventId.length==0){
                query = 'SELECT * FROM EVENT WHERE PUBLISHED=1';
            }else{
                query = 'SELECT * FROM EVENT WHERE PUBLISHED=1 AND EVENTID NOT IN (?)';
            }
            connection.query(query,[eventId],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    res.statusCode = 400;
                    res.send(err)
                }else{
                    if(results.length > 0){
                        res.statusCode = 200;
                        res.send(results);
                    }else{
                        res.statusCode = 200
                        res.send([])
                    }
                }
            })
        }
    })
})

app.post("/dash/add-event/",upload.single('imgPath'),(req,res)=>{
    const eventImg = req.file;
    if(!eventImg){
        res.statusCode = 400;
        res.send("Upload the image file");
    }
    
    const imgPath = `http://localhost:3000/uploads/${eventImg.filename}`;
    const {eventName,start,end,venue,cost,desc,organizer,creator,artistId,inchargePhone,inchargeEmail,incharge,publish} = req.body;
    let query;
    let dependencyArray;
    if(artistId==0||artistId.trim().toUpperCase()==="NULL"||artistId.trim()===""){
        if(venue==0||venue.trim().toUpperCase()==="NULL"||venue.trim()===""){
            query = 'INSERT INTO EVENT (eventName,start,end,venue,cost,description,imagePath,organizer,creator,artistId,incharge,incharge_phone,incharge_email,published) VALUES(?,?,?,NULL,?,?,?,?,?,NULL,?,?,?,?)';
            dependencyArray = [eventName,start,end,cost,desc,imgPath,organizer,creator,incharge,inchargePhone,inchargeEmail,publish]
        }else{
            query = 'INSERT INTO EVENT (eventName,start,end,venue,cost,description,imagePath,organizer,creator,artistId,incharge,incharge_phone,incharge_email,published) VALUES(?,?,?,?,?,?,?,?,?,NULL,?,?,?,?)';
            dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,incharge,inchargePhone,inchargeEmail,publish]
        }
    }else{
        if(venue==0||venue.trim().toUpperCase()==="NULL"||venue.trim()===""){
            query = 'INSERT INTO EVENT (eventName,start,end,venue,cost,description,imagePath,organizer,creator,artistId,incharge,incharge_phone,incharge_email,published) VALUES(?,?,?,NULL,?,?,?,?,?,?,?,?,?,?)';
            dependencyArray = [eventName,start,end,cost,desc,imgPath,organizer,creator,artistId,incharge,inchargePhone,inchargeEmail,publish]
        }else{
            query = 'INSERT INTO EVENT (eventName,start,end,venue,cost,description,imagePath,organizer,creator,artistId,incharge,incharge_phone,incharge_email,published) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,artistId,incharge,inchargePhone,inchargeEmail,publish]
        }
    }
    connection.query(query,dependencyArray,(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err);
        }else{
            if(results){
                if(publish==1){
                    connection.query("SELECT EMAIL FROM USERS WHERE ROLE='viewer'",(err,results,fields)=>{
                        if(err){
                            console.log(err);
                            console.log("could not retrieve user emails");
                            mailer("New event created",
                            fillTemplate(eventName,start,end,venue,eventImg,cost,desc,organizer,incharge,inchargeEmail,inchargePhone),
                            [inchargeEmail]
                            ).then((val)=>{
                                console.log(val);
                            }).catch((err)=>{
                                console.log(err);
                            })
                        }else{
                            let emailId = [];
                            results.forEach((val)=>{
                                emailId.push(val.EMAIL)
                            })
                            emailId.push(inchargeEmail);
                            mailer("New event created",
                            fillTemplate(eventName,start,end,venue,eventImg,cost,desc,organizer,incharge,inchargeEmail,inchargePhone),
                            emailId
                            ).then((val)=>{
                                console.log(val);
                            }).catch((err)=>{
                                console.log(err);
                            })
                        }
                    })
                }else{
                    mailer("New event created",
                    fillTemplate(eventName,start,end,venue,eventImg,cost,desc,organizer,incharge,inchargeEmail,inchargePhone),
                    [inchargeEmail]
                    ).then((val)=>{
                        console.log(val);
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
                res.statusCode = 200;
                res.send("event created successfully.")
            }
        }
    })
})

// update event
app.put("/dash/update-event/:eid",upload.single('imgPath'),(req,res)=>{
    const eventImg = req.file;
    const eid = req.params.eid;
    var imgPath;
    if(!eventImg){
        if(req.body.imgPath.startsWith("http://localhost:3000/uploads/")){
            imgPath = req.body.imgPath;
        }else{
            res.statusCode = 400;
            res.send("Upload the image file");
        }
    }else{
        imgPath = `http://localhost:3000/uploads/${eventImg.filename}`;
    }
    const {eventName,start,end,venue,cost,desc,organizer,creator,artistId} = req.body;
    let query;
    let dependencyArray;
    if(artistId==0||artistId.trim().toUpperCase()==="NULL"||artistId.trim()===""){
        if(venue==0||venue.trim().toUpperCase()==="NULL"||venue.trim()===""){
            query = 'UPDATE EVENT SET eventName=?,start=?,end=?,venue=NULL,cost=?,description=?,imagePath=?,organizer=?,creator=?,artistId=NULL WHERE EVENTID=?';
            dependencyArray = [eventName,start,end,cost,desc,imgPath,organizer,creator,eid]
        }else{
            query = 'UPDATE EVENT SET eventName=?,start=?,end=?,venue=?,cost=?,description=?,imagePath=?,organizer=?,creator=?,artistId=NULL WHERE EVENTID=?';
            dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,eid]
        }
    }else{
        if(venue==0||venue.trim().toUpperCase()==="NULL"||venue.trim()===""){
            query = 'UPDATE EVENT SET eventName=?,start=?,end=?,venue=NULL,cost=?,description=?,imagePath=?,organizer=?,creator=?,artistId=? WHERE EVENTID=?';
            dependencyArray = [eventName,start,end,cost,desc,imgPath,organizer,creator,artistId,eid]
        }else{
            query = 'UPDATE EVENT SET eventName=?,start=?,end=?,venue=?,cost=?,description=?,imagePath=?,organizer=?,creator=?,artistId=? WHERE EVENTID=?';
            dependencyArray = [eventName,start,end,venue,cost,desc,imgPath,organizer,creator,artistId,eid]
        }
    }
    connection.query(query,dependencyArray,(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err);
        }else{
            if(results){
                res.statusCode = 200;
                res.send("Event Updated Suceesfully")
            }else{
                res.statusCode = 200;
                res.send("Event Updated Suceesfully")
            }
        }
    })
})

app.get("/dash/event/:eid",(req,res)=>{
    const eid = req.params.eid;
    if(eid){
        connection.query('SELECT * FROM EVENT WHERE EVENTID=?',[eid],(err,results,fields)=>{
            if(err){
                res.statusCode = 400;
                res.send(err)
                throw err;
            };
            res.statusCode = 200;
            res.send(results[0])
        })
    }else{
        res.statusCode = 400;
        res.send("Bad Request")
    }
})
app.post('/signup',(req,res)=>{
    let {fname,
        lname,
        dob,
        role,
        email,
        pass1} = req.body;
    if(email){
        connection.query('INSERT INTO USERS (fname,lname,DOB,email,password,role,noOfEventsRegistered) VALUES(?,?,?,?,?,?,?)',[fname,lname,dob,email,pass1,role,0],(err,results,fields)=>{
            if(err){
                res.statusCode = 400;
                res.send(err)
                throw err;
            };
            console.log(results);
            res.statusCode = 200;
            res.send("User created successfully")
        })
    }else{
        res.statusCode = 400;
        res.send("no email")
    }
})

app.post('/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    if(username){
        connection.query('SELECT * FROM USERS WHERE EMAIL=?',[username,],(err,results,fields)=>{
            if(err)throw err;
            if(results[0]){
                if(results[0].password===password){
                    console.log(results[0]);
                    res.statusCode = 200;
                    res.send(results[0])
                }else{
                    res.statusCode = 400;
                    res.send("Incorrect Password");
                }
            }else{
                res.statusCode = 400;
                res.send("User doesn't exist with the given email")
            }
        })
    }
})

app.post('/payment',upload.none(),(req,res)=>{
    const data = req.body;
    console.log(data);
    let ref_id = `${Math.floor(new Date().getTime()/10000)}${req.body.uid}${req.body.eid}`;
    connection.query('INSERT INTO BRIDGE (userId,eventId,ref_id) VALUES (?,?,?)',[req.body.uid,req.body.eid,ref_id],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400
            res.send(err)
        }else{
            connection.query("SELECT REGISTRATIONS FROM EVENT WHERE EVENTID=?",[req.body.eid],(err,results,fields)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(results);
                    let totalreg = results[0].REGISTRATIONS + 1;
                    connection.query("UPDATE EVENT SET REGISTRATIONS=? WHERE EVENTID=?",[totalreg,req.body.eid],(err,results,fields)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(results);
                        }
                    })
                }
            })
            console.log(results);
            res.send("Payment Successful")
        }
    })
})

app.get('/artists',(req,res)=>{
    connection.query('SELECT * FROM ARTISTS',(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err.code);
        }else{
            if(results.length > 0){
                res.statusCode = 200;
                res.send(results);
            }else{
                res.statusCode = 200;
                res.send([]);
            }
}})
})

// to view the registered participants for a particular event using the event id
app.get('/dash/view-registered/:eid',(req,res)=>{
    const eid = req.params.eid;
    connection.query("SELECT USERID,CHECKEDIN,ref_id FROM BRIDGE WHERE EVENTID=?",[eid],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.send(err)
        }else{
            const checkedin = results;
            let users = results.map(num=>num.USERID);
            connection.query(`SELECT * FROM USERS WHERE ID IN (?)`,[users],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    res.statusCode = 400;
                    res.send(err)
                }else{
                    let data = results.map((item,index)=>({...item,checkedin:checkedin[index]}))
                    res.send(data);
                }
            })
        }
    })
})

// update the checkin status for a user in an event
app.put('/dash/checkin/:uid/:eid',(req,res)=>{
    const uid = req.params.uid;
    const eid = req.params.eid;
    if(uid && eid){
        connection.query("SELECT CHECKEDIN FROM BRIDGE WHERE USERID=? AND EVENTID=?",[uid,eid],(err,results,fields)=>{
            if(err){
                res.statusCode = 500;
                res.send(err);
            }else{
              if(results[0].CHECKEDIN==1 || results[0].CHECKEDIN===null){
                console.log(results);
                res.statusCode = 400;
                res.send("Already Checked In")
              }else{
                console.log(results);
                connection.query("UPDATE BRIDGE SET CHECKEDIN=1 WHERE USERID=? AND EVENTID=?",[uid,eid],(err,results,fields)=>{
                    if(err){
                        res.statusCode = 500;
                        res.send(err);
                    }else{
                        res.send("Checked IN")
                    }
                })
              }
            }
        })
    }else{
        res.statusCode = 400;
        res.send("Bad Request");
    }
    
})

// artist section starting
// add artist
app.post("/dash/add-artist/",upload.single('imgPath'),(req,res)=>{
    const artistImg = req.file;
    if(!artistImg){
        res.statusCode = 400;
        res.send("Upload the image file");
    }
    
    const imgPath = `http://localhost:3000/uploads/${artistImg.filename}`;
    const {eventName,desc,creator} = req.body;
    connection.query(
        'INSERT INTO ARTISTS (name,description,imgPath) VALUES(?,?,?)',[eventName,desc,imgPath],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err);
        }else{
            if(results){
                res.statusCode = 200;
                res.send("event created successfully")
            }
        }
    })
})

// view all the artists
app.get("/dash/view-artists",(req,res)=>{
    connection.query(
        'SELECT * FROM ARTISTS',(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send(err);
        }else{
            if(results){
                res.statusCode = 200;
                res.send(results)
            }
        }
    })
})

// delete an artist
app.get("/dash/delete-artist/:aid",(req,res)=>{
    const artistId = req.params.aid;
    connection.query("UPDATE EVENT SET ARTISTID=NULL WHERE ARTISTID=?",[artistId],(err,results,fields)=>{
        if(err){
            res.status(400).send("Error while updating event artist to null");
        }else{
            connection.query('DELETE FROM ARTISTS WHERE ARTISTID=?',[artistId],(err,results,fields)=>{
                    if(err){
                        console.log(err);
                        res.statusCode = 400;
                        res.send(err);
                    }else{
                        if(results){
                            res.statusCode = 200;
                            res.send("successfully deleted")
                        }
                    }
            })
        }
    })
    
})
// artist section ending

// venue section starting

// add a venue
app.post("/dash/add-venue",(req,res)=>{
    if(!req.body){
        res.statusCode = 400;
        res.send("Error while creating event")
    }else{
        const {venueName,landmark,availability,userId} = req.body;

        connection.query('INSERT INTO VENUE (NAME,LANDMARK,CREATED_BY,AVAILABILITY) VALUES (?,?,?,?)',[venueName,landmark,userId,availability],(err,results,fields)=>{
            if(err){
                console.log(err);
                res.statusCode = 400;
                res.send("Cannot create venue.Databse error!")
            }else{
                res.statusCode = 200;
                res.send("Venue created successfully")
            }
        })
    }
})

// get a single venue
app.get("/dash/single-venue/:vid",(req,res)=>{
    const vid = req.params.vid;
    if(vid){
        connection.query("SELECT * FROM VENUE WHERE ID=?",[vid],(err,results,fields)=>{
            if(err){
                res.status(400).send("Cannot retrieve venue!")
            }else{
                res.status(200).send(results[0])
            }
        })
    }else{
        res.status(400).send("Invalid request")
    }
})

// get all venues that are available
app.get("/dash/available-venues",(req,res)=>{
    connection.query("SELECT * FROM VENUE WHERE AVAILABILITY=1",(err,results,fields)=>{
        if(err){
            res.statusCode = 400;
            res.send("Error")
        }else if(results.length<=0){
            res.statusCode = 200;
            res.send([])
        }else{
            res.statusCode = 200;
            res.send(results)
        }
    })
})

// get all venues
app.get("/dash/all-venues",(req,res)=>{
    connection.query("SELECT * FROM VENUE",(err,results,fields)=>{
        if(err){
            res.statusCode = 400;
            res.send("Error")
        }else if(results.length<=0){
            res.statusCode = 200;
            res.send([])
        }else{
            res.statusCode = 200;
            res.send(results)
        }
    })
})

// delete venue
app.delete("/dash/delete-venue/:vid",(req,res)=>{
    const vid = req.params.vid;
    connection.query('UPDATE EVENT SET VENUE=NULL WHERE VENUE=?',[vid],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400;
            res.send("error in setting event venues to null");
        }else{
            connection.query("DELETE FROM VENUE WHERE ID=?",[vid],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    res.statusCode = 400;
                    res.send("could not delete the venue");
                }else{
                    res.statusCode = 200;
                    res.send("Successfully deleted venue and event venues set to null")
                }
            })
        }
    })
})

// update venue
app.put("/dash/update-venue/:vid",(req,res)=>{
    const vid = req.params.vid;
    if(!req.body && !vid){
        res.statusCode = 400;
        res.send("Error while updating event")
    }else{
        const {venueName,landmark,availability,userId} = req.body;
        connection.query('UPDATE VENUE SET NAME=?,LANDMARK=?,CREATED_BY=?,AVAILABILITY=? WHERE ID=?',[venueName,landmark,userId,availability,vid],(err,results,fields)=>{
            if(err){
                console.log(err);
                res.statusCode = 400;
                res.send("Cannot update venue.Databse error!")
            }else{
                res.statusCode = 200;
                res.send("Venue updated successfully")
            }
        })
    }
})
// venue section ending


app.get("/dash/getqr/:uid/:eid",(req,res)=>{
    const uid = req.params.uid;
    const eid = req.params.eid;
    connection.query("SELECT CHECKEDIN,REF_ID FROM BRIDGE WHERE EVENTID=? AND USERID=?",[eid,uid],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.status(400).send("Internal server error");
        }else{
            console.log("qr retrieved",results);
            res.status(200).send(results);
        }
    })
})
// server runs on port 3000
app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})