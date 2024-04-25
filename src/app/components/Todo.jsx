export default function StudentTodo({ todos = ["Choose topic & refine research question", "Develop proposal & set timeline", "Conduct literature review", "Select research methods", "Collect & record data", "Outline & write dissertation", "Edit, proofread & revise", "Format & submit"] }) {
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
