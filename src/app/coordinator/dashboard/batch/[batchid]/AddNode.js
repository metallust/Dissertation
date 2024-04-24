import React from "react";
import "./Index.css";

function AddNode({ addNode, position }) {
	const handleClick = () => {
		addNode(position);
	};

	return (
		<>
			<div className="addnode" onClick={handleClick} id="position">
				<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
					<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
				</svg>
			</div>
		</>
	);
}

export default AddNode;
