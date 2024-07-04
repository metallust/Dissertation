import { getDataFromToken } from "@/helper/jwt";

import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import Response from "@/utils/response";

connect();

export async function GET(request) {
	try {
		const token = request.cookies.get("token")?.value;
		if (!token) {
			return NextResponse.redirect(new URL("/login", request.nextUrl));
		}
		const tokenData = await getDataFromToken(token);
		const user = await User.findOne({ _id: tokenData.id }).select(
			"-password",
		);
		if (!user) {
			return NextResponse.json(
				new Response(404, "User not found", null),
				{ status: 404 },
			);
		}
		return NextResponse.json(new Response(200, "User found", user), {
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}


export async function POST(request) {
	try {
		const token = request.cookies.get("token")?.value;
		const { id } = await request.json();
		if (!token) {
			return NextResponse.redirect(new URL("/login", request.nextUrl));
		}
		const tokenData = await getDataFromToken(token);
		const user = await User.findOne({ _id: id }).select(
			"-password",
		);
		if (!user) {
			return NextResponse.json(
				new Response(404, "User not found", null),
				{ status: 404 },
			);
		}
		return NextResponse.json(new Response(200, "User found", user), {
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
