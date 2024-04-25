"use client";

import { usePathname, useRouter } from "next/navigation";
import AddStudent from "./AddStudent";
import Students from "./Students";
import { useEffect, useState } from "react";

export default function Page() {
	const [students, setStudents] = useState([]);
	const [saved, setSaved] = useState(true);
	const router = useRouter();
	const pathname = usePathname();
	//get id from pathname
	let paths = pathname.split("/");
	paths.pop();
	const batchid = paths.pop();

	const fetchStudents = async () => {
		try {
			const response = await fetch("/api/batch/student/?batchid=" + batchid);
			const json = await response.json();
			if (json.statusCode === 200) {
				console.log("Fetched students successfully");
				setStudents(json.data);
			} else {
				console.error("Error in fetching students: " + json.message);
			}
		} catch (error) {
			console.error("Error in fetching students:", error);
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	const addStudent = (student) => {
		setSaved(false);
		setStudents([...students, student]);
	};

	const editStudent = (i, student) => {
		setSaved(false);
		const newStudents = [...students];
		newStudents[i] = student;
		setStudents(newStudents);
	};

	const deleteStudent = (i) => {
		setSaved(false);
		const newStudents = [...students];
		newStudents.splice(i, 1);
		setStudents(newStudents);
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

	const save = async (student) => {
		const response = await fetch("/api/batch/student/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...student, batchid: batchid }),
		});
		console.log({ ...student, batchid: batchid });
		const data = await response.json();
		if (data.statusCode === 200) {
			console.log("Student added successfully");
			fetchStudents();
		} else {
			alert(data.message + data.status);
		}
	};

	return (
		<div className="container">
			<AddStudent addStudent={save} />
			<Students students={students} editStudent={editStudent} deleteStudent={deleteStudent} />
		</div>
	);
}
