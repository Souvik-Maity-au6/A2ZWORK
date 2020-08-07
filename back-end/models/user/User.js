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
			message: "Please enter a valid password that must contain min 6 character atleast one upper case , one lower case and one special character",
		},
		required: [true, "Password Required"],
	},
	isAuthorized:{
		type:Boolean,
		default:false
	},
	skills:[{
		type:String
	}],
	hourlyRate:{
		type:Number
	},
	isClient:{
		type:Boolean,
		default:false
	},
	isFreelancer:{
		type:Boolean,
		default:false
	},
	companyName:{
		type:String
	},
	jobApplied:[{
		type:Schema.Types.ObjectId,
		ref:"jobs",
		default:null
	}],
	jobPosted:[{
		type:Schema.Types.ObjectId,
		ref:"jobs",
		default:null,
	}],
	profileOverview:{
		type:String
	}
	
});

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
		expiresIn: 60*1,
	});
};
userSchema.methods.generateRefreshToken = async function() {
	this.refreshToken = await sign({ id: this._id }, process.env.PRIVATE_KEY, {
		expiresIn: 60*20,
	});
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
