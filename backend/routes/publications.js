const express = require('express');
const {Publication} = require('../models/publications');
const { Teacher } = require('../models/teachers');
const router = express.Router();

router.post(`/`, async(req, res) =>{
    const teacher = await Teacher.findById(req.body.teacherid);
    if(!teacher) {
        return res.status(400).send('Invalid Teacher');
    }
    const publication = new Publication({
        title: req.body.title,
        teacherid: req.body.teacherid,
        authors: req.body.authors,
        information: req.body.information,
        year: req.body.year
    })
    
    const savepublication = await publication.save();
    if(!savepublication){
        return res.status(500).send('Cannot save')
    }
    else {
        // update teacher publications
        await teacher.publication.push(savepublication.id);
        teacher.save();

        res.send(savepublication);
    }
})


module.exports = router;