"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
	const router = useRouter();
	useEffect(() => {
		router.push("/student/dashboard");
	}, [router]);
	return children;
}
