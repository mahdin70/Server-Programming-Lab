const express = require('express');
const router = express.Router();


router.get("/getRequest",(req,res)=>{
    res.send("<h1>This is a GET Request</h1>");
});

router.post('/',(req,res)=>{
    res.send("Got a POST Request");
});

router.put('/user',(req,res)=>{
    res.send("Got a PUT Request at /user");
});

router.delete('/user',(req,res)=>{
    res.send("Got a DELETE Request at /user");
});

router.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.send("User ID: ${userId}");
});

module.exports = router;