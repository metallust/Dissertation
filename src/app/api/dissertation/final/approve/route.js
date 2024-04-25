import { connect } from "@/dbConfig/dbConfig";
import Dissertation from "@/models/dissertationModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

export async function POST(request) {
	try {
		// save files in student's dissertation
		const { dissertationId } = await request.json();
		const dissertation = await Dissertation.findById(dissertationId);

		//approve the final dissertation
		const final = dissertation.final;
		final.approved = true;
		console.log(final);

		//save the disseration
		dissertation.final = null;
		await dissertation.save();

		dissertation.final = final;
		dissertation.stage = "done";
		await dissertation.save();

		return NextResponse.json(new Response(200, "Approved successfully", final), {
			status: 200,
		});
	} catch (error) {
		console.error("Approving error:", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
