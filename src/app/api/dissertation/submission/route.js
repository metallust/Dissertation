import { connect } from "@/dbConfig/dbConfig";
import saveFiles from "@/helper/filehandler";
import { getDataFromToken } from "@/helper/jwt";
import Batch from "@/models/batchModel";
import Dissertation from "@/models/dissertationModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

export async function GET(request) {
	try {
		// get student id
		const token = request.cookies.get("token")?.value || "";
		const { id, role } = getDataFromToken(token);
		// get disseration
		const dissertations = await Dissertation.find({ studentid: id });
		const dissertation = dissertations[0];
		// get submission object
		// if submission is empty
		if (dissertation.submissions.length !== 0) {
			return NextResponse.json(new Response(200, "submissions", dissertation.submissions), {
				status: 200,
			});
		}

		// get batch of the student
		const batches = await Batch.find({ students: id });
		// get the count of the submissions
		// TODO: get this from batch
		const count = 3;

		// create list of submission objects
		let submissions = [];
		for (let i = 0; i < count; i++) {
			submissions.push({
				id: randomStringGenerator(10),
				files: [],
				approved: false,
				review: [],
				todos: [],
			});
		}

		dissertation.submissions = submissions;
		// save the submission object
		await dissertation.save();
		// return the submission object
		return NextResponse.json(new Response(200, "submission", submissions), {
			status: 200,
		});
	} catch (error) {
		console.error("Error setting Uploading:", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
