const { Router } = require("express");
const {
	register,
	login,
	logout,
	checkAuthentication,
	createClientAccount,
	createFreelancerAccount
} = require("../../controllers/user/userController");
// const {
// 	authentication,
// 	dataAuthentication,
// } = require("../../middlewares/Authentication");

const {
	authentication
} = require("../../middlewares/Auth")
const router = Router();

router.post("/userRegistration", register);
router.post("/userLogin", login);
router.delete("/userLogout", authentication, logout);
// router.get("/checkAuthentication", authentication, checkAuthentication);
router.post("/createClientAccount",authentication,createClientAccount)
router.post("/createFreelancerAccount",authentication,createFreelancerAccount)

module.exports = router;
