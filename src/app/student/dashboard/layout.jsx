"use client";

import "./Index.css";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import { useRouter } from "next/navigation";
import Timeline from "./Timeline";
import { useEffect } from "react";

export default function Layout({ children }) {
	const router = useRouter();
	const fetchDissertation = async () => {
		const response = await fetch("/api/dissertation");
		if (response.ok) {
			const data = await response.json();
			console.log("Successfully fetched dissertation", data.data.stage);

			// if (data.data.stage === "domainselection") {
			// 	router.push("/student/dashboard/setup/");
			// } else if (data.data.stage === "ideasubmission") {
			// 	router.push("/student/dashboard/topicselection");
			// } else if (data.data.stage === "submissions") {
			// 	router.push("/student/dashboard/submissions");
			// } else {
			// 	router.push("/student/dashboard");
			// }
		} else {
			alert(data.message, data.status);
		}
	};

	useEffect(() => {
		fetchDissertation();
	}, []);

	// TODO: announcements
	const announcements = [
		"Topic selection sessions next week.",
		"Extended proposal deadline.",
		"Upcoming literature review workshops.",
		"Research methodology seminars soon.",
		"Data collection guidelines shared.",
		"Formatting updates on the portal.",
		"Defense prep workshops announced.",
		"Revised submission deadline.",
	];
	// TODO: todes
	const todos = ["Choose topic & refine research question", "Develop proposal & set timeline", "Conduct literature review", "Select research methods", "Collect & record data", "Outline & write dissertation", "Edit, proofread & revise", "Format & submit"];
	return (
		<div className="main">
			{/* sidebar */}
			<div className="sidebar">
				<Sidebar announcements={announcements} todos={todos} />
			</div>

			<div className="content">
				<Timeline
					n={5}
					complete={3}
					descriptions={[
						{
							title: "Synopsis",
							position: 1,
						},
						{
							title: "Research",
							position: 1,
						},
						{
							title: "Implementation",
							position: 1,
						},
						{
							title: "Reports",
							position: 1,
						},
						{
							title: "Publication",
							position: 1,
						},
					]}
				/>
				{children}
			</div>

			{/* rightbar */}
			<div className="rightbar">
				<Rightbar />
			</div>
		</div>
	);
}
