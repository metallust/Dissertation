"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		// TODO: use axios
		// TODO: replace alert with toast
		console.log("fetching user");
		fetch("/api/auth/getuser", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					const role = data.data.role;
					router.push("/" + role);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [router]);

	const onSubmit = (e) => {
		e.preventDefault();
		// TODO: replace it with axios
		// todo: add toast
		// add redirect
		fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(info),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 200) {
					console.log("Successfully signed up", data);
				} else {
					alert(data.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const [info, setInfo] = useState({
		email: "",
		password: "",
		name: "",
		domain:""
	});
	const onchange = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });
	};

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
		<main>
			<div className="signup">
				<div className="login-box" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
					<div className="card border" style={cardStyle}>
						<p style={headerStyle}>ResearchHouse</p>
						
						<p style={headerStyle}>Sign-Up</p>
						<form onSubmit={onSubmit}>
							<div className="mb-3">
								{/* <label htmlFor="email" className="form-label">
									Email
								</label> */}
								<input placeholder="Enter Email" id="email" className="form-control" required name="email" 
								style={inputStyle} value={info.email} onChange={onchange} />
							</div>
							<div className="mb-3">
								{/* <label htmlFor="name" className="form-label">
									Name
								</label> */}
								<input placeholder="Enter Name" id="name" className="form-control" required name="name" style={inputStyle} value={info.name} onChange={onchange} />
							</div>
							<div className="mb-3">
								{/* <label htmlFor="password" className="form-label">
									Password:
								</label> */}
								<input placeholder="Enter Password" id="password" type="password"  style={inputStyle}
							className="form-control" minLength={3} maxLength={8} required name="password" value={info.password} onChange={onchange} />
							</div>
							<div className="mb-3">
							<input placeholder="Enter Domains  {eg CSE, IT etc.}" id="domains" type="text"  style={inputStyle}
							className="form-control"  required name="domains" value={info.domain} onChange={onchange} />
							</div>
							<div className="w-100 text-center">
								<button type="submit" className="submitbullon" style={buttonstyle}>
									Sign up
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
										Already Have An Account?{" "}
										<Link href="/login">Login</Link>
									</span>
								</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
