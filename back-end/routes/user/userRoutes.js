const upload = require("../../multer");
const { Router } = require("express");
const {
	register,
	login,
	logout,
	checkAuthentication,
	createClientAccount,
	createFreelancerAccount,
	verify,
	sendForgotPasswordEmail,
	changePassword,
	resendEmail,
	postEditUserProfile,
	getUserProfile,
	postEditClientProfile,
	portfolioUpdate,
	updateEmpHistory,
} = require("../../controllers/user/userController");
const { generateNewAccessToken } = require("../../middlewares/Auth");
// const {
// 	authentication,
// 	dataAuthentication,
// } = require("../../middlewares/Authentication");

const { authentication } = require("../../middlewares/Auth");
const router = Router();

router.post("/userRegistration", register);
router.post("/userLogin", login);
router.delete("/userLogout", authentication, logout);
router.get("/checkAuthentication", authentication, checkAuthentication);
router.post("/createClientAccount", authentication, createClientAccount);
router.post(
	"/createFreelancerAccount",
	authentication,
	createFreelancerAccount,
);
router.get("/verify", verify);
router.post("/sendForgotPasswordEmail", sendForgotPasswordEmail);
router.post("/changePassword/:token", changePassword);
router.get("/resendEmail", resendEmail);
router.get("/generateNewAccessToken/:refreshToken", generateNewAccessToken);
router.post(
	"/postEditUserProfile",
	authentication,
	upload.any(),
	postEditUserProfile,
);
router.post(
	"/postEditClientProfile",
	authentication,
	upload.single("profileImage"),
	postEditClientProfile,
);
router.get("/getUserProfile", authentication, getUserProfile);
router.post(
	"/portfolioUpdate",
	authentication,
	upload.single("portfolioImage"),
	portfolioUpdate,
);

router.post("/postEmpHistory", authentication, updateEmpHistory);
module.exports = router;
