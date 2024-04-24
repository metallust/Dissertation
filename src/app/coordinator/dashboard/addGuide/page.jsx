"use client";

import { useRouter } from "next/navigation";
import AddGuide from "./AddGuide";
import Guides from "./Guides"; // Updated import
import { useEffect, useState } from "react";

export default function Page() {
    const [guides, setGuides] = useState([]); // Updated state variable name
    const [saved, setSaved] = useState(true);
    const router = useRouter();

    const fetchGuides = async () => { // Renamed function to fetch guides
        try {
            const response = await fetch("/api/dissertation/guides", { // Adjusted API endpoint
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            if (json.statusCode === 200) {
                console.log("Fetched guides successfully");
                setGuides(json.data); // Updated state variable
            } else {
                alert("Error in fetching guides: " + json.message);
            }
        } catch (error) {
            console.error("Error in fetching guides:", error);
            alert("Error in fetching guides: " + error.message);
        }
    };

    useEffect(() => {
        fetchGuides(); // Updated function call
    }, []);

    const addGuide = (guide) => {
        setSaved(false);
        setGuides([...guides, guide]); // Updated state variable
    };

    const editGuide = (i, guide) => { // Renamed function to edit guide
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

    const save = async () => {
        try {
            console.log(guides); // Updated variable name
            setSaved(true);
            const response = await fetch("/api/dissertation/guides", { // Adjusted API endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(guides), // Updated variable name
            });
            const json = await response.json();
            if (json.statusCode === 200) {
                console.log("Saved guides successfully");
            } else {
                alert("Error in saving guides: " + json.message);
            }
        } catch (error) {
            console.error("Error in saving guides:", error);
            alert("Error in saving guides: " + error.message);
        }
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

    return (
        <div className="container">
            <AddGuide addGuide={addGuide} />
            <Guides guides={guides} editGuide={editGuide} deleteGuide={deleteGuide} addGuide={addGuide} /> {/* Updated component name and props */}

            <button className="savebuttonn"  style={buttonStyle} onClick={save}>
                {saved ? "Saved" : "Save"}
            </button>
        </div>
    );
}
