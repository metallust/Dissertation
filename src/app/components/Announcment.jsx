export default function Announcement({ announcements = ["Choose topic & refine research question", "Develop proposal & set timeline", "Conduct literature review", "Select research methods", "Collect & record data", "Outline & write dissertation", "Edit, proofread & revise", "Format & submit"] }) {
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
