
import Link from "next/link";
import { useRouter } from "next/navigation";

const PgCoordinatorSidebar = () => {
	const router = useRouter();
	const card = {
		height: "200px",
		width: "100%",
		maxWidth: "300px",
		backgroundColor: "#E1F8FF",
		borderRadius: "8px",
		padding: "8px 16px",
		margin: "8px 8px 8px 24px",
		boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.2)",
		position: "relative",
		overflow: "hidden",
	};

	const title = {
		fontSize: "15px",
		fontWeight: "bold",
		top: "0",
		left: "0",
		position: "absolute",
		width: "100%",
		padding: "16px 20px",
		backgroundColor: "#e1f8ff",
	};

	const body = {
		height: "100%",
		overflowY: "scroll",
		paddingY: "15px",
	};

	const [activeDepartment, setActiveDepartment] = useState(null);
	const [activeBatch, setActiveBatch] = useState(null);

	const handleDepartmentClick = (index) => {
		setActiveDepartment(index);
	};

	const handleBatchClick = (index) => {
		setActiveBatch(index);
	};

	const departments = ["Computer Science", "IT", "Mechanical Engg", "Civil Engineering", "Artificial Intelligence", "Data Science"];

	const batches = ["2022-23", "2021-22"];

	return (
		<div className="container d-flex flex-column align-items-center">
			<div
				className="logo h3"
				style={{
					fontWeight: "700",
					marginBottom: "20px",
					marginTop: "24px",
				}}>
				<div to={"/pg"} style={{ color: "#004257", textDecoration: "none" }}>
					ResearchHouse
				</div>
			</div>

			{/* <div
				className="d-flex flex-column justify-content-center"
				style={{
					height: "120px",
					width: "100%",
					maxWidth: "300px",
					backgroundColor: "#E1F8FF",
					borderRadius: "10px",
					padding: "0px 10px ",
					margin: "10px 10px 10px 10px",
					boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
					position: "relative",
					overflow: "hidden",
				}}>
				<div className="text-center fw-bold">
					Computer Science
					<div></div>
					2022-2023
					<div></div>
				</div>
				<p className="fw-semibold">Upcoming: Presentation (05/12/2012)</p>
			</div> */}

			<div style={card}>
				<div style={title}>Departments</div>
				<div style={body}>
					<div style={{ height: "48px" }}></div>

					<ul className="list-group">
						{departments.map((dept, index) => {
							return (
								<div
									key={dept}
									className="d-flex justify-content-between mb-1 px-1 rounded"
									style={{
										backgroundColor: activeDepartment === index ? "#004257" : "",
										color: activeDepartment === index ? "white" : "",
										wordWrap: "nowrap",
									}}
									onClick={() => handleDepartmentClick(index)}
									type="button">
									{dept}
								</div>
							);
						})}
					</ul>
				</div>
			</div>

			<div
				style={{
					height: "180px",
					width: "100%",
					maxWidth: "300px",
					backgroundColor: "#E1F8FF",
					borderRadius: "12px",
					padding: "8px 16px ",
					margin: "8px 8px 8px 24px",
					boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.2)",
					position: "relative",
					overflow: "hidden",
				}}>
				<div style={title}>Batches</div>
				<div style={{ body }}>
					<div style={{ height: "48px" }}></div>
					<ul className="list-group">
						{batches.map((batch, index) => {
							return (
								<div
									key={batch}
									className="d-flex justify-content-between mb-1 p-1 rounded"
									style={{
										backgroundColor: activeBatch === index ? "#004257" : "",
										color: activeBatch === index ? "white" : "",
									}}
									onClick={() => handleBatchClick(index)}
									type="button">
									{batch}
								</div>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="d-flex flex-column mt-2">
				<button style={{ backgroundColor: "#004257", color: "white" }} className="btn mb-2" onClick={() => router.push("/coordinator/dashboard/addGuide")}>
					Add Guide
				</button>
				<button style={{ boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.2)", borderRadius: "8px", marginTop: "8px", marginLeft: "14px", padding: "8px 64px", backgroundColor: "#004257", color: "white" }} className="btn mb-2" to={"/pg/addcommittee"}>
					Add Batch
				</button>
			</div> */}
		</div>
	);
};

export default PgCoordinatorSidebar;
