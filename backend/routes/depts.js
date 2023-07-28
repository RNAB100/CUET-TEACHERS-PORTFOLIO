const express = require('express');
const {Dept} = require('../models/depts');
const router = express.Router();

router.get(`/`, async(req, res) =>{
    const deptlist = await Dept.find().populate('teachers', 'name img');

    if(!deptlist) {
        res.status(500).json({success: false});
    }
    res.send(deptlist);
})

/*
router.post(`/`, (req, res) =>{
    const teacher = new Teacher({
        name: req.body.name,
        post: req.body.post,
        qualification: req.body.qualification,
        mail: req.body.mail,
        phno: req.body.phno,
        interestfield: req.body.interestfield
    })
    
    teacher.save().then((createdTeacher =>{
        res.status(201).json(createdTeacher);
    })).catch((err) =>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})
*/

module.exports = router;