"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const router = useRouter();
	const fetchSubmissions = async () => {
		const response = await fetch("/api/dissertation/submission");
		const data = await response.json();
		console.log(data);
		if (data.statusCode === 200) {
			console.log("fetched submissions: ", data.data);
			for (const submission of data.data) {
				console.log(submission);
				if (!submission.approved) {
					return router.push(`/student/dashboard/submissions/${submission.id}`);
				}
			}
			return router.push(`/student/dashboard/submissions/${data.data[0].id}`);
		} else {
			console.error("Failed to fetch submissions");
		}
	};
	useEffect(() => {
		fetchSubmissions();
	}, []);
	return (
		<div className="d-flex justify-content-center align-items-center h-50">
			<h2>Fetching you submissions ...</h2>
		</div>
	);
}
