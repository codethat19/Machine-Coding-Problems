import React, { useState } from "react";
import OtpInput from "./OtpInput";

export default function PhoneOtpForm() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [showOtp, setShowOtp] = useState(false);

	const handlePhoneNumberChange = (e) => {
		setPhoneNumber(e.target.value);
	};

	const handlePhoneSubmit = (e) => {
		e.preventDefault();

		// Add Validations like length, only numbers, etc.

		const regex = /[^0-9]/g;
		if (regex.test(phoneNumber) || phoneNumber.length !== 10) {
			alert("Please enter a valid phone number");
			setPhoneNumber("");
			return;
		}

		// Call the API to send the OTP
		setShowOtp(true);
	};

	const onOtpSubmit = (otp) => {
		console.log(otp);
	};

	return (
		<div>
			{!showOtp ? (
				<form onSubmit={handlePhoneSubmit}>
					<input
						type="text"
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
						placeholder="Handle Phone Number"
					/>
					<button type="submit">Submit</button>
				</form>
			) : (
				<div>
					<p>Enter OTP sent to {phoneNumber}</p>
					<OtpInput length={4} onSubmit={onOtpSubmit} />
				</div>
			)}
		</div>
	);
}
