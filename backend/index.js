var express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer');

// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage })

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

app.put('/dash/updateProfile',(req,res)=>{
    const {fname,lname,dob,addr,pincode,phnnum,id}=req.body;
    console.log(req.body);
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

app.get('/dash/deleteEvent/:uid/:eid',(req,res)=>{
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
                res.statusCode = 404
                res.send("No events listed")
            }
        }
    })
})

app.post("/dash/add-event/",upload.single('imgPath'),(req,res)=>{
    const eventImg = req.file;
    if(!eventImg){
        res.statusCode = 400;
        res.send("Upload the image file");
    }
    console.log(eventImg.destination);
    const imgPath = `http://localhost:3000/uploads/${eventImg.originalname}`;
    const {eventName,
        start,
        end,
        venue,
        cost,
        desc,
        organizer,
        creator,
        artistId} = req.body;
    connection.query(
        'INSERT INTO EVENT (eventName,start,end,venue,cost,description,imagePath,organizer,creator,artistId) VALUES(?,?,?,?,?,?,?,?,?,?)',[eventName,
        start,
        end,
        venue,
        cost,
        desc,
        imgPath,
        organizer,
        creator,
        artistId],(err,results,fields)=>{
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
                res.send("User doesn't exist with the given username")
            }
        })
    }
})

app.post('/payment',upload.none(),(req,res)=>{
    const data = req.body;
    console.log(data);
    connection.query('INSERT INTO BRIDGE (userId,eventId) VALUES (?,?)',[req.body.uid,req.body.eid],(err,results,fields)=>{
        if(err){
            console.log(err);
            res.statusCode = 400
            res.send(err)
        }else{
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

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})