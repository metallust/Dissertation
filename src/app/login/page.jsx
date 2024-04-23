"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Page() {
	const router = useRouter();
	const onSubmit = (e) => {
		e.preventDefault();
		// TODO: use axios
		// TODO: replace alert with toast
		fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(info),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					console.log("Successfully logged in", data);
					const role = data.data.role;
					toast.success("Logout successful");
					router.push("/" + role);
				} else {
					alert(data.message, data.status);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const [info, setInfo] = useState({ email: "", password: "" });
	const onchange = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });
	};

	//styles =>
	const inputStyle = { width: "50dvw", height: "40%", padding: "10px", borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", border: "none", color: "#004257", fontSize: "16px", fontWeight: "600", fontFamily: "Roboto, sans-serif", marginBottom: "20px" };

	const headerStyle = { fontSize: "32px", fontWeight: "700", marginBottom: "5px" };

	const cardStyle = { border: "none", padding: "20px", borderRadius: "5px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", color: "#004257", background: "#E1F8FF", fontFamily: "Roboto, sans-serif", textAlign: "center" };

	const buttonstyle = {
		width: "176px",
		height: "50px",
		padding: "10px",
		backgroundColor: "#004257",
		borderRadius: "10px",
		border: "none",
		color: "#fff",
		fontSize: "24px",
		fontWeight: "600",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 4px rgba(0, 0, 0, 0.25)",
		marginBottom: "20px",
	};

	return (
		<div className="login-box" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
			<div className="card border" style={cardStyle}>
				{/* <h1 className="text-center">Login</h1> */}
				<p style={headerStyle}>ResearchHouse</p>
				<p style={headerStyle}>Login</p>

				<form onSubmit={onSubmit} className="">
					<div className="mb-3">
						{/* <label htmlFor="email" className="form-label">
							Email
						</label> */}
						<input placeholder="Email" id="email" name="email" required className="form-control" style={inputStyle} value={info.email} onChange={onchange} />
						{/* <input id="email" className="form-control" required name="email" value={info.email} onChange={onchange} /> */}
					</div>
					<div className="mb-3">
						{/* <label htmlFor="password1" className="form-label">
							Password:
						</label> */}
						<input placeholder="Password" id="password1" type="password" className="form-control" minLength={3} maxLength={8} required name="password" value={info.password} onChange={onchange} style={inputStyle} />
					</div>
					<div className="w-100 text-center">
						<button type="submit" className="submitButton" style={buttonstyle}>
							Login
						</button>
					</div>
					<div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 div_spacing'>
									<span
										style={{
											fontSize: "16px",
											fontWeight: "500",
											color: "#004257",
											fontFamily: "Roboto, sans-serif",
										}}
									>
										Dont Have An Account?{" "}
										<Link href="/">Register</Link>
									</span>
								</div>
				</form>
			</div>
		</div>
	);
}
