import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/jwt";
import Dissertation from "@/models/dissertationModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
import User from "@/models/userModel"; // Import the User model

connect();

export async function GET(request) {
	try {
		// Get the student ID from the token
		const token = request.cookies.get("token")?.value || "";
		const { id, role } = getDataFromToken(token);

		// Find the dissertation document associated with the student
		const dissertation = await Dissertation.findOne({ studentid: id });
		if (!dissertation) {
			return NextResponse.json(new Response(404, "Dissertation not found", null), {
				status: 404,
			});
		}

		// Return the dissertation document
		return NextResponse.json(new Response(200, "Dissertation document", dissertation), { status: 200 });
	} catch (error) {
		console.error("Error fetching dissertation:", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}

export async function POST(request) {
	try {
		// Get the student ID from the token
		const token = request.cookies.get("token")?.value || "";
		const { id, role } = getDataFromToken(token);

		// Check if the role is student
		if (role !== "student") {
			return NextResponse.json(new Response(403, "You are not allowed to set preferences", null), {
				status: 403,
			});
		}

		// Get preferences data from the request body
		const { pref1, pref2, pref3 } = await request.json();

		// Save preferences to the database
		const student = await User.findById(id);
		student.preferences = { pref1, pref2, pref3 };
		await student.save();

		return NextResponse.json(new Response(200, "Preferences set successfully", null), { status: 200 });
	} catch (error) {
		console.error("Error setting preferences:", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
