import { connect } from "@/dbConfig/dbConfig";
import saveFiles from "@/helper/filehandler";
import { getDataFromToken } from "@/helper/jwt";
import Dissertation from "@/models/dissertationModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

export async function POST(request) {
	try {
		// get submissionid
		const path = new URL(request.url).pathname;
		const submissionid = path.split("/").pop();
		// get student id
		const token = request.cookies.get("token")?.value || "";
		const { id, role } = getDataFromToken(token);
		// save files
		const fileNames = await saveFiles(request);
		if (fileNames.length === 0) {
			return NextResponse.json(new Response(400, "No files uploaded", null), { status: 400 });
		}
		console.log(fileNames);
		if (!submissionid) {
			return NextResponse.json(new Response(400, "Submission id is required", null), { status: 400 });
		}

		// save files in student's dissertation
		const dissertations = await Dissertation.find({ studentid: id });
		const dissertation = dissertations[0];

		let submissions = dissertation.submissions;
		for (let i = 0; i < submissions.length; i++) {
			if (submissions[i].id === submissionid) {
				submissions[i].files = fileNames;
				break;
			}
		}

		dissertation.submissions = [];
		await dissertation.save();

		dissertation.submissions = submissions;
		console.log(dissertation);
		await dissertation.save();
		return NextResponse.json(new Response(200, "Files uploaded successfully", fileNames), {
			status: 200,
		});
	} catch (error) {
		console.error("Error setting Uploading:", error);
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

const randomStringGenerator = (length) => {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
