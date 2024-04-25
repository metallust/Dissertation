import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

export default function Logout() {
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

	const buttonstyle = {
		background: "none",
		border: "none",
	};
	return (
		<div
			style={{
				width: "92%",
				backgroundColor: "#E1F8FF",
				marginTop: "10px",
				borderRadius: "10px",
				padding: "20px",
				margin: "8px",
				display: "flex",
				justifyContent: "space-between",
				boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
			}}>
			<h6>Logout</h6>
			<button style={buttonstyle} onClick={logout}>
				<MdLogout />
			</button>
		</div>
	);
}
