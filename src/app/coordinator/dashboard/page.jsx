"use client";

import { useEffect, useState } from "react";

export default function Page() {
	const [batches, setBatches] = useState([]);
	const [guides, setGuides] = useState([]);
	const [year, setYear] = useState("");
	const [guide, setGuide] = useState({
		name: "",
		email: "",
		password: "",
		domain: "",
	});

	const createBatch = async () => {
		if (year === "") {
			alert("Please provide a year");
			return;
		}
		try {
			const response = await fetch("/api/batch/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ year }),
			});
			const data = await response.json();
			if (data.statusCode === 200) {
				console.log("Successfully created the batch", data);
				fetchbatches();
			} else {
				alert(data.message, data.status);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const addGuide = async () => {
		try {
			const response = await fetch("/api/guide/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(guide),
			});
			const data = await response.json();
			if (data.statusCode === 200) {
				fetchGuides();
			} else {
				alert(data.message, data.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

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
					setBatches(data.data.map((ele) => ele.year));
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log("you suck fetch batch", err);
			});
	};

	const fetchGuides = () => {
		fetch("/api/guide/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					console.log("Successfully fetched all the guides", data);

					setGuides(data.data.map((ele) => ele.name));
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
		fetchGuides();
	}, []);
	return (
		<div className="min-vh-100 p-4 bg-dark text-danger">
			Coordintor dashboard
			<br />
			{/* add batch */}
			<input type="year" name="batch" placeholder="Year" onChange={(e) => setYear(e.target.value)} />
			<button onClick={createBatch}>Create Batch</button>
			<ol>
				{batches.length !== 0 ? (
					batches.map((ele) => {
						return <li key={ele}>{ele}</li>;
					})
				) : (
					<p>no batches</p>
				)}
			</ol>
			{/* add guide */}
			<br />
			<input type="text" name="name" placeholder="Name" onChange={(e) => setGuide({ ...guide, name: e.target.value })} />
			<input type="email" name="email" placeholder="Email" onChange={(e) => setGuide({ ...guide, email: e.target.value })} />
			<input type="password" name="password" placeholder="Password" onChange={(e) => setGuide({ ...guide, password: e.target.value })} />
			<input type="text" name="domain" placeholder="Domain" onChange={(e) => setGuide({ ...guide, domain: e.target.value })} />
			<button onClick={addGuide}>Add Guide</button>
			<ol>
				{guides.length !== 0 ? (
					guides.map((ele) => {
						return <li key={ele}>{ele}</li>;
					})
				) : (
					<p>no Guides</p>
				)}
			</ol>
		</div>
	);
}
