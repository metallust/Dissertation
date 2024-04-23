import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/jwt";
import Dissertation from "@/models/dissertationModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
	try {
		// get student id
		const token = request.cookies.get("token")?.value || "";
		const { id, role } = getDataFromToken(token);
		// find student's dissertation
		const dissertations = await Dissertation.find({ studentid: id });
		const dissertation = dissertations[0];
		// get ideas
		const ideas = dissertation.ideas;
		// return ideas
		return NextResponse.json(new Response(200, "Ideas fetched successfully", ideas), { status: 200 });
	} catch (error) {
		console.error("Error fetching Ideas:", error);
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
		// get dissertation
		const dissertations = await Dissertation.find({ studentid: id });
		const dissertation = dissertations[0];
		// get idea
		const ideas = await request.json();
		dissertation.ideas = ideas;
		// save idea
		await dissertation.save();
		// return success
		return NextResponse.json(new Response(200, "Idea added successfully", null), { status: 200 });
	} catch (error) {
		console.error("Error adding ideas", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
