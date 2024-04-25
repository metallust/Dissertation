"use client";

import { useRouter } from "next/navigation";

// import GuideSidebar from "../GuideSidebar";
// import AddGuides from "../pgCoordinator/AddGuides";
import GuideRightbar from "../../GuideRightbar";
// import GuideAnalytics from "./GuideAnalytics";
// import GuideApproval from "./GuideApproval";

import Body from "./Body";

export default function Page({ params }) {
	//CSS
	const sidebar = {
		display: "block",
		/* background: rgba(0, 0, 0, 0.2), */
		maxWidth: "280px",
		// flexGrow: "4",
		overflow: "hidden",
		overflowY: "scroll",
	};
	const main = {
		display: "flex",
		height: "100vh",
		overflowY: "hidden",
	};
	const content = {
		display: "block",
		/* background: rgba(0, 0, 0, 0.4), */
		flexGrow: "9",
		// overflow: "hidden",
		overflowY: "scroll",
		// height : "100dvh",
		// background:"black"
	};
	const rightbar = {
		maxWidth: "160px",
		flexGrow: "1",
		overflow: "hidden",
		overflowY: "scroll",
		scrollbarWidth: "none",
	};
	const btnstyle = {
		width: "fit-content",
		height: "40px",
		padding: "10px",
		backgroundColor: "#004257",
		borderRadius: "10px",
		border: "none",
		color: "#fff",
		fontSize: "16px",
		fontWeight: "400",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 4px rgba(0, 0, 0, 0.25)",
		fontFamily: "Roboto, sans-serif",
		marginBottom: "20px",
		marginRight: "10px",
	};

	const router = useRouter();

	return (
		<div style={main}>
			{/* <div style={sidebar}>
				<div className="d-flex">
					<GuideSidebar />
				</div>
			</div> */}
			<div style={rightbar}>
				<GuideRightbar />
			</div>
			<div style={content}>
				<div
					className="d-flex justify-content-between"
					style={{
						marginTop: "10px",
					}}>
					{/* <p>Computer Science 2023-24</p> */}
					<Body id={params.id} />
				</div>
			</div>
		</div>
	);
}
