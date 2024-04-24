import { useState } from "react";

const MultipleFileUpload = ({ uploadUrl }) => {
	console.log("making request :", uploadUrl);
	const [files, setFiles] = useState([]);

	const handleFileChange = (event) => {
		const fileList = event.target.files;
		setFiles([...files, ...fileList]);
	};

	const handleUpload = async () => {
		if (files.length === 0) {
			console.error("No files selected");
			return;
		}

		const formData = new FormData();
		files.forEach((file) => {
			formData.append("file", file);
		});

		try {
			const response = await fetch(uploadUrl, {
				method: "POST",
				body: formData,
			});
			if (response.ok) {
				const data = await response.json();
				console.log("Files uploaded successfully", data.data);
				// You can add further logic here based on the response from the server
			} else {
				console.error("Failed to upload files");
			}
		} catch (error) {
			console.error("Error uploading files:", error);
		}
	};

	return (
		<div>
			<input type="file" multiple onChange={handleFileChange} />
			<ul>
				{files.map((file, index) => (
					<li key={index}>{file.name}</li>
				))}
			</ul>
			<button onClick={handleUpload}>Upload</button>
		</div>
	);
};

export default MultipleFileUpload;
