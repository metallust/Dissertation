"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
	const router = useRouter();
	const path = usePathname();
	useEffect(() => {
		if (path === "/student") {
			router.push("/student/dashboard");
		}
	}, [router]);
	return children;
}
