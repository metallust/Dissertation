"use client";

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
	return (
		<div className="min-vh-100 p-4">
			<div className="card border p-4 w-50 min-vh-500 container align-self-center overflow-hidden">
				<h1 className="text-center">Login</h1>

				<form onSubmit={onSubmit} className="">
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input id="email" className="form-control" required name="email" value={info.email} onChange={onchange} />
					</div>
					<div className="mb-3">
						<label htmlFor="password1" className="form-label">
							Password:
						</label>
						<input id="password1" type="password" className="form-control" minLength={3} maxLength={8} required name="password" value={info.password} onChange={onchange} />
					</div>
					<div className="w-100 text-center">
						<button type="submit" className="btn btn-secondary">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
