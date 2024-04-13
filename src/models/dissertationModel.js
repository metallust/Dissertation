// this will content state of the disseration of a student
// history maybe
// disseration id
// student user id
// list of topics
// selected topic
// timeline
// current progress

import mongoose from "mongoose";
import User from "./userModel";

const disserationSchema = new mongoose.Schema({
	studentid: {
		type: User,
		required: [true, "Please provide a Name"],
		unique: true,
	},
});

const Dissertation =
	mongoose.models.disserationSchema ||
	mongoose.model("users", disserationSchema);

export default Dissertation;
