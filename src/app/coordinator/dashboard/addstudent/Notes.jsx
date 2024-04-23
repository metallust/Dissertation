"use client";
import React, { useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";

function Notes({ notes, editNote, deleteNote }) {
	const ref = useRef(null);
	const [newNote, setNewNote] = useState({ title: "", description: "", tags: "" });
	const [id, setId] = useState(null);
	const onChange = (e) => {
		setNewNote({ ...newNote, [e.target.name]: e.target.value });
	};
	const updateNote = (i, note) => {
		ref.current.click();
		setId(i);
		setNewNote(note);
	};
	return (
		<>
			{/* modal */}
			<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>

			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Edit Idea
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="title" className="form-label">
									Title
								</label>
								<input type="title" className="form-control" id="title" name="title" value={newNote.title} onChange={onChange} />
							</div>
							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Description
								</label>
								<textarea className="form-control" id="description" name="description" value={newNote.description} onChange={onChange} rows="3"></textarea>
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
									editNote(id, newNote);
								}}>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* list of notes */}
			<h2>Your Ideas</h2>
			<div className="row my-3">
				{notes.map((note, index) => (
					<Noteitem note={note} key={index} editNote={() => updateNote(index, note)} deleteNote={() => deleteNote(index)} />
				))}
			</div>
		</>
	);
}

export default Notes;
