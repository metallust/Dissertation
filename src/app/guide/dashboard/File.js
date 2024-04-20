import React from "react";

function Status() {
	const style = {
		border: "1px solid #00552d",
		borderRadius: "6px",
		fontSize: "10px",
		padding: "2px 7px 2px 7px",
		FontFace: "bold",
		color: "#00552d",
		backgroundColor: "#e1fff1",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
}
function FileIcon() {
	const style = {
		fontWeight: 600,
	};
	return (
		<div
			className='button'
			style={{
				backgroundColor: "#e1f8ff",
				borderRadius: "5px",
				padding: "5px 10px 5px 10px",
				boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
			}}
		>
			<svg
				width='15'
				height='19'
				viewBox='0 0 15 19'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M4.33333 7.66667H11M4.33333 14.3333H11M4.33333 11H7.66667M1 17.1667V1.5C1 1.36739 1.05268 1.24021 1.14645 1.14645C1.24021 1.05268 1.36739 1 1.5 1H11.21C11.3426 1.00012 11.4697 1.05287 11.5633 1.14667L14.1867 3.77C14.2333 3.81658 14.2703 3.87193 14.2954 3.93285C14.3206 3.99378 14.3335 4.05908 14.3333 4.125V17.1667C14.3333 17.2323 14.3204 17.2973 14.2953 17.358C14.2701 17.4187 14.2333 17.4738 14.1869 17.5202C14.1405 17.5666 14.0853 17.6035 14.0247 17.6286C13.964 17.6537 13.899 17.6667 13.8333 17.6667H1.5C1.43434 17.6667 1.36932 17.6537 1.30866 17.6286C1.248 17.6035 1.19288 17.5666 1.14645 17.5202C1.10002 17.4738 1.06319 17.4187 1.03806 17.358C1.01293 17.2973 1 17.2323 1 17.1667Z'
					stroke='#004257'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M11 1V3.83333C11 3.96594 11.0527 4.09312 11.1464 4.18689C11.2402 4.28065 11.3674 4.33333 11.5 4.33333H14.3333'
					stroke='#004257'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
			</svg>
		</div>
	);
}

function Review() {
	const style = {
		backgroundColor: "#e1f8ff",
		borderRadius: "5px",
		padding: "5px 10px 5px 10px",
		fontSize: "12px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "80px",
		boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
		fontWeight: 600,
	};
	return (
		<div style={style} className='fw-semibold'>
			Review
		</div>
	);
}
function Approve() {
	const style = {
		backgroundColor: "#e1f8ff",
		borderRadius: "5px",
		padding: "5px 10px 5px 10px",
		fontSize: "12px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "80px",
		boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
		fontWeight: 600,
	};
	return (
		<div style={style} className='fw-semibold'>
			Approve
		</div>
	);
}
function File({ approved = true }) {
	return (
		<div className='container'>
			<div className='d-flex gap-4 my-3'>
				<FileIcon />
				<div
					className='d-flex flex-grow-1'
					style={{
						backgroundColor: "#e1f8ff",
						borderRadius: "5px",
						padding: "5px 10px 5px 10px",
						fontSize: "12px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.4)",
					}}
				>
					<div
						className='flex-grow-1 flex align-items-center'
						style={{ fontWeight: 600 }}
					>
						Title like commit messages
					</div>
					<div className='d-flex gap-3'>
						{approved && <Status />}
						<div
							className='fw-semibold d-flex align-items-center'
							style={{ fontWeight: 600 }}
						>
							13 Dec 2023
						</div>
					</div>
				</div>
				<Review />
				<Approve />
			</div>
		</div>
	);
}

export default File;
