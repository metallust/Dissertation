import { connect } from "@/dbConfig/dbConfig";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { encodeToken } from "@/helper/jwt";

connect();
export async function POST(request) {
	try {
		const { email, password } = await request.json();
		if (!email || !password) {
			return NextResponse.json(
				new Response(400, "Please provide email and password", null),
				{ status: 400 },
			);
		}

		// get user
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				new Response(404, "User not found", null),
				{ status: 404 },
			);
		}

		//check if password is correct
		const validPassword = await bcryptjs.compare(password, user.password);
		if (!validPassword) {
			return NextResponse.json(
				new Response(400, "Invalid password", null),
				{ status: 400 },
			);
		}

		//create tokend
		const tokenData = {
			id: user._id,
			email: user.email,
			role: user.role,
		};
		const token = await encodeToken(tokenData);

		const response = NextResponse.json(
			new Response(200, "Login successful", { role: user.role }),
			{ status: 200 },
		);
		response.cookies.set("token", token, {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});
		response.cookies.set("role", user.role, {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});
		return response;
	} catch (error) {
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
