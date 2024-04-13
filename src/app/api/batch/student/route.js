import { connect } from "@/dbConfig/dbConfig";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

export async function POST(request) {
	try {
		// check if the role is coordinator
		// get the college of the coordinator
		// get the batch id
		//add the student in users with role of student
		// add the user id in batch
		return NextResponse.json(new Response(200, "NOT IMPLETEMENT", null));
	} catch (error) {
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
