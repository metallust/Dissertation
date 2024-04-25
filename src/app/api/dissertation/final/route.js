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
		if (dissertation.final !== null) {
			return NextResponse.json(new Response(200, "submissions", dissertation.final), {
				status: 200,
			});
		}
		// create list of submission objects
		let final = {
			files: [],
			approved: false,
			review: [],
			todos: [],
		};

		dissertation.final = final;
		// save the submission object
		await dissertation.save();
		// return the submission object
		return NextResponse.json(new Response(200, "final submission", dissertation.final), { status: 200 });
	} catch (error) {
		console.error("Error setting Uploading:", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}

export async function POST(request) {
	try {
		// get student id
		const token = request.cookies.get("token")?.value || "";
		const { id, role } = getDataFromToken(token);
		// save files
		const fileNames = await saveFiles(request);
		if (fileNames.length === 0) {
			return NextResponse.json(new Response(400, "No files uploaded", null), { status: 400 });
		}
		console.log(fileNames);
		// save files in student's dissertation
		const dissertations = await Dissertation.find({ studentid: id });
		const dissertation = dissertations[0];

		let final = dissertation.final;
		final.files = fileNames;

		dissertation.final = null;
		await dissertation.save();

		dissertation.final = final;
		await dissertation.save();
		return NextResponse.json(new Response(200, "Files uploaded successfully", fileNames), { status: 200 });
	} catch (error) {
		console.error("Error setting Uploading:", error);
		return NextResponse.json(new Response(500, error.message, null), { status: 500 });
	}
}
