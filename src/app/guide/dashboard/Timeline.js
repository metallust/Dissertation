import React, { useContext, useEffect } from "react";
import Node from "./Node";
import ThemeContext from "../../Context/ThemeContext";
import { useAnimate } from "framer-motion";

const calculateloadingpercentage = (n, complete) => {
	// calculating total width of events
	const loadingpercentage = complete / (n - 1);
	return loadingpercentage * 100;
};

function Index({ n, complete, recentcompleted = 0, descriptions = {}, lineheight = 4 }) {
	const theme = useContext(ThemeContext).theme;
	const [scope, animate] = useAnimate();

	const animatecomplete = async () => {
		// completed animation
		const till = Math.max(complete, recentcompleted);
		for (let i = 0; i <= till; i++) {
			// change the node from active from completed
			animate([
				[
					`.active-${i - 1}`,
					{
						opacity: 0,
					},
					{
						duration: 0,
					},
				],
				[
					`.complete-${i - 1}`,
					{
						opacity: 1,
					},
					{
						delay: 0,
						duration: 0.6,
						ease: "easeOut",
					},
				],
			]);

			// confetti

			// progressline animation
			await animate(
				".progressline",
				{
					background: `linear-gradient(to right, #004256 ${calculateloadingpercentage(n, i)}%, #e1f8ff 0%)`,
				},
				{ duration: 0.35, ease: "linear" }
			);
		}
		// change the node from none to active
		animate([
			[
				`.node-${till}`,
				{
					opacity: 0,
				},
				{
					duration: 0,
				},
			],
			[
				`.active-${till}`,
				{
					opacity: 1,
				},
				{
					duration: 0,
				},
			],
		]);
	};

	useEffect(() => {
		animatecomplete();
	}, []);

	const lineStyle = {
		width: `100%`, // Adjust line width as needed
		height: `${lineheight}px`, // Adjust line height as needed
		position: "relative",
		display: "flex",
		justifyContent: "space-between",
	};

	return (
		<div
			ref={scope}
			className='px-5'
			style={{
				position: "relative",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				paddingTop: "40px",
				paddingBottom: "40px",
				marginBottom: "20px",
			}}
		>
			<div className='progressline' style={lineStyle}>
				{Array.from({ length: n }, (_, i) => {
					let w = 16;
					console.log(w);
					return (
						<div key={i}>
							<div className={`position-absolute node-${i}`}>
								<Node type={"none"} width={w} />
								<div className='fw-semibold' style={{ position: "relative", fontSize: "12px", transform: "translate(-50%, 0%)" }}>
									{descriptions[i].title}
								</div>
							</div>
							<div className={`position-absolute active-${i}`} style={{ opacity: 0 }}>
								<Node type={"active"} width={w} />
								<div className='fw-medium' style={{ position: "relative", fontSize: "16px", transform: "translate(-50%, 0%)" }}>
									{descriptions[i].title}
								</div>
							</div>
							<div className={`position-absolute complete-${i}`} style={{ opacity: 0 }}>
								<Node type={"complete"} width={w} />
								<div className='fw-semibold' style={{ position: "relative", fontSize: "12px", transform: "translate(-50%, 0%)" }}>
									{descriptions[i].title}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Index;
