const HttpStatus = {
	200: "OK",
	201: "Created",
	202: "Accepted",
	204: "No Content",
	400: "Bad Request",
	401: "Unauthorized",
	500: "Internal Server Error",
};

class Response {
	constructor(statusCode, message, data) {
		this.timeStamp = new Date().toLocaleString();
		this.statusCode = statusCode;
		this.httpStatus = HttpStatus[statusCode];
		this.message = message;
		this.data = data;
	}
}

export default Response;
