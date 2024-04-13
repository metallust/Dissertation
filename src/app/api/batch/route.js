import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/jwt";
import Batch from "@/models/batchModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

export async function GET(request) {
	try {
		//TODO: check if the role is coordinator
		//TODO: get the college of the coordinator
		// get the batch present in that college
		const batches = await Batch.find();
		return NextResponse.json(new Response(200, "Successfull", batches), { status: 200 });
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
			return NextResponse.json(new Response(403, "You are not allowed to create batch", null), {
				status: 403,
			});
		}
		//TODO: get the college of the coordinator

		// create a batch for that college
		const { year } = await request.json();
		const batch = new Batch({
			// todo: get college id
			college: "walchand",
			year: year,
		});
		await batch.save();
		return NextResponse.json(new Response(200, "Successfull created", batch._id), { status: 200 });
	} catch (error) {
		console.log("handle this error man", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
export async function DELETE(request) {
	try {
		// check if the role is coordinator
		// get the college of the coordinator
		// Delete that batch by id
		return NextResponse.json(new Response(200, "NOT IMPLETEMENT", null));
	} catch (error) {
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
