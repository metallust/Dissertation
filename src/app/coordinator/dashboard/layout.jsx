"use client";

import "./Index.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PgCoordinatorSidebar from "./PgCoordinatorSidebar";
import PgRightbar from "./PgRightbar";

export default function Layout({ children }) {
	return (
		<div className="main">
			{/* sidebar */}
			<div className="sidebar">
				<div className="d-flex">
					<PgCoordinatorSidebar />
				</div>
			</div>

			<div className="content">{children}</div>

			{/* rightbar */}
			<div className="rightbar">
				<PgRightbar />
			</div>
		</div>
	);
}
