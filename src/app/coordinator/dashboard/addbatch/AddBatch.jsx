import React, { useState } from "react";

const AddBatch = ({ addBatch }) => {
	const [batch, setBatch] = useState({ year: "", branch: "" });

	const handleAdd = (e) => {
		e.preventDefault();
		addBatch(batch);
		createBatch();
	};

	const onChange = (e) => {
		setBatch({ ...batch, [e.target.name]: e.target.value });
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
			setBatch({ year: "", branch: "" });
		} catch (error) {
			console.log(error);
		}
	};

	const inputStyle = {
		width: "40vw",
		height: "40px",
		padding: "10px",
		borderRadius: "10px",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
		border: "none",
		color: "#004257",
		fontSize: "16px",
		fontWeight: "500",
		fontFamily: "Roboto, sans-serif",
		marginBottom: "20px",
	};

	const headerStyle = {
		fontSize: "32px",
		fontWeight: "700",
		marginBottom: "20px",
		color: "#004257",
	};

	const cardStyle = {
		border: "none",
		padding: "15px",
		borderRadius: "5px",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
		color: "#004257",
		background: "#E1F8FF",
		fontFamily: "Roboto, sans-serif",
		textAlign: "center",
	};

	const buttonStyle = {
		width: "176px",
		height: "50px",
		padding: "10px",
		backgroundColor: "#004257",
		borderRadius: "10px",
		border: "none",
		color: "#fff",
		fontSize: "20px",
		fontWeight: "500",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 4px rgba(0, 0, 0, 0.25)",
		marginBottom: "20px",
		cursor: "pointer",
	};

	return (
		<>
			<div className="login-box" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "38vh" }}>
				<div className="border-none w-100">
					<p style={headerStyle}>Add Batch</p>
					<form onSubmit={handleAdd} className="px-5">
						<div className="mb-3">
							<input type="number" placeholder="Enter Year" className="form-control" id="year" name="year" value={batch.year} onChange={onChange} required />
						</div>
						<div className="mb-3">
							<input type="text" placeholder="Enter Branch" className="form-control" id="branch" name="branch" value={batch.branch} onChange={onChange} required />
						</div>
						<div className="d-flex justify-content-center">
							<button type="submit" className="add-batch-button btn btn-primary">
								Add Batch
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddBatch;
