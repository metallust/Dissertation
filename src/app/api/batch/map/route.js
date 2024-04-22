import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/jwt";
import Batch from "@/models/batchModel";
import Dissertation from "@/models/dissertationModel";
import User from "@/models/userModel";
import Response from "@/utils/response";
import { NextResponse } from "next/server";
connect();

// get mapping
export async function GET(request) {
	try {
		//TODO: check if the role is coordinator
		// get batch from batch id
		// get the mapping from the batch
		// return the mapping
	} catch (error) {
		console.log(error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}

// create mapping
export async function POST(request) {
	try {
		// check if the role is coordinator
		const { role } = getDataFromToken(request.cookies.get("token")?.value || "");
		if (role !== "coordinator") {
			return NextResponse.json(new Response(403, "You are not allowed to create batch", null), {
				status: 403,
			});
		}
		// get batch id
		const { batchid } = await request.json();
		// get batch from id
		const batch = await Batch.findById(batchid);
		//TODO: check if mapping already exist or not
		// get students from batch
		let students = [];
		// get preference of each student
		for (let student of batch.students) {
			const dissertations = await Dissertation.find({ studentid: student });
			const dissertation = dissertations[0];

			if (!dissertation) {
				return NextResponse.json(new Response(400, "Dissertation not found", null), {
					status: 400,
				});
			}
			const preferences = dissertation.preferences;
			if (preferences.length === 0) {
				console.log("Student has no preferences", student.id);
			}
			students.push({ id: student, preferences });
		}
		// get guides and their domain
		const guides = [];
		for (let guide of await User.find({ role: "guide" })) {
			guides.push({ id: guide._id, domain: guide.domain });
		}
		// get mapping
		const mapping = guideStudentAlloctment(guides, students);
		console.log(mapping);
		// reconstruct mapping
		let newMapping = [];
		for (const [key, value] of Object.entries(mapping)) {
			for (let i = 0; i < value.length; i++) {
				const student = value[i];
				const dissertations = await Dissertation.find({ studentid: student });
				const dissertation = dissertations[0];
				dissertation.guide = key;
				dissertation.stage = "ideasubmission";
				await dissertation.save();
			}

			newMapping.push({
				guide: key,
				students: value,
			});
		}
		// save the mapping in batch
		batch.mapping = newMapping;
		await batch.save();
		// return mapping
		return NextResponse.json(new Response(200, "Mapping created successfully", mapping), {
			status: 200,
		});
	} catch (error) {
		console.log("handle this error man", error);
		return NextResponse.json(new Response(500, error.message, null), {
			status: 500,
		});
	}
}

// mapping function
function guideStudentAlloctment(guides, students, maxGuideAssign = 6) {
	// guide is list of object with guide id and guide domain
	// students is list of object with student id and preference domain list
	console.log(guides, students);
	let score = [];
	for (let student of students) {
		const MATCH = [1, 0.8, 0.6, 0.4];
		let studentGuidescorce = [];
		for (let guide of guides) {
			for (let i = 0; i < student.preferences.length; i++) {
				const domain = student.preferences[i];
				if (domain === guide.domain) {
					studentGuidescorce.push(MATCH[i]);
					break;
				}
			}
		}
		score.push(studentGuidescorce);
	}
	console.log(score);
	let studentAssignedCount = [];
	for (let i = 0; i < guides.length; i++) {
		studentAssignedCount.push(0);
	}

	let map = {};
	// now solve this assignment problem
	for (let i = 0; i < score.length; i++) {
		const GuideScore = score[i];
		// sorting guide score in ascending order
		let mappedGuideScore = GuideScore.map((el, index) => [el, index]);
		let sortedGuideScore = mappedGuideScore.sort((a, b) => a[0] - b[0]);
		let allocatedGuideIndex = -1;
		while (true) {
			let preferedguideIndex = sortedGuideScore.pop();
			let guideIndex = preferedguideIndex[1];
			if (studentAssignedCount[guideIndex] < maxGuideAssign) {
				allocatedGuideIndex = guideIndex;
				break;
			}
		}
		// add to mapping
		if (studentAssignedCount[allocatedGuideIndex] === 0) {
			map[guides[allocatedGuideIndex].id] = [students[i].id];
		} else {
			map[guides[allocatedGuideIndex].id].push(students[i].id);
		}
		studentAssignedCount[allocatedGuideIndex]++;
	}
	return map;
}
