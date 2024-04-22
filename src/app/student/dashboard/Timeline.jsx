import React, { useEffect } from "react";
import { useAnimate } from "framer-motion";

const height = 16;

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

const Node = ({ width, type, desc, descy }) => {
	const CompletedEvent = () => {
		const padding = "0px";
		const bcolor = "#e1f8ff";
		const fill = "#004256";
		const svgfill = "white";

		const svgStyle = {
			width: "80%", // Adjust as needed
			height: "70%", // Adjust as needed
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-45%, -50%)",
			padding: "3px",
		};

		const child = <></>;
		return <Point desc={desc} descy={descy} width={width} height={height} padding={padding} fill={fill} bcolor={bcolor} child={child} />;
	};

	const ActiveEvent = () => {
		const padding = "5px";
		const bcolor = "#004256";
		const fill = "white";
		return <Point desc={desc} descy={descy} width={width} height={height} padding={padding} fill={fill} bcolor={bcolor} />;
	};

	const Event = () => {
		const padding = "0px";
		const bcolor = "grey";
		const fill = "#e1f8ff";
		return <Point desc={desc} descy={descy} width={width} height={height} padding={padding} fill={fill} bcolor={bcolor} />;
	};

	if (type === "none") return <Event />;
	if (type === "active") return <ActiveEvent />;
	if (type === "complete") return <CompletedEvent />;
};

const calculateloadingpercentage = (n, complete) => {
	// calculating total width of events
	const loadingpercentage = complete / (n - 1);
	return loadingpercentage * 100;
};

function Index({ n, complete, recentcompleted = 0, descriptions = {}, lineheight = 4 }) {
	const [scope, animate] = useAnimate();
	useEffect(() => {
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
					{ duration: 0.35, ease: "linear" },
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
		animatecomplete();
	}, [animate, complete, n, recentcompleted]);

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
			className="px-5"
			style={{
				position: "relative",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				paddingTop: "40px",
				paddingBottom: "40px",
				marginBottom: "20px",
			}}>
			<div className="progressline" style={lineStyle}>
				{Array.from({ length: n }, (_, i) => {
					let w = 16;
					return (
						<div key={i}>
							<div className={`position-absolute node-${i}`}>
								<Node type={"none"} width={w} />
								<div className="fw-semibold" style={{ position: "relative", fontSize: "12px", transform: "translate(-50%, 0%)" }}>
									{descriptions[i].title}
								</div>
							</div>
							<div className={`position-absolute active-${i}`} style={{ opacity: 0 }}>
								<Node type={"active"} width={w} />
								<div className="fw-medium" style={{ position: "relative", fontSize: "16px", transform: "translate(-50%, 0%)" }}>
									{descriptions[i].title}
								</div>
							</div>
							<div className={`position-absolute complete-${i}`} style={{ opacity: 0 }}>
								<Node type={"complete"} width={w} />
								<div className="fw-semibold" style={{ position: "relative", fontSize: "12px", transform: "translate(-50%, 0%)" }}>
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
