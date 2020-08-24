const jobPostModel = require("../../models/job/job");
const applyJobModel = require("../../models/job/jobApplied");
const { sign, verify } = require("jsonwebtoken");
const userModel = require("../../models/user/User");
const convert = require("../../converter");
const cloudinary = require("../../cloudinary");
const jobModel = require("../../models/job/job");
const { notify } = require("../../routes/job/jobRoutes");
const mail = require("../../sendMail");
const { updateOne } = require("../../models/job/job");
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
			if (!(await applyJobModel.find({ userId: req.userId,jobId:req.params.jobId })).length) {
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

			const checkFreelancerReview=await jobPostModel.findById(req.params.jobId)
			if(!checkFreelancerReview.freelancerReview.ratings){

				const job = await applyJobModel.findOne({jobId:req.params.jobId})
				console.log(job)
				job.ClinetReview.feedBack=req.body.feedback;
				job.ClientReview.ratings=req.body.ratings;
				job.ClinetReview.clientId=req.userId
	
				const jobSave =  new applyJobModel(job)
				await jobSave.save()
				return res.status(200).send({
					msg: "Client Review Added",
					clientReviewData,
				});
			}
			return res.status(404).send({
				msg:"Please let freelancer to give review after that u can provide review"
			})
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

		console.log(req.body)
		try {

			const checkReview=await jobPostModel.findById(req.params.jobId)
			if(!checkReview.freelancerReview.ratings){

				const job = await jobPostModel.findById(req.params.jobId)
				console.log(job)
				job.freelancerReview.feedBack=req.body.feedback;
				job.freelancerReview.ratings=req.body.ratings;
				job.freelancerReview.freelancerId=req.userId
	
				const jobSave =  new jobPostModel(job)
				await jobSave.save()
				return res.status(200).send({
					msg: "Your review has been saved.Job will complete after client's acceptance",
				});
			}
			return res.status(404).send({
				msg:"You have already given the ratings"
			})
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
	async getFreelenacerJobDetails(req,res){

		try{
			
			const applyQuery = await applyJobModel.find({userId:req.userId})
			const appliedJobQuery= await applyJobModel.find({userId:req.userId}).where({jobStatus:"applied"})
			const acceptedJobQuery= await applyJobModel.find({userId:req.userId}).where({jobStatus:"accepted"})
			const completedJobQuery = await applyJobModel.find({userId:req.userId}).where({jobStatus:"completed"})
			// const DocumentLength =  await applyJobModel.find({userId:req.userId}).countDocuments()
			// console.log(DocumentLength)
			let appliedJobs=[]
			let acceptedJobs=[]
			let completedJobs=[]

			// console.log(appliedJobQuery)

			appliedJobs = appliedJobQuery.map(async item=>{
		
				return await item.populate("jobId").execPopulate()
			})
			acceptedJobs=acceptedJobQuery.map(async item=>{
				return await item.populate("jobId").execPopulate()
			})
			completedJobs=completedJobQuery.map(async item=>{
				return await item.populate("jobId").execPopulate()
			})
			appliedJobs = await Promise.all(appliedJobs)
			acceptedJobs=await Promise.all(acceptedJobs)
			completedJobs=await Promise.all(completedJobs)
			// console.log(appliedJobs)
			// // for ( let i=0; i < appliedJobQuery.length; i++){

			// 	console.log(appliedJobQuery[i])
			// 	appliedJobs.push(appliedJobQuery[i].populate("jobId").execPopulate())
			// }
			return res.status(200).send({
				msg:"Freelencer all job status",
				appliedJobs,
				completedJobs,
				acceptedJobs
				
			})
		}
		catch(err){
			return res.status(500).send({ msg: err.message });
		}
	},

	async getFreelenacerJobApplication(req,res){

		try{
			
			const {jobId} = req.params
	
			const application = await applyJobModel.find({userId:req.userId,jobId:jobId})
	
			return res.status(200).send({
				msg:"Job Application",
				application
			})
		}
		catch(err){
			return res.status(500).send({ msg: err.message });
		}
	}
};
