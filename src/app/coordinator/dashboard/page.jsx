"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const router = useRouter();
	const [batches, setBatches] = useState([]);
	const [guides, setGuides] = useState([]);
	const [batch, setBatch] = useState({ year: "", branch: "", domainset: [] });
	const [guide, setGuide] = useState({
		name: "",
		email: "",
		password: "",
		domain: "",
	});

	const logout = async () => {
		try {
			const response = await fetch("/api/auth/logout", {
				method: "POST",
			});
			if (response.ok) {
				console.log("Successfully logged out");
				router.push("/login");
			} else {
				const data = await response.json();
				alert(data.message, data.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const createBatch = async () => {
		if (batch.year === "" || batch.branch === "" || batch.domainset.length === 0) {
			alert("Please provide a year, branch, and at least one domain");
			console.log(batch);
			return;
		}
		try {
			const response = await fetch("/api/batch/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(batch),
			});
			console.log(batch);
			const data = await response.json();
			if (data.statusCode === 200) {
				console.log("Successfully created the batch", data);
				fetchbatches();
			} else {
				alert(data.message, data.status);
			}
			setYear("");
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
			setGuide({
				name: "",
				email: "",
				password: "",
				domain: "",
			});
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
					setBatches(data.data);
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
					setGuides(data.data);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDomainsetChange = (e) => {
		const domainsetArray = e.target.value.split(",").map((domainset) => domainset.trim()); // Split the input by comma and trim each domain
		setBatch({ ...batch, domainset: domainsetArray });
	};

	useEffect(() => {
		fetchbatches();
		fetchGuides();
	}, []);
	return (
		<div className="min-vh-100 p-4 bg-dark text-danger">
			Coordinator dashboard
			<button onClick={logout}>Logout</button>
			<br />
			{/* add batch */}
			<input type="year" placeholder="Year" onChange={(e) => setBatch({ ...batch, year: e.target.value })} value={batch.year} />
			<input type="text" placeholder="Branch" onChange={(e) => setBatch({ ...batch, branch: e.target.value })} value={batch.branch} />
			<input type="text" name="domains" placeholder="Domains (comma-separated)" onChange={handleDomainsetChange} value={batch.domainset.join(", ")} />
			<button onClick={createBatch}>Create Batch</button>
			<ul>
				{batches.length !== 0 ? (
					batches.map((ele) => {
						return (
							<li key={ele._id}>
								year: {ele.year}, branch: {ele.branch}, domainset: {ele.domainset ? ele.domainset.join(", ") : "No domains"}
								<button onClick={() => router.push("dashboard/" + ele._id)}>GOTO</button>
							</li>
						);
					})
				) : (
					<p>no batches</p>
				)}
			</ul>
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
						return <li key={ele._id}>{ele.name}</li>;
					})
				) : (
					<p>no Guides</p>
				)}
			</ol>
		</div>
	);
}
