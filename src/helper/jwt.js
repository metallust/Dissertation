import jwt from "jsonwebtoken";

export const getDataFromToken = (token) => {
	try {
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		return decodedToken;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const encodeToken = async (data) => {
	try {
		return await jwt.sign(data, process.env.TOKEN_SECRET, {
			expiresIn: "1d",
		});
	} catch (error) {
		throw new Error(error.message);
	}
};
