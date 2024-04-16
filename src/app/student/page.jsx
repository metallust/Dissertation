"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const router = useRouter();

	const fetchDissertation = async () => {
		const response = await fetch("/api/dissertation");
		const data = await response.json();
		console.log(data);

		if (response.ok) {
			console.log("Successfully fetched dissertation");
			const data = await response.json();
			if (data.stage === 0) {
				router.push("/student/setup");
			} else {
				router.push("/student/dashboard");
			}
		} else {
			alert(data.message, data.status);
		}
	};

	useEffect(() => {
		fetchDissertation();
	}, []);

	useEffect(() => {
		router.push("/student/dashboard");
	}, [router]);
	return <div className="min-vh-100 p-4 bg-dark text-white">Student</div>;
}
