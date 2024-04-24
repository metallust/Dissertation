import React, { useRef, useState } from "react";
import StudentItem from "./StudentItem";

function Students({ students, editStudent, deleteStudent }) {
    const ref = useRef(null);
    const [newStudent, setNewStudent] = useState({ name: "", email: "", password: "" });
    const [id, setId] = useState(null);

    const onChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const updateStudent = (i, student) => {
        ref.current.click();
        setId(i);
        setNewStudent(student);
    };

    return (
        <>
            {/* Modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Edit Student
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input type="text" className="form-control" id="name" name="name" value={newStudent.name} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input type="email" className="form-control" id="email" name="email" value={newStudent.email} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input type="password" className="form-control" id="password" name="password" value={newStudent.password} onChange={onChange} />
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
                                    editStudent(id, newStudent);
                                }}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* List of students */}
            <h2>Your Students</h2>
            <div className="row my-3">
                {students.map((student, index) => (
                    <StudentItem student={student} key={index} editStudent={() => updateStudent(index, student)} deleteStudent={() => deleteStudent(index)} />
                ))}
            </div>
        </>
    );
}

export default Students;
