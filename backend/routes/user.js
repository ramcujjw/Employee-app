const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
require('../db/connection');
// require('../connection');
const userModel = require('../model/userData');
router.use(express.json())

router.post('/login',async(req,res)=>{
    const user = await userModel.findOne({username:req.body.username})
    if (!user) {
        res.json({message:"User not found"})
    }
    try{
        if(user.password==req.body.password)
        {
            const payload={uname:req.body.userName,pwd:req.body.password};
            const token=jwt.sign(payload,"secret")//algorithm ,expiry time,
            res.status(200).send({message:"Login successful",usertoken:token})
        }
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;
