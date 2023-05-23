import CreateResponse from "../utility/errorResponse.js";
import errorlog from "errorlog";
const log = errorlog({});

const errorHandler = (err, req, res, next) => {
	if (!err) {
		return res.status(500).json({
			success: false,
			error: "Server Error",
		});
	}
	
	let error = {
		...err,
	};

	log(error);

	error.message = err.message;
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors)
			.map((val) => val.message)
			.join(",");
		error = new CreateResponse(message, 400);
		console.log(error);
	}
	if (err.name === "CastError") {
		const message = `Resource Not Found With Id ${err.value}`;
		error = new CreateResponse(message, 404);
	}

	return res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error",
	});
};
export default errorHandler;