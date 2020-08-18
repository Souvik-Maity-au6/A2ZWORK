const upload = require("../multer")
const { Router } = require("express");
const {jobPost} = require("../controllers/job/jobController");
const router = require("./user/userRoutes");
const { authentication } = require("../middlewares/Auth");


// router.post("/jobPost",authentication,upload.array(),jobPost)


module.exports = router;