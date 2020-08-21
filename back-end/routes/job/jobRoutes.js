const upload = require("../../multer");
const { Router } = require("express");
const {
	jobPost,
	getAllOpenJobs,
	getParticularJob,
	getClientPostedJobs,
	jobApplied,
	getAppliedJobFreelancer,
} = require("../../controllers/job/jobController");
const { authentication } = require("../../middlewares/Auth");
const router = Router();
router.post("/jobPost", authentication, upload.array("projectFile"), jobPost);
router.get("/getOpenJobs", getAllOpenJobs);
router.get("/getParticularJob/:jobId", getParticularJob);
router.get("/getUserJobPosted", authentication, getClientPostedJobs);
router.post("/applyJob/:jobId", authentication, jobApplied); //
router.get("/getUserAppliedJob/:jobId", getAppliedJobFreelancer); //

module.exports = router;
