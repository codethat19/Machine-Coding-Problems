import React, { useEffect, useState } from "react";

export default function ProgressBar({ progress, continuous, granularBars }) {
	const [animatedProgress, setAnimatedProgress] = useState(0);
	const [filledBars, setFilledBars] = useState(0);

	useEffect(() => {
		const fillTimeOut = setTimeout(() => {
			setAnimatedProgress(progress);
		}, 100);

		return () => clearTimeout(fillTimeOut);
	}, [progress]);

	useEffect(() => {
		const targetBars = Math.floor(progress / (100 / granularBars));
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
			}, 100); // 100ms delay between each bar

			return () => clearInterval(fillInterval);
		}
	}, [progress, granularBars]);

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
													? "rgb(0, 176, 171)"
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
