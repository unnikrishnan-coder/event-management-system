const express = require('express');
const router = express.Router();

router.get("/home/",(req,res)=>{
    res.sendFile(__dirname + "/public/dashboard.html")
})

router.get("/all-events/",(req,res)=>{
    res.sendFile(__dirname + "/public/all-events.html")
})
router.get("/my-events/",(req,res)=>{
    res.sendFile(__dirname + "/public/my-events.html")
})
router.get("/profile/",(req,res)=>{
    res.sendFile(__dirname + "/public/profile.html")
})

module.exports = router;