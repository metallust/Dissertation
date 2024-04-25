import React, { useRef, useState } from "react";
import GuideItem from "./GuideItem";

function Guides({ guides, editGuide, deleteGuide, addGuide }) {
	const ref = useRef(null);
	const [newGuide, setNewGuide] = useState({ name: "", email: "", password: "", domain: "", branch: "" });

	const onChange = (e) => {
		setNewGuide({ ...newGuide, [e.target.name]: e.target.value });
	};

	const updateGuide = (i, guide) => {
		ref.current.click();
		setNewGuide(guide);
	};

	const headerStyle = {
		color: "#004257",
		fontWeight: "700",
	};

	return (
		<>
			{/* modal */}
			<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>

			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Edit Guide
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input type="text" className="form-control" id="name" name="name" value={newGuide.name} onChange={onChange} />
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input type="email" className="form-control" id="email" name="email" value={newGuide.email} onChange={onChange} />
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">
									Password
								</label>
								<input type="password" className="form-control" id="password" name="password" value={newGuide.password} onChange={onChange} />
							</div>
							<div className="mb-3">
								<label htmlFor="domain" className="form-label">
									Domain
								</label>
								<input type="text" className="form-control" id="domain" name="domain" value={newGuide.domain} onChange={onChange} />
							</div>
							<div className="mb-3">
								<label htmlFor="branch" className="form-label">
									Branch
								</label>
								<input type="text" className="form-control" id="branch" name="branch" value={newGuide.branch} onChange={onChange} />
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								data-bs-dismiss="modal"
								onClick={() => {
									addGuide(newGuide);
									setNewGuide({ name: "", email: "", password: "", domain: "", branch: "" });
								}}>
								Add Guide
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* list of guides */}
			<h4 style={headerStyle}>Guides</h4>
			<div className="row my-3">
				{guides.map((guide, index) => (
					<GuideItem guide={guide} key={index} editGuide={() => updateGuide(index, guide)} deleteGuide={() => deleteGuide(index)} />
				))}
			</div>
		</>
	);
}

export default Guides;
