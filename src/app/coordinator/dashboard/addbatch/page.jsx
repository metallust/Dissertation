"use client";

import { useRouter } from "next/navigation";
import AddBatch from "./AddBatch"; // Updated import
import Batches from "./Batches"; // Updated import
import { useEffect, useState } from "react";

export default function Page() {
    const [batches, setBatches] = useState([]); // Updated state variable name
    const [saved, setSaved] = useState(true);
    const router = useRouter();


    const fetchBatches = async () => { // Renamed function to fetch batches
        try {
            const response = await fetch("/api/batch", { // Adjusted API endpoint
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            if (json.statusCode === 200) {
                console.log("Fetched batches successfully", json);
                setBatches(json.data); // Updated state variable
            } else {
                alert("Error in fetching batches: " + json.message);
            }
        } catch (error) {
            console.error("Error in fetching batches:", error);
            alert("Error in fetching batches: " + error.message);
        }
    };

    useEffect(() => {
        fetchBatches(); // Updated function call
    }, []);

    const addBatch = (batch) => {
        setSaved(false);
        setBatches([...batches, batch]); // Updated state variable
    };

    const editBatch = (i, batch) => { // Renamed function to edit batch
        setSaved(false);
        const newBatches = [...batches];
        newBatches[i] = batch;
        setBatches(newBatches); // Updated state variable
    };

    const deleteBatch = (i) => {
        setSaved(false);
        const newBatches = [...batches];
        newBatches.splice(i, 1);
        setBatches(newBatches); // Updated state variable
    };

    const save = async () => {
        try {
            console.log(batches); // Updated variable name
            setSaved(true);
            const response = await fetch("/api/dissertation/batches", { // Adjusted API endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(batches), // Updated variable name
            });
            const json = await response.json();
            if (json.statusCode === 200) {
                console.log("Saved batches successfully");
            } else {
                alert("Error in saving batches: " + json.message);
            }
        } catch (error) {
            console.error("Error in saving batches:", error);
            alert("Error in saving batches: " + error.message);
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
            <AddBatch addBatch={addBatch} /> {/* Updated component name and props */}
            <Batches batches={batches} editBatch={editBatch} deleteBatch={deleteBatch} addBatch={addBatch} /> {/* Updated component name and props */}

            <button className="savebuttonn"  style={buttonStyle} onClick={save}>
                {saved ? "Saved" : "Save"}
            </button>
        </div>
    );
}
