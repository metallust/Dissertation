import { connect } from "@/dbConfig/dbConfig";
import saveFiles from "@/helper/filehandler";
import { getDataFromToken } from "@/helper/jwt";
import Dissertation from "@/models/dissertationModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

export async function POST(request) {
	try {
		// save files in student's dissertation
		const { dissertationId } = await request.json();
		const dissertation = await Dissertation.findById(dissertationId);

		//loop throught the submission
		const submissions = dissertation.submissions;
		console.log(submissions);
		for (const submission of submissions) {
			console.log(submission);
			//if approved is false approve it
			if (!submission.approved) {
				submission.approved = true;
				break;
			}
		}
		//save the disseration
		dissertation.submissions = [];
		await dissertation.save();

		dissertation.submissions = submissions;
		await dissertation.save();

		return NextResponse.json(new Response(200, "Approved successfully", submissions), {
			status: 200,
		});
	} catch (error) {
		console.error("Approving error:", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}

const submission = [
	{
		id: "asdnfkasdf",
		files: [],
		approved: false,
		review: [],
		todos: [],
	},
];
