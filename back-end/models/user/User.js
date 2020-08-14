const { Schema, model } = require("mongoose");
const { sign } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");

const userSchema = Schema({
	token: {
		type: String,
		default: null,
	},
	refreshToken: {
		type: String,
		default: null,
	},
	userName: {
		type: String,
		trim: true,
		// sparse: true,
		required: [true, "Name required"],
	},
	userEmail: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: [true, "Email required"],
		validate: {
			validator: function(email) {
				return /^[A-Za-z._{0-9}*]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/.test(
					email,
				);
			},
			message: "Please enter a valid email",
		},
	},
	password: {
		type: String,
		validate: {
			validator: function(psw) {
				return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
					psw,
				);
			},
			message:
				"Please enter a valid password that must contain min 6 character atleast one upper case , one lower case and one special character",
		},
		required: [true, "Password Required"],
	},
	title: {
		type: String,
	},
	specialization: [
		{
			specializationTitle: {
				type: String,
			},
			specializationSkills: [
				{
					type: String,
				},
			],
		},
	],

	availability: {
		type: String,
	},
	languages: [
		{
			medium: {
				type: String,
			},
			fluency: {
				type: String,
			},
		},
	],

	education: [
		{
			collegeName: {
				type: String,
			},
			degree: {
				type: String,
			},
			startingYear: {
				type: String,
			},
			passoutYear: {
				type: String,
			},
		},
	],
	skills: [
		{
			type: String,
		},
	],

	address: {
		pinNo: {
			type: String,
		},
		city: {
			type: String,
		},
		country: {
			type: String,
		},
		state: {
			type: String,
		},
	},
	phoneNo: {
		type: Number,
	},
	panNo: {
		type: String,
	},
	addharNo: {
		type: String,
	},
	GSTIN: {
		type: String,
	},
	moneyBalance: [
		{
			earning: {
				type: Number,
			},
			spending: {
				type: Number,
			},
		},
	],
	projectPreference: {
		type: String,
	},
	experienceLevel: {
		type: String,
	},
	category: {
		type: String,
	},
	resume: {
		type: String,
	},
	workHistory: [
		{
			type: String,
		},
	],
	profileImage: {
		type: String,
	},

	isAuthorized: {
		type: Boolean,
		default: false,
	},
	skills: [
		{
			type: String,
		},
	],
	hourlyRate: {
		type: Number,
	},
	isClient: {
		type: Boolean,
		default: false,
	},
	isFreelancer: {
		type: Boolean,
		default: false,
	},
	companyName: {
		type: String,
	},
	jobApplied: [
		{
			type: Schema.Types.ObjectId,
			ref: "jobs",
			default: null,
		},
	],
	jobPosted: [
		{
			type: Schema.Types.ObjectId,
			ref: "jobs",
			default: null,
		},
	],
	vatId: {
		type: String,
	},
	companyLink: {
		type: String,
	},
	companyDescription: {
		type: String,
	},
	companyContactDetails: [
		{
			pinNo: {
				type: String,
			},
			city: {
				type: String,
			},
			country: {
				type: String,
			},
			state: {
				type: String,
			},
		},
	],
	acceptTermsCondition: {
		type: Boolean,
	},
	freelancerDescription: {
		type: String,
	},
});

userSchema.path("skills").validate(function(skills) {
	if (skills.length > 10) {
		return false;
	}
	return true;
}, "Maximum limit of skills is 10");

userSchema.statics.findByEmailAndPassword = async function(email, password) {
	let userObj = null;
	try {
		return new Promise(async function(resolve, reject) {
			const user = await userModel.find({ userEmail: email });

			if (user.length === 0) return reject("Incorrect credentials");
			userObj = user;
			const isMatched = await compare(password, user[0].password);

			if (!isMatched) return reject("Incorrect credentials");
			resolve(userObj);
		});
	} catch (err) {
		reject(err);
	}
};

userSchema.methods.generateToken = async function() {
	this.token = await sign({ id: this._id }, process.env.PRIVATE_KEY, {
		expiresIn: 60 * 30,
	});
};
userSchema.methods.generateRefreshToken = async function() {
	this.refreshToken = await sign(
		{ id: this._id },
		process.env.PRIVATE_KEY_REFRESH_TOKEN,
		{
			expiresIn: 60 * 60,
		},
	);
};

userSchema.pre("save", async function(next) {
	try {
		if (this.isModified("password")) {
			const hashPwd = await hash(this.password, 10);
			this.password = hashPwd;
			next();
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

const userModel = model("user", userSchema);
module.exports = userModel;
