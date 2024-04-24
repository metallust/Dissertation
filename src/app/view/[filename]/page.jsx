import PDFViewer from "@/app/components/Pdfviewer";

export default function Page({ params }) {
	const filename = params.filename;
	return <PDFViewer fileUrl={`/uploads/${filename}`} />;
}
