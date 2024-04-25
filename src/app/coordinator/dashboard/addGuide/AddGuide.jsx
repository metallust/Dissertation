import React, { useState } from "react";

const AddGuide = ({ addGuide }) => {
	const [guide, setGuide] = useState({ name: "", email: "", password: "", domain: "", branch: "" });
	const [addedGuides, setAddedGuides] = useState([]);

	const handleAdd = (e) => {
		e.preventDefault();
		addGuide(guide);
		setAddedGuides([...addedGuides, guide]);
		setGuide({ name: "", email: "", password: "", domain: "", branch: "" });
	};

	const onChange = (e) => {
		setGuide({ ...guide, [e.target.name]: e.target.value });
	};

	const inputStyle = {
		width: "40vw",
		height: "48px",
		padding: "24px",
		borderRadius: "8px",
		boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
		border: "none",
		color: "#004257",
		fontSize: "16px",
		fontWeight: "500",
		fontFamily: "Roboto, sans-serif",
		marginBottom: "16px",
	};

	const headerStyle = {
		fontSize: "40px",
		fontWeight: "700",
		marginBottom: "40px",
		marginTop: "0px",
		color: "#004257",
	};

	const cardStyle = {
		border: "none",
		padding: "64px",
		borderRadius: "16px",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
		color: "#004257",
		background: "#E1F8FF",
		fontFamily: "Roboto, sans-serif",
		textAlign: "center",
	};

	const buttonStyle = {
		backgroundColor: "#004257",
		border: "none",
	};

	return (
		<>
			<div>
				<div className="mt-3">
					<h4 style={headerStyle}>Enter Guide Details</h4>
					<form onSubmit={handleAdd} className="px-5">
						<div className="mb-3">
							<input type="text" placeholder="Guide Name" className="form-control" id="name" name="name" value={guide.name} onChange={onChange} required />
						</div>
						<div className="mb-3">
							<input type="email" placeholder="Email" className="form-control" id="email" name="email" value={guide.email} onChange={onChange} required />
						</div>
						<div className="mb-3">
							<input type="password" placeholder="Create Password" className="form-control" id="password" name="password" value={guide.password} onChange={onChange} minLength={3} required />
						</div>
						<div className="mb-3">
							<input type="text" placeholder="Domain of Expertise" className="form-control" id="domain" name="domain" value={guide.domain} onChange={onChange} required />
						</div>
						<div className="mb-3">
							<input type="text" placeholder="Enter Branch" className="form-control" id="branch" name="branch" value={guide.branch} onChange={onChange} required />
						</div>
						<div className="d-flex justify-content-center">
							<button type="submit" className="btn btn-primary" style={buttonStyle}>
								Add Guide
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddGuide;
