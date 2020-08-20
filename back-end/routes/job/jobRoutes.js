const upload = require("../../multer");
const { Router } = require("express");
const {
	jobPost,
	getAllOpenJobs,
	getParticularJob,
	getClientPostedJobs,
} = require("../../controllers/job/jobController");
const { authentication } = require("../../middlewares/Auth");
const router = Router();
router.post("/jobPost", authentication, upload.array("projectFile"), jobPost);
router.get("/getOpenJobs", getAllOpenJobs);
router.get("/getParticularJob/:jobId", authentication, getParticularJob); //
router.get("/getUserJobPosted", authentication, getClientPostedJobs);//

module.exports = router;