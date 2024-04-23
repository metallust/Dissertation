import React, { useState } from "react";
// import { Pie } from "./Pie";
// import Pacman from "./Pacman";

const GuideAnalytics = () => {
	const [tab, setTab] = useState(0);
	const handleSave = () => {};

	const guideDomains = [
		"Machine Learning",
		"Computer Networks",
		"Renewable Energy",
		"Structural Engineering",
		"Artificial Intelligence",
		"Biomedical Engineering",
	];
	const card = {
		backgroundColor: "#E1F8FF",
		height: "100%",
		width: "32%",
		border: "none",
		borderRadius: "10px",
		boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
		padding: "9px 13px",
	};
	return (
		<div>
			<div
				className='d-flex justify-content-between'
				style={{
					height: "28vh",
					margin: "10px 2rem",
					maxHeight: "180px",
				}}
			>
				<div style={card}>
					<div className='h5'>Student/Guide Ratio</div>
					<div className='d-flex align-items-baseline'>
						<div style={{ fontSize: "2.5rem", fontWeight: "600" }}>
							5.6
						</div>
						<div className='ms-3'>1.4 less than Maximum</div>
					</div>
					<div className='mt-2'>Recommended Maximum 7</div>
				</div>
				<div style={card}>
					<div className='h5'>Student Allocation</div>
					<div className='d-flex align-items-baseline '>
						<h3 className='me-3'>43</h3> Students Allocated
					</div>
					<div className='d-flex align-items-baseline '>
						<h3 className='me-3'>12</h3> Students Remaining
					</div>
					<div
						className='btn d-flex justify-content-center'
						style={{ backgroundColor: "#004257", color: "white" }}
					>
						Allocate
					</div>
				</div>
				<div style={card}>
					<div className='h5'>Submission in Deadline</div>
					{/* <div>
						<Pacman />
					</div> */}
				</div>
			</div>
			{/* <div>
				<Pie />
			</div> */}
		</div>
	);
};

export default GuideAnalytics;
