import { connect } from "@/dbConfig/dbConfig";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

export async function GET(request) {
	try {
		// check if the role is coordinator
		// get the college of the coordinator
		// get the batch present in that college
		return NextResponse.json(new Response(200, "NOT IMPLETEMENT", null));
	} catch (error) {
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
export async function POST(request) {
	try {
		// check if the role is coordinator
		// get the college of the coordinator
		// create a batch for that college
		return NextResponse.json(new Response(200, "NOT IMPLETEMENT", null));
	} catch (error) {
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
