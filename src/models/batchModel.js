import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
	// name college list of student id
	// guide student mapping
	college: {
		type: String,
		required: [true, "Please provide a Name"],
	},
	year: {
		type: Number,
		required: [true, "Please provide a Year"],
	},
	branch: {
		type: String,
		required: [true, "Please provide branch"],
	},
	students: {
		// list of student id
		type: [mongoose.Schema.Types.ObjectId],
		required: false,
	},
	timeline: {
		type: Object,
		required: false,
	},
	// mapping of guide and student
	mapping: {
		type: Object,
		required: false,
	},
});

const Batch = mongoose.models.batches || mongoose.model("batches", batchSchema);

export default Batch;
