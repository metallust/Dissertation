import { connect } from "@/dbConfig/dbConfig";
import Batch from "@/models/batchModel";
import User from "@/models/userModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Dissertation from "@/models/dissertationModel";
connect();

export async function GET(request) {
	try {
		//TODO: check if the role is coordinator
		// return the student present in that batch
		const url = new URL(request.url);
		const batchid = url.searchParams.get("batchid");
		const batch = await Batch.findById(batchid);
		const students = await User.find({ role: "student", _id: { $in: batch.students } });
		return NextResponse.json(new Response(200, "Successfull", students), { status: 200 });
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
		// get the college of the coordinator
		// get the batch id
		const { name, email, password, batchid } = await request.json();

		// check if the student is already present
		const user = await User.findOne({ email: email });
		if (user) {
			return NextResponse.json(new Response(400, "Student already present", null), { status: 400 });
		}

		// add the student in users with role of student with hashed password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const student = new User({
			name: name,
			email: email,
			password: hashedPassword,
			role: "student",
		});
		await student.save();
		// add the user id in batch
		const batch = await Batch.findById(batchid);
		batch.students.push(student._id);
		await batch.save();
		``;

		//add user id in disseration
		const disseration = new Dissertation({
			studentid: student._id,
		});
		await disseration.save();
		return NextResponse.json(new Response(200, "Successfully add student", batch), { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(new Response(500, error.message, null), { status: 500 });
	}
}
