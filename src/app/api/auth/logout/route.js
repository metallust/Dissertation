import Response from "@/utils/response";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const response = NextResponse.json(new Response(200, "Logout successful", null), { status: 200 });
		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		response.cookies.set("role", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		return response;
	} catch (error) {
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}
