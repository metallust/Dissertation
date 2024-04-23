import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/jwt";
import Batch from "@/models/batchModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

// get mapping
export async function GET(request) {
	try {
		//TODO: check if the role is coordinator
		const { role } = getDataFromToken(request.cookies.get("token")?.value || "");
		if (role !== "coordinator") {
			return NextResponse.json(new Response(403, "You are not allowed to get timeline", null), {
				status: 403,
			});
		}
		// get batch id
		const url = new URL(request.url);
		const batchid = url.searchParams.get("batchid");
		// get batch from batch id
		const batch = await Batch.findById(batchid);
		const timeline = batch.timeline;
		return NextResponse.json(new Response(200, "Timeline fetched successfully", timeline), { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}

// create mapping
export async function POST(request) {
	try {
		// check if the role is coordinator
		const { role } = getDataFromToken(request.cookies.get("token")?.value || "");
		if (role !== "coordinator") {
			return NextResponse.json(new Response(403, "You are not allowed to create timeline", null), {
				status: 403,
			});
		}
		// get batch id
		const { batchid, timeline } = await request.json();
		// get batch from id
		let batch = await Batch.findById(batchid);
		// add timeline to batch
		batch.timeline = timeline;
		console.log(batch);
		await batch.save();
		// return mapping
		return NextResponse.json(new Response(200, "Timeline created successfully", null), { status: 200 });
	} catch (error) {
		console.log("handle this error man", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
