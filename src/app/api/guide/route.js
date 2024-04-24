import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/jwt";
import User from "@/models/userModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function GET(request) {
	try {
		//TODO: check if the role is coordinator
		//TODO: get the college of the coordinator
		// return the guide present in that college
		const guides = await User.find({ role: "guide" });
		return NextResponse.json(new Response(200, "Successfull", guides), { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}

export async function POST(request) {
	try {
		// check if the role is coordinator
		const token = request.cookies.get("token")?.value || "";
		const data = getDataFromToken(token);
		const role = data.role;
		if (role !== "coordinator") {
			return NextResponse.json(new Response(403, "You are not allowed to create guide", null), {
				status: 403,
			});
		}
		//TODO: get the college of the coordinator

		const { name, email, password, domain, branch } = await request.json();
		// check if email is already present
		const guideExist = await User.findOne({ email: email });
		if (guideExist) {
			return NextResponse.json(new Response(400, "Guide already exist", null), {
				status: 400,
			});
		}
		// create a guide for that college
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const guide = new User({
			name: name,
			email: email,
			password: hashedPassword,
			role: "guide",
			domain: domain,
			branch: branch,
		});
		await guide.save();
		return NextResponse.json(new Response(200, "Successfull created", guide._id), { status: 200 });
	} catch (error) {
		console.log("handle this error man", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
