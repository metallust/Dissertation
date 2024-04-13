"use client";

import { useEffect, useState } from "react";

export default function Page() {
	const [batches, setBatches] = useState([]);

	const createBatch = () => {};
	const fetchbatches = () => {
		fetch("/api/batch/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					console.log("Successfully fetched all the batches", data);
					setBatches(data.data);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchbatches();
	}, []);
	return (
		<div className="min-vh-100 p-4 bg-dark text-danger">
			Coordintor dashboard
			<br />
			<button onClick={createBatch}>Create Batch</button>
			<ol>
				{
					console.log(batches)
					// batches.map((ele) => {
					// 	return <li key={ele}>{ele}</li>;
					// })
				}
			</ol>
		</div>
	);
}
