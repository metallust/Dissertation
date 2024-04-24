"use client";

import "./Index.css";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import { useRouter } from "next/navigation";
import Timeline from "./Timeline";
import { useEffect, useState } from "react";
import { set } from "mongoose";

export default function Layout({ children }) {
	const router = useRouter();
	const [timeline, setTimeline] = useState([]);
	const [completed, setCompleted] = useState(0);

	const fetchTimeline = async () => {
		const response = await fetch("/api/dissertation/timeline/", { method: "GET" });
		const data = await response.json();
		if (data.statusCode === 200) {
			console.log("Successfully fetched timeline", data.data);
			let newTimeline = [];
			data.data.forEach((item) => {
				newTimeline.push({
					title: item.name,
					position: 1,
					due: item.due,
				});
			});

			setTimeline(newTimeline);
		} else {
			alert(data.message + data.status);
		}
	};

	useEffect(() => {
		fetchTimeline();
	}, []);

	const fetchSubmission = async () => {
		const response = await fetch("/api/dissertation/submission", { method: "GET" });
		const data = await response.json();
		if (data.statusCode === 200) {
			console.log("Successfully fetched submissions", data.data);
			return data.data;
		} else {
			alert(data.message + data.status);
		}
	};

	const fetchDissertation = async () => {
		const response = await fetch("/api/dissertation");
		if (response.ok) {
			const data = await response.json();
			console.log("Successfully fetched dissertation", data.data.stage);

			if (data.data.stage === "domainselection") {
				setCompleted(0);
				router.push("/student/dashboard/setup/");
			} else if (data.data.stage === "topicselection") {
				setCompleted(1);
				router.push("/student/dashboard/topicselection");
			} else if (data.data.stage === "submissions") {
				router.push("/student/dashboard/submissions");

				//setCompleted(2);
				let temp = 2;
				const submissions = await fetchSubmission();
				for (const submission of submissions) {
					console.log(submission.approved);
					if (!submission.approved) {
						setCompleted(temp);
						break;
					}
					temp++;
				}
			} else if (data.data.stage === "final") {
				setCompleted(timeline.length - 2);
				router.push("/student/dashboard/final");
			} else if (data.data.stage === "done") {
				setCompleted(timeline.length - 1);
				router.push("/student/dashboard/report");
			} else {
				router.push("/student/dashboard");
			}
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
				{timeline.length === 0 ? <div>Loading timeline...</div> : <Timeline n={timeline.length} complete={completed} descriptions={timeline} />}
				{children}
			</div>

			{/* rightbar */}
			<div className="rightbar">
				<Rightbar />
			</div>
		</div>
	);
}
