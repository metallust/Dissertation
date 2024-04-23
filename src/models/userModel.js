import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide a Name"],
		unique: false,
	},
	email: {
		type: String,
		required: [true, "Please provide a email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
	},
	role: {
		type: String,
		required: [true, "Please provide a role"],
	},
	domain: String,
	branch: String,
	forgotPasswordToken: String,
	forgotPasswordTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
