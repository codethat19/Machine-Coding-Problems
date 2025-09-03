import React, { useEffect, useState } from "react";

export default function ProgressBar({ progress, continuous, granularBars }) {
	const [animatedProgress, setAnimatedProgress] = useState(0);
	const [filledBars, setFilledBars] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setAnimatedProgress(progress);
		}, 100);
	}, [progress]);

	useEffect(() => {
		const targetBars = Math.floor(progress / 10);
		setFilledBars(0);

		if (targetBars > 0) {
			const fillInterval = setInterval(() => {
				setFilledBars((prev) => {
					if (prev >= targetBars) {
						clearInterval(fillInterval);
						return targetBars;
					}
					return prev + 1;
				});
			}, 50); // 200ms delay between each bar

			return () => clearInterval(fillInterval);
		}
	}, [progress]);

	return (
		<>
			{continuous ? (
				<div className="outer">
					<div
						style={{
							// width: `${progress}%`,
							transform: `translateX(${animatedProgress - 100}%)`,
							color: progress < 5 ? "black" : "white",
						}}
						className="inner"
						role="progressbar"
						aria-valuenow={progress}
						aria-valuemin={0}
						aria-valuemax={100}
					>
						{progress}%
					</div>
				</div>
			) : (
				<div
					style={{
						border: "1px solid gray",
						borderRadius: "10px",
						margin: "50px",
					}}
				>
					<div className="granular-container">
						{Array(granularBars)
							.fill()
							.map((bar, index) => {
								return (
									<div
										key={index}
										style={{
											backgroundColor:
												index < filledBars
													? "green"
													: "white",
										}}
										className="granular-outer"
									></div>
								);
							})}
					</div>
					{progress}%
				</div>
			)}
		</>
	);
}
