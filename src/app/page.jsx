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
	});
	const onchange = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });
	};
	return (
		<main>
			<div>
				<h1>Research House</h1>
				<Link href="/login">Login</Link>
				<h3>PG dissertation management tool</h3>
			</div>
			<div>
				<div className="min-vh-100 p-4">
					<div className="card border p-4 w-50 min-vh-500 container align-self-center overflow-hidden">
						<h1 className="text-center">Sign up</h1>

						<form onSubmit={onSubmit}>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input placeholder="example@email.com" id="email" className="form-control" required name="email" value={info.email} onChange={onchange} />
							</div>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input placeholder="Mike Tyson" id="name" className="form-control" required name="name" value={info.name} onChange={onchange} />
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">
									Password:
								</label>
								<input placeholder="Boxing@life" id="password" type="password" className="form-control" minLength={3} maxLength={8} required name="password" value={info.password} onChange={onchange} />
							</div>
							<div className="w-100 text-center">
								<button type="submit" className="btn btn-primary">
									Sign up
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
