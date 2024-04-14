"use client";

import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	const logout = async () => {
		try {
			const response = await fetch("/api/auth/logout", {
				method: "POST",
			});
			if (response.ok) {
				console.log("Successfully logged out");
				router.push("/login");
			} else {
				const data = await response.json();
				alert(data.message, data.status);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="min-vh-100 p-4 bg-dark text-white">
			Guide dashboard
			<button onClick={logout}>Logout</button>
		</div>
	);
}
