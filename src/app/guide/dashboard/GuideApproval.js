import React, { useState } from "react";
// import "../test/Index.css";
// import StudentTodo from "./StudentTodo";
// import Announcements from "./Announcements";
// import Timeline from "./Timeline";
import File from "./File";
// import Conversation from "./Conversation/Index";
// import Rightbar from "./Rightbar";

function Files() {
	return (
		<div className='my-4'>
			<File />
			<File />
			<File />
		</div>
	);
}

function GuideApproval(props) {
	const name = "Basit";
	const section = "section";
	const [tab, setTab] = useState(0);
	return (
		<div className='main'>
			<div className='px-4'>
				<div className='flex-grow-1 d-flex justify-content-between'>
					<h3 className='fw-bold'>Thrust Idea Submission : </h3>
				</div>

				<ul className='nav nav-tabs'>
					<li className='nav-item'>
						<a
							className={`nav-link ${tab === 0 ? "active" : ""}`}
							aria-current='page'
							onClick={() => {
								setTab(0);
							}}
							href='#'
						>
							Files
						</a>
					</li>
					<li className='nav-item'>
						<a
							className={`nav-link ${tab === 1 ? "active" : ""}`}
							aria-current='page'
							onClick={() => {
								setTab(1);
							}}
							href='#'
						></a>
					</li>
				</ul>

				<Files />
			</div>
		</div>
	);
}

export default GuideApproval;
