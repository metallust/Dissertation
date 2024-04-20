"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const router = useRouter();
	useEffect(() => {
		router.push("/guide/dashboard");
	}, [router]);
	return (
		<div className="min-vh-100 p-4 bg-dark text-white">
			guide 
		</div>
	);
}
