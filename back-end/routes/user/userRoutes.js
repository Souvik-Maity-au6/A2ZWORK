const { Router } = require("express");
const {
	register,
	login,
	logout,
	checkAuthentication,
	createClientAccount,
	createFreelancerAccount,
	verify,sendForgotPasswordEmail,changePassword,resendEmail
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
router.get("/checkAuthentication", authentication, checkAuthentication);
router.post("/createClientAccount",authentication,createClientAccount)
router.post("/createFreelancerAccount",authentication,createFreelancerAccount)
router.get("/verify",verify);
router.post("/sendForgotPasswordEmail",sendForgotPasswordEmail);
router.get("/changePassword/:token",changePassword);
router.get("/resendEmail",resendEmail);

module.exports = router;
