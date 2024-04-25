import React, { useEffect } from "react";
import File from "@/app/components/File";

const Submission = ({ dissertation, fetchDissertation }) => {
	const handleApprove = async () => {
		const response = await fetch("/api/dissertation/submission/approve", {
			method: "POST",
			body: JSON.stringify({ dissertationId: dissertation._id }),
		});
		const data = await response.json();
		if (data.statusCode === 200) {
			console.log("Approved");
			fetchDissertation();
		} else {
			console.error("Failed to approve");
		}
	};

	const handleFinalApproval = async () => {
		const response = await fetch("/api/dissertation/final/approve", {
			method: "POST",
			body: JSON.stringify({ dissertationId: dissertation._id }),
		});
		const data = await response.json();
		if (data.statusCode === 200) {
			console.log("final report Approved");
			fetchDissertation();
			console.log(data);
		} else {
			console.error("Failed to approve");
		}
	};
	console.log(dissertation);

	return (
		<div className="px-4">
			<div className="flex-grow-1 d-flex justify-content-between">
				<h3 className="fw-bold">Topic Selected : {dissertation.finalidea} </h3>
				<div>
					<button type="button" onClick={() => document.getElementById("reviewModal").showModal()} className="btn btn-primary mx-2" style={{ background: "#004256" }}>
						Review
					</button>
				</div>
			</div>
			{/* files and conversation tabs */}
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<a className={`nav-link active`} aria-current="page">
						Files
					</a>
				</li>
			</ul>
			{dissertation.submissions.map((submission, i) => {
				return (
					<div key={submission.id}>
						<div className="d-flex mt-3 justify-content-between">
							<h4>Submission {i + 1}</h4>
							{submission.approved ? (
								<h5 className="text-success ms-2">Approved</h5>
							) : submission.files.length > 0 ? (
								<button className="btn btn-primary" onClick={handleApprove}>
									Approve
								</button>
							) : (
								""
							)}
						</div>
						{submission.files.length === 0 ? (
							<p>No files uploaded</p>
						) : (
							submission.files.map((file) => {
								return <File key={file} file={file} />;
							})
						)}
					</div>
				);
			})}

			<div>
				{dissertation.final ? (
					<>
						<div className="d-flex mt-3 justify-content-between">
							<h4>Final Report</h4>
							{dissertation.final.approved ? (
								<h5 className="text-success ms-2">Approved</h5>
							) : dissertation.final.files.length > 0 ? (
								<button className="btn btn-primary" onClick={handleFinalApproval}>
									Approve
								</button>
							) : (
								""
							)}
						</div>
						{dissertation.final.files.length === 0 ? (
							<p>No files uploaded</p>
						) : (
							dissertation.final.files.map((file) => {
								return <File key={file} file={file} />;
							})
						)}
					</>
				) : (
					"Final"
				)}
			</div>
		</div>
	);
};

export default Submission;
