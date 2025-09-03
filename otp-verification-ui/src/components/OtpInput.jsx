import React, { useState, useRef, useEffect } from "react";

export default function OtpInput({ length = 4, onOtpSubmit = () => {} }) {
	const [otp, setOtp] = useState(new Array(length).fill(""));
	const inputRefs = useRef([]);

	// Focus on first input element on component mount
	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleInputChange = (index, e) => {
		const value = e.target.value;

		if (isNaN(value)) return;

		const newOtp = [...otp];

		// Allow only 1 digit input per field
		// ??
		newOtp[index] = value.substring(value.length - 1);
		setOtp(newOtp);

		// Submit trigger
		const combinedOtp = newOtp.join("");

		if (value && index < length - 1 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1].focus();
		}

		// console.log(combinedOtp);
		if (combinedOtp.length === length) onOtpSubmit(combinedOtp);
	};
	// ??
	const handleInputClick = (index) => {
		// Select the first character of the input
		inputRefs.current[index].setSelectionRange(1, 1);

		// If previous input is empty, focus on the first empty input
		if (index > 0 && !otp[index - 1]) {
			inputRefs.current[otp.indexOf("")].focus();
		}
	};

	const handleInputKeyDown = (index, e) => {
		if (
			e.key === "Backspace" &&
			!otp[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			// Focus on the previous input when backspace is pressed
			inputRefs.current[index - 1].focus();
		}
	};

	return (
		<div>
			{otp.map((value, index) => {
				return (
					<input
						key={index}
						type="text"
						ref={(el) => (inputRefs.current[index] = el)}
						value={value}
						onChange={(e) => handleInputChange(index, e)}
						onClick={() => handleInputClick(index)}
						onKeyDown={(e) => handleInputKeyDown(index, e)}
						className="otpInput"
					/>
				);
			})}
		</div>
	);
}
