const express = require('express');
const router = express.Router();
const empModel = require('../model/empData');
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const jwt = require("jsonwebtoken")

//Adding middleware -verify token 

function verifyToken(req,res,next){
    let token = req.headers.token;
    try {
        if (!token) throw 'Unauthorised Access'
        let payload= jwt.verify(token,"secret") //the same secret key in sign method(user.js)
        if (!payload) throw 'Unauthorise Access'
        next()
    } catch (error) {
        res.json({message:error})
    }
}

//add middleware function in every router


router.post('/add',verifyToken,async(req,res)=>{
    try {
        var item = req.body;
        const data1 = new empModel(item);
        const saveddata = await data1.save();
        res.status(200).send('Post Successful');

    } catch (error) {
      res.status(404).send('Post Unsuccessful');  
    }
})
router.get('/', verifyToken, async (req, res) => {
    try {
        const emps = await empModel.find(); 
        res.status(200).json(emps); 
    } catch (error) {
        console.error('Error retrieving emps:', error);
        res.status(500).send('Error retrieving emps');
    }
});


router.get('/:id', verifyToken, async (req, res) => {
    try {
        const emp = await empModel.findById(req.params.id); 
        if (!emp) {
            return res.status(404).send('emp  not found');
        }
        res.status(200).json(emp ); 
    } catch (error) {
        console.error('Error retrieving employee :', error);
        res.status(500).send('Error retrieving employee');
    }
});
router.put('/editEmp/:id', verifyToken, async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await empModel.findByIdAndUpdate(id,req.body);
        res.status(200).send('Update successful');
    } catch (error) {
       res.status(404).send(error); 
    }
})

router.delete('/deleteEmp/:id', verifyToken, async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await empModel.findByIdAndDelete(id);
        res.status(200).send('Delete successful')
    } catch (error) {
        res.status(404).send('Delete Unsuccessful');
    }
})

module.exports = router;