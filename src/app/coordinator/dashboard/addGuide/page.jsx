"use client";

import { useRouter } from "next/navigation";
import AddGuide from "./AddGuide";
import Guides from "./Guides"; // Updated import
import { useEffect, useState } from "react";

export default function Page() {
	const [guides, setGuides] = useState([]); // Updated state variable name
	const [saved, setSaved] = useState(true);
	const router = useRouter();

	const fetchGuides = () => {
		fetch("/api/guide/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					setGuides(data.data);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchGuides(); // Updated function call
	}, []);

	const addGuide = (guide) => {
		setSaved(false);
		setGuides([...guides, guide]); // Updated state variable
	};

	const editGuide = (i, guide) => {
		// Renamed function to edit guide
		setSaved(false);
		const newGuides = [...guides];
		newGuides[i] = guide;
		setGuides(newGuides); // Updated state variable
	};

	const deleteGuide = (i) => {
		setSaved(false);
		const newGuides = [...guides];
		newGuides.splice(i, 1);
		setGuides(newGuides); // Updated state variable
	};

	const save = async (guide) => {
		try {
			const response = await fetch("/api/guide/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(guide),
			});
			const data = await response.json();
			if (data.statusCode === 200) {
				fetchGuides();
			} else {
				alert(data.message, data.status);
			}
		} catch (error) {
			console.log(error);
		}
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

	return (
		<div className="container">
			<AddGuide addGuide={save} />
			<Guides guides={guides} editGuide={editGuide} deleteGuide={deleteGuide} addGuide={addGuide} /> {/* Updated component name and props */}
		</div>
	);
}
