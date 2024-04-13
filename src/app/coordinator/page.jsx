"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const router = useRouter();
	useEffect(() => {
		router.push("/coordinator/dashboard");
	}, [router]);
	return <div className="min-vh-100 p-4 bg-dark text-white">Coordintor</div>;
}
