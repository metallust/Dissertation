"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const router = useRouter();

	const fetchDissertation = async () => {
		const response = await fetch("/api/dissertation");
		if (response.ok) {
			console.log("Successfully fetched dissertation");
			const data = await response.json();

			if (data.data.stage === "domainselection") {
				router.push("/student/setup/domainselect");
			} else if (data.data.stage === "ideasubmission") {
				router.push("/student/setup/ideasubmit");
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
