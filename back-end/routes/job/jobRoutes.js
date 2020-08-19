const upload = require("../../multer")
const { Router } = require("express");
const {jobPost} = require("../../controllers/job/jobController");
const { authentication } = require("../../middlewares/Auth");
const router = Router();
router.post("/jobPost",authentication,upload.array("image"),jobPost)



module.exports = router;