import React from "react";

function PgRightbar() {
	const buttonstyle = {
		background: "none",
		border: "none",
	};
	return (
		<div className="p-0 m-0">
			<div
				style={{
					backgroundColor: "#E1F8FF",
					marginTop: "16px",
					marginRight: "16px",
					borderRadius: "8px",
					padding: "20px 12px 20px 12px",
					margin: "10px",
					display: "flex",
					justifyContent: "space-between",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
				}}>
				<button style={buttonstyle}>
					<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M19.6896 27.7923C19.5479 28.7557 18.6696 29.5207 17.6212 29.5207H12.3796C11.3312 29.5207 10.4529 28.7557 10.3254 27.7215L9.94291 25.044C9.56041 24.8457 9.19208 24.6332 8.82375 24.3923L6.27375 25.4123C5.28208 25.7807 4.19125 25.3698 3.70958 24.4915L1.11708 20.0007C0.621247 19.0657 0.833747 17.9607 1.62708 17.3373L3.79458 15.6515C3.78041 15.439 3.76625 15.2265 3.76625 14.9998C3.76625 14.7873 3.78041 14.5607 3.79458 14.3482L1.64125 12.6623C0.805413 12.0248 0.592913 10.8773 1.11708 9.999L3.73791 5.47983C4.21958 4.6015 5.31041 4.20483 6.27375 4.58733L8.83791 5.6215C9.20625 5.38066 9.57458 5.16816 9.94291 4.96983L10.3254 2.264C10.4529 1.27233 11.3312 0.493164 12.3654 0.493164H17.6071C18.6554 0.493164 19.5337 1.25816 19.6612 2.29233L20.0437 4.96983C20.4262 5.16816 20.7946 5.38066 21.1629 5.6215L23.7129 4.6015C24.7187 4.23316 25.8096 4.644 26.2912 5.52233L28.8979 10.0273C29.4079 10.9623 29.1812 12.0673 28.3879 12.6907L26.2346 14.3765C26.2487 14.589 26.2629 14.8015 26.2629 15.0282C26.2629 15.2548 26.2487 15.4673 26.2346 15.6798L28.3879 17.3657C29.1812 18.0032 29.4079 19.1082 28.9121 20.0007L26.2771 24.5623C25.7954 25.4407 24.7046 25.8373 23.7271 25.4548L21.1771 24.4348C20.8087 24.6757 20.4404 24.8882 20.0721 25.0865L19.6896 27.7923ZM13.0454 26.6873H16.9554L17.4796 23.0748L18.2304 22.7632C18.8537 22.5082 19.4771 22.1398 20.1287 21.6582L20.7662 21.1765L24.1379 22.5365L26.0929 19.1365L23.2171 16.8982L23.3162 16.1048L23.3207 16.0667C23.3616 15.712 23.4012 15.3691 23.4012 14.9998C23.4012 14.6173 23.3587 14.249 23.3162 13.8948L23.2171 13.1015L26.0929 10.8632L24.1237 7.46316L20.7379 8.82316L20.1004 8.32733C19.5054 7.874 18.8679 7.50566 18.2162 7.2365L17.4796 6.92483L16.9554 3.31233H13.0454L12.5212 6.92483L11.7704 7.22233C11.1471 7.4915 10.5237 7.84566 9.87208 8.3415L9.23458 8.809L5.86291 7.46316L3.89375 10.849L6.76958 13.0873L6.67041 13.8807C6.62791 14.249 6.58541 14.6315 6.58541 14.9998C6.58541 15.3682 6.61375 15.7507 6.67041 16.1048L6.76958 16.8982L3.89375 19.1365L5.84875 22.5365L9.23458 21.1765L9.87208 21.6723C10.4812 22.1398 11.0904 22.494 11.7562 22.7632L12.5071 23.0748L13.0454 26.6873ZM19.9587 14.9998C19.9587 17.7382 17.7388 19.9582 15.0004 19.9582C12.262 19.9582 10.0421 17.7382 10.0421 14.9998C10.0421 12.2614 12.262 10.0415 15.0004 10.0415C17.7388 10.0415 19.9587 12.2614 19.9587 14.9998Z"
							fill="#004257"
						/>
					</svg>
				</button>
				<button style={buttonstyle}>
					<svg width="20" height="20" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M29.1783 24.0583C27.8953 22.6797 25.4947 20.6059 25.4947 13.8125C25.4947 8.65273 21.8769 4.52227 16.9987 3.50891V2.125C16.9987 0.951602 16.0478 0 14.875 0C13.7023 0 12.7514 0.951602 12.7514 2.125V3.50891C7.87317 4.52227 4.25536 8.65273 4.25536 13.8125C4.25536 20.6059 1.85477 22.6797 0.571804 24.0583C0.173366 24.4866 -0.0032744 24.9986 4.59125e-05 25.5C0.0073506 26.5891 0.861999 27.625 2.13169 27.625H27.6184C28.8881 27.625 29.7434 26.5891 29.75 25.5C29.7534 24.9986 29.5767 24.486 29.1783 24.0583ZM4.48446 24.4375C5.8936 22.5801 7.43423 19.5015 7.44153 13.851C7.44153 13.8377 7.43755 13.8258 7.43755 13.8125C7.43755 9.70461 10.7672 6.375 14.875 6.375C18.9829 6.375 22.3125 9.70461 22.3125 13.8125C22.3125 13.8258 22.3086 13.8377 22.3086 13.851C22.3159 19.5022 23.8565 22.5808 25.2656 24.4375H4.48446ZM14.875 34C17.2205 34 19.1231 32.0975 19.1231 29.75H10.627C10.627 32.0975 12.5296 34 14.875 34Z"
							fill="#004257"
						/>
					</svg>
				</button>
				<button style={buttonstyle}>
					<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8.33333 6.66667C8.33333 4.89856 9.03571 3.20286 10.286 1.95262C11.5362 0.702379 13.2319 0 15 0C16.7681 0 18.4638 0.702379 19.714 1.95262C20.9643 3.20286 21.6667 4.89856 21.6667 6.66667C21.6667 8.43478 20.9643 10.1305 19.714 11.3807C18.4638 12.631 16.7681 13.3333 15 13.3333C13.2319 13.3333 11.5362 12.631 10.286 11.3807C9.03571 10.1305 8.33333 8.43478 8.33333 6.66667ZM8.33333 16.6667C6.1232 16.6667 4.00358 17.5446 2.44078 19.1074C0.877974 20.6702 0 22.7899 0 25C0 26.3261 0.526784 27.5979 1.46447 28.5355C2.40215 29.4732 3.67392 30 5 30H25C26.3261 30 27.5979 29.4732 28.5355 28.5355C29.4732 27.5979 30 26.3261 30 25C30 22.7899 29.122 20.6702 27.5592 19.1074C25.9964 17.5446 23.8768 16.6667 21.6667 16.6667H8.33333Z"
							fill="#004257"
						/>
					</svg>
				</button>
			</div>
			<div
				className="container d-flex flex-column align-items-center "
				style={{
					backgroundColor: "#E1F8FF",
					maxWidth: "134px",
					height: "85vh",
					marginRight: "16px",
					borderRadius: "10px",
					border: "none",
					padding: "24px",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
					background: "#E1F8FF",
					textAlign: "center",
					fontWeight: "600",
					color: "#004257",
					display: "flex",
					justifyContent: "space-around",
				}}>
				<div className="btn btn-transparent d-flex flex-column align-items-center fs-7 ">
					<svg width="25" height="25" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M20.1626 0.630132C21.1549 -0.0866473 22.5811 0.346464 22.7778 1.36792L26.3772 20.0615C26.5739 21.0829 25.4105 22.0147 24.223 21.7176C22.6272 21.3194 17.909 20.1726 15.1449 19.7993C13.4294 19.5601 11.6775 19.4806 9.91911 19.5619L9.73493 23.9692C9.72881 24.116 9.689 24.2622 9.61776 24.3993C9.54653 24.5364 9.44526 24.6619 9.31976 24.7684C9.19425 24.875 9.04696 24.9606 8.88628 25.0204C8.72561 25.0802 8.55471 25.113 8.38334 25.1169C8.21196 25.1208 8.04347 25.0957 7.88748 25.0432C7.73149 24.9906 7.59106 24.9115 7.47421 24.8104C7.35736 24.7094 7.26637 24.5883 7.20644 24.4542C7.14651 24.32 7.11881 24.1754 7.12493 24.0286L7.30237 19.7944C6.95103 19.8392 6.60014 19.8883 6.24982 19.9417C4.16908 20.2587 2.158 19.1818 1.80724 17.3602L0.967619 12.9997C0.616866 11.1781 2.08429 9.43149 4.13396 8.95316C4.58775 8.84656 5.03276 8.736 5.46858 8.6193L7.3804 18.5482L7.4242 18.5398C7.50538 18.3523 7.64152 18.1834 7.81894 18.05C7.99636 17.9166 8.20882 17.8235 8.43496 17.7799C8.6611 17.7364 8.89295 17.744 9.10722 17.8019C9.32149 17.8599 9.51062 17.9662 9.6556 18.1101L9.95707 18.0521L7.98983 7.83537C9.54171 7.27571 11.034 6.58805 12.4446 5.7826C14.8738 4.40929 18.8285 1.59134 20.1626 0.630132Z"
							fill="#004257"
						/>
					</svg>
					Announcements
				</div>
				<div className="btn btn-transparent d-flex flex-column align-items-center fs-7">
					<svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.36935 23.4505C9.36935 24.1484 9.6466 24.8177 10.1401 25.3113C10.6336 25.8048 11.303 26.082 12.0009 26.082C12.6989 26.082 13.3682 25.8048 13.8617 25.3113C14.3552 24.8177 14.6325 24.1484 14.6325 23.4505M9.36935 23.4505C9.36935 22.7525 9.6466 22.0832 10.1401 21.5896C10.6336 21.0961 11.303 20.8189 12.0009 20.8189C12.6989 20.8189 13.3682 21.0961 13.8617 21.5896C14.3552 22.0832 14.6325 22.7525 14.6325 23.4505M9.36935 23.4505H1.47461M14.6325 23.4505H22.5272M8.05356 5.0294H15.9483M8.05356 8.97677H12.0009M12.0009 16.8715L9.36935 14.2399H5.42198C5.07301 14.2399 4.73833 14.1013 4.49157 13.8545C4.24482 13.6078 4.10619 13.2731 4.10619 12.9241V2.39782C4.10619 2.04885 4.24482 1.71418 4.49157 1.46742C4.73833 1.22066 5.07301 1.08203 5.42198 1.08203H18.5799C18.9288 1.08203 19.2635 1.22066 19.5103 1.46742C19.757 1.71418 19.8957 2.04885 19.8957 2.39782V12.9241C19.8957 13.2731 19.757 13.6078 19.5103 13.8545C19.2635 14.1013 18.9288 14.2399 18.5799 14.2399H14.6325L12.0009 16.8715Z"
							stroke="#004257"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					Timeline
				</div>
				<div className="btn btn-transparent d-flex flex-column align-items-center fs-7">
					<svg width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M25.5 18.0508C25.5 18.2624 25.4227 18.4455 25.2681 18.6001C25.1134 18.7547 24.9303 18.832 24.7188 18.832C24.5072 18.832 24.3241 18.7547 24.1694 18.6001C24.0148 18.4455 23.9375 18.2624 23.9375 18.0508V7.77246L15.3193 12.0938C14.6683 12.4193 13.8952 12.582 13 12.582C12.1048 12.582 11.3317 12.4193 10.6807 12.0938L1.45215 7.47949C0.817383 7.15397 0.5 6.76742 0.5 6.31982C0.5 5.87223 0.817383 5.49381 1.45215 5.18457L10.6807 0.570312C11.3317 0.244792 12.1048 0.0820312 13 0.0820312C13.8952 0.0820312 14.6683 0.244792 15.3193 0.570312L24.5479 5.18457C25.1012 5.46126 25.4105 5.80306 25.4756 6.20996C25.4919 6.22624 25.5 6.25879 25.5 6.30762V18.0508ZM16.1006 13.6562L20.8125 11.2881V14.7305C20.8125 15.4303 20.0516 16.0285 18.5298 16.5249C17.008 17.0213 15.1647 17.2695 13 17.2695C10.8353 17.2695 8.99202 17.0213 7.47021 16.5249C5.9484 16.0285 5.1875 15.4303 5.1875 14.7305V11.2881L9.89941 13.6562C10.5505 13.9818 11.584 14.1445 13 14.1445C14.416 14.1445 15.4495 13.9818 16.1006 13.6562Z"
							fill="#004257"
						/>
					</svg>
					Student
				</div>
				<div className="btn btn-transparent d-flex flex-column align-items-center fs-7">
					<svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8.62504 14.582C8.53168 14.582 8.43832 14.5957 8.34926 14.6246C7.84301 14.789 7.31059 14.8945 6.75005 14.8945C6.1895 14.8945 5.65708 14.789 5.15044 14.6246C5.06138 14.5957 4.96841 14.582 4.87505 14.582C2.45084 14.582 0.487173 16.5539 0.500063 18.9812C0.505532 20.007 1.34889 20.832 2.37506 20.832H11.125C12.1512 20.832 12.9946 20.007 13 18.9812C13.0129 16.5539 11.0493 14.582 8.62504 14.582ZM6.75005 13.332C8.82114 13.332 10.5 11.6531 10.5 9.58201C10.5 7.51092 8.82114 5.83202 6.75005 5.83202C4.67896 5.83202 3.00006 7.51092 3.00006 9.58201C3.00006 11.6531 4.67896 13.332 6.75005 13.332ZM23.625 0.832031H8.62504C7.59106 0.832031 6.75005 1.70117 6.75005 2.76914V4.58202C7.66489 4.58202 8.51176 4.84687 9.25004 5.27733V3.33203H23V14.582H20.5V12.082H15.5V14.582H12.5219C13.268 15.2339 13.8157 16.0949 14.0723 17.082H23.625C24.659 17.082 25.5 16.2129 25.5 15.1449V2.76914C25.5 1.70117 24.659 0.832031 23.625 0.832031Z"
							fill="#004257"
						/>
					</svg>
					Guides
				</div>
			</div>
		</div>
	);
}

export default PgRightbar;
