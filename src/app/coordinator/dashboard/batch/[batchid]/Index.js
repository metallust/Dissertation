import React, { useEffect, useRef, useState } from "react";
import Node from "./Node";
import "./Index.css";

function Index({ batchid }) {
	const [timeline, setTimeline] = useState([
		{ name: "Setup", due: "asdfkds" },
		{ name: "Idea Submission", due: "" },
		{ name: "Final", due: "" },
	]);
	const [name, setName] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [position, setPosition] = useState(0);
	const [count, setCount] = useState(3);

	const fetchTimeline = async () => {
		const response = await fetch("/api/batch/timeline/" + "?batchid=" + batchid, { method: "GET" });
		const data = await response.json();
		if (data.statusCode === 200) {
			if (!data.data) data.data = [];
			setTimeline(data.data);
		} else {
			alert(data.message + data.status);
		}
	};

	const SaveTimeline = async () => {
		const response = await fetch("/api/batch/timeline", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ batchid: batchid, timeline }),
		});
		const data = await response.json();
		if (data.statusCode === 200) {
			console.log("Timeline saved successfully");
		} else {
			alert(data.message + data.status);
		}
	};

	useEffect(() => {
		fetchTimeline();
	}, []);

	useEffect(() => {
		setTimeline([
			{ name: "Setup", due: "" },
			{ name: "Idea Submission", due: "" },
			...Array.from({ length: count }, (_, i) => {
				return { name: "Submission " + (i + 1), due: "" };
			}),
			{ name: "Final", due: "" },
		]);
	}, [count]);

	const ref = useRef(null);

	const editNode = (node, index) => {
		setName(node.name);
		setDueDate(node.due);
		setPosition(index);
		ref.current.click();
	};

	function handleCreate() {
		timeline[position].due = dueDate;
		setTimeline(timeline);
		setName("");
		setDueDate("");
	}

	const linestyle = {
		backgroundColor: "#e1f8ff",
		width: "100%",
		height: "5px",
		position: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	};

	return (
		<>
			<div>
				<label htmlFor="nosubmission">Number of Presentation</label>
				<input
					type="number"
					className="form-control"
					placeholder="3"
					id="nosubmission"
					value={count}
					onChange={(e) => {
						setCount(e.target.value);
					}}
					max={10}
				/>
			</div>
			<div className="d-flex justify-content-center align-items-center pt-5">
				<div className="d-flex" style={linestyle}>
					{timeline.map((node, index) => {
						return <Node node={node} key={index} editNode={() => editNode(node, index)} />;
					})}
				</div>
			</div>

			{/* confirm */}
			<div className="w-100 text-center">
				<button className="btn btn-primary mt-5 " onClick={SaveTimeline}>
					Confirm
				</button>
			</div>

			{/* modal */}
			<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>

			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Node name: {name}
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<div className="mb-3">
									<label htmlFor="due" className="form-label">
										Due Date
									</label>
									<input
										type="date"
										className="form-control"
										id="due"
										placeholder="Implementation"
										value={dueDate}
										onChange={(e) => {
											setDueDate(e.target.value);
										}}
									/>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								data-bs-dismiss="modal"
								onClick={() => {
									handleCreate();
								}}>
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Index;
