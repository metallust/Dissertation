import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Body = () => {
	const [students, setStudents] = React.useState([]);

	const [selectedbranch, setSelectedbranch] = React.useState(0);
	const [batches, setBatches] = React.useState([]);
	const [guide, setGuide] = React.useState("");
	const getUser = async () => {
		// var user = "";
		await fetch("/api/auth/getuser/", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					setGuide(data.data);
					// console.log(data.data);
					fetchbatches(data.data.branch);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log("error in getting user", err);
			});
		// return user;
	};

	const fetchbatches = async (branch) => {
		try {
			const res = await fetch("/api/batch/", {
				method: "GET",
			});
			const data = await res.json();
			if (data.statusCode === 200) {
				var batches = await data.data.filter((ele) => ele.branch === branch);
				setBatches(batches);
				handleBatch(batches[selectedbranch].year, selectedbranch);
				// console.log("fetch batch", batches, data.data);
			} else {
				console.log(data.message, data.status);
			}
		} catch (err) {
			console.log("you suck at fetch batch", err);
		}
	};

	const handleBatch = (year) => {
		// setSelectedbranch(i);
		try {
			// console.log(batches);
			const filteredBatch = batches.filter((b) => b.year === year);
			// console.log(filteredBatch);
			const mapping = filteredBatch[0].mapping.filter((m) => m.guide === guide._id);
			// console.log(mapping[0].students);
			setStudents(mapping[0].students);
		} catch (err) {
			console.log("error", err);
		}
	};

	useEffect(() => {
		getUser();
		// handleBatch(batches[selectedbranch].year, selectedbranch);
		// console.log(batches[selectedbranch]);
	});

	const router = useRouter();
	return (
		<div style={{ width: "100%" }}>
			<div>
				{batches.map((batch, ind) => {
					return (
						<button
							key={ind}
							onClick={() => {
								setSelectedbranch(ind);
							}}
							style={
								selectedbranch === ind
									? { backgroundColor: "#004257 ", color: "white", border: "none", padding: "7px 10px", margin: "4px 10px", borderRadius: "7px" }
									: { backgroundColor: "#e1f8ff ", color: "black", border: "none", padding: "7px 10px", margin: "4px 10px", borderRadius: "7px" }
							}>
							{batch.year}
						</button>
					);
				})}
			</div>

			<div style={{ width: "100%" }}>
				{/* {
					batches.mapping.map((ele)=>{
						return ele.guide===guide._id?
						{
							
						}:""
					})
				} */}
				{students.map((s) => {
					return (
						<button
							key={s}
							onClick={() => router.push("/guide/students/" + s)}
							style={{
								border: "none",
								height: "33px",
								width: "99%",
								paddingLeft: "20px",
								paddingRight: "20px",
								justifyContent: "space-between",
								borderRadius: "7px",
								backgroundColor: "#E1F8FF",
								marginLeft: "10px",
								marginRight: "10px",
								display: "flex",
								marginBottom: "13px",
								alignItems: "center",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1",
							}}>
							<p>{s}</p>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Body;
