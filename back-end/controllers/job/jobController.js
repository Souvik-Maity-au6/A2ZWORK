const jobPostModel = require("../../models/job/job");
const applyJobModel = require("../../models/job/jobApplied");
const { sign, verify } = require("jsonwebtoken");
const userModel = require("../../models/user/User");
const convert = require("../../converter");
const cloudinary = require("../../cloudinary");
const jobModel = require("../../models/job/job");
const { notify } = require("../../routes/job/jobRoutes");
const mail = require("../../sendMail");
// const { verify } = require("../user/userController");

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
		// console.log(jobId);
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
			const query = jobModel.find({ user: req.userId });
			// console.log(await query.where({jobStatus:"open"}))

			return res.status(200).send({
				msg: "posted job by client",
				openJob: await query.where({ jobStatus: "open" }),
				onGoingJob: await query.where({ jobStatus: "ongoing" }),
				closedJob: await query.where({ jobStatus: "closed" }),
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async jobApplied(req, res) {
		try {
			if (!(await applyJobModel.find({ userId: req.userId })).length) {
				req.body.userId = req.userId;
				req.body.jobId = req.params.jobId;
				req.body.jobStatus = "applied";
				const jobApplied = await new applyJobModel({ ...req.body }).save();
				return res.status(200).send({
					msg: "Job Applied Sucessfully",
					jobApplied,
				});
			}
			throw new Error("you have already applied for this job !!!");
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async getAppliedJobFreelancer(req, res) {
		try {
			const { jobId } = req.params;
			const appliedJobs = await applyJobModel
				.find({ jobId })
				.populate({ path: "userId" });
			return res.status(200).send({
				msg: "Applied Jobs",
				appliedJobs,
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async clientReview(req, res) {
		try {
			const clientJobReview = await applyJobModel
				.find({ jobId: req.params.jobId })
				.select("clientReview");
			let sumRatings = clientJobReview.sumRatings + req.body.ratings;
			let ratingsCount = clientJobReview.ratingsCount++;
			const clientReview = {
				clientId: req.userId,
				feedback: req.body.feedback,
				sumRatings,
				ratingsCount,
				ratings: sumRatings / ratingCount,
			};
			const clientReviewData = await new applyJobModel.findByIdAndUpdate(
				req.params.jobId,
				{ ...clientReview },
				{ new: true },
			);
			return res.status(200).send({
				msg: "Client Review Added",
				clientReviewData,
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async getClientReview(req, res) {
		try {
			const clientReview = await applyJobModel
				.find({ jobId: req.params.jobId })
				.select("clientReview");
			return res.status(200).send({
				clientReview,
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},

	async addFreelancerReview(req, res) {
		try {
			const freelancerJobReview = await jobPostModel
				.find({ _id: req.params.jobId })
				.select("freelancerReview");
			let sumRatings = freelancerJobReview.sumRatings + req.body.ratings;
			let ratingsCount = freelancerJobReview.ratingsCount++;
			const freelancerReview = {
				clientId: req.userId,
				feedback: req.body.feedback,
				sumRatings,
				ratingsCount,
				ratings: sumRatings / ratingCount,
			};
			const freelancerReviewData = await new jobPostModel.updateOne(
				{ _id: req.params.jobId },
				{ ...freelancerReview },
				{ new: true },
			);
			return res.status(200).send({
				msg: "Client Review Added",
				freelancerReviewData,
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async getFreelancerReview(req, res) {
		try {
			const freelancerReview = await jobPostModel
				.find({ jobId: req.params.jobId })
				.select("freelancerReview");
			return res.status(200).send({
				freelancerReview,
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async sendHireEmail(req, res) {
		try {
			const { jobId, freelancerId, userId } = req.params;
			const expToken = sign({ id: jobId }, process.env.PRIVATE_KEY, {
				expiresIn: "24h",
			});
			let newUser = await userModel.find({ _id: freelancerId });
			let html = `<a href=http://localhost:5000/hireFreelancer/${jobId}/${freelancerId}/${expToken}/${userId}>Accept your Offer</a>`;
			const mailConfig = {
				html,
				newUser: newUser[0],
				subject: "Offer letter ",
			};
			await mail.mailConfig(mailConfig);
			return res.status(200).send({
				msg: "Job offer letter mail has been sent successfully",
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async hireFreelancer(req, res) {
		try {
			const { jobId, freelancerId, expToken, userId } = req.params;
			verify(expToken, process.env.PRIVATE_KEY);
			await applyJobModel.updateOne(
				{ jobId: jobId, userId: freelancerId },
				{ jobStatus: "accepted" },
				{ new: true },
			);
			await jobModel.updateOne(
				{ _id: jobId },
				{ jobStatus: "ongoing" },
				{ new: true },
			);
			const jobPosted = await jobModel.findOne({ _id: jobId });
			await userModel.updateOne(
				{ _id: userId },
				{ clientCurrentBalance: jobPosted.budgetAmount },
			);
			return res.status(200).send({
				msg: " Congratulation and Best of luck for your new job",
			});
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
};
