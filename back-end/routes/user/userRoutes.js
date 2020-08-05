const { Router } = require("express");
const {
	register,
	login,
	logout,
	checkAuthentication,
} = require("../../controllers/user/userController");
const {
	authentication,
	dataAuthentication,
} = require("../../middlewares/Authentication");
const router = Router();

router.post("/userRegistration", register);
router.post("/userLogin", login);
router.delete("/userLogout", dataAuthentication, logout);
router.get("/checkAuthentication", authentication, checkAuthentication);

module.exports = router;
