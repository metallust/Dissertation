import StudentTodo from "../components/Todo";
import Logout from "../components/logout";
import Announcement from "../components/Announcment";

function Rightbar() {
	return (
		<div className="p-0 m-0">
			<div className="h3 my-3 py-2 fw-bold d-flex justify-content-center position" style={{ color: "#004256" }}>
				ResearchHouse
			</div>
			<StudentTodo />
			<Announcement />
			<Logout />
		</div>
	);
}

export default Rightbar;
