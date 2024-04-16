// this will content state of the disseration of a student
// history maybe
// disseration id
// student user id
// list of topics
// selected topic
// timeline
// current progress

import mongoose from "mongoose";

const disserationSchema = new mongoose.Schema({
	studentid: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "Please provide a student id"],
		unique: true,
	},
});

const Dissertation = mongoose.models.disserations || mongoose.model("disserations", disserationSchema);

export default Dissertation;
