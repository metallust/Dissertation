import React, { useState } from "react";

const AddGuide = ({ addGuide }) => {
    const [guide, setGuide] = useState({ name: "", email: "", password: "", domain: "", branch: "" });
    const [addedGuides, setAddedGuides] = useState([]);

    const handleAdd = (e) => {
        e.preventDefault();
        addGuide(guide);
        setAddedGuides([...addedGuides, guide]);
        setGuide({ name: "", email: "", password: "", domain: "", branch: "" });
    };

    const onChange = (e) => {
        setGuide({ ...guide, [e.target.name]: e.target.value });
    };

    const inputStyle = {
        width: "40vw",
        height: "40px",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        border: "none",
        color: "#004257",
        fontSize: "16px",
        fontWeight: "500",
        fontFamily: "Roboto, sans-serif",
        marginBottom: "20px",
    };

    const headerStyle = {
        fontSize: "32px",
        fontWeight: "700",
        marginBottom: "20px",
        color: "#004257",
    };

    const cardStyle = {
        border: "none",
        padding: "15px",
        borderRadius: "5px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        color: "#004257",
        background: "#E1F8FF",
        fontFamily: "Roboto, sans-serif",
        textAlign: "center",
    };

    const buttonStyle = {
        width: "176px",
        height: "50px",
        padding: "10px",
        backgroundColor: "#004257",
        borderRadius: "10px",
        border: "none",
        color: "#fff",
        fontSize: "20px",
        fontWeight: "500",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 4px rgba(0, 0, 0, 0.25)",
        marginBottom: "20px",
        cursor: "pointer",
    };

    return (
        <>
            <div className="login-box" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <div className="card border" style={cardStyle}>
                    <p style={headerStyle}>Add Guide</p>
                    <form onSubmit={handleAdd}>
                        <div className="mb-3">
                            <input type="text" placeholder="Enter Name" className="form-control" id="name" name="name" value={guide.name} onChange={onChange} style={inputStyle} required />
                        </div>
                        <div className="mb-3">
                            <input type="email" placeholder="Enter Email" className="form-control" id="email" name="email" value={guide.email} onChange={onChange} style={inputStyle} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" placeholder="Enter Password" className="form-control" id="password" name="password" value={guide.password} onChange={onChange} minLength={3} style={inputStyle} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Enter Domain" className="form-control" id="domain" name="domain" value={guide.domain} onChange={onChange} style={inputStyle} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Enter Branch" className="form-control" id="branch" name="branch" value={guide.branch} onChange={onChange} style={inputStyle} required />
                        </div>
                        <button type="submit" className="add-guide-button" style={buttonStyle}>
                            Add Guide
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddGuide;
