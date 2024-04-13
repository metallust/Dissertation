import { NextResponse } from "next/server";

export function middleware(request) {
	const path = request.nextUrl.pathname;

	const isPublicPath =
		path === "/" ||
		path === "/login" ||
		path === "/signup" ||
		path === "/verifyemail";
	const isUserPath =
		path === "/coordinator" || path === "/student" || path === "/guide";

	const token = request.cookies.get("token")?.value || "";
	let role = request.cookies.get("role")?.value || "";

	// user is not logged in and trying to access private path redirect to login
	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}

	//user is logged in and trying to access public path redirect to their dashboards
	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/" + role, request.nextUrl));
	}

	//user is logged in and trying to access other user's dashboard redirect to their dashboard
	if (isUserPath && token && !path.includes(role)) {
		return NextResponse.redirect(new URL("/" + role, request.nextUrl));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/",
		"/coordinator",
		"/student",
		"/guide",
		"/login",
		"/signup",
		"/verifyemail",
	],
};
