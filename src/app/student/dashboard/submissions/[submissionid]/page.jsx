"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
	const [files, setFiles] = useState([]);
	const [review, setReview] = useState("No review yet");

	const [selectedfiles, setSelectedfiles] = useState([]);

	const handleFileChange = (event) => {
		const fileList = event.target.files;
		setSelectedfiles([...selectedfiles, ...fileList]);
	};

	const handleUpload = async () => {
		if (selectedfiles.length === 0) {
			console.error("No files selected");
			return;
		}

		const formData = new FormData();
		selectedfiles.forEach((file) => {
			formData.append("file", file);
		});

		try {
			const response = await fetch("/api/dissertation/submission/" + params.submissionid, {
				method: "POST",
				body: formData,
			});
			if (response.ok) {
				const data = await response.json();
				console.log("Files uploaded successfully", data.data);
				setSelectedfiles([]);
			} else {
				console.error("Failed to upload files");
			}
			document.getElementById("fileModal").close();
			fetchSubmission();
		} catch (error) {
			console.error("Error uploading files:", error);
		}
	};

	const fetchSubmission = async () => {
		const res = await fetch("/api/dissertation/submission/");
		const data = await res.json();
		for (let i = 0; i < data.data.length; i++) {
			if (data.data[i].id === params.submissionid) {
				setFiles(data.data[i].files);
				setReview(data.data[i].review === "" ? "No review yet" : data.data[i].review);
				break;
			}
		}
	};

	useEffect(() => {
		fetchSubmission();
	}, []);

	return (
		// main
		<>
			{/* main content */}
			<div className="px-4">
				<div className="flex-grow-1 d-flex justify-content-between">
					<h3 className="fw-bold">Submission : </h3>
					<div>
						<button type="button" onClick={() => document.getElementById("reviewModal").showModal()} className="btn btn-primary mx-2" style={{ background: "#004256" }}>
							Review
						</button>
						<button type="button" onClick={() => document.getElementById("fileModal").showModal()} className="btn btn-primary" style={{ background: "#004256" }}>
							+ New Submission
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
				{files.length === 0 ? (
					<div className="text-center p-5">No files uploaded yet</div>
				) : (
					files.map((file) => {
						return <File key={file.id} file={file} />; // file component
					})
				)}
			</div>

			{/* modal */}
			<dialog id="fileModal" style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", border: "none", borderRadius: "10px", width: "50%" }}>
				<div>
					<div className="modal-header p-1">
						<h1 className="modal-title fs-5" id="exampleModalLabel">
							Review
						</h1>
						<button type="button" className="btn-close" onClick={() => document.getElementById("fileModal").close()}></button>
					</div>
					<div className="modal-body p-2">
						<input type="file" className="form-control" accept=".pdf" multiple onChange={handleFileChange} />
						<div className="container py-3 overflowX-hidden">
							<ul className="list-group">
								Selected files
								{selectedfiles.map((file, index) => (
									<li className="list-group-item" key={index}>
										{file.name}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="modal-footer p-1">
					<button className="btn btn-secondary" onClick={() => document.getElementById("fileModal").close()}>
						Close
					</button>
					<button className="btn btn-primary" onClick={handleUpload}>
						Upload
					</button>
				</div>
			</dialog>

			{/* review modal */}
			<dialog id="reviewModal" style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", border: "none", borderRadius: "10px", height: "50%", width: "50%" }}>
				<div className="modal-header">
					<h1 className="modal-title fs-5" id="exampleModalLabel">
						Review
					</h1>
					<button type="button" className="btn-close" onClick={() => document.getElementById("reviewModal").close()}></button>
				</div>
				<div className="modal-body">
					<textarea className="form-control" readOnly value={review} rows={5} />
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" onClick={() => document.getElementById("reviewModal").close()}>
						Close
					</button>
				</div>
			</dialog>
		</>
	);
}

function File({ file }) {
	const router = useRouter();

	return (
		<div className="container">
			<div className="d-flex gap-4 my-3">
				<button
					onClick={() => {
						router.push("/view/" + file);
					}}
					style={{ border: "none", backgroundColor: "#e1f8ff", borderRadius: "5px", padding: "5px 10px 5px 10px", boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)" }}>
					<svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M4.33333 7.66667H11M4.33333 14.3333H11M4.33333 11H7.66667M1 17.1667V1.5C1 1.36739 1.05268 1.24021 1.14645 1.14645C1.24021 1.05268 1.36739 1 1.5 1H11.21C11.3426 1.00012 11.4697 1.05287 11.5633 1.14667L14.1867 3.77C14.2333 3.81658 14.2703 3.87193 14.2954 3.93285C14.3206 3.99378 14.3335 4.05908 14.3333 4.125V17.1667C14.3333 17.2323 14.3204 17.2973 14.2953 17.358C14.2701 17.4187 14.2333 17.4738 14.1869 17.5202C14.1405 17.5666 14.0853 17.6035 14.0247 17.6286C13.964 17.6537 13.899 17.6667 13.8333 17.6667H1.5C1.43434 17.6667 1.36932 17.6537 1.30866 17.6286C1.248 17.6035 1.19288 17.5666 1.14645 17.5202C1.10002 17.4738 1.06319 17.4187 1.03806 17.358C1.01293 17.2973 1 17.2323 1 17.1667Z"
							stroke="#004257"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M11 1V3.83333C11 3.96594 11.0527 4.09312 11.1464 4.18689C11.2402 4.28065 11.3674 4.33333 11.5 4.33333H14.3333" stroke="#004257" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
				<div className="d-flex flex-grow-1" style={{ backgroundColor: "#e1f8ff", borderRadius: "5px", padding: "5px 10px 5px 10px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)" }}>
					<div className="flex-grow-1 flex align-items-center" style={{ fontWeight: 600 }}>
						{file}
					</div>
					<div className="d-flex gap-3">
						{file.approved && (
							<div
								style={{
									border: "1px solid #00552d",
									borderRadius: "6px",
									fontSize: "10px",
									padding: "2px 7px 2px 7px",
									FontFace: "bold",
									color: "#00552d",
									backgroundColor: "#e1fff1",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
								className="fw-bold">
								Approved
							</div>
						)}
						{/* <div className="fw-semibold d-flex align-items-center" style={{ fontWeight: 600 }}>
							13 Dec 2023
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
