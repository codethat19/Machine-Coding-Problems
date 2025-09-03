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

		if (isNaN(value) && value) return;

		const newOtp = [...otp];

		// Allow only 1 and the last digit input per field
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

	const handleInputClick = (index) => {
		// Select the first character of the input
		if (inputRefs.current[index])
			inputRefs.current[index].setSelectionRange(1, 1);

		// If previous input is empty, focus on the first empty input
		if (index > 0 && !otp[index - 1]) {
			const emptyIndex = otp.indexOf("");
			if (emptyIndex !== -1) {
				inputRefs.current[emptyIndex].focus();
			}
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

	const handlePaste = (e) => {
		e.preventDefault();

		const pastedData = e.clipboardData.getData("text/plain");

		// Remove any non-numeric characters and limit to the required length
		const pastedOtp = pastedData.replace(/\D/g, "").slice(0, length);

		if (pastedOtp.length === 0) return;

		const newOtp = new Array(length).fill("");
		for (let i = 0; i < pastedOtp.length; i++) {
			newOtp[i] = pastedOtp[i];
		}

		setOtp(newOtp);

		// Focus on the next empty field or the last field
		const nextEmptyIndex = newOtp.indexOf("");
		const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;

		// Focus on the empty index or the last index
		if (inputRefs.current[focusIndex]) {
			inputRefs.current[focusIndex].focus();
		}

		// Submit if complete OTP is pasted
		if (pastedOtp.length === length) {
			onOtpSubmit(pastedOtp);
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
						onPaste={handlePaste}
						className="otpInput"
					/>
				);
			})}
		</div>
	);
}
