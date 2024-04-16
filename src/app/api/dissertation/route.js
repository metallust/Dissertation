import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/jwt";
import Dissertation from "@/models/dissertationModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";

connect();
export async function GET(request) {
	try {
		// get the id of student
		const token = request.cookies.get("token")?.value || "";
		const data = getDataFromToken(token);
		const studentId = data.id;
		const role = data.role;
		//check if the role is student
		if (role !== "student") {
			return NextResponse.json(new Response(403, "You are not allowed to view dissertation", null), {
				status: 403,
			});
		}
		// return the dissertation of that student
		const dissertation = await Dissertation.findOne({ studentId: studentId });
		return NextResponse.json(new Response(200, "Disseration document", dissertation), { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
