const jobPostModel = require("../../models/job/job");
const applyJobModel = require("../../models/job/jobApplied")
const convert = require("../../converter");
const cloudinary = require("../../cloudinary");
const jobModel = require("../../models/job/job");
const { notify } = require("../../routes/job/jobRoutes");

module.exports = {
	async jobPost(req, res) {
		// console.log(req.files);
		const {
			category,
			skills,
			jobTitle,
			projectDuration,
			jobDescription,
			projectType,
			expertiseLevel,
			budgetType,
			budgetAmount,
			freelancerNo,
		} = req.body;
		const modifiedSkills = skills.split(",");
		let imageContentProfileImage = [];
		let jobFile = [];

		try {
			req.files.forEach(file => {
				imageContentProfileImage.push(convert(file.originalname, file.buffer));
			});
			console.log(imageContentProfileImage.length);
			jobFile = await Promise.all(
				imageContentProfileImage.map(async image => {
					return await cloudinary.uploader.upload(image);
				}),
			);

			let jobPostFile = jobFile.map(job => {
				return job.secure_url;
			});

			const newJob = new jobModel({
				user: req.userId,
				projectFile: jobPostFile,
				skills: modifiedSkills,
				jobTitle,
				projectDuration,
				jobDescription,
				projectType,
				expertiseLevel,
				budgetType,
				budgetAmount,
				freelancerNo,
				category,
				jobStatus: "open",
			});
			const jobPost = await newJob.save();

			// console.log(jobPostFile.secure_url)

			// console.log(jobPostFile.length)

			return res.status(200).send({
				msg: "Your job has been posted successfully !!!",
				jobPost,
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async getAllOpenJobs(req, res) {
		try {
			const openJob = await jobModel.find({ jobStatus: "open" });
			return res.status(200).send({
				msg: "All opened jobs",
				openJob,
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async getParticularJob(req, res) {
		const { jobId } = req.params;
		console.log(jobId);
		try {
			const getOneJob = await jobModel
				.findOne({
					_id: jobId,
				})
				.populate("user");

			return res.status(200).send({
				msg: "particular job",
				job: getOneJob,
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async getClientPostedJobs(req, res) {
		// const {userId}=req.params

		try {
			const jobsPosted = await jobModel.find({
				user: req.userId,
				jobStatus: { $ne: "closed" },
			});
			return res.status(200).send({
				msg: "posted job by client",
				job: jobsPosted,
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async jobApplied(req,res){
		try{

			req.body.userId=req.userId

			const jonApplied = await new applyJobModel({...req.body}).save()
			return res.status(200).send({
				msg:"Applied job",
				jobApplied
			})
		
		}
		catch(err){
			return res.status(500).send({ msg: err.message });
		}
	}
};
