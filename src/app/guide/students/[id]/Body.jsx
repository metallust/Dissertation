import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Body = (props) => {
	const { id } = props;
	const [selectidea, setSelectidea] = React.useState(0);
	//TODO
	//Check weather the topic is selected
	const [dissertation, setDissertation] = React.useState({});
	const getDissertation = (userid) => {
		fetch("/api/guide/getdissertation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userid }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					setDissertation(data.data);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log("you suck at fetch batch", err);
			});
	};
	useEffect(() => {
		//Get the dissertation of the student with props.id
		getDissertation(id);

		// console.log(dissertation);
	}, []);
	//If topic is not finalized show the topic given by student
	//Select a topic and notify the student
	const handleSelectIdea = () => {
		const idea = dissertation.ideas[selectidea].title;
		fetch("/api/guide/getdissertation", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, idea }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					console.log(data.data);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log("you suck at fetch batch", err);
			});
	};

	//If topic is finalized then show the current dissertation progress

	const router = useRouter();
	return (
		<div style={{ width: "100%", margin: "0 5%" }}>
			{dissertation.stage == "ideasubmission" ? (
				<div>
					<h1 style={{ color: "#004257" }}>Select a idea</h1>
					{dissertation.ideas.map((idea, ind) => {
						return (
							<div
								key={ind}
								onClick={() => setSelectidea(ind)}
								style={ind !== selectidea ? { backgroundColor: "#e1f8ff", padding: "3px 10px", margin: "14px 0", width: "50vw", borderRadius: "11px" } : { backgroundColor: "#004257", color: "white", padding: "3px 10px", margin: "14px 0", width: "50vw", borderRadius: "11px" }}>
								<h5>{idea.title}</h5>
								<p style={ind !== selectidea ? { display: "none" } : {}}>{idea.description}</p>
							</div>
						);
					})}
					<button onClick={handleSelectIdea} style={{ backgroundColor: "#004257 ", color: "white", border: "none", padding: "3px 10px", borderRadius: "7px", justifyContent: "center" }}>
						Select Idea
					</button>
				</div>
			) : (
				""
			)}
			{dissertation.stage === "submissions" ? (
				<div>
					<h1>Submissions</h1>
					{dissertation.submissions.map((submission) => {
						return <div key={submission.id}>{submission}</div>;
					})}
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Body;
