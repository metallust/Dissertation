"use client";

import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const router = useRouter();
	const [batches, setBatches] = useState([]);
	const [guides, setGuides] = useState([]);
	const [batch, setBatch] = useState({ year: "", branch: "" });
	const [guide, setGuide] = useState({
		name: "",
		email: "",
		password: "",
		domain: "",
		branch: "",
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
		if (batch.year === "" || batch.branch === "") {
			alert("Please provide a year, branch");
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
					console.error(data.message, data.status);
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

	const buttonStyle = {
        // width: "176px",
        // height: "30px",
        // padding: "10px",
        backgroundColor: "#004257",
        borderRadius: "5px",
        border: "none",
        color: "#fff",
        // fontSize: "20px",
        // fontWeight: "500",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 4px rgba(0, 0, 0, 0.25)",
        // marginBottom: "20px",
        cursor: "pointer",
		marginLeft:"10px"
    };

	useEffect(() => {
		fetchbatches();
		fetchGuides();
	}, []);
	return (
		<div className="px-4  ">
			<div className="flex-grow-1 d-flex justify-content-between">
					<h3 className="fw-bold">Batches : </h3>
					<div>
					<button type="button" onClick={() => router.push("/coordinator/dashboard/addbatch")} className="btn btn-primary" style={{ background: "#004256" }}>
						+ Add Batch
					</button>
					<button type="button" onClick={() => router.push("/coordinator/dashboard/addGuide")} className="btn btn-primary" style={{ background: "#004256", marginLeft:"15px" }}>
						+ Add Guide
					</button>
					</div>
				</div>

			<div className="min-vh-100 p-4">
   
    <div className="container">
        {batches.length !== 0 ? (
            batches.map((ele) => {
                return (
                    <div key={ele._id} className="d-flex gap-4 my-3">
                        <div className="d-flex flex-grow-1" style={{ backgroundColor: "#e1f8ff", borderRadius: "5px", padding: "5px 10px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)" }}>
    <div className="flex-grow-1" style={{ fontWeight: 600 }}>
        <span>Year: {ele.year}</span>
    </div>
    <div style={{ fontWeight: "bold", textAlign: "right" }}>Branch: {ele.branch}</div>
</div>

                        <button className="btn btn-primary" style={buttonStyle} onClick={() => router.push("dashboard/batch/" + ele._id)}>
    <FaArrowRight />
</button>
                    </div>
                );
            })
        ) : (
            <p>no batches</p>
        )}
    </div>
</div>



			{/* <button onClick={logout}>Logout</button>
			<br />
			{/* add batch */}
			{/* <input type="year" placeholder="Year" onChange={(e) => setBatch({ ...batch, year: e.target.value })} value={batch.year} />
			<input type="text" placeholder="Branch" onChange={(e) => setBatch({ ...batch, branch: e.target.value })} value={batch.branch} />
			<button onClick={createBatch}>Create Batch</button> */} 
			{/* <ul>
				{batches.length !== 0 ? (
					batches.map((ele) => {
						return (
							<li key={ele._id}>
								year: {ele.year}, branch: {ele.branch}
								<button onClick={() => router.push("dashboard/batch/" + ele._id)}>GOTO</button>
							</li>
						);
					})
				) : (
					<p>no batches</p>
				)}
			</ul>
			{/* add guide */}
			{/* <br /> */} 
			{/* <input type="text" name="name" placeholder="Name" onChange={(e) => setGuide({ ...guide, name: e.target.value })} value={guide.name} />
			<input type="email" name="email" placeholder="Email" onChange={(e) => setGuide({ ...guide, email: e.target.value })} value={guide.email} />
			<input type="password" name="password" placeholder="Password" onChange={(e) => setGuide({ ...guide, password: e.target.value })} value={guide.password} />
			<input type="text" name="domain" placeholder="Domain" onChange={(e) => setGuide({ ...guide, domain: e.target.value })} value={guide.domain} />
			<input type="text" name="branch" placeholder="Branch" onChange={(e) => setGuide({ ...guide, branch: e.target.value })} value={guide.branch} />
			<button onClick={addGuide}>Add Guide</button>
			<ol>
				{guides.length !== 0 ? (
					guides.map((ele) => {
						return <li key={ele._id}>{ele.name}</li>;
					})
				) : (
					<p>no Guides</p>
				)}
			</ol> */}
		</div>
	);
}
