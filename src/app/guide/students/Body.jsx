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
					fetchbatches(data.data);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log("error in getting user", err);
			});
		// return user;
	};

	const fetchbatches = async (bat) => {
		try {
			const res = await fetch("/api/batch/", {
				method: "GET",
			});
			const data = await res.json();
			if (data.statusCode === 200) {
				console.log(data.data, bat);
				var x = await data.data.filter((ele) => ele.branch === bat.branch);
				setBatches(x);
				handleBatch(x[selectedbranch], bat._id);
				// console.log("fetch batch", batches, data.data);
			} else {
				console.log(data.message, data.status);
			}
		} catch (err) {
			console.log("you suck at fetch batch", err);
		}
	};

	const handleBatch = async (batch, id) => {
		// setSelectedbranch(i)
		try {
			console.log(batch);
			// const filteredBatch = batch.filter((b) => b.year === batch[selectedbranch].year);
			// console.log(filteredBatch);
			const mapping = await batch.mapping.filter((m) => m.guide === id);
			// console.log(mapping[0].students);
			// console.log(mapping);
			setStudents(mapping[0].students);
		} catch (err) {
			console.log("error", err);
		}
	};

	useEffect(() => {
		getUser();
		// handleBatch(batches[selectedbranch].year, selectedbranch);
		// console.log(batches[selectedbranch]);
	}, [selectedbranch]);

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
								// handleBatch(batch.year);
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
