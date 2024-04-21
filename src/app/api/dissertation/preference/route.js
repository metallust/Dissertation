import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/jwt";
import Dissertation from "@/models/dissertationModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
import User from "@/models/userModel"; // Import the User model

connect();

export async function POST(request) {
	try {
		// Get the student ID from the token
		const token = request.cookies.get("token")?.value || "";
		const { id, role } = getDataFromToken(token);

		// Get preferences data from the request body
		const dissertations = await Dissertation.find({ studentid: id });
		const dissertation = dissertations[0];
		if (!dissertation) {
			return NextResponse.json(new Response(404, "Dissertation not found", null), { status: 404 });
		}
		if (dissertation.stage !== "domainselection") {
			return NextResponse.json(new Response(400, "Invalid stage" + dissertation.stage, null), { status: 400 });
		}
		const preferences = await request.json();
		preferences.forEach((element) => {
			dissertation.preferences.push(element);
		});
		dissertation.stage = "ideasubmission";
		await dissertation.save();
		return NextResponse.json(new Response(200, "Preferences set successfully", null), { status: 200 });
	} catch (error) {
		console.error("Error setting preferences:", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
