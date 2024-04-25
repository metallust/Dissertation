import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/jwt";
import Batch from "@/models/batchModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

export async function GET(request) {
	try {
		//TODO: check if the role is coordinator
		const { id, role } = getDataFromToken(request.cookies.get("token")?.value || "");
		if (role !== "student") {
			return NextResponse.json(new Response(403, "You are not allowed to get timeline", null), {
				status: 403,
			});
		}

		// get batch from batch id
		const batches = await Batch.find({ students: id });
		const batch = batches[0];
		const timeline = batch.timeline;
		return NextResponse.json(new Response(200, "Timeline fetched successfully", timeline), { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
