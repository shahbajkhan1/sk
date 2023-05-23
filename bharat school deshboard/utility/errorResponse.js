class CreateResponse extends Error {
	constructor(message, statusCode) {
		super(message);
		this.message = message || "Server Error";
		this.statusCode = statusCode || 500;
	}
}

export default CreateResponse;
