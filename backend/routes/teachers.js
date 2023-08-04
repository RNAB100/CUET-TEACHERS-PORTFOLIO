const express = require("express");
const { Teacher } = require("../models/teachers");
const { Dept } = require("../models/depts");
const router = express.Router();

router.get(`/`, async (req, res) => {
	const teacherlist = await Teacher.find();

	if (!teacherlist) {
		return res.status(500).json({ success: false });
	}
	res.send(teacherlist);
});

// for individual teacher
router.get(`/:id`, async (req, res) => {
	const publicationlist = await Teacher.findById(req.params.id).populate(
		"publication"
	);
	// console.log
	if (!publicationlist) {
		return res.status(500).send("No Publication");
	}
	return res.status(201).send(publicationlist);
});

router.post(`/`, async (req, res) => {
	const dept = await Dept.findOne({ deptname: req.body.deptname });
	const mail = req.body.mail;
	console.log(mail);
	console.log(req.body);
	if (!dept) {
		return res.status(500).send("Invalid Department");
	}
	if (!mail.includes("@cuet.ac.bd")) {
		return res.status(600).send("Invalid Mail");
	}
	const teacher = new Teacher({
		name: req.body.name,
		dept: dept._id,
		post: req.body.post,
		qualification: req.body.qualification,
		mail: req.body.mail,
		phno: req.body.phno,
		img: req.body.img,
		password: req.body.password,
		interestfield: req.body.interestfield,
	});
	const saveteacher = await teacher.save();
	if (!saveteacher) {
		return res.status(500).send("Cannot save");
	} else {
		//update dept teachers
		await dept.teachers.push(saveteacher.id);
		dept.save();

		res.send(saveteacher);
	}
});

//login 
router.post(`/login`, async (req, res) => {
	const tech_by_mail = await Teacher.findOne({mail: req.body.mail});
	if (!tech_by_mail) {
		res.status(500).send("Invalid Mail/Password");
	}
	console.log(typeof(tech_by_mail.password));
	console.log(typeof(req.body.password));

	if(tech_by_mail.password === req.body.password) {
		 res.status(201).json({tech_by_mail});
		
	}
	else {
		res.status(500).send("Login Failed");
	}
});

router.put("/:id", async (req, res) => {
	const dept = await Dept.findById(req.body.dept);
	if (!dept) {
		return res.status(400).send("Invalid Department");
	}
	const teacher = await Teacher.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			dept: req.body.dept,
			post: req.body.post,
			qualification: req.body.qualification,
			mail: req.body.mail,
			phno: req.body.phno,
			img: req.body.img,
			password: req.body.password,
			interestfield: req.body.interestfield,
			bio: req.body.bio,
		},
		{ new: true }
	);
	if (!teacher) {
		return res.status(500).send("Update failed");
	}
	res.send(teacher);
});

module.exports = router;
