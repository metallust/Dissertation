"use client";

import { useRouter } from "next/navigation";
import AddStudent from "./AddStudent";
import Students from "./Students";
import { useEffect, useState } from "react";

export default function Page() {
    const [students, setStudents] = useState([]);
    const [saved, setSaved] = useState(true);
    const router = useRouter();

    const fetchStudents = async () => {
        try {
            const response = await fetch("/api/students", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            if (json.statusCode === 200) {
                console.log("Fetched students successfully");
                setStudents(json.data);
            } else {
                alert("Error in fetching students: " + json.message);
            }
        } catch (error) {
            console.error("Error in fetching students:", error);
            alert("Error in fetching students: " + error.message);
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

	const buttonStyle ={
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
	}

    const save = async () => {
        try {
            console.log(students);
            setSaved(true);
            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(students),
            });
            const json = await response.json();
            if (json.statusCode === 200) {
                console.log("Saved students successfully");
            } else {
                alert("Error in saving students: " + json.message);
            }
        } catch (error) {
            console.error("Error in saving students:", error);
            alert("Error in saving students: " + error.message);
        }
    };

    return (
        <div className="container">
            <AddStudent addStudent={addStudent} />
            <Students students={students} editStudent={editStudent} deleteStudent={deleteStudent} />

            <button className="savebuttonn"  style={buttonStyle} onClick={save}>
                {saved ? "Saved" : "Save"}
            </button>
        </div>
    );
}
