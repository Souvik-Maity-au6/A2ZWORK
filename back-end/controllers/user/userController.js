const userModel = require("../../models/user/User");
const path = require("path");
const { verify } = require("jsonwebtoken");
const mail = require("../../sendMail");
const ObjectId = require("mongodb").ObjectID;
const { sendVerifyDesign } = require("../../static/verify.js");
const { sendForgotPasswordDesign } = require("../../static/forgetPassword");
const { setTimeout } = require("timers");
const { sign } = require("jsonwebtoken");

module.exports = {
	// --------- User Registration ---------------- //

	async register(req, res) {
		try {
			console.log(req.body);
			if (!(req.body.isClient ^ req.body.isFreelancer)) {
				return res.status(400).send({
					msg: "Please select your account type !!!",
				});
			}
			const newUser = new userModel({ ...req.body });
			const user = await newUser.save();
			user.generateToken();
			await user.save({ validateBeforeSave: false });
			console.log("user register=", user);
			// let link = `http://localhost:5000/verify?token=${user.token}`
			const verifyHtml = sendVerifyDesign(
				`http://localhost:5000/verify?token=${user.token}`,
				user.userName,
			);
			// let html= `<a href="${process.env.USER_VERIFY_LINK}verify?token=${user.token}">Verify</a>`;
			const mailConfig = {
				html: verifyHtml,
				newUser,
				subject: "Verify your email address to complete registration",
			};
			// let html = `<a href="http://localhost:5000/verify?token=${user.token}">Verify</a>`;
			await mail.mailConfig(mailConfig);
			return res.status(200).send({
				msg: {
					title:
						"Account created sucessfully, please verify your email before login !!!",
					text: "Didnot get email ? please register again !!!",
				},
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send({ msg: err.message });
		}
	},

	//----------------------------- User Login -----------------------//

	async login(req, res) {
		const { password, userEmail } = req.body;
		if (!password || !userEmail)
			return res.status(404).send({ msg: "Pls give email and password" });
		try {
			const user = await userModel.findByEmailAndPassword(userEmail, password);

			if (user[0].isAuthorized) {
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
					isClient: user[0].isClient,
					isFreelancer: user[0].isFreelancer,
				});
			} else {
				return res.status(401).send({
					msg: "Please verify your account before you log in !!!",
				});
			}
		} catch (err) {
			return res.status(404).send({ msg: err });
		}
	},

	//---------------------------------  User Logout --------------------//

	async logout(req, res) {
		try {
			const currentUser = req.userId;
			const user = await userModel.findById(currentUser);
			if (user) {
				user.token = null;
				user.refreshToken = null;
				await user.save({ validateBeforeSave: false });
				return res.status(200).send({ msg: "Thank you visit again" });
			} else {
				throw Error("Please Login first");
			}
		} catch (err) {
			return res.status(500).send(err.message);
		}
	},
	async checkAuthentication(req, res) {
		try {
			res.status(200).send({ msg: "Your token is not expired" });
		} catch (err) {
			res.status(500).send({ msg: err.message });
		}
	},

	//----------- Creating Client Account ----------//

	async createClientAccount(req, res) {
		const checkUserClient = await userModel.findOne({ _id: req.userId });

		if (checkUserClient.isClient) {
			return res.send({
				msg: "You already have a client account !!!",
			});
		}
		const updatedUser = await userModel.findByIdAndUpdate(
			{ _id: req.userId },
			{ ...req.body },
			{ new: true },
		);
		console.log(updatedUser);

		return res.send({
			user: updatedUser,
		});
	},

	//----------- Creating Freelancer Account ----------//

	async createFreelancerAccount(req, res) {
		const checkUserClient = await userModel.findOne({ _id: req.userId });
		// console.log()

		if (checkUserClient.isFreelancer) {
			return res.send({
				msg: "You already have a Freelancer account !!!",
			});
		}
		// console.log("he")
		const updatedUser = await userModel.findByIdAndUpdate(
			{ _id: req.userId },
			{ ...req.body },
			{ new: true },
		);
		console.log(updatedUser);

		return res.send({
			user: updatedUser,
		});
	},

	//----------- Creating Client Account ----------//

	async createClientAccount(req, res) {
		const checkUserClient = await userModel.findOne({ _id: req.userId });

		if (checkUserClient.isClient) {
			return res.send({
				msg: "You already have a client account !!!",
			});
		}
		const updatedUser = await userModel.findByIdAndUpdate(
			{ _id: req.userId },
			{ ...req.body },
			{ new: true },
		);
		console.log(updatedUser);

		return res.send({
			user: updatedUser,
		});
	},

	//----------- Verifying user account ----------//
	async verify(req, res) {
		console.log(req.query);
		const { token } = req.query;
		try {
			verify(token, process.env.PRIVATE_KEY);
			const user = await userModel.findOne({ token });
			console.log(user);
			if (user) {
				user.isAuthorized = true;

				//   console.log("Hi")
				// console.log(user);
				await user.save({ validateBeforeSave: false });

				// return res.send({
				//   // msg: "You have been Suceesfully Verified you can login now ",
				// });
				return res.send(`<h1 style="text-align:center">You have been sucessfully verified</h1> <script>setTimeout(()=>{
          window.location.href="http://localhost:3000/login"
        },4000)</script>`);
			}
		} catch (err) {
			console.log(err.message);
			return res.redirect(`/resendEmail?token=${token}`);
		}
	},
	async sendForgotPasswordEmail(req, res) {
		const { userEmail } = req.body;
		if (!userEmail) {
			return res.status(403).send({
				msg: "please provide your email !!!",
			});
		}
		try {
			const user = await userModel.findOne({ userEmail: userEmail });
			console.log(user);
			if (!user) {
				return res
					.status(403)
					.send({ msg: "Please create your account first" });
			}
			const forgotPasswordToken = await sign(
				{ id: user._id },
				process.env.PRIVATE_KEY,
				{ expiresIn: "4h" },
			);
			const forgotPasswordHtml = sendForgotPasswordDesign(
				`http://localhost:3000/changePassword/${forgotPasswordToken}`,
				user.userName,
			);

			const mailConfig = {
				html: forgotPasswordHtml,
				newUser: user,
				subject: "Forgot Password Confirmation mail ",
			};

			// let html = `<a href="http://localhost:5000/changePassword/${user[0].token/forgotPasswordToken}">Click Here to change the password</a>`;
			const email = await mail.mailConfig(mailConfig);
			return res.status(200).send({
				msg: {
					title: "Reset Password link has been send ",
					text: "Please Check your Email to reset password",
				},
				forgotPasswordToken,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send({ msg: err.message });
		}
	},

	async changePassword(req, res) {
		try {
			const { newPassword, confirmPassword } = req.body;
			const { token } = req.params;
			const verified = verify(token, process.env.PRIVATE_KEY);
			if (!newPassword) {
				res.status(403).send({
					msg: "New Password field cannot be empty !!!",
				});
			} else if (!confirmPassword) {
				res.status(403).send({
					msg: "Confirm Password field cannot be empty !!!",
				});
			}

			if (newPassword !== confirmPassword) {
				return res.status(403).send({
					msg: "Confirm password does not match with the new Password !!!",
				});
			}
			const user = await userModel.findById(verified.id);
			user.password = newPassword;
			const changedUserPassword = await user.save();

			if (changedUserPassword) {
				return res.status(200).send({
					msg: "Password has been changed sucessfully !!!",
				});
			}
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},
	async resendEmail(req, res) {
		console.log("token::", req.query.token);
		const { token } = req.query;
		try {
			const user = await userModel.findOne({ token });
			console.log(user);
			// console.log("Hello Iam going to resend Email");
			user.generateToken();
			const updatedUser = await user.save({ validateBeforeSave: false });
			const verifyHtml = sendVerifyDesign(
				`http://localhost:5000/verify?token=${updatedUser.token}`,
				updatedUser.userName,
			);
			const mailConfig = {
				html: verifyHtml,
				newUser: updatedUser,
				subject: "Verify your email address to complete registration",
			};
			// let html = `<a href="http://localhost:5000/verify?token=${user.token}">Verify</a>`;
			await mail.mailConfig(mailConfig);
			return res.status(200).send({
				msg:
					"Your token was expired so we send another conformation email so please check your inbox",
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send({ msg: err.message });
		}
	},

	async postEditUserProfile(req,res){


		try{

			const editProfile = await  userModel.findByIdAndUpdate(req.userId,{...req.body},{new:true})
			
			// console.log(edit)
			// const updatedEditPofile = await editProfile.save({validateBeforeSave:false})
	
			return res.status(200).send({
	
				 user:editProfile
			})

		}
		catch(err){
			return res.status(500).send({
				msg:err.message
			})
		}		

	}

};
