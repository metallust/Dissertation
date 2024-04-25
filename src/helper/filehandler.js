import { writeFile } from "fs/promises";
import { join } from "path";

async function saveFiles(req) {
	const data = await req.formData();
	const files = data.getAll("file");
	if (files.length === 0) {
		return [];
	}

	const fileNames = [];
	//TODO: Maybe async problem
	for (const element of files) {
		const bytes = await element.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const filename = `${Date.now()}-${element.name}`;
		fileNames.push(filename);
		await writeFile(join(process.cwd(), "public", "uploads", filename), buffer);
	}

	return fileNames;
}

export default saveFiles;
