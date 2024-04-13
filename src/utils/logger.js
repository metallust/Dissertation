import pino from "pino";

const logger = pino({
	transport: {
		target: "pino-pretty",
		options: {
			translateTime: "dd-mm-yyyy HH:MM:ss",
			ignore: "pid,hostname",
		},
	},
});

export default logger;
