import React from "react";
import "./Index.css";

function Node({ position, name, due, removenode }) {
	const handleClick = () => {
		removenode(position);
	};

	return (
		<div style={{ position: "relative" }}>
			<div className='node' onClick={handleClick}>
				<p>-</p>
			</div>
			<div style={{ position: "absolute" }}>
				<div className='node-title'>{name}</div>
				<div className='node-subtitle'>{due}</div>
			</div>
		</div>
	);
}

export default Node;
