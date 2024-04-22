import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Body = (props) => {
	const { id } = props;
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
	});
	//If topic is not finalized show the topic given by student
	//Select a topic and notify the student

	//If topic is finalized then show the current dissertation progress

	const router = useRouter();
	return <div style={{ width: "100%", margin:"0 5%"}}>
		{
			dissertation.stage=="topicselection"?<div>
				Hello
			</div>:""
		}
	</div>;
};

export default Body;
