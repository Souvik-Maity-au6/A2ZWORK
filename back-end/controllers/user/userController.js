const userModel = require("../../models/user/User");

module.exports = {
	// --------- User Registration ---------------- //

	async register(req, res) {
		try {
			const newUser = new userModel({ ...req.body });
			await newUser.save();
			return res.status(200).send({
				msg: "User registered sucessfully",
			});
		} catch (err) {
			console.log(err);
			return res.send({ msg: err.message });
		}
	},

	//----------------------------- User Login -----------------------//

	async login(req, res) {
		const { password, userEmail } = req.body;
		if (!password || !userEmail)
			return res.status(404).send({ msg: "Pls give email and password" });
		try {
			const user = await userModel.findByEmailAndPassword(userEmail, password);
			user[0].generateToken();
			user[0].generateRefreshToken();
			await user[0].save({ validateBeforeSave: false });
			return res.status(200).send({
				msg: `Welcome ${user[0].userName}`,
				userId: user[0].id,
				userName: user[0].userName,
				userEmail: user[0].userEmail,
				accessToken: user[0].token,
				refreshToken: user[0].refreshToken,
			});
		} catch (err) {
			return res.status(404).send({ msg: err.message });
		}
	},

	//---------------------------------  User Logout --------------------//

	async logout(req, res) {
		try {
			const currentUser = req.user.id;
			const user = await userModel.findById(currentUser);
			if (user) {
				user.token = null;
				user.refreshToken = null;
				await user.save({ validateBeforeSave: false });
				return res.send("Thank you visit again");
			} else {
				throw Error("Please Login first");
			}
		} catch (err) {
			return res.send(err.message);
		}
	},
	async checkAuthentication(req, res) {
		try {
			res.status(200).send({ msg: "Your token is not expired" });
		} catch (err) {
			res.status(500).send({ msg: err.message });
		}
	},
};
