import { useRouter } from "next/navigation";
import React from "react";

const Body = () => {
	const students = [
		{
			id: "6622d024e0801359780ae1dc",
			name: "Basit",
			prn: "1",
			branch: "CSE",
			batch: "2019",
			division: "A",
			roll: "1",
		},
		{
			id: "6622cfd9e0801359780ae1d2",
			name: "Irfan",
			prn: "2",
			branch: "CSE",
			batch: "2019",
			division: "B",
			roll: "3",
		},
		{
			id: "3",
			name: "Gaurav",
			prn: "5",
			branch: "IT",
			batch: "2019",
			division: "A",
			roll: "6",
		},
	];
	const router = useRouter();
	return (
		<div style={{ width: "100%" }}>
			{students.map((s) => {
				return (
					<button
						key={s.id}
						onClick={() => router.push("/guide/students/" + s.id)}
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
						<p>
							{s.batch}-{s.branch}-{s.division}
							{s.roll}
						</p>
						<p>{s.name}</p>
						<p>prn:{s.prn}</p>
					</button>
				);
			})}
		</div>
	);
};

export default Body;
