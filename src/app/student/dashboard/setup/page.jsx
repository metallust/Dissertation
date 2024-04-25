"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DomainSelectionPage() {
	const router = useRouter();
	// TODO: Fetch domains from the server
	const [domains, setDomains] = useState([]);
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
		fetchDomains();
	}, []);

	const fetchDomains = async () => {
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
					let domain = [];
					for (const guide of data.data) {
						domain.push(guide.domain);
					}
					setDomains(domain);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log("Error fetching guides:", err); // Log any errors
			});
	};

	const handlePreferenceSelect = (pref, value) => {
		setPreferences({ ...preferences, [pref]: value });
	};

	const addPreference = async (e) => {
		e.preventDefault();
		if (preferences.pref1 === "" || preferences.pref2 === "" || preferences.pref3 === "") {
			alert("Please provide a all three prefrences");
			console.log(preferences);
			return;
		}
		try {
			const preferencesarray = [preferences.pref1, preferences.pref2, preferences.pref3];
			const response = await fetch("/api/dissertation/preference", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(preferencesarray),
			});
			console.log(preferences);
			const data = await response.json();
			if (data.statusCode === 200) {
				console.log("Successfully added prefrences", data);
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
	console.log("setup");

	return (
		<div className="min-vh-100 p-4">
			<h1>Domain Selection</h1>
			<form onSubmit={addPreference}>
				<div className="p-2">
					<label htmlFor="preference1">Preference 1 : </label>
					<select className="form-control" id="preference1" value={preferences.pref1} onChange={(e) => handlePreferenceSelect("pref1", e.target.value)}>
						<option value="">Select a domain...</option>
						{domains.map((domain) => {
							return (
								<option key={domain} value={domain}>
									{domain}
								</option>
							);
						})}
					</select>
				</div>
				<div className="p-2">
					<label htmlFor="preference2">Preference 2 : </label>
					<select className="form-control" id="preference2" value={preferences.pref2} onChange={(e) => handlePreferenceSelect("pref2", e.target.value)}>
						<option value="">Select a domain...</option>
						{domains.map((domain) => {
							return (
								<option key={domain} value={domain}>
									{domain}
								</option>
							);
						})}
					</select>
				</div>
				<div className="p-2">
					<label htmlFor="preference3">Preference 3 : </label>
					<select className="form-control" id="preference3" value={preferences.pref3} onChange={(e) => handlePreferenceSelect("pref3", e.target.value)}>
						<option value="">Select a domain...</option>
						{domains.map((domain) => {
							return (
								<option key={domain} value={domain}>
									{domain}
								</option>
							);
						})}
					</select>
				</div>
				<button type="submit" className="btn btn-primary mt-2">
					Set Prefrences
				</button>
			</form>
		</div>
	);
}
