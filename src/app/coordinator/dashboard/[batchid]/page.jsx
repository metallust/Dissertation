"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Index from "./Index";

export default function UserProfile({ params }) {
	const [batches, setBatches] = useState([]);
	const [batch, setBatch] = useState({ year: "", branch: "", students: [], mapping: [] });
	const [students, setStudents] = useState([]);
	const router = useRouter();

	const fetchbatches = () => {
		fetch("/api/batch/", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					setBatches(data.data.map((ele) => ele.year));
					data.data.forEach((element) => {
						if (element._id === params.batchid) setBatch(element);
					});
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log("you suck at fetch batch", err);
			});
	};

	const fetchallstudents = () => {
		fetch("/api/batch/student/?batchid=" + params.batchid, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					setStudents(data.data);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log("you suck at fetch student", err);
			});
	};

	useEffect(() => {
		fetchbatches();
		fetchallstudents();
	}, []);

	const [student, setStudent] = useState({ name: "", email: "", password: "" });
	const addStudent = async () => {
		const response = await fetch("/api/batch/student/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...student, batchid: params.batchid }),
		});
		console.log({ ...student, batchid: params.batchid });
		const data = await response.json();
		if (data.statusCode === 200) {
			console.log("Student added successfully");
			fetchallstudents();
		} else {
			alert(data.message + data.status);
		}
	};
	const mapStudentGuide = async () => {
		const response = await fetch("/api/batch/map/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ batchid: params.batchid }),
		});
		const data = await response.json();
		if (data.statusCode === 200) {
			console.log("Mapping done successfully", data);
		} else {
			alert(data.message, data.statusCode);
		}
	};
	const createTimeline = async () => {
		router.push("/coordinator/dashboard/" + params.batchid + "/timelineeditor");
	};

	return (
		<div>
			<h1>Batch</h1>
			<p>Batch ID: {params.batchid}</p>
			<p>Batch year: {batch.year}</p>
			<p>Batch branch: {batch.branch}</p>
			<button onClick={mapStudentGuide}>Allocate Student Guide</button>
			{batch.mapping ? <Mapping mapping={batch.mapping} /> : <p>Mapping not found</p>}

			<input type="text" name="name" placeholder="Name" onChange={(e) => setStudent({ ...student, name: e.target.value })} value={student.name} />
			<input type="email" name="email" placeholder="Email" onChange={(e) => setStudent({ ...student, email: e.target.value })} value={student.email} />
			<input type="password" name="password" placeholder="Password" onChange={(e) => setStudent({ ...student, password: e.target.value })} value={student.password} />
			<button onClick={addStudent}>Add student</button>
			<ul>
				{students.length !== 0 ? (
					students.map((ele) => {
						return <li key={ele._id}>{ele.name}</li>;
					})
				) : (
					<p>no Students</p>
				)}
			</ul>
			<h4>Timeline Editor</h4>
			<Index batchid={params.batchid} />
		</div>
	);
}

const Mapping = ({ mapping }) => {
	mapping = mapping.map((mapz) => {
		return (
			<div key={mapz.guide}>
				<p>Guide: {mapz.guide}</p>
				<ul>
					{mapz.students.length === 0 ? (
						<p>No students</p>
					) : (
						mapz.students.map((student) => {
							return <li key={student}>{student}</li>;
						})
					)}
				</ul>
			</div>
		);
	});

	return <div>{mapping.length === 0 ? <p>No mapping</p> : <div>{mapping.map((ele) => ele)}</div>}</div>;
};
