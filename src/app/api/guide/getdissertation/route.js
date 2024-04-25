import { getDataFromToken } from "@/helper/jwt";

import { NextResponse } from "next/server";
// import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import Response from "@/utils/response";
import Dissertation from "@/models/dissertationModel";

connect();

export async function POST(request) {
	try {
		const { userid } = await request.json();
		// console.log(userid)
		const token = request.cookies.get("token")?.value;
		if (!token) {
			return NextResponse.redirect(new URL("/login", request.nextUrl));
		}
		const dissertation = await Dissertation.findOne({ studentid: userid });
		if (!dissertation) {
			return NextResponse.json(new Response(404, "Dissertation data not found", null), { status: 404 });
		}
		return NextResponse.json(new Response(200, "User found", dissertation), {
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({ error: error.data }, { status: 400 });
	}
}

export async function PUT(request) {
	try {
		const { id, idea } = await request.json();
		// console.log(userid)
		const token = request.cookies.get("token")?.value;
		if (!token) {
			return NextResponse.redirect(new URL("/login", request.nextUrl));
		}
		const dissertation = await Dissertation.findOne({ studentid: id });
		if (!dissertation) {
			return NextResponse.json(new Response(404, "Dissertation data not found", null), { status: 404 });
		}
		dissertation.finalidea = idea;
		console.log(idea, dissertation);
		dissertation.stage = "submissions";
		await dissertation.save();
		return NextResponse.json(new Response(200, "Idea Saved", dissertation), {
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({ error: error.data }, { status: 400 });
	}
}
