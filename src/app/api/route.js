import Response from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET(request) {
	return NextResponse.json(new Response(200, "This is the standard that we are following using th response call ", null), { status: 200 });
}
