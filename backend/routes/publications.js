const express = require('express');
const {Publication} = require('../models/publications');
const { Teacher } = require('../models/teachers');
const router = express.Router();

router.post(`/:id`, async(req, res) =>{
    const teacher = await Teacher.findById(req.params.id);
    console.log(teacher);
    if(!teacher) {
        return res.status(400).send('Invalid Teacher');
    }
    const publication = new Publication({
        title: req.body.title,
        authors: req.body.authors,
        teacherid: req.params.id,
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