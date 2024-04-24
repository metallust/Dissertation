import Response from "@/utils/response";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { email, password, name } = reqBody;

		console.log(reqBody);

		//check if user already exists
		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json(
				new Response(400, "User already exists", null),
				{ status: 400 },
			);
		}

		//hash password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = new User({
			email,
			name,
			password: hashedPassword,
			domains:[],
			role: "coordinator",
		});
		const savedUser = await newUser.save();

		return NextResponse.json(
			new Response(200, "Coordinator created successfully", savedUser),
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
