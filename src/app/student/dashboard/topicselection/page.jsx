"use client";

import { useRouter } from "next/navigation";
import AddNote from "./AddNote";
import Notes from "./Notes";
import { useEffect, useState } from "react";

export default function Page() {
	const [notes, setNotes] = useState([]);
	const [saved, setSaved] = useState(true);
	const router = useRouter();
	const fetchNotes = async () => {
		const response = await fetch("/api/dissertation/ideaselection", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const json = await response.json();
		if (json.statusCode === 200) {
			console.log("fetched notes successfully");
			setNotes(json.data);
		} else {
			alert("Error in fetching notes" + json.message, "danger");
		}
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	const addNote = (note) => {
		setSaved(false);
		setNotes([...notes, note]);
	};
	const editNote = (i, note) => {
		setSaved(false);
		const newNotes = [...notes];
		newNotes[i] = note;
		setNotes(newNotes);
	};
	const deleteNote = (i) => {
		setSaved(false);
		const newNotes = [...notes];
		newNotes.splice(i, 1);
		setNotes(newNotes);
	};
	const save = async () => {
		console.log(notes);
		setSaved(true);
		const response = await fetch("/api/dissertation/ideaselection", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(notes),
		});
		const json = await response.json();
		if (json.statusCode === 200) {
			console.log("saved ideas successfully");
		} else {
			alert("Error in saving ideas " + json.message, "danger");
		}
	};
	return (
		<div className="container">
			<AddNote addNote={addNote} />
			<Notes notes={notes} editNote={editNote} deleteNote={deleteNote} />

			<button className="btn btn-primary mx-2" onClick={save}>
				{saved ? "Saved" : "Save"}
			</button>
		</div>
	);
}
