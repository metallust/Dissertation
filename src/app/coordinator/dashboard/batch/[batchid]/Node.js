import React from "react";
import "./Index.css";

function Node({ node, editNode }) {
	const padding = node.due === "" ? "2px" : "5px";
	const bcolor = "#004256";
	const fill = node.due === "" ? "red" : "#e1f8ff";
	const width = 16;
	const height = 16;
	const desc = node.due;
	const descy = 0;

	return (
		<div style={{ position: "relative", transform: "translate(50%, 45%)" }} onClick={editNode}>
			<Point desc={desc} descy={descy} width={width} height={height} padding={padding} fill={fill} bcolor={bcolor} />
			<div className="fw-medium" style={{ position: "relative", fontSize: "16px", transform: "translate(-50%, 0%)" }}>
				{node.name}
			</div>
		</div>
	);
}

const Point = ({ desc, width, height, padding, fill, bcolor, child }) => {
	const circleStyle = {
		width: `${width}px`,
		height: `${height}px`,
		borderRadius: `${height / 2}px`,
		border: `${bcolor} solid ${padding}`,
		backgroundColor: `${fill}`,
		position: "relative",
		transform: "translate(-50%, -35%)",
	};
	return (
		<>
			<div style={circleStyle}>{child}</div>
		</>
	);
};

export default Node;
