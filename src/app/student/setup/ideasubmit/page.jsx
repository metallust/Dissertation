"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DomainSelectionPage() {
	const router = useRouter();
	const [guides, setGuides] = useState([]);
	const [preferences, setPreferences] = useState({ pref1: "", pref2: "", pref3: "" });

	const logout = async () => {
		try {
			const response = await fetch("/api/auth/logout", {
				method: "POST",
			});
			if (response.ok) {
				console.log("Successfully logged out");
				router.push("/login");
			} else {
				const data = await response.json();
				alert(data.message, data.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// Fetch domains provided by guides when the component mounts
		fetchGuides();
	}, []);

	const fetchGuides = async () => {
		fetch("/api/guide/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Fetched guides:", data); // Log the fetched data
				if (data.statusCode === 200) {
					setGuides(data.data); // Assuming guides are returned in data.data
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log("Error fetching guides:", err); // Log any errors
			});
	};

	const handlePreferenceSelect = (pref, value) => {
		setPreferences((prevPreferences) => ({
			...prevPreferences,
			[pref]: value,
		}));
	};

	const addPreference = async (e) => {
		e.preventDefault();
		if (preferences.pref1 === "" || preferences.pref2 === "" || preferences.pref3 === "") {
			alert("Please provide all three preferences");
			console.log(preferences);
			return;
		}
		try {
			const response = await fetch("/api/student/preference", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(preferences),
			});
			console.log(preferences);
			const data = await response.json();
			if (data.statusCode === 200) {
				console.log("Successfully added preferences", data);
				fetchGuides(); // Assuming you want to fetch guides after adding preferences
			} else {
				alert(data.message, data.status);
			}
			setPreferences({
				pref1: "",
				pref2: "",
				pref3: "",
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-vh-100 p-4 bg-dark text-danger">
			<h1>Domain Selection</h1>
			<button onClick={logout}>Logout</button>
			<form onSubmit={addPreference}>
				<div>
					<label htmlFor="preference1">Preference 1:</label>
					<select id="preference1" value={preferences.pref1} onChange={(e) => handlePreferenceSelect("pref1", e.target.value)}>
						<option value="">Select a domain...</option>
						<option value="Option 1">Option 1</option>
						<option value="Option 2">Option 2</option>
					</select>
				</div>
				<div>
					<label htmlFor="preference2">Preference 2:</label>
					<select id="preference2" value={preferences.pref2} onChange={(e) => handlePreferenceSelect("pref2", e.target.value)}>
						<option value="">Select a domain...</option>
						<option value="Option 1">Option 1</option>
						<option value="Option 2">Option 2</option>
					</select>
				</div>
				<div>
					<label htmlFor="preference3">Preference 3:</label>
					<select id="preference3" value={preferences.pref3} onChange={(e) => handlePreferenceSelect("pref3", e.target.value)}>
						<option value="">Select a domain...</option>
						<option value="Option 1">Option 1</option>
						<option value="Option 2">Option 2</option>
					</select>
				</div>
				<button type="submit">Set Preferences</button>
			</form>
			<ol>
				{guides.length !== 0 ? (
					guides.map((ele) => {
						return <li key={ele._id}>{ele.name}</li>;
					})
				) : (
					<p>no Guides</p>
				)}
			</ol>
		</div>
	);
}
