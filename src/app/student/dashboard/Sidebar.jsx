import { useRouter } from "next/navigation";
import React from "react";
import Announcements from "@/app/components/Announcment";
import StudentTodo from "@/app/components/Todo";
import Logout from "@/app/components/logout";

const StudentSidebar = ({ announcements, todos, node, done }) => {
	return (
		<div className="p-0 m-0">
			<div className="h3 my-3 py-2 fw-bold d-flex justify-content-center position" style={{ color: "#004256" }}>
				ResearchHouse
			</div>
			<div
				className="d-flex flex-column justify-content-center"
				style={{
					backgroundColor: "#E1F8FF",
					padding: "5px 15px",
					margin: "10px 10px 10px 10px",
					borderRadius: "6px",
					boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
				}}>
				{!done ? (
					<>
						<h6 className="text-center fw-bold">{node?.title ? node.title : "loading..."}</h6>
						<p className="fw-semibold">Deadline : {node?.due ? node.due : "loading..."}</p>
					</>
				) : (
					<h6 className="text-center fw-semibold">Completed</h6>
				)}
			</div>
			<StudentTodo todos={todos} />
			<Announcements announcements={announcements} />
			<Logout />
		</div>
	);
};

export default StudentSidebar;
