import React, { useState } from "react";
import OtpInput from "./OtpInput";

const OTP_LENGTH = 4;

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
			return;
		}

		// Call the API to send the OTP
		setPhoneNumber("");
		setShowOtp(true);
	};

	const onOtpSubmit = (otp) => {
		console.log(`Login Successful: ${otp}`);
	};

	return (
		<div>
			{!showOtp ? (
				<div className="phone-otp-form">
					<form onSubmit={handlePhoneSubmit}>
						<input
							type="text"
							value={phoneNumber}
							onChange={handlePhoneNumberChange}
							placeholder="Handle Phone Number"
						/>
						<div>
							<button type="submit">Submit</button>
						</div>
					</form>
				</div>
			) : (
				<div>
					<p>Enter OTP sent to {phoneNumber}</p>
					<OtpInput length={OTP_LENGTH} onOtpSubmit={onOtpSubmit} />
				</div>
			)}
		</div>
	);
}
