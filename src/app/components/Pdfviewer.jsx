const PDFViewer = ({ fileUrl }) => {
	return <iframe style={{ width: "100%", height: "99.9vh" }} src={fileUrl} width={"100%"}></iframe>;
};

export default PDFViewer;
