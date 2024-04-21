import React from "react";

function Announcements({ announcements }) {
	return (
		<div className="d-flex justify-content-center">
			<div
				style={{
					height: "150px",
					width: "100%",
					maxWidth: "300px",
					backgroundColor: "#E1F8FF",
					borderRadius: "6px",
					padding: "0 10px ",
					margin: "10px 10px 10px 10px",
					boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
					position: "relative",
					overflow: "hidden",
				}}>
				<div
					style={{
						fontSize: "15px",
						fontWeight: "bold",
						top: "0",
						left: "0",
						position: "absolute",
						width: "100%",
						padding: "15px",
					}}>
					<svg className="me-2" width="16" height="16" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M20.1626 0.630132C21.1549 -0.0866473 22.5811 0.346464 22.7778 1.36792L26.3772 20.0615C26.5739 21.0829 25.4105 22.0147 24.223 21.7176C22.6272 21.3194 17.909 20.1726 15.1449 19.7993C13.4294 19.5601 11.6775 19.4806 9.91911 19.5619L9.73493 23.9692C9.72881 24.116 9.689 24.2622 9.61776 24.3993C9.54653 24.5364 9.44526 24.6619 9.31976 24.7684C9.19425 24.875 9.04696 24.9606 8.88628 25.0204C8.72561 25.0802 8.55471 25.113 8.38334 25.1169C8.21196 25.1208 8.04347 25.0957 7.88748 25.0432C7.73149 24.9906 7.59106 24.9115 7.47421 24.8104C7.35736 24.7094 7.26637 24.5883 7.20644 24.4542C7.14651 24.32 7.11881 24.1754 7.12493 24.0286L7.30237 19.7944C6.95103 19.8392 6.60014 19.8883 6.24982 19.9417C4.16908 20.2587 2.158 19.1818 1.80724 17.3602L0.967619 12.9997C0.616866 11.1781 2.08429 9.43149 4.13396 8.95316C4.58775 8.84656 5.03276 8.736 5.46858 8.6193L7.3804 18.5482L7.4242 18.5398C7.50538 18.3523 7.64152 18.1834 7.81894 18.05C7.99636 17.9166 8.20882 17.8235 8.43496 17.7799C8.6611 17.7364 8.89295 17.744 9.10722 17.8019C9.32149 17.8599 9.51062 17.9662 9.6556 18.1101L9.95707 18.0521L7.98983 7.83537C9.54171 7.27571 11.034 6.58805 12.4446 5.7826C14.8738 4.40929 18.8285 1.59134 20.1626 0.630132Z"
							fill="#004257"
						/>
					</svg>
					Announcements:
				</div>
				<div style={{ height: "40px" }}></div>
				<div
					style={{
						height: "100%",
						overflowY: "scroll",
						paddingY: "15px",
					}}>
					<ul className="list-group">
						{announcements.map((e) => {
							return (
								<li key={e} className="d-flex justify-content-between my-1 p-2 rounded" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
									{e}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

function StudentTodo({ todos }) {
	const card = {
		height: "150px",
		width: "100%",
		maxWidth: "300px",
		backgroundColor: "#E1F8FF",
		borderRadius: "6px",
		padding: "0 10px ",
		margin: "10px 10px 10px 10px",
		boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
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
		padding: "15px",
	};
	const body = {
		height: "100%",
		overflowY: "scroll",
		paddingY: "15px",
	};
	const listitem = {
		padding: "8px",
		color: "white",
		fontSize: "35px",
	};

	return (
		<div className="d-flex justify-content-center">
			<div style={card}>
				<div style={title}>
					<svg width="20" height="20" className="me-2" viewBox="0 0 100 168" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M75 80.55V34H91.6667V17.3333C91.6667 12.913 89.9107 8.67382 86.7851 5.54821C83.6595 2.4226 79.4203 0.666656 75 0.666656H25C20.5797 0.666656 16.3405 2.4226 13.2149 5.54821C10.0893 8.67382 8.33334 12.913 8.33334 17.3333V34H25V80.55L2.44168 94.775C1.66632 95.5475 1.05142 96.4658 0.632378 97.4769C0.213334 98.4881 -0.00157874 99.5721 8.73061e-06 100.667V117.333C8.73061e-06 119.543 0.877984 121.663 2.44079 123.226C4.00359 124.789 6.1232 125.667 8.33334 125.667H41.6667V150.667L50 167.333L58.3333 150.667V125.667H91.6667C93.8768 125.667 95.9964 124.789 97.5592 123.226C99.122 121.663 100 119.543 100 117.333V100.667C100.002 99.5721 99.7867 98.4881 99.3676 97.4769C98.9486 96.4658 98.3337 95.5475 97.5583 94.775L75 80.55Z"
							fill="#004257"
						/>
					</svg>
					To-Do:{" "}
				</div>
				<div style={{ height: "40px" }}></div>
				<div style={body}>
					<ul className="list-group px-2">
						{todos.map((todo) => {
							return (
								<li key={todo} className="d-flex justify-content-between">
									<div>{todo}</div>
									<input type="checkbox" name="a" id="td1" value="Todo 1" />
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

const StudentSidebar = ({ announcements, todos }) => {
	const name = "Basit";
	const section = "section";
	return (
		<div className="p-0 m-0">
			<div className="h3 my-3 py-2 fw-bold d-flex justify-content-center position" style={{ color: "#004256" }}>
				ResearchHouse
			</div>
			<div
				className="d-flex flex-column justify-content-center"
				style={{
					backgroundColor: "#E1F8FF",
					padding: "4px 10px",
					margin: "10px 10px 10px 10px",
					borderRadius: "6px",
					boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
				}}>
				<h6 className="text-center fw-bold">Implement</h6>
				<p className="fw-semibold">Deadline : 17 Dec 2023 (7 days left)</p>
			</div>
			<StudentTodo todos={todos} />
			<Announcements announcements={announcements} />
		</div>
	);
};

export default StudentSidebar;
